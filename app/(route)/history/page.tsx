"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getHistory } from "@/app/services/bookFairService";
import { useBoundStore } from "@/app/stores/useBoundStore";
import { CountdownTimer } from "@/app/components/CountdownTimer";
import { timeFormat, truncateString } from "@/app/utils/utils";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale('th')

export default function Dashboard() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("daily");
  const [dataSource, setDataSource] = useState<any>(null);
  const { profile, setIsLoading } = useBoundStore((state) => state);

  useEffect(() => {
    if (!profile?.jamsai_id) return;

    init();
  }, [profile]);

  const init = async () => {
    try {
      setIsLoading(true);
      const response = await getHistory(profile?.jamsai_id);

      if (!response?.isSuccess) {
        return;
      }

      setDataSource(response.data.history.rows);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentDateString = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day} / ${month} / ${year}`;
  };

  return (
    <div className="dashboard-container min-h-screen w-full flex flex-col">
      {/* <div className="flex justify-center mt-[2em] kiosk:text-3xl">
        <div className="w-[85%] flex bg-white rounded-[2em] p-2 kiosk:p-3">
          <div
            className={`flex justify-center font-bold w-[50%] py-3 kiosk:py-6 ${
              selectedTab === "daily"
                ? " text-white bg-[#F66000] rounded-[2em]"
                : ""
            }`}
            onClick={() => setSelectedTab("daily")}
          >
            ประจำวัน
          </div>
          <div
            className={`flex justify-center font-bold w-[50%] py-3 kiosk:py-6 ${
              selectedTab === "all"
                ? " text-white bg-[#F66000] rounded-[2em]"
                : ""
            }`}
            onClick={() => setSelectedTab("all")}
          >
            ทั้งหมด
          </div>
        </div>
      </div> */}
      <div className="flex flex-col justify-center mt-[1em] text-lg kiosk:text-3xl kiosk:gap-3 text-[#4D4D4D]">
        {/* <div className="text-center">ศึกนี้เราจะแพ้ไม่ได้</div>
        <div className="text-center">ตรวจสอบอันดับของคุณในปัจจุบัน</div>
        <div className="text-center mt-2 text-[#F66000]">
          {selectedTab === "daily" ? (
            getCurrentDateString()
          ) : (
            // <CountdownTimer
            //   targetDate={process.env.NEXT_PUBLIC_LAST_DAY ?? ""}
            // />
            <p>&nbsp;</p>
          )}
        </div> */}
      </div>
      <div className="relative mt-[1em]">
        {/* <img
          src="/images/db-bg-2.png"
          alt="logo"
          className="absolute w-[100%]"
        />
        <img
          src="/images/ranking.svg"
          alt="logo"
          className="absolute w-[60%] left-[20%] mt-[10%]"
        /> */}
        {/* <div className="absolute text-xs kiosk:text-2xl left-[30%] mt-[36%] transform -translate-x-1/2 text-center">
          {truncateString(dataSource?.[selectedTab]?.[1]?.name)}
        </div>
        <div className="absolute text-xs kiosk:text-2xl left-[50%] mt-[30%] transform -translate-x-1/2 text-center">
          {truncateString(dataSource?.[selectedTab]?.[0]?.name)}
        </div>
        <div className="absolute text-xs kiosk:text-2xl left-[70%] mt-[36%] transform -translate-x-1/2 text-center">
          {truncateString(dataSource?.[selectedTab]?.[2]?.name)}
        </div> */}
        <div className="absolute min-h-[95vh] flex w-[85%] mx-[7.5%]">
          <div className="w-full flex flex-col ">
            <div className="w-full min-h-[calc(75vh)] max-h-[75vh] flex flex-col gap-2 justify-between bg-white rounded-[1em] border-[#F66000] border-[1px] p-3 kiosk:p-4 !z-40">
              <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
                <div className="text-center text-base kiosk:text-4xl kiosk:text-[38px] font-bold text-[#4D4D4D] my-2 kiosk:my-6">
                  ประวัติการรับรางวัล
                </div>
                {dataSource?.map((item: any, index: number) => (
                  <div
                    key={`dashboard-${index}`}
                    className="w-full border-[1px] rounded-md border-[#F66000] p-3 flex flex-col gap-3 justify-start items-center bg-orange-50"
                  >
                    <div className="grid grid-cols-2 w-full">
                      <div className="w-full text-left text-xs kiosk:text-3xl">
                        {dayjs(item.created_at).format('DD/MM/YYYY HH:mm:ss น.')}
                      </div>
                      <div className="w-[100%] text-right text-xs kiosk:text-3xl truncate">
                        ช่องทาง: {item.device_type == 'kiosk' ? 'งานหนังสือ' : 'line'}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <div className="w-[100%] text-left text-xs kiosk:text-3xl truncate">
                        ได้รับ: {item.reward_name}
                      </div>
                      <div className="w-[100%] text-xs row-span-2 flex justify-end items-center kiosk:text-3xl truncate">
                        {
                          item?.image ?
                            <img className="w-[50px] justify-self-end" src={item?.image} alt={item?.reward_name} />
                            :
                            <img className="w-[40px] justify-self-end" src={'./images/heart.svg'} alt={item?.reward_name} />
                        }
                      </div>
                      <div className="w-[90%] text-xs kiosk:text-3xl truncate bg-[#F66000] rounded-full text-center flex justify-center items-center">
                        <p className="text-white px-2 py-1">ได้รับ{item.type === "Premium" ? 'ของพรีเมียม' : 'Heart'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* {dataSource?.map((item: any, index: number) => (
                <div
                  key={`dashboard-${index}`}
                  className="w-full flex text-[#F66000] rounded-[1em] p-2 kiosk:p-3 kiosk:text-3xl"
                >
                  <div className="w-[10%] text-xs kiosk:text-3xl text-center">
                    {index + 1}
                  </div>
                  <div className="w-[50%] text-xs kiosk:text-3xl pl-4 pr-2 truncate">
                    {item.reward_name}
                  </div>
                  <div className="w-[40%] text-right text-xs kiosk:text-3xl">
                    {dayjs(item.created_at).format('DD/MM/YYYY HH:mm:ss')}
                  </div>
                </div>
              ))}
              {dataSource?.map((item: any, index: number) => (
                <div
                  key={`dashboard-${index}`}
                  className="w-full flex text-[#F66000] rounded-[1em] p-2 kiosk:p-3 kiosk:text-3xl"
                >
                  <div className="w-[10%] text-xs kiosk:text-3xl text-center">
                    {index + 1}
                  </div>
                  <div className="w-[50%] text-xs kiosk:text-3xl pl-4 pr-2 truncate">
                    {item.reward_name}
                  </div>
                  <div className="w-[40%] text-right text-xs kiosk:text-3xl">
                    {dayjs(item.created_at).format('DD/MM/YYYY HH:mm:ss')}
                  </div>
                </div>
              ))} */}
              <div className="flex justify-center mt-[1em] text-sm kiosk:text-3xl pb-5 bg-white z-10 sticky bottom-0 border-t-[0.5px] pt-2">
                <input
                  className="px-3 py-[1em] bg-[#F66000] active:bg-[#FF7733] w-[50%] text-sm text-white rounded-[1em] kiosk:text-3xl"
                  type="button"
                  value="กลับสู่หน้าหลัก"
                  onClick={() => router.push("/profile")}
                />
              </div>

            </div>
            {/* <div className="sticky bottom-0 w-[130%] min-h-[30vh] -mt-20 animate-slide">
              <Image src="/images/house-bg.webp" fill alt="house" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
