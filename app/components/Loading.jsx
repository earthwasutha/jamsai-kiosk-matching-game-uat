"use client";
import { Spin } from "antd";
// import Lottie from "react-lottie";
import { useBoundStore } from "../stores/useBoundStore";
import animationData from "@/app/lottie/logo.json";

export const Loading = ({ children }) => {
  const isLoading = useBoundStore((state) => state.isLoading);
  const defaultOptions = {
    autoplay: true,
    loop: true,
    animationData: animationData,
  };

  return (
    <Spin
      spinning={isLoading}
      // indicator={<Lottie width={"30%"} options={defaultOptions} />}
      // indicator={<img src="/images/logo.webp" className="animate-pulse !w-[150px] !h-[150px] kiosk:!w-[300px] kiosk:!h-[300px] !object-cover !absolute !top-[60%] !left-[33%] kiosk:!top-[100%] kiosk:!left-[33%]" />}
      indicator={<></>}
    // className=""
    >
      {children}
    </Spin>
  );
};
