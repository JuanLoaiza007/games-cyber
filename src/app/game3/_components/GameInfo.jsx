const GameInfo = ({ currentSituation, feedback }) => {
  return (
    <>
      <p className="mb-2 text-center">{currentSituation}</p>
      {feedback && <p className="mb-4 text-center">{feedback}</p>}
    </>
  );
};

export default GameInfo;
