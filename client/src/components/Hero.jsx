import React from "react";

const Hero = () => {
  return (
    <div className="mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
      {/* ==== left part ===== */}
      <div className="max-w-[500px] flex flex-col gap-[25px]">
        <h1 className="text-[40px] font-[500]">New Releases This Week</h1>
        <p className="text-[16px] leading-5 font-light max-w-[450px] text-justify">
          It's time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week's new releases offer something for
          everyone
        </p>
        <button
          type="submit"
          className="bg-[#FFCE1A] flex items-center justify-around max-w-[170px] transition-all duration-300 shadow-md text-white 
            py-2 px-4 rounded-lg hover:border-[#FFCE1A] border-2 border-transparent hover:text-[#FFCE1A] hover:bg-white focus:outline-none focus:border-[#FFCE1A]"
        >
          Subscribe
        </button>
      </div>
      {/* ==== right part ===== */}
      <div className="hidden md:flex relative items-center -mr-8 justify-center">
        <img
          src="/images/book3.png"
          className="relative -right-52 mt-8 mb-5 cursor-pointer shadow-xl hover:-right-64 transition-all duration-300"
          alt=""
        />
        <img
          src="/images/book2.png"
          className="relative -left-36 mt-4 cursor-pointer shadow-xl hover:-left-16 transition-all duration-300 "
          alt=""
        />
        <img
          src="/images/book1.png"
          className="absolute cursor-pointer shadow-xl -left-16 hover:scale-95 transition-all duration-300 mt-4"
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
