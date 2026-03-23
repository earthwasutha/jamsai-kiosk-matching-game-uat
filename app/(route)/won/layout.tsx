"use client";
import React from "react";
import animationData from "@/app/lottie/achieve-point.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });
type Props = { children: React.ReactNode };

function layout({ children }: Props) {
  const defaultOptions = {
    autoplay: true,
    loop: true,
    animationData: animationData,
  };
  return (
    <div className="login-container w-full h-screen bg-center bg-cover absolute z-[0]">
      <div className="w-full min-h-[240px] kiosk:min-h-[350px] absolute z-[-1] top-[-15%]">
        {/* <Lottie width={"100%"} options={defaultOptions} /> */}
      </div>
      {children}
    </div>
  );
}
export default layout;
