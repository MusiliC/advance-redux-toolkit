import { Link } from "react-router-dom";

import React from "react";

const Header = () => {
  return (
    <section className="bg-orange-300 py-7">
      <header className="w-5/6 mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-lg md:text-2xl font-bold">Redux Blog</h1>
        </div>
        <div>
          <nav className="flex gap-8 md:text-xl font-bold">
            <p>
              <Link to={"/"}>Home</Link>
            </p>
            <p>
              <Link to={"/post"}>Post</Link>
            </p>
          </nav>
        </div>
      </header>
    </section>
  );
};

export default Header;
