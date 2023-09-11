import React from "react";

const Footer = () => {
  return (
    <>
      <div className="m-20 max-w-full w-[1440px] px-5 mx-auto">
        {/* ==== upper items ===== */}
        <div className="block md:flex items-center justify-between">
          <div className="flex flex-col items-center xl:items-start xl:flex-col gap-10">
            <div>
              <img src="/images/logo.png" alt="" />
            </div>
            <div>
              <ul className="flex flex-col justify-start md:flex-row gap-10 font-[400] text-[18px]">
                <li>About</li>
                <li>Features</li>
                <li>Pricing</li>
                <li>Gallery</li>
                <li>Team</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-10">
            <h1 className="font-[400] leading-5 text-[16px] max-w-[450px] w-full">
              Subscribe to stay tuned for new product and latest updates. Let's
              do it!
            </h1>
            <div className="flex">
              <input
                className="border-[#FFCE1A] border-2 outline-none bg-[#EAEAEA] max-w-[280px] w-full p-2 rounded-l-lg"
                placeholder="Enter your email address"
              />
              <button className="bg-[#FFCE1A] hover:border-[#FFCE1A] border-r-2 border-t-2 border-b-2 border-transparent p-2 rounded-r-lg px-10 hover:text-[#FFCE1A] hover:bg-white transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* ==== lower items ===== */}
      </div>
      <hr className="color-[#0D08421A]" />
      <div className="max-w-full w-[1440px] px-5 mx-auto mb-10 mt-5 flex justify-between items-center">
        <ul className="flex gap-11 text-[18px]">
          <li>Privacy Policy</li>
          <li>Terms of Use</li>
          <li>Sales and Refunds</li>
          <li>Legal</li>
        </ul>
        <ul className="flex gap-[50px] mr-6">
          <li>
            <img src="/images/insta.png" alt="" />
          </li>
          <li>
            <img src="/images/google.png" alt="" />
          </li>
          <li>
            <img src="/images/fb.png" alt="" />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
