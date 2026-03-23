import Lamp from "../assets/lamp.png";
import GreyLamp from "../assets/grey-lamp.png";

export const AchieveBox = ({ numberAchieved = 0 }) => {
  const numberAchievedArr = [...Array(16).keys()].map((i) => i + 1);

  return (
    <div className="grid grid-cols-4 gap-3 p-[1.25em] bg-white rounded-[2.5em] w-[85%]">
      {numberAchievedArr.map((elem, idx) => {
        if (idx + 1 <= numberAchieved) {
          return (
            <div
              key={`achieve-${elem}`}
              className="flex content-center justify-center"
            >
              <img src={Lamp} alt="lamp" width={50} height={60} />
            </div>
          );
        } else {
          return (
            <div
              key={`achieve-${elem}`}
              className="flex content-center justify-center"
            >
              <img src={GreyLamp} alt="grey-lamp" width={50} height={60} />
            </div>
          );
        }
      })}
    </div>
  );
};
