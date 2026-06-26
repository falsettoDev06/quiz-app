function ModeCard({ mode }) {
  // Define dynamic styles
  const config = {
    Easy: {
      border: "border-green-400",
      bg: "bg-green-400/20",
      text: "text-success",
      icon: "fa-leaf",
      numberOfQuestions: 10,
      message: "Basic lang to saindo promise."
    },
    Medium: {
      border: "border-yellow-400",
      bg: "bg-yellow-400/20",
      text: "text-warning",
      icon: "fa-bolt",
      numberOfQuestions: 25,
      message: "Slight lang ang sakit."
    },
    Hard: {
      border: "border-red-400",
      bg: "bg-red-400/20",
      text: "text-error",
      icon: "fa-fire",
      numberOfQuestions: 50,
      message: "Iyah maurag ka bagay kaya mo ini."
    },
    Impossible: {
      border: "border-purple-400",
      bg: "bg-purple-400/20",
      text: "text-purple-400",
      icon: "fa-skull",
      numberOfQuestions: 100,
      message: "Arog kang maging kamo ni LANS."
    },
  };

  const { border, bg, text, icon } = config[mode];

  return (
    <div
      className={`flex flex-row justify-between p-3 card rounded-2xl w-90 h-30 border-3 ${border} ${bg}`}
    >
      <div className="flex flex-row">
        <div
          className={`w-20 h-20 rounded-full border flex items-center justify-center ${border} ${bg}`}
        >
          <i className={`fa-solid ${icon} ${text} text-3xl`}></i>
        </div>

        <div className="flex flex-col justify-start pl-2">
          <h1 className="text-xl font-bold">{mode}</h1>
          <p
            className={`text-sm ${text}`}
          >{`${config[mode].numberOfQuestions} Questions`}</p>
          <p
            className={`text-sm text-base-content/70`}
          >{`${config[mode].message}`}</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div
          className={`w-10 h-10 rounded-full border flex items-center justify-center ${border} ${bg}`}
        >
          <i className={`fa-solid fa-angle-right ${text} text-3xl`}></i>
        </div>
      </div>
    </div>
  );
}

export default ModeCard;
