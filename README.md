
# Bookworm Reading List

Bookworm Reading List is a web application that allows users to search for books using the Google Books API and create a personal reading list. This project is built using Next.js for the frontend, Node.js for the backend, and MongoDB for storing the book data.


## Features

Search for Books : 
- Users can search for books using the Google Books API by entering keywords, authors, or book titles.

Add Books to Reading List: 
- Users can add books they are interested in to their personal reading list.

View Reading List: 
- Users can view their reading list, which displays the books they have added.

Remove Books: 
- Users can remove books from their reading list.

User Authentication and Authorization:    
- JWT-based authentication ensures only logged-in users can access protected routes.
- Users are authorized to perform operations only on their own Book Shelf.

Password Hashing:
- User passwords are securely hashed using industry-standard techniques.
- This ensures the safety of user credentials.

Token-Based Security:
- JSON Web Tokens (JWT) are used to secure API endpoints.
- Tokens expire after a defined period, enhancing security

Error Handling:
- Robust error handling ensures a smooth user experience even in unexpected scenarios.
- Clear and informative error messages for ease of debugging.
## Tech Stack

**Frontend :** Next.js, TailwindCSS

**Database :** MongoDB

**Server :** Node.js, Express

**External API :** Google Books API



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

## client .env

`NEXT_PUBLIC_SERVER_URL` : server url for mongodb server

`NEXT_PUBLIC_BOOKS_API` : google books api url

`NEXT_PUBLIC_API_KEY` : Your api key for google books

## server .env

`PORT`

`DB_URL`

`JWT_SECRET`


## Feedback

If you encounter any issues or have suggestions for improvements, please open an issue on this repository. We appreciate your feedback!

# Happy coding!
