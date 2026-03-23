"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FlipCardGame } from "@/app/components/FlipCardGame";
import { submitScore } from "@/app/services/bookFairService";
import { useBoundStore } from "@/app/stores/useBoundStore";

export default function ReadyToPlay() {
  const router = useRouter();
  const [time, setTime] = useState<number>(0);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const {
    profile,
    setGameResult,
    setTime: setTimeToStore,
    setIsLoading,
    time: timeStore,
    keyPattern,
  } = useBoundStore((state) => state);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isFinish) {
        clearInterval(intervalId);
      }
      setTime((prev) => prev + 1);
    }, 10);

    return () => clearInterval(intervalId);
  }, [isFinish]);

  const onFinish = async (historyFlip: any) => {
    setIsFinish(true);
    setIsLoading(true);
    const device = process.env.NEXT_PUBLIC_DEVICE;
    const { isSuccess, data } = await submitScore(
      profile?.jamsai_id,
      time,
      device,
      keyPattern,
      historyFlip
    );

    setIsLoading(false);

    if (!isSuccess) {
      return;
    }

    setGameResult(data);
    setTimeToStore(time);
    setIsLoading(false);
    router.push("/won");
  };

  const minutes = useMemo(
    () =>
      Math.floor(Math.floor((time % 360000) / 6000))
        .toString()
        .padStart(2, "0"),
    [time]
  );
  const seconds = useMemo(
    () =>
      Math.floor((time % 6000) / 100)
        .toString()
        .padStart(2, "0"),
    [time]
  );
  const milliseconds = useMemo(
    () => (time % 100).toString().padStart(2, "0"),
    [time]
  );

  return (
    <div className="play-container min-h-screen w-full flex flex-col">
      <div className="flex flex-col justify-center mt-[5%] text-lg kiosk:text-3xl text-[#fff]">
        <div className="text-center">
          เวลาเริ่มเดินแล้ว! ตาต้องไว นิ้วต้องเร็ว
        </div>
        <div className="text-center kiosk:mt-2">
          ขอให้โชคดี ทำเวลาได้ปังๆ นะ ทุกคน
        </div>
        <div className="flex justify-center items-center mt-[1em] text-lg kiosk:text-3xl">
          <div className="w-[50px] kiosk:w-[80px] kiosk:h-[80px] flex justify-center items-center bg-white p-3 font-bold text-[#F66000] border-[2px] border-[#CFCFCF] rounded-[1em]">
            {minutes}
          </div>
          <div className="px-2 font-bold text-[#F66000]">:</div>
          <div className="w-[50px] kiosk:w-[80px] kiosk:h-[80px] flex justify-center items-center bg-white p-3 font-bold text-[#F66000] border-[2px] border-[#CFCFCF] rounded-[1em]">
            {seconds}
          </div>
          <div className="px-2 font-bold text-[#F66000]">:</div>
          <div className="w-[50px] kiosk:w-[80px] kiosk:h-[80px] flex justify-center items-center bg-white p-3 font-bold text-[#F66000] border-[2px] border-[#CFCFCF] rounded-[1em]">
            {milliseconds}
          </div>
        </div>
        <FlipCardGame onFinish={onFinish} time={time} />
      </div>
    </div>
  );
}