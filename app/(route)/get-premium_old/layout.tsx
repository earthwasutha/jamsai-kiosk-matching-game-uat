"use client";
import React from "react";
import animationData from "@/app/lottie/get_premium.json";
import animationWordData from "@/app/lottie/premium_word.json";
import animationEffectData from "@/app/lottie/premium_effect.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

type Props = { children: React.ReactNode };

function layout({ children }: Props) {
  const defaultOptions = {
    autoplay: true,
    loop: false,
    animationData: animationData,
  };
  const defaultOptionsWord = {
    autoplay: true,
    loop: false,
    animationData: animationWordData,
  };
  const defaultOptionsEffect = {
    autoplay: true,
    loop: true,
    animationData: animationEffectData,
  };
  return (
    <div className="w-full h-screen bg-center bg-cover absolute z-[0]">
      <div className="w-full min-h-[240px] kiosk:min-h-[350px] absolute z-[-3] top-[-15%]">
        <Lottie width={"100%"} options={defaultOptions} />
      </div>
      <div className="w-full min-h-[240px] kiosk:min-h-[350px] absolute z-[-2] top-[17%] left-[10%]">
        <Lottie width={"70%"} options={defaultOptionsEffect} />
      </div>
      <div className="w-full min-h-[240px] kiosk:min-h-[350px] absolute z-[-1] top-[27%] left-[10%]">
        <Lottie width={"40%"} options={defaultOptionsWord} />
      </div>

      {children}
    </div>
  );
}
export default layout;
