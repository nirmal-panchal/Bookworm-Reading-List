import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import toast from "react-hot-toast";
import { BsSearch } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import { HiOutlineHeart } from "react-icons/hi";
import { AddBookToShelf, SearchBooks } from "@/pages/api/BookApi";

const Header = () => {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  const { token, Logout } = useGlobalContext();

  useEffect(() => {
    window &&
      window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
          setActive(true);
        } else {
          setActive(false);
        }
      });
  }, []);

  const router = useRouter();

  const handleLogin = () => {
    if (token) {
      Logout();
      router.push("/").then(() => {
        router.reload();
      });
    } else {
      router.push("/auth/login");
    }
  };
  const handleShelf = () => {
    if (router.pathname === "/shelf") {
      router.push("/");
    } else if (token) {
      router.push("/shelf");
    } else {
      toast.error("You need to login first..", {
        style: {
          fontWeight: "bold",
        },
      });
    }
  };

  const searchBooks = async () => {
    const res = await SearchBooks(search);
    if (res) {
      const arr = res?.data?.items.slice(0, 3);
      setBookData(arr);
    }
  };

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
  const handleSearch = (e) => setSearch(e?.target?.value);

  const debounceOnChange = debounce(handleSearch, 500);

  useEffect(() => {
    if (search !== "") searchBooks();
  }, [search]);

  return (
    <header
      className={
        active === true
          ? "shadow-md transition-all duration-300 fixed top-0 left-0 z-20 bg-white w-full"
          : null
      }
    >
      <div className="max-w-full w-[1440px] px-5 mx-auto flex items-center justify-between py-4">
        {/* ==== left part ==== */}
        <div className="relative mr-3">
          <input
            onChange={debounceOnChange}
            type="text"
            className="bg-[#EAEAEA] w-full lg:w-72 h-10 rounded-lg p-4 pl-10 outline-none"
            placeholder="what are you looking for?"
          />
          <BsSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
        {search && (
          <div className="absolute mt-[415px] bg-[#eaeaea] w-auto h-auto rounded-lg">
            {bookData?.map((book, index) => (
              <div
                key={index}
                className={` hover:bg-[#d0d3d7] transition-all duration-300 flex gap-4 border-[#d0d3d7] rounded-lg ${
                  index < 2 && "border-b-[1px]"
                }`}
              >
                <div>
                  <img
                    className="h-[120px] w-[120px]"
                    src={book?.volumeInfo?.imageLinks?.thumbnail}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <h1>{book?.volumeInfo?.title}</h1>
                  <button
                    onClick={() => {
                      AddToShelf(book.id);
                    }}
                    type="submit"
                    className="bg-[#FFCE1A] flex items-center justify-around w-[100px] transition-all duration-300 shadow-md text-white 
            py-2 px-4 mb-2 rounded-lg hover:border-[#FFCE1A] border-2 border-transparent hover:text-[#FFCE1A] hover:bg-white focus:outline-none focus:border-[#FFCE1A]"
                  >
                    <HiOutlineHeart size={20} />
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* ==== right part ==== */}
        <div className="flex justify-around gap-4">
          <button
            onClick={handleLogin}
            className={`${
              (router.route === "/auth/login" ||
                router.route === "/auth/register") &&
              "hidden"
            } bg-[#FFCE1A] p-2 w-full lg:w-[150px] md:w-[150px] text-white
           rounded-lg shadow-md hover:border-[#FFCE1A] border-2 border-transparent hover:text-[#FFCE1A] hover:bg-white transition-all duration-300`}
          >
            {token ? "Logout" : " Login"}
          </button>
          <button
            onClick={handleShelf}
            className="bg-[#FFCE1A] p-2 w-full hidden lg:block lg:w-[150px] md:w-[150px] text-white
           rounded-lg shadow-md hover:border-[#FFCE1A] border-2 border-transparent hover:text-[#FFCE1A] hover:bg-white transition-all duration-300"
          >
            {router.pathname === "/shelf" ? "Home" : "Reading List"}
          </button>
          <ImBooks
            data-tooltip-id="my-tooltip"
            data-tooltip-content="reading list"
            className="lg:hidden sm:block self-center cursor-pointer"
            color="#FFCE1A"
            size={45}
            onClick={handleShelf}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
