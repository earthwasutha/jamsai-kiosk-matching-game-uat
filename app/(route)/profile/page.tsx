"use client";
import { useRouter } from "next/navigation";
import { useBoundStore } from "../../stores/useBoundStore";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { profile } = useBoundStore((state) => state);

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return null;
  };

  const name = profile.name;
  const jamsaiId = profile.jamsai_id;
  const mobile = formatPhoneNumber(profile.mobile);
  const email = profile.email;
  const points = profile.points;
  const hearts = profile.hearts;

  return (
    <div className="login-container min-h-screen flex flex-col w-full relative">
      <section className="flex flex-col text-center align-middle justify-center items-center mt-20 kiosk:mt-[14%] text-[#4D4D4D] gap-3 kiosk:p-5">
        <section className="w-[90%] kiosk:w-[85%] rounded-[32px] kiosk:rounded-[64px] bg-[#FFFFFF] relative pt-12 kiosk:pt-[15%] pb-4 kiosk:pb-8 px-5 kiosk:px-10 gap-4 flex flex-col shadow-lg">
          <section className="absolute top-[-40px] left-[calc(50%-45px)] kiosk:top-[-90px] kiosk:left-[calc(50%-90px)]">
            <div className="w-[80px] h-[80px] kiosk:w-[180px] kiosk:h-[180px]">
              {
                process.env.NEXT_PUBLIC_DEVICE === "line_oa" ?
                  profile.pictureUrl ?
                    <img className="rounded-full border-[#F66000] border-[2px] w-full h-full object-cover" src={profile.pictureUrl} alt="Avatar" />
                    :
                    <img className="rounded-full border-[#F66000] border-[2px] w-full h-full object-cover" src={'/images/Avatar-01.webp'} alt="Avatar" />
                  :
                  <img className="rounded-full border-[#F66000] border-[2px] w-full h-full object-cover" src={'/images/Avatar-01.webp'} alt="Avatar" />
              }
            </div>
          </section>
          <section className="flex flex-col text-center gap-[2px] kiosk:gap-2">
            <section className="text-xl kiosk:text-4xl font-medium">
              {name}
            </section>
            <section className="text-[10px] kiosk:text-2xl text-gray-400">
              {jamsaiId}
            </section>
          </section>
          <section className="flex flex-col text-left text-[16px] kiosk:text-3xl kiosk:mt-2 gap-2 kiosk:gap-4">
            <section className="truncate">เบอร์โทรศัพท์ : {mobile}</section>
            <section className="truncate">อีเมล : {email}</section>
          </section>
          <section className="bg-[#FFF9F8] w-full h-[102] border-[#F66000] border-[1px] rounded-[16px] kiosk:rounded-[32px] kiosk:mt-4 px-2 py-2 kiosk:py-4">
            <section className="flex flex-col gap-2">
              <section className="flex flex-row items-center align-middle justify-center gap-4 py-2">
                <section className="flex flex-col justify-center item-center gap-2 kiosk:gap-4 w-[50%]">
                  <section className="flex justify-center">
                    <div>
                      <svg
                        className="w-[29px] h-[28px] kiosk:w-[60px] kiosk:h-[60px]"
                        viewBox="0 0 29 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_2149_1237)">
                          <circle
                            cx="14.5"
                            cy="14"
                            r="13.5"
                            fill="#FCDD8A"
                            stroke="#F66000"
                          />
                          <g clipPath="url(#clip1_2149_1237)">
                            <path
                              d="M16.866 11.6985C16.1464 11.6985 15.6424 12.2613 15.6424 13.0705V17.4189C17.2664 17.2313 18.0924 16.5593 18.0924 14.1261V13.0705C18.0924 12.2641 17.5884 11.6985 16.8688 11.6985M11.42 16.7329C11.42 16.7329 11.4088 16.7329 11.4032 16.7329C11.2408 16.7385 11.0868 16.8029 10.9776 16.9121C10.4484 17.4413 10.7088 18.4185 11.1008 18.9197C11.8988 19.9389 13.0272 20.1265 13.7916 19.8633C14.5168 19.6141 14.9424 18.9841 14.976 18.1329C13.7776 18.1553 12.6296 17.7045 11.812 16.8869C11.7112 16.7861 11.574 16.7329 11.42 16.7329ZM13.1224 20.6361C12.1844 20.6361 11.2324 20.1657 10.5772 19.3285C9.95283 18.5305 9.74843 17.2033 10.5072 16.4445C10.7368 16.2149 11.056 16.0805 11.3836 16.0721C11.728 16.0637 12.0444 16.1869 12.2796 16.4193C13.2204 17.3601 14.388 17.4805 14.976 17.4693V13.0705C14.976 11.9113 15.788 11.0349 16.8632 11.0349C17.9384 11.0349 18.7504 11.9085 18.7504 13.0705V14.1261C18.7504 17.0521 17.5716 17.8781 15.6368 18.0853C15.6172 19.2473 15.0096 20.1433 14.0044 20.4877C13.7188 20.5857 13.422 20.6333 13.1224 20.6333"
                              fill="#F56000"
                            />
                            <path
                              d="M16.8968 7.94363C16.4208 7.94363 16.0316 8.33003 16.0316 8.80883C16.0316 9.28763 16.418 9.67403 16.8968 9.67403C17.3756 9.67403 17.762 9.28763 17.762 8.80883C17.762 8.33003 17.3756 7.94363 16.8968 7.94363ZM16.8968 10.3348C16.054 10.3348 15.3708 9.64883 15.3708 8.80883C15.3708 7.96883 16.0568 7.28003 16.8968 7.28003C17.7368 7.28003 18.4228 7.96603 18.4228 8.80603C18.4228 9.64603 17.7368 10.332 16.8968 10.332"
                              fill="#F56000"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_2149_1237">
                            <rect
                              width="28"
                              height="28"
                              fill="white"
                              transform="translate(0.5)"
                            />
                          </clipPath>
                          <clipPath id="clip1_2149_1237">
                            <rect
                              width="8.7332"
                              height="13.356"
                              fill="white"
                              transform="translate(10.02 7.28003)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </section>
                  <section className="flex flex-row justify-center gap-1 text-[16px] kiosk:text-3xl">
                    <div className="text-[#F66000]">{points}</div>
                    <div className=" font-normal">point</div>
                  </section>
                </section>
                <div className="h-[48px] border-[#4D4D4D] border-[1px]"></div>
                <section className="flex flex-col justify-center item-center gap-2 kiosk:gap-4 w-[50%]">
                  <section className="flex justify-center">
                    <svg
                      className="w-[29px] h-[28px] kiosk:w-[60px] kiosk:h-[60px]"
                      viewBox="0 0 29 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2149_1247)">
                        <circle
                          cx="14.5"
                          cy="14"
                          r="13.5"
                          fill="#FDC7EA"
                          stroke="#F66000"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.5954 10.3234C15.9134 8.00168 18.5443 8.00168 19.8623 9.16253C21.1803 10.3234 21.1803 12.64 19.8623 14.9617C18.9397 16.7004 16.5724 18.4392 14.5954 19.6C12.6184 18.4392 10.2511 16.7004 9.32852 14.9617C8.01053 12.64 8.01053 10.3234 9.32852 9.16253C10.6465 8.00168 13.2774 8.00168 14.5954 10.3234Z"
                          fill="#F66000"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2149_1247">
                          <rect
                            width="28"
                            height="28"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </section>
                  <section className="flex flex-row justify-center gap-1 text-[16px] kiosk:text-3xl">
                    <div className="text-[#F66000]">{hearts}</div>
                    <div className="  font-normal">heart</div>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
        <section className="bg-white w-[90%] kiosk:w-[85%] border-[#E2211C] border-[1px] rounded-[32px] kiosk:rounded-[64px] p-6 kiosk:p-8 flex flex-col shadow-lg mb-5 z-[1] kiosk:gap-2 kiosk:mt-4">
          <section className="text-2xl kiosk:text-5xl font-bold text-[#4D4D4D] kiosk:mb-3">
            Match & Win
          </section>
          <section className="flex flex-col text-center font-normal text-[#4D4D4D] text-base kiosk:text-2xl kiosk:mb-4">
            จับคู่ภาพลุ้นรางวัลกับแจ่มใส
          </section>
          <section className="flex flex-col text-center kiosk:gap-4 font-normal text-[#858585] text-base kiosk:text-3xl mb-3 kiosk:leading-8">
            <div>กิจกรรมพิเศษเฉพาะ Jamsai Member</div>
            <div>ร่วมสนุก และลุ้นรับรางวัลมากมาย</div>
          </section>
          <section className="flex flex-col gap-4">
            <input
              className="kiosk:mt-2 px-3 py-[1em] kiosk:text-3xl bg-[#F66000] active:bg-[#FF7733] w-full text-white rounded-[1em]"
              type="button"
              value="เล่นกิจกรรม"
              onClick={() => router.push("/readyToPlay")}
            />
            {
              process.env.NEXT_PUBLIC_DEVICE === "line_oa" && //kiosk
              // <input
              //   className="kiosk:mt-2 px-3 py-[1em] kiosk:text-3xl text-[#F66000] active:text-[#FF7733] w-full bg-white border-solid border-2 border-[#F66000] active:border-[#FF7733] rounded-[1em]"
              //   type="button"
              //   value="ตารางคะแนน"
              //   onClick={() => router.push("/dashboard")}
              // />
              // :
              <input
                className="kiosk:mt-2 px-3 py-[1em] kiosk:text-3xl text-[#F66000] active:text-[#FF7733] w-full bg-white border-solid border-2 border-[#F66000] active:border-[#FF7733] rounded-[1em]"
                type="button"
                value="ประวัติรางวัล"
                onClick={() => router.push("/history")}
              />
            }

          </section>
        </section>
      </section>
      {/* <div className="absolute bottom-0 left-0 w-[130%] h-[30vh] animate-slide">
        <Image src="/images/house-bg.webp" fill alt="house" />
      </div> */}
    </div>
  );
}
