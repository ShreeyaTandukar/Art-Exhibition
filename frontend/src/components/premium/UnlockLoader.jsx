import HeritageLoader from "../HeritageLoader";

const UnlockLoader = ({ onComplete }) => {
  return (
    <HeritageLoader
      message=""
      duration={2800}
      onComplete={onComplete}
    />
  );
};

export default UnlockLoader;