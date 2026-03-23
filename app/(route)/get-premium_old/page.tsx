"use client";
import { useBoundStore } from "@/app/stores/useBoundStore";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { setProfile } = useBoundStore((state) => state);
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };
  const handleClearProfile = () => {
    setProfile({});
  };

  return (
    <section className=" flex flex-col justify-center items-center text-center text-[#4D4D4D] gap-2 kiosk:gap-8 mt-[5%]">
      <section className="font-bold text-5xl kiosk:text-7xl">
        <div>ว้าววว! ยินดีด้วย</div>
      </section>
      <section className="bg-white border-black rounded-3xl border-[1px] kiosk:border-[2px] p-3 kiosk:p- kiosk:p-10 flex flex-col gap-[10px] w-[321px] kiosk:min-w-[650px] mt-[45vh] kiosk:mt-[85%]">
        <section className="text-xl kiosk:text-3xl font-bold">
          ยินดีด้วยคุณได้รับรางวัลจากแจ่มใส
        </section>
        {/* <section className="text-lg kiosk:text-2xl">
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
      {/* <section className="bg-white p-1 rounded-xl flex flex-col text-[#F66000] text-lg kiosk:text-3xl px-5">
        <p> ท่านสามารถเช็คคะแนนแบบ Realtime ได้ที่</p>
        <p> Line OA @Jamsai</p>
      </section> */}
    </section>
  );
};

export default page;
