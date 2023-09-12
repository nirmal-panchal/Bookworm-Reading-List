import axios from "axios";
import { getCookie } from "cookies-next";
import { Endpoints } from "./endpoints";

// function for getting the books by genre
export const GetBooksByGenre = (genre) => {
  return axios.get(
    process.env.NEXT_PUBLIC_BOOKS_API +
      `?q=subject:${genre}&key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
};

// function for recommended books
export const GetRandomBooks = () => {
  return axios.get(
    process.env.NEXT_PUBLIC_BOOKS_API +
      `?q=all&subject:fiction&key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
};

// function for getting books by search query
export const SearchBooks = (searchValue) => {
  return axios.get(
    process.env.NEXT_PUBLIC_BOOKS_API +
      `?q=${searchValue}&key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
};

// function for adding book into db
export const AddBookToShelf = (bookId) => {
  const token = getCookie("token");
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + Endpoints.POST_BOOK,
    { bookId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// function for fetching the shelf data from db
export const FetchShelf = () => {
  const token = getCookie("token");

  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + Endpoints.FETCH_SHELF, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// function for fetching all the books which is inside db
export const FetchFromShelf = (books) => {
  const axiosPromises = books?.map((book) =>
    axios.get(process.env.NEXT_PUBLIC_BOOKS_API + `/${book.bookId}`)
  );
  return Promise.all(axiosPromises);
};

// function for removing book from shelf. (from db)
export const RemoveFromShelf = (bookId) => {
  const token = getCookie("token");

  return axios.put(
    process.env.NEXT_PUBLIC_SERVER_URL + Endpoints.REMOVE_BOOK,
    { bookId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
