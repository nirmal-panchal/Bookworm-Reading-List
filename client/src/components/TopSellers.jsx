import { AddBookToShelf, GetBooksByGenre } from "@/pages/api/BookApi";
import React, { useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import BookCard from "./BookCard";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import toast from "react-hot-toast";

const TopSellers = () => {
  // states for managing the component
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("fiction");
  const [bookData, setBookData] = useState([]);

  // function for fetching the books by categories
  const fetchBooks = async () => {
    const res = await GetBooksByGenre(dropdownValue); // api function
    if (res) {
      setBookData(res.data?.items);
    }
  };

  // function for adding book to shelf
  const AddToShelf = async (bookId) => {
    toast.promise(AddBookToShelf(bookId), {
      loading: "loading",
      success: (res) => {
        return (
          <>
            <b>{res.data.message}</b>
          </>
        );
      },
      error: (err) =>
        err.response ? (
          <b>{err.response.data.message}</b>
        ) : (
          <b>{err.message}</b>
        ),
    });
  };

  useEffect(() => {
    fetchBooks();
  }, [dropdownValue]);

  return (
    <div className="mt-20">
      <h1 className="text-[24px] mb-4">Top Sellers</h1>
      <div
        className={`w-[180px] cursor-pointer p-2 bg-[#eaeaea] flex items-center justify-around float rounded-lg ${
          isHovered ? "rotate-icon" : ""
        }`}
        onClick={() => setIsHovered(!isHovered)}
      >
        <h2 className="text-gray-500">
          {dropdownValue === "" ? "Choose a Genre" : dropdownValue}
        </h2>
        <RiArrowDownSLine
          className={`transform transition-transform duration-300 ${
            isHovered ? "rotate-180" : ""
          }`}
        />
      </div>
      {isHovered && (
        <div className="w-[180px] rounded-lg bg-[#eaeaea] h-max absolute z-30 shadow-xl">
          <ul>
            <li
              onClick={() => {
                setDropdownValue("Romance");
                setIsHovered(!isHovered);
              }}
              className="dropdown__value rounded-t-lg"
            >
              Romance
            </li>
            <li
              onClick={() => {
                setDropdownValue("Fiction");
                setIsHovered(!isHovered);
              }}
              className="dropdown__value"
            >
              Fiction
            </li>
            <li
              onClick={() => {
                setDropdownValue("Mystery");
                setIsHovered(!isHovered);
              }}
              className="dropdown__value"
            >
              Mystery
            </li>
            <li
              onClick={() => {
                setDropdownValue("Horror");
                setIsHovered(!isHovered);
              }}
              className="dropdown__value rounded-b-lg !border-none"
            >
              Horror
            </li>
          </ul>
        </div>
      )}

      <div className="mt-6">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {bookData?.map((item, index) => (
            <SwiperSlide key={index}>
              <BookCard bookData={item} AddToShelf={AddToShelf} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopSellers;
