import { To } from "history";
import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../interface";
import classNames from "classnames";

interface ButtonProps {
  active?: boolean;
  text: string;
  startIcon?: React.ComponentType<Icon>;
  endIcon?: React.ComponentType<Icon>;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const {
    active,
    text,
    startIcon: StartIcon,
    endIcon: EndIcon,
    className,
  } = props;

  return (
    <div
      className={`${className} ${active ? "border-secondary border-b-2" : ""}`}
    >
      {StartIcon && <StartIcon size={14} className="text-white" />}
      <p
        className={classNames(
          "tracking-wide font-medium hover:text-secondary duration-300 transition",
          StartIcon && "ml-2",
          EndIcon && "mr-2",
          active ? "text-white text-base" : "text-sm text-gray-300"
        )}
      >
        {text}
      </p>
    </div>
  );
};
type NavButtonProps = {
  redirect?: boolean;
  to?: string | undefined;
} & ButtonProps;
const NavButton = (props: NavButtonProps) => {
  const {
    active,
    text,
    startIcon,
    endIcon,
    className,
    redirect = true,
    to,
  } = props;

  return redirect ? (
    <a href={to!}>
      <Button
        active={active}
        text={text}
        startIcon={startIcon}
        endIcon={endIcon}
        className={className}
      />
    </a>
  ) : (
    <Button
      active={active}
      text={text}
      startIcon={startIcon}
      endIcon={endIcon}
      className={classNames("cursor-pointer", className)}
    />
  );
};

export default NavButton;
