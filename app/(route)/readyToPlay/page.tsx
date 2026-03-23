"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import animationData from "@/app/lottie/logo.json";
import Countdown from "@/app/components/Countdown";
import { getGamePattern } from "@/app/services/bookFairService";
import { useBoundStore } from "@/app/stores/useBoundStore";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });
export default function ReadyToPlay() {
  const router = useRouter();
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const { setPattern, clearHistoryFlip, setKeyPattern } = useBoundStore(
    (state) => state
  );
  const onCountdownFinish = async () => {
    setShowCountdown(false);
    const { isSuccess, data, key } = await getGamePattern();
    if (!isSuccess) {
      return;
    }

    var newPattern: { id: number; matched: boolean; value: string }[] = [];
    data.forEach((e: number, index: number) => {
      newPattern.push({ id: index + 1, matched: false, value: e.toString() });
    });

    clearHistoryFlip();
    setKeyPattern(key);
    setPattern(newPattern);
    router.push("/play");
  };

  const defaultOptions = {
    autoplay: true,
    loop: true,
    animationData: animationData,
  };

  return (
    <>
      <div className="ready-to-play-container min-h-screen w-full flex flex-col">
        <div className="flex justify-center">
          <div className="w-[40%] pt-[15%] min-h-[240px] kiosk:min-h-[450px]">
            {/* <Lottie width={"100%"} options={defaultOptions} /> */}
            <img src="/images/logo.webp" className="!w-full" />
          </div>
        </div>
        <div className="flex justify-center mt-8 kiosk:mt-[3em] animate-flip-back">
          <div className="w-[85%] text-center bg-white bg-opacity-90 py-5 kiosk:py-8 px-5 rounded-[32px] kiosk:rounded-[64px] border-solid border-2 border-black flex flex-col kiosk:gap-3">
            <div className="flex justify-center text-base kiosk:text-3xl mb-2 text-[#4D4D4D]">
              จับคู่ภาพมีทั้งหมด 12 ภาพ จับคู่ภาพ 6 คู่
            </div>
            <div className="flex justify-center text-base kiosk:text-4xl mb-2 text-[#F66000] font-bold">
              ทำให้ดี ทำให้ไว จับคู่ภาพให้ถูกต้อง!
            </div>
            <div className="flex justify-center text-base kiosk:text-3xl mb-2 text-[#4D4D4D]">
              {/* ใครทำเวลาดีที่สุด <br /> */}
              แจ่มใส มีรางวัลพิเศษให้ด้วยนะ
            </div>
            <div className="flex justify-center text-base kiosk:text-3xl text-[#4D4D4D]">
              ถ้าพร้อมแล้วกด <span className="ml-1 text-[#F66000]">เริ่มเลย</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center text-[#4D4D4D]">
          <div className="flex justify-center mt-[2em] text-lg">
            <input
              className="px-3 py-[1em] bg-[#F66000] active:bg-[#FF7733] w-[35%] text-white rounded-[1em] kiosk:text-3xl kiosk:w-[50%] "
              type="submit"
              value="เริ่มเลย"
              onClick={() => setShowCountdown(true)}
            />
          </div>
        </div>
      </div>
      {showCountdown && <Countdown onCountdownFinish={onCountdownFinish} />}
    </>
  );
}
