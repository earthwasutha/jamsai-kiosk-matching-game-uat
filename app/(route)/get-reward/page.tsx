"use client";
import { useBoundStore } from "@/app/stores/useBoundStore";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { setProfile, heart } = useBoundStore((state) => state);
  const router = useRouter();

  return (
    <section className="flex flex-col justify-center items-center text-center text-[#fff] gap-2 kiosk:gap-8 mt-[12%]">
      
      <section className="font-bold text-5xl kiosk:text-7xl animate-scaleUpWin">
        <div>ว้าววว! ยินดีด้วย</div>
      </section>

      <div className="flex flex-col items-center gap-4 animate-scaleUpWin">
        <img
          src="/images/Hearts.webp"
          className="w-[80px] h-[80px] kiosk:w-[150px] kiosk:h-[150px]"
        />

        {heart === 50 && <img src="/images/50-Hearts.webp" className="w-[90px] kiosk:w-[180px]" />}
        {heart === 100 && <img src="/images/100-Hearts.webp" className="w-[90px] kiosk:w-[180px]" />}
        {heart === 200 && <img src="/images/200-Hearts.webp" className="w-[90px] kiosk:w-[180px]" />}
        {heart === 300 && <img src="/images/300-Hearts.webp" className="w-[90px] kiosk:w-[180px]" />}
      </div>

      <section className="bg-white border-black rounded-3xl border-[1px] kiosk:border-[2px] p-3 kiosk:p-8 flex flex-col gap-[10px] w-[85%] mt-[10%]">
        <section className="text-xl kiosk:text-3xl font-bold text-[#4D4D4D]">
          ยินดีด้วยคุณได้รับรางวัลจากแจ่มใส
        </section>
      </section>

      <button
        className="px-3 py-[1em] bg-[#F66000] active:bg-[#FF7733] w-[50%] text-white rounded-[1em] kiosk:text-3xl"
        onClick={() => {
          setProfile({});
          router.push("/");
        }}
      >
        เสร็จสิ้น
      </button>
    </section>
  );
};

export default Page;