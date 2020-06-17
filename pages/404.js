import React, { useEffect } from "react";
import { useRouter } from "next/router";
// pages/404.js
export default function Custom404() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);
  return null;
}
