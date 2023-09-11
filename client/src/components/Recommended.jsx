import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { GetRandomBooks } from "@/pages/api/BookApi";

const Recommended = () => {
  const [bookData, setBookData] = useState([]);

  const fetchBooks = async () => {
    const res = await GetRandomBooks();
    if (res) {
      setBookData(res.data?.items);
    }
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
              <BookCard bookData={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Recommended;
