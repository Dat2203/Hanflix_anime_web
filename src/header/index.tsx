import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../components/Image";
import useMatchLocation from "../hooks/useMatchLocation";
import DesktopMenu from "./DesktopMenu";
import Search from "./Search";
import classNames from "classnames";

const Header = () => {
  const matchedRoute = useMatchLocation();
  const [isShrink, setIsShrink] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        setIsShrink(true);
      } else {
        setIsShrink(false);
      }
      return () => {
        window.removeEventListener("scroll", () => {});
      };
    });
  }, []);

  return (
    <div
      className={classNames(
        "fixed z-30  flex justify-center  items-center px-[200px] w-screen h-16 ",
        isShrink ? "bg-background-lighter" : "bg-inherit"
      )}
    >
      <div className="absolute left-0 p-in">
        <a href="/">
          <Image src="/logo.png" alt="logo" />
        </a>
      </div>
      <div className="md:hidden absolute right-0 p-in flex justify-center items-center"></div>
      <DesktopMenu matchedRoute={matchedRoute} />
      <div className="hidden md:block absolute right-0 p-in">
        <Search />
      </div>
    </div>
  );
};

export default Header;
