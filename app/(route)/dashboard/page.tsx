"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboard } from "@/app/services/bookFairService";
import { useBoundStore } from "@/app/stores/useBoundStore";
import { CountdownTimer } from "@/app/components/CountdownTimer";
import { timeFormat, truncateString } from "@/app/utils/utils";

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
      const response = await getDashboard(profile?.jamsai_id);

      if (!response?.isSuccess) {
        return;
      }

      setDataSource(response.data);
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
      <div className="flex justify-center mt-[2em] kiosk:text-3xl">
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
      </div>
      <div className="flex flex-col justify-center mt-[1em] text-lg kiosk:text-3xl kiosk:gap-3 text-[#4D4D4D]">
        <div className="text-center">ศึกนี้เราจะแพ้ไม่ได้</div>
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
        </div>
      </div>
      <div className="relative mt-[1em]">
        <img
          src="/images/db-bg-2.png"
          alt="logo"
          className="absolute w-[100%]"
        />
        <img
          src="/images/ranking.svg"
          alt="logo"
          className="absolute w-[60%] left-[20%] mt-[10%]"
        />
        <div className="absolute text-xs kiosk:text-2xl left-[30%] mt-[36%] transform -translate-x-1/2 text-center">
          {truncateString(dataSource?.[selectedTab]?.[1]?.name)}
        </div>
        <div className="absolute text-xs kiosk:text-2xl left-[50%] mt-[30%] transform -translate-x-1/2 text-center">
          {truncateString(dataSource?.[selectedTab]?.[0]?.name)}
        </div>
        <div className="absolute text-xs kiosk:text-2xl left-[70%] mt-[36%] transform -translate-x-1/2 text-center">
          {truncateString(dataSource?.[selectedTab]?.[2]?.name)}
        </div>
        {((selectedTab === "daily" && dataSource?.me_daily?.position) ||
          (selectedTab === "all" && dataSource?.me_all?.position)) && (
          <div className="absolute mt-[58%] kiosk:mt-[58%] kiosk:text-3xl flex w-[85%] bg-[#F9D7C7] rounded-[1em] border-black border-[1px] p-3 kiosk:p-6 mx-[7.5%]">
            <div className="w-[15%]">
              <div className="text-white bg-[#F66000] rounded-[0.5em] text-center">
                #
                {selectedTab === "daily"
                  ? dataSource?.me_daily?.position
                  : dataSource?.me_all?.position}
              </div>
            </div>
            <div className="w-[42.5%] pl-4 text-[#4D4D4D] font-bold">
              {selectedTab === "daily"
                ? dataSource?.me_daily?.name
                : dataSource?.me_all?.name}
            </div>
            <div className="w-[42.5%] text-right pr-[2em] text-[#4D4D4D] font-bold">
              {selectedTab === "daily"
                ? timeFormat(dataSource?.me_daily?.time)
                : timeFormat(dataSource?.me_all?.time)}
            </div>
          </div>
        )}
        <div className="absolute mt-[72%] flex w-[85%] mx-[7.5%] ">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col bg-white rounded-[1em] border-[#F66000] border-[1px] p-3 kiosk:p-4">
              <div className="text-center text-xl kiosk:text-4xl kiosk:text-[38px] font-bold text-[#4D4D4D] my-2 kiosk:my-6">
                อันดับประจำวัน
              </div>
              <div className="w-full flex text-white rounded-[1em] p-2 kiosk:p-3 bg-[#F66000]">
                <div className="w-[15%] text-lg kiosk:text-3xl text-center">
                  No
                </div>
                <div className="w-[60%] text-lg kiosk:text-3xl pl-4 ">
                  Email
                </div>
                <div className="w-[25%] text-lg kiosk:text-3xl text-left">
                  Score
                </div>
              </div>
              {dataSource?.[selectedTab].map((item: any, index: number) => (
                <div
                  key={`dashboard-${index}`}
                  className="w-full flex text-[#F66000] rounded-[1em] p-2 kiosk:p-3 kiosk:text-3xl"
                >
                  <div className="w-[15%] text-lg kiosk:text-3xl text-center ">
                    {item?.position}
                  </div>
                  <div className="w-[60%] text-lg kiosk:text-3xl pl-4 pr-2 truncate">
                    {item.name}
                  </div>
                  <div className="w-[25%] text-lg kiosk:text-3xl text-left">
                    {timeFormat(item.time)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-[1em] text-lg kiosk:text-3xl pb-5">
              <input
                className="px-3 py-[1em] bg-[#F66000] active:bg-[#FF7733] w-[60%] text-white rounded-[1em] kiosk:text-3xl"
                type="button"
                value="กลับสู่หน้าหลัก"
                onClick={() => router.push("/profile")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
