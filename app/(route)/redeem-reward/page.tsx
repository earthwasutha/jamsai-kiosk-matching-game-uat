"use client";
import React, { useState, useEffect } from "react";
import * as services from "@/app/services/bookFairService";
import { useBoundStore } from "../../stores/useBoundStore";
import { useRouter } from "next/navigation";
// import gift from "@/app/lottie/gift.json";
// import Lottie from "react-lottie";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

import gift from "@/app/lottie/gift.json";
type Props = {};

// Default size
const sizeGiftBoxSelect = 240;
const sizeGiftBoxNonSelect = 200;
const sizeSmallGiftBoxSelect = 130;
const sizeSmallGiftBoxNonSelect = 100;
const page = (props: Props) => {
  // const isSmallScreen = window?.screen?.width < 720;
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const router = useRouter();
  const [choice, setChoice] = useState<number>(0);
  const device = process.env.NEXT_PUBLIC_DEVICE;
  const { gameResult, setIsLoading, setHeart, setReward, profile } = useBoundStore(
    (state) => state
  );
  const defaultOptions = {
    autoplay: true,
    loop: true,
    animationData: gift,
  };

  useEffect(() => {
    // This code runs only on the client
    if (typeof window !== "undefined") {
      setIsSmallScreen(window.screen.width < 720);
    }
  }, []);

  const handleSubmit = async () => {
    if (choice == 0) {
      alert("คุณยังไม่ได้เลือก reward");
      return;
    }
    setIsLoading(true);
    const { data, isSuccess } = await services.randomReward(
      device,
      choice,
      gameResult.score_id,
      profile
    );
    setIsLoading(false);
    if (!isSuccess) {
      alert("คุณไม่สามารถ random reward ได้");
      return;
    }
    setHeart(data.heart ?? 0);
    setReward(data.reward)
    router.push(data.is_heart ? "/get-reward" : "/get-premium");
  };
  return (
    <section className="flex flex-col justify-center items-center text-center text-[#fff] gap-5 kiosk:gap-[100px] w-full kiosk:mt-40 ">
      <section className="pt-20">
        <section className="text-3xl kiosk:text-4xl font-bold mb-4">
          <div>เวลาที่รอคอยมาถึงแล้ว!</div>
          <div>ลุ้นรางวัลกันเลย เลือกรับรางวัลได้ 1 กล่อง</div>
        </section>
        <section className="text-lg kiosk:text-3xl font-normal text-[#F06624]">
          * ร่วมสนุกรับรางวัลได้วันละ 1 ครั้ง/ช่องทาง *
        </section>
      </section>
      <section className="flex flex-row pt-5 items-center justify-center gap-1 kiosk:gap-2 h-[170px]">
        <div onClick={() => setChoice(1)}>
          <Lottie
            width={"100%"}
            animationData={gift}
            loop={true}
            autoplay={true}
            style={{
              cursor: "pointer",
              transition: "all",
              transitionDuration: "300ms",
              transitionTimingFunction: "ease-in-out",
              width: isSmallScreen
                ? choice === 1
                  ? sizeSmallGiftBoxSelect
                  : sizeSmallGiftBoxNonSelect
                : choice === 1
                  ? sizeGiftBoxSelect
                  : sizeGiftBoxNonSelect,
              height: isSmallScreen
                ? choice === 1
                  ? sizeSmallGiftBoxSelect
                  : sizeSmallGiftBoxNonSelect
                : choice === 1
                  ? sizeGiftBoxSelect
                  : sizeGiftBoxNonSelect,
            }}
          />
        </div>
        <div onClick={() => setChoice(2)}>
          <Lottie
            width={"100%"}
            animationData={gift}
            loop={true}
            autoplay={true}
            style={{
              cursor: "pointer",
              transition: "all",
              transitionDuration: "300ms",
              transitionTimingFunction: "ease-in-out",
              width: isSmallScreen
                ? choice === 2
                  ? sizeSmallGiftBoxSelect
                  : sizeSmallGiftBoxNonSelect
                : choice === 2
                  ? sizeGiftBoxSelect
                  : sizeGiftBoxNonSelect,
              height: isSmallScreen
                ? choice === 2
                  ? sizeSmallGiftBoxSelect
                  : sizeSmallGiftBoxNonSelect
                : choice === 2
                  ? sizeGiftBoxSelect
                  : sizeGiftBoxNonSelect,
            }}
          />
        </div>
        <div onClick={() => setChoice(3)}>
          <Lottie
            width={"100%"}
            animationData={gift}
            loop={true}
            autoplay={true}
            style={{
              cursor: "pointer",
              transition: "all",
              transitionDuration: "300ms",
              transitionTimingFunction: "ease-in-out",
              width: isSmallScreen
                ? choice === 3
                  ? sizeSmallGiftBoxSelect
                  : sizeSmallGiftBoxNonSelect
                : choice === 3
                  ? sizeGiftBoxSelect
                  : sizeGiftBoxNonSelect,
              height: isSmallScreen
                ? choice === 3
                  ? sizeSmallGiftBoxSelect
                  : sizeSmallGiftBoxNonSelect
                : choice === 3
                  ? sizeGiftBoxSelect
                  : sizeGiftBoxNonSelect,
            }}
          />
        </div>
      </section>
      <section className="pt-[20px]">
        <button
          className="rounded-xl px-3 py-[1em] kiosk:px-12 kiosk:py-8  kiosk:text-4xl bg-[#F66000] text-white min-w-[200px] kiosk:min-w-[300px] min-h-[48px] kiosk:min-h-[84px] disabled:bg-gray-400"
          disabled={choice == 0}
          onClick={handleSubmit}
        >
          เปิดกล่องรางวัล
        </button>
      </section>
    </section>
  );
};

export default page;
