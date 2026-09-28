import {Camera, BookOpen,Headphones,BadgeCheck,} from "lucide-react";
export const features = [
    {
        icon: Camera,
        title: "Preview",
        active:true,
        locked: false,
    },
    {
        icon:BookOpen,
        title:"Full Story",
        active: false,
        locked: true,
    },
    {
        icon: Headphones,
        title: "Listen",
        active: false,
        locked: true,
    },
    {
        icon: BadgeCheck,
        title: "Bagde",
        active: false,
        locked: true,
    },
]