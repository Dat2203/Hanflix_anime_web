import classNames from "classnames";
import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Anime } from "../interface";
import Image from "./Image";

interface AnimeCardProps extends Anime {
  className?: string;
}

const AnimeCard = (props: AnimeCardProps) => {
  return (
    <a href={`/info/${props.slug}`}>
      <div
        className={classNames(
          "relative w-full shadow-lg group ",
          props.className
        )}
      >
        <Image
          src={props.thumbnail}
          alt={props.name}
          className={classNames(
            "h-44  group-hover:scale-75 ease-in duration-300 object-cover rounded-md rounded-b-none "
          )}
        />

        <div className=" absolute inset-0 invisible group-hover:visible bg-black bg-opacity-60 flex items-center justify-center">
          <AiFillPlayCircle size={50} className="text-white" />
        </div>
      </div>
      <div
        className={classNames(
          "bg-background-darker p-3 w-full space-y-2 rounded-b-md min-h-4"
        )}
      >
        <p className="uppercase cut-text text-white font-medium text-sm line-clamp-2">
          {props.name}
        </p>
      </div>
    </a>
  );
};

export default AnimeCard;
