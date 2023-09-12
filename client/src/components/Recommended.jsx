import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { AddBookToShelf, GetRandomBooks } from "@/pages/api/BookApi";
import toast from "react-hot-toast";

const Recommended = () => {
  const [bookData, setBookData] = useState([]); // state for books data which comes through api

  const fetchBooks = async () => {
    const res = await GetRandomBooks(); // get books api function
    if (res) {
      setBookData(res.data?.items); // setting the items.
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
  }, []);

  return (
    <div className="mt-20">
      <h1 className="text-[24px] mb-4">Recommended for you</h1>
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

export default Recommended;
