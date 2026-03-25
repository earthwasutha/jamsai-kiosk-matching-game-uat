"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import liff from "@line/liff";
import Lottie from "react-lottie";
import Image from "next/image";
import animationData from "@/app/lottie/logo.json";
import { useBoundStore } from "@/app/stores/useBoundStore";
import { checkLogin, login } from "@/app/services/bookFairService";
import { LoginErrorModal } from "@/app/components/modals/LoginErrorModal";
import { ConfirmEmailModal } from "@/app/components/modals/ConfirmEmailModal";
import { Loading } from "./components/Loading";

interface confirmEmailData {
  email: string;
  code: string;
}

export default function Home() {
  const router = useRouter();
  const [jamsaiId, setJamsaiId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isOpenLoginErrorModal, setIsOpenLoginErrorModal] =
    useState<boolean>(false);
  const [isOpenConfrimEmailModal, setIsOpenConfrimEmailModal] =
    useState<boolean>(false);
  const [confirmEmailData, setConfirmEmailData] =
    useState<confirmEmailData | null>(null);
  const {
    accessToken,
    setProfile,
    setIsLoading,
    setAccessToken,
    setIsAuthentication,
  } = useBoundStore((state) => state);

  useEffect(() => {
    if (accessToken) {
      handleCheckProfile();
    }
  }, [accessToken]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEVICE !== "line_oa") return;
    handleInitLiff();
  }, []);

  const handleInitLiff = async () => {
    try {
      setIsLoading(true);
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID ?? "" });

      if (!liff.isLoggedIn()) {
        liff.login();
      }

      liff.ready.then(async () => {
        const accessToken = await liff.getAccessToken();
        setAccessToken(accessToken);
        setIsAuthentication(true);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckProfile = async () => {
    try {
      setIsLoading(true);
      const { isSuccess, result } = await checkLogin(accessToken);

      if (!isSuccess) {
        return;
      }
      const profile = (await liff.getProfile());
      // console.log('profileLine', profile)
      const userInfo = {
        ...result,
        name: result.firstname + " " + result.lastname,
        ...profile
      };
      setProfile(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      router.push("/profile");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      if (!jamsaiId) {
        setErrorMessage("กรุณาระบุ Jamsai member");
        return;
      }

      setIsLoading(true);

      const { isSuccess, result } = await login(jamsaiId, accessToken);
      if (!isSuccess) {
        setIsOpenLoginErrorModal(true);
        return;
      } else {
        if (process.env.NEXT_PUBLIC_DEVICE === "line_oa") {
          setIsOpenConfrimEmailModal(true);
          setConfirmEmailData({
            email: result.email,
            code: result.code,
          });
        } else {
          const userInfo = {
            ...result,
            name: result.firstname + " " + result.lastname,
          };
          setProfile(userInfo);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          router.push("/profile");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultOptions = {
    autoplay: true,
    loop: true,
    animationData: animationData,
  };

  return (
    <>
      <LoginErrorModal
        isOpen={isOpenLoginErrorModal}
        setIsOpen={setIsOpenLoginErrorModal}
      />
      <ConfirmEmailModal
        email={confirmEmailData?.email ?? ""}
        code={confirmEmailData?.code ?? ""}
        isOpen={isOpenConfrimEmailModal}
        setIsOpen={setIsOpenConfrimEmailModal}
      />
      <Loading>
        <div className="relative">
          <div className="login-container min-h-screen flex flex-col kiosk:text-3xl">
            <div className="flex justify-center mt-[15%]">
              <div className="w-[40%] min-h-[240px] kiosk:min-h-[350px]">
                {/* <Lottie width={"100%"} options={defaultOptions} /> */}
                <img src="/images/logo.webp" className="mt-10 w-full animate-scaleUpWin" />
              </div>
            </div>
            <div className="flex flex-col justify-center text-lg text-[#fff] text-center kiosk:text-3xl kiosk:mt-10">
              <div className="">เข้าสู่ระบบเพื่อร่วมสนุก</div>
              <div className="kiosk:mt-2">
                ลุ้นรางวัลกับ
                <span className="text-[#fff] font-bold px-1 ">
                  Jamsai in Wonderland
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center mt-[1em] kiosk:mt-[5%] text-[#fff] z-10">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-items-center"
              >
                <div className="flex justify-center text-base/6">
                  <div className="flex flex-col justify-center w-[80%]">
                    <label className="text-[#fff] kiosk:text-2xl">
                      Jamsai member
                    </label>
                    <input
                      className={`px-[1.5em] mt-2 text-[#4D4D4D] kiosk:mt-6 kiosk:text-2xl py-[1em] rounded-[1em] placeholder-[#CBCBCB] border-solid border-2 border-[#858585] ${errorMessage ? " border-red-600 " : ""
                        }`}
                      type="number"
                      placeholder="Enter your Jamsai member"
                      value={jamsaiId}
                      onChange={(e) =>
                        setJamsaiId(e.target.value.replace(/\D/g, ""))
                      }
                    />
                    <div className="text-red-600 mt-2">{errorMessage}</div>
                  </div>
                </div>
                <div className="flex justify-center mt-[5%] text-lg">
                  <input
                    className="px-3 py-[1em] bg-[#F66000] active:bg-[#FF7733] w-[50%] text-white rounded-[1em] kiosk:text-3xl"
                    type="submit"
                    value="เข้าสู่ระบบ"
                  />
                </div>
              </form>
            </div>

          </div>
          {/* <div className="absolute bottom-0 left-0 w-[130%] h-[30vh] animate-slide z-[1]">
            <Image src="/images/house-bg.webp" fill alt="house" />
          </div> */}
        </div>
      </Loading>
    </>
  );
}
