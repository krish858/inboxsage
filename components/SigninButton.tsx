"use client";
import React from "react";
import { signIn } from "next-auth/react";

function SigninButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <button
      className={className}
      onClick={() => {
        signIn("google", {
          callbackUrl: "/dashboard",
        });
      }}
    >
      {children}
    </button>
  );
}

export default SigninButton;
