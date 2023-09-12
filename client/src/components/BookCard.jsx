import React from "react";
import { HiOutlineHeart } from "react-icons/hi";

// component for each book. 
const BookCard = ({ bookData, AddToShelf }) => {
  return (
    <div className="flex gap-4 rounded-lg p-4 hover:shadow-2xl transition-all duration-300 m-2">
      {/* ===== img ===== */}
      <div className="">
        <img
          className="min-h-[240px] h-[250px] w-[200px] min-w-[190px] shadow-lg rounded-lg"
          src={bookData?.volumeInfo?.imageLinks?.thumbnail}
          alt=""
        />
      </div>
      {/* ===== text ===== */}
      <div className="flex flex-col justify-between max-w-[220px]">
        <div>
          <h1 className="font-[400] text-[16px] text-[#0D0842] leading-5 mb-3">
            {bookData?.volumeInfo?.title}
          </h1>
          <p className="font-[400] text-[14px] text-[#0D0842] leading-5 text-opacity-[50%]">
            {bookData?.volumeInfo?.description?.slice(1, 50)}
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              AddToShelf(bookData.id);
            }}
            type="submit"
            className="bg-[#FFCE1A] flex items-center justify-around w-[100px] transition-all duration-300 shadow-md text-white 
            py-2 px-4 rounded-lg hover:border-[#FFCE1A] border-2 border-transparent hover:text-[#FFCE1A] hover:bg-white focus:outline-none focus:border-[#FFCE1A]"
          >
            <HiOutlineHeart size={20} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
