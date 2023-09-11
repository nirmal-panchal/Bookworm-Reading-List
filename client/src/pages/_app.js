import Layout from "@/components/Layout/Layout";
import { AppProvider } from "@/context/GlobalContext";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const CustomLayout = router.pathname.includes("/auth")
    ? React.Fragment
    : Layout;
  return (
    <AppProvider>
      <Toaster position="top-center" />
      <CustomLayout>
        <Tooltip id="my-tooltip" />
        <Component {...pageProps} />
      </CustomLayout>
    </AppProvider>
  );
}
