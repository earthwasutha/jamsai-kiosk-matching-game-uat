"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {};

const page = ({ }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/achieve-point");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="">
      <section className="flex flex-col justify-center items-center text-center text-black gap-2 pt-20 kiosk:pt-52 animate-scaleUpWin">
        <section>
          <div className="text-5xl kiosk:text-7xl font-bold text-[#fff]">ชนะแล้ว!!</div>
          <div className="text-5xl kiosk:text-7xl whitespace-nowrap text-white">
            สุดยอดไปเลย
          </div>
        </section>
        <section className="text-xl kiosk:text-3xl mt-5 whitespace-nowrap text-white">
          ไปลุ้นกันว่าทำเวลาได้เท่าไหร่
        </section>
        <img src="/images/rabbit-character.png" className="w-[70%]" />
      </section>
    </section>
  );
};

export default page;
