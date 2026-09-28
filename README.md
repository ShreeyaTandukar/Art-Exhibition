# HeritageLink — local development

```
heritagelink/
├── frontend/          React + Vite          → npm run dev → http://localhost:5173
│   ├── src/
│   ├── public/
│   ├── .env           VITE_API_URL
│   └── package.json   "dev": "vite"
│
├── backend/           Node + Express        → npm run dev → http://localhost:5000
│   ├── config/db.js
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── utils/
│   ├── server.js
│   ├── .env           MONGO_URI, PORT, JWT_SECRET
│   └── package.json   "dev": "nodemon server.js"
│
└── README.md
```

There is deliberately **no `package.json` at the project root**. That is what
caused the earlier confusion: with a frontend `package.json` sitting above
`backend/`, running `npm run dev` inside a `backend/` folder that had no
`package.json` of its own made npm walk up the tree and run the frontend's
`vite` script instead. Now each half owns its own `package.json`, and running
a script at the root fails loudly instead of doing the wrong thing quietly.

---

## 1. Prerequisites

- Node.js 18+
- MongoDB running locally on `127.0.0.1:27017`

Check MongoDB is up:

```bash
mongosh mongodb://127.0.0.1:27017
```

If that fails, start the service:

- **Windows:** `net start MongoDB` (as Administrator), or start MongoDB Compass
- **macOS (brew):** `brew services start mongodb-community`
- **Linux:** `sudo systemctl start mongod`

---

## 2. Configure

### `backend/.env`

```env
MONGO_URI=mongodb://127.0.0.1:27017/heritagelinkdb
PORT=5000
JWT_SECRET=<paste a long random string here>
CLIENT_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:5175
```

Generate a secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Variable names are unchanged from the original project. `CLIENT_ORIGINS` is
new and only controls CORS.

### `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

The database is created automatically the first time the backend writes to it.
You do not need to create `heritagelinkdb` by hand.

---

## 3. Install

```bash
cd backend  && npm install
cd ../frontend && npm install
```

`jsqr` (the QR decoder) is in `frontend/package.json` and installs with it.

---

## 4. Seed the 25 heritage places

With MongoDB running:

```bash
cd backend
node seed/seedHeritageQR.js
```

Expected output ends with:

```
Done. 25 created, 0 tagged with a QR ID, 0 already up to date.
Total demo QR codes: HL-001 ... HL-025
```

Safe to re-run. For slugs that already exist it only fills in a missing
`qrId` and never overwrites content.

Your original `seed/seedSites.js` is untouched and still seeds the two
fully-written records (`bagh-bhairav`, `nyatapola`). If you want those
instead of the placeholders, run it **first**, then `seedHeritageQR.js`,
which will tag them with `HL-001` and `HL-008` and leave their content alone.

---

## 5. Run

**Terminal 1**

```bash
cd backend
npm run dev
```

```
> nodemon server.js
Server running on port 5000
Allowed origins: http://localhost:5173, http://localhost:5174, http://localhost:5175
MongoDB connected: heritagelinkdb
```

**Terminal 2**

```bash
cd frontend
npm run dev
```

```
VITE v8.x  ready
Local: http://localhost:5173/
```

If the backend prints `> vite`, you are in the wrong directory.

---

## 6. QR test codes

Encode the plain text `HL-001` … `HL-025` with any QR generator, or a URL
such as `http://localhost:5173/scan?qr=HL-001`. The scanner also accepts
`QR-001`, a `codePrefix` like `BB`, and a slug like `bagh-bhairav`, so any
QR codes you printed before still work.

| QR ID | Place | QR ID | Place |
|---|---|---|---|
| HL-001 | Bagh Bhairav Temple | HL-014 | Pashupatinath |
| HL-002 | Umamaheswor Temple | HL-015 | Kathmandu Durbar Square |
| HL-003 | Patan Durbar Square | HL-016 | Kasthamandap |
| HL-004 | Krishna Mandir | HL-017 | Taleju Temple |
| HL-005 | Golden Temple | HL-018 | Rani Pokhari |
| HL-006 | Kumbeshwar Temple | HL-019 | Dharahara |
| HL-007 | Bhaktapur Durbar Square | HL-020 | Seto Machindranath Temple |
| HL-008 | Nyatapola Temple | HL-021 | Indra Chowk Heritage Area |
| HL-009 | Dattatreya Square | HL-022 | Bungamati Heritage Area |
| HL-010 | 55 Window Palace | HL-023 | Khokana Heritage Area |
| HL-011 | Changu Narayan Temple | HL-024 | Rudrayani Temple |
| HL-012 | Swayambhunath | HL-025 | Kirtipur Heritage Area |
| HL-013 | Boudhanath | | |

**Camera access needs HTTPS or localhost.** `http://localhost:5173` on your
laptop is fine. Testing on a phone via `http://192.168.x.x:5173` will not
open the camera — browsers block `getUserMedia` on plain HTTP over the
network. Use the image-upload fallback, or a tunnel such as ngrok.

---

## 7. API

```
GET  /api/sites                             public     all active places
GET  /api/sites/:slug                       public     one place (existing)
GET  /api/sites/qr/:qrId                    public     NEW — resolve a scanned code
GET  /api/user/badge                        protected  NEW — this account's badge
POST /api/user/badge/collect/:heritageId    protected  NEW — idempotent collect
GET  /api/auth/profile                      protected  existing — restores session
POST /api/auth/register  /login             public     existing
POST /api/activation/verify  /claim         existing   untouched
```

`/api/sites/qr/:qrId` is registered **before** `/api/sites/:slug`, otherwise
Express would read the literal word `qr` as a slug.

The account always comes from the JWT. No `userId` is ever accepted from the
browser.

---

## 8. How the pieces connect

**Scanner → MongoDB**

```
QRScanner (camera only)
  → utils/qr.js normalises the text to "HL-007"
  → services/heritageService.js
  → GET /api/sites/qr/HL-007
  → heritageController.getSiteByQrId
  → HeritageSite.findOne({ $or: [qrId, codePrefix, slug] })
  → navigate to /premium/:slug
```

The 25 places exist only in MongoDB. `QRScanner.jsx` contains no place names.

**Badge → logged-in user**

```
AuthContext (restores the existing JWT on refresh)
  → api.js attaches "Authorization: Bearer <token>"
  → authMiddleware verifies it, sets req.user.id
  → badgeController reads User.findById(req.user.id)
  → badgeNumber + collectedHeritage[]  (fields on the ORIGINAL User model)
```

The two features meet in exactly one place: `useHeritageCollection`, a hook on
the heritage page that POSTs the collect call once the content has opened.

**Progress is never hardcoded**

`collectedCount` = length of this user's `collectedHeritage`.
`totalCount` = `HeritageSite.countDocuments({ isActive: true })`, read live on
every request. Add ten active places and `7 / 25` becomes `7 / 35` by itself.

---

## 9. Full test walkthrough

1. Start mongod, backend, frontend.
2. `node seed/seedHeritageQR.js` → 25 records.
3. Register at `/register` → a badge number is minted server-side.
4. Log in → you land on `/passport`.
5. Note the badge number, e.g. `HL-0001`.
6. Refresh the page → still logged in.
7. Click **Scan More QR** → `/scan`, camera opens.
8. Scan `HL-001` → Bagh Bhairav opens, banner says *added to your badge*.
9. Back to the badge → `1 / 25`.
10. Scan `HL-002` → `2 / 25`.
11. Scan `HL-001` **again** → content opens, banner says *already explored*,
    count stays `2 / 25`.
12. Refresh → still `2 / 25`.
13. Log out, log in again → same badge number, still `2 / 25`.
14. Register a second user → different badge number, `0 / 25`, cannot see the
    first user's collection.
15. In MongoDB, insert a new `HeritageSite` with `isActive: true` and
    `qrId: "HL-026"`. The badge immediately shows `/ 26`, and scanning
    `HL-026` works without any React change.

Check persistence is really in Mongo, not localStorage:

```bash
mongosh mongodb://127.0.0.1:27017/heritagelinkdb
> db.users.find({}, { name: 1, badgeNumber: 1, collectedHeritage: 1 })
> db.heritagesites.countDocuments({ isActive: true })
> db.counters.find()
```

---

## 10. Security note

The `.env` in the ZIP you uploaded contained a live MongoDB Atlas connection
string (username, password, cluster) and a JWT secret. Anything committed to
git or shared in a ZIP should be treated as public. Please:

1. Rotate that Atlas database user's password in the Atlas UI.
2. Generate a new `JWT_SECRET`.
3. Keep `.env` out of git — the `.gitignore` here already excludes it, and
   `.env.example` is committed instead.

The Atlas string is **not** carried into this build; both `.env` files point
at local services only.
