"use client";
import React, { useEffect } from "react";
import { Loading } from "../components/Loading";
import { useRouter, usePathname } from "next/navigation";
import { useBoundStore } from "@/app/stores/useBoundStore";

type Props = { children: React.ReactNode };

function layout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { setProfile } = useBoundStore((state) => state);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      setProfile(JSON.parse(localStorage.getItem("userInfo") ?? ""));
    } else if (pathname !== "/" && !localStorage.getItem("userInfo")) {
      router.push("/");
    }
  }, []);

  return (
    <Loading>
      <div className="h-svh flex flex-col gap-2 items-center z-[-100]">
        {children}
      </div>
    </Loading>
  );
}
export default layout;
