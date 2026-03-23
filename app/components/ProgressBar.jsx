import ProgressIcon from "../assets/progressIcon.png";
import ProgressMaxIcon from "../assets/progressMaxIcon.png";

export const ProgressBar = ({ numberAchieved = 0, numberSuccess = 0 }) => {
  const percent = (numberAchieved / 16) * 100;

  return (
    <>
      <div className="relative mt-5 w-[80%] h-[16px] border-[4px] border-[#FFFFFF] border-opacity-40 rounded-[1em]">
        <div className="absolute top-0 h-[9px] rounded-[1em] bg-white w-full z-0" />
        <div
          className="absolute top-0 h-[9px] rounded-[1em] bg-[#E2211C] z-20"
          style={{ width: `calc(${percent}%)` }}
        />
        <img
          className={`absolute top-[-12px] z-30`}
          style={{ left: `calc(${percent}% - 20px)` }}
          src={ProgressIcon}
          alt="progress-icon"
          width={30}
          height={30}
        />
        <img
          className={`absolute top-[-16px] right-[-20px] z-50`}
          src={ProgressMaxIcon}
          alt="progress-max-icon"
          width={40}
          height={40}
        />
      </div>
      <div className="w-[80%] text-white mt-3 flex justify-between items-center text-[0.6em]">
        <div>สะสมแล้ว {numberAchieved} รหัส</div>
        <div>รางวัลที่ได้รับ {numberSuccess}/3 สิทธิ์</div>
      </div>
    </>
  );
};
