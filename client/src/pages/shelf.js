import React, { useEffect, useState } from "react";
import { FetchFromShelf, FetchShelf, RemoveFromShelf } from "./api/BookApi";
import { TiDelete } from "react-icons/ti";
import { ScaleLoader } from "react-spinners";
import toast from "react-hot-toast";

const Shelf = () => {
  // states for handing the component
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);

  // function for removing book from shelf
  const removeFromShelf = async (bookId) => {
    toast.promise(RemoveFromShelf(bookId), {
      loading: "loading",
      success: (res) => {
        setBookData((prevData) =>
          prevData.filter((book) => book?.data?.id !== bookId)
        );
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

  // function for fetching the shelf
  const fetchShelf = async () => {
    setLoading(true);
    const res = await FetchShelf();
    if (res?.data?.data) {
      const getBooks = await FetchFromShelf(res?.data?.data?.shelf);
      setBookData(getBooks);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchShelf();
  }, []);

  return (
    <>
      <div className="max-w-full w-[1440px] px-5 mx-auto">
        <h1 className="text-[24px] my-10 mb-5">Your Bookshelf</h1>
        {loading ? (
          <div className="flex items-center justify-center h-[calc(100vh-585px)]">
            <ScaleLoader color="#FFCE1A" />
          </div>
        ) : bookData?.length === 0 ? (
          <div className="flex items-center justify-center h-[calc(100vh-585px)]">
            You have nothing in your shelf
          </div>
        ) : (
          <ul>
            {bookData?.map((book, index) => {
              return (
                <li
                  key={index}
                  className="flex gap-4 rounded-lg p-4 hover:shadow-2xl transition-all duration-300 m-2"
                >
                  <div className="">
                    <img
                      className="min-h-[240px] h-[250px] w-[200px] min-w-[190px] shadow-lg rounded-lg"
                      src={book?.data?.volumeInfo?.imageLinks?.thumbnail}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col p-2 justify-between w-auto">
                    <div>
                      <h1 className="font-[400] text-[16px] text-[#0D0842] leading-5 mb-3">
                        {book?.data?.volumeInfo?.title}
                      </h1>
                      <p className="font-[400] text-[14px] text-[#0D0842] leading-5 text-opacity-[50%]">
                        {book?.data?.volumeInfo?.description?.slice(1, 50)}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          removeFromShelf(book?.data?.id);
                        }}
                        type="submit"
                        className="bg-red-600 flex gap-2 items-center justify-around w-auto transition-all duration-300 shadow-md text-white
   py-2 px-4 rounded-lg hover:border-red-600 border-2 border-transparent hover:text-red-600 hover:bg-white focus:outline-none focus:border-[#FFCE1A]"
                      >
                        <TiDelete size={20} />
                        <span className="hidden xl:block lg:block md:block sm:block">
                          Remove From Shelf
                        </span>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Shelf;
