"use client";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useBoundStore } from "../../stores/useBoundStore";
import { timeFormat } from "@/app/utils/utils";
type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  const { gameResult, time, setProfile } = useBoundStore((state) => state);
  const handleNavigate = (path: string) => {
    router.push(path);
  };
  const handleClearProfile = () => {
    setProfile({});
  };
  const showTime = useMemo(() => timeFormat(time), [time]);
  return (
    <section className="flex flex-col justify-center items-center text-center text-white gap-2 kiosk:gap-8 pt-20 kiosk:pt-48">
      {/* <section className="flex flex-row gap-2">
        {process.env.NEXT_PUBLIC_DEVICE === "kiosk" && (
          <section className="flex flex-col justify-center items-center text-center gap-2">
            {gameResult.can_random_reward ? (
              <img
                className="w-[150px] h-[150px] kiosk:w-[300px] kiosk:h-[300px] animate-scaleUpWin"
                src={"/images/congratulations2.webp"}
                alt={""}
              />
            ) : (
              <img
                className="w-[150px] h-[150px] kiosk:w-[300px] kiosk:h-[300px] animate-scaleUpWin"
                src={"/images/congratulations2.webp"}
                alt={""}
              />
            )}
          </section>
        )}
        {process.env.NEXT_PUBLIC_DEVICE === "line_oa" && (
          <section className="flex flex-col justify-center items-center text-center gap-2">
            {gameResult.is_first_time ? (
              <img
                className="w-[150px] h-[150px] kiosk:w-[300px] kiosk:h-[200px]"
                src={"/images/100-point.svg"}
                alt={""}
              />
            ) : (
              <></>
            )}
            <img
              className="w-[150px] h-[150px] kiosk:w-[300px] kiosk:h-[300px] animate-scaleUpWin"
              src={"/images/congratulations2.webp"}
              alt={""}
            />
          </section>
        )}
      </section> */}

      <section className="flex flex-col gap-2 kiosk:gap-8 mt-5 text-[#fff] animate-scaleUpWin">
        <section className="text-[18px] kiosk:text-4xl">
          ยินดีด้วย! คุณทำเวลาได้
        </section>
        <section className="text-4xl kiosk:text-[64px] mb-5 font-bold">
          {showTime} {!time && "00:00:00"}
        </section>
        {/* {
          process.env.NEXT_PUBLIC_DEVICE === 'kiosk' &&
          <section className="flex flex-row gap-[1em] kiosk:gap-[1.5em]">
            <div className="flex flex-col items-center align-middle kiosk:gap-2 min-w-[158px] kiosk:min-w-[250px] kiosk:w-[300px] min-h-[110px] bg-white p-3 border-black rounded-2xl kiosk:rounded-[2em] border-[1px] kiosk:p-10">
              <div className="text-[#858585] font-normal text-lg kiosk:text-3xl">
                อันดับประจำวัน
              </div>
              <section className="flex flex-col kiosk:gap-2 text-[#171717] kiosk:text-4xl font-medium text-xl ">
                <div>อันดับที่</div>
                <div>{gameResult.daily ?? 1}</div>
              </section>
            </div>
            <div className="flex flex-col items-center align-middle kiosk:gap-2 min-w-[158px] kiosk:min-w-[250px] kiosk:w-[300px] min-h-[110px] bg-white p-3 border-black rounded-2xl kiosk:rounded-[2em] border-[1px] kiosk:p-10">
              <div className="text-[#858585] font-normal text-lg kiosk:text-3xl">
                อันดับรวม
              </div>
              <section className="flex flex-col kiosk:gap-2 text-[#171717]  kiosk:text-4xl font-medium text-xl">
                <div>อันดับที่</div>
                <div>{gameResult.all ?? 1}</div>
              </section>
            </div>
          </section>
        } */}

        <section className="flex flex-col justify-center items-center gap-2 mt-4">
          {
            gameResult.can_random_reward ? (
              <button
                className="px-3 py-[1em] bg-[#F66000] active:bg-[#FF7733] w-[100%] text-white rounded-[1em] kiosk:text-3xl"
                onClick={() => {
                  if (process.env.NEXT_PUBLIC_DEVICE === "kiosk") {
                    handleNavigate("/redeem-reward")
                  } else { //line
                    handleNavigate("/redeem-reward-line")
                  }
                }}
              >
                รับของรางวัล
              </button>
            ) : (
              <button
                className="px-3 py-[1em] bg-[#F66000] active:bg-[#FF7733] w-[100%] text-white rounded-[1em] kiosk:text-3xl"
                onClick={() => {
                  if (process.env.NEXT_PUBLIC_DEVICE === "kiosk") {
                    handleClearProfile();
                    handleNavigate("/");
                  } else { // Line
                    handleNavigate("/profile");
                  }
                }}
              >
                กลับสู่หน้าหลัก
              </button>
            )}
        </section>
      </section>
      <section></section>
    </section>
  );
};
export default page;
