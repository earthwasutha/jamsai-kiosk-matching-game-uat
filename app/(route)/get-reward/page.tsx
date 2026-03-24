"use client";
import { useBoundStore } from "@/app/stores/useBoundStore";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

type Props = {};

const page = (props: Props) => {
  const { setProfile, heart, setHeart } = useBoundStore((state) => state);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) return null;

  const handleNavigate = (path: string) => {
    router.push(path);
  };
  const handleClearProfile = () => {
    setProfile({});
  };

  return (
    <section className="flex flex-col justify-center items-center text-center text-[#fff] gap-2 kiosk:gap-8 mt-[12%]">
      <section className="font-bold text-5xl kiosk:text-7xl animate-scaleUpWin">
        <div>ว้าววว! ยินดีด้วย</div>
      </section>
      <div className=" absolute top-[19%] left-[39%] flex flex-col items-center justify-center gap-2 kiosk:gap-8 mt-[11%] opacity-100 transition-opacity duration-1000 animate-scaleUpWin">
        {/* <svg
          className="w-[80px] h-[80px] kiosk:w-[150px] kiosk:h-[150px]"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_282_574)">
            <circle cx="16" cy="16" r="15.5" fill="#FDC7EA" stroke="#F66000" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.109 11.7982C17.6153 9.14485 20.6221 9.14485 22.1284 10.4715C23.6346 11.7982 23.6346 14.4458 22.1284 17.0992C21.074 19.0863 18.3685 21.0734 16.109 22.4001C13.8496 21.0734 11.1441 19.0863 10.0897 17.0992C8.58345 14.4458 8.58345 11.7982 10.0897 10.4715C11.596 9.14485 14.6028 9.14485 16.109 11.7982Z"
              fill="#F66000"
            />
          </g>
          <defs>
            <clipPath id="clip0_282_574">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg> */}
        <div>
          <img src="/images/Hearts.webp" className="w-[80px] h-[80px] kiosk:w-[150px] kiosk:h-[150px] animate-flip-back-loop" />
          {
            heart == 50 &&
            <img src="/images/50-Hearts.webp" className="w-[90px] kiosk:w-[180px]" />
          }
          {
            heart == 100 &&
            <img src="/images/100-Hearts.webp" className="w-[90px] kiosk:w-[180px]" />
          }
          {
            heart == 200 &&
            <img src="/images/200-Hearts.webp" className="w-[90px] kiosk:w-[180px]" />
          }
          {
            heart == 300 &&
            <img src="/images/300-Hearts.webp" className="w-[90px] kiosk:w-[180px]" />
          }
          {/* <div className="text-[#4D4D4D] font-bold text-4xl kiosk:text-7xl">
          +{heart}
        </div> */}
        </div>

      </div>
      {/* <img src='/images/congratulations2.webp' className="absolute w-[150px] !right-[7.5rem] top-[34rem]" /> */}

      <section className="bg-white border-black rounded-3xl border-[1px] kiosk:border-[2px] p-3 kiosk:p-8 flex flex-col gap-[10px] w-[85%] mt-[80%] kiosk:mt-[85%]">
        <section className="text-xl kiosk:text-3xl font-bold text-[#4D4D4D]">
          ยินดีด้วยคุณได้รับรางวัลจากแจ่มใส
        </section>
        {/* <section className="text-xl kiosk:text-2xl">
          สำหรับ 5 อันดับแรกประจำวัน จะได้ +500 Bonus Hearts และ 3
          อันดับแรกของทั้งหมด ท่านจะได้ของพรีเมี่ยมสุดพิเศษ!
        </section> */}
      </section>
      <button
        className="px-3 py-[1em] bg-[#F66000] active:bg-[#FF7733] w-[50%] text-white rounded-[1em] kiosk:text-3xl"
        onClick={() => {
          handleClearProfile();
          handleNavigate("/");
        }}
      >
        เสร็จสิ้น
      </button>
      {/* <section className="bg-white p-1 rounded-xl  flex flex-col text-[#F66000] text-lg kiosk:text-3xl px-5">
        <p> ท่านสามารถเช็คคะแนนแบบ Realtime ได้ที่</p>
        <p> Line OA @Jamsai</p>
      </section> */}
    </section>
  );
};

export default page;
