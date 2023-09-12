import Layout from "@/components/Layout/Layout"; // Importing the Layout component
import { AppProvider } from "@/context/GlobalContext"; // Importing the AppProvider from context
import "@/styles/globals.css"; // Importing global CSS styles
import { useRouter } from "next/router"; // Importing Next.js router
import React from "react"; // Importing React library
import { Toaster } from "react-hot-toast"; // Importing Toaster component from react-hot-toast
import { Tooltip } from "react-tooltip"; // Importing Tooltip component from react-tooltip

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // Define CustomLayout to be Layout if the current path does not include "/auth"
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
