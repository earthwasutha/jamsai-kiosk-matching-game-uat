import React from "react";

type Props = { children: React.ReactNode };

function layout({ children }: Props) {
  return (
    <div className="login-container w-full h-screen bg-center bg-cover lg:pt-24 px-5">
      {children}
    </div>
  );
}
export default layout;
