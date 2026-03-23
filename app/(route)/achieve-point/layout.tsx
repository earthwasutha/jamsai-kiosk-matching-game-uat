import React from "react";

type Props = { children: React.ReactNode };

function layout({ children }: Props) {
  return (
    <div className="w-full h-screen bg-center bg-cover pt-[15%] lg:pt-32 login-container bg-[#2F4B82]">
      {/* <img src="images/BG-Home1.png"/> */}
      {children}
    </div>
  );
}
export default layout;
