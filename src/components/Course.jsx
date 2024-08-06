import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Cookies from "js-cookie";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import dotenv from "dotenv"
import { Backend_URL } from "../../url";
function Course() {
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${Backend_URL}/book`, { withCredentials: true });

        if (res.status === 401) {
          navigate("/login");
          return;
        }
        setBook(res.data.book);
        setUsername(res.data.fullname);
      } catch (error) {
        console.log(error);
        navigate("/signup");
      }
    };
    getBook();
  }, [navigate]);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-28 items-center justify-center text-center">
        <h1 className="text-2xl md:text-4xl">
          We welcome you <span className="text-4xl md:text-4xl">{username}</span> have a good experience{" "}
          <span className="text-pink-500">Here! :)</span>
        </h1>
        <p className="mt-12">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
          assumenda? Repellendus, iste corrupti? Tempore laudantium
          repellendus accusamus accusantium sed architecto odio, nisi expedita
          quas quidem nesciunt debitis dolore non aspernatur praesentium
          assumenda sint quibusdam, perspiciatis, explicabo sequi fugiat amet
          animi eos aut. Nobis quisquam reiciendis sunt quis sed magnam
          consequatur!
        </p>
        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
            Back
          </button>
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
        {book.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Course;
