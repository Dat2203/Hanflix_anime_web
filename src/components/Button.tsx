import classNames from "classnames";
import { To } from "history";
import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../interface";

interface ButtonRawProps extends React.HTMLAttributes<HTMLButtonElement> {
  startIcon?: React.ComponentType<Icon>;
  endIcon?: React.ComponentType<Icon>;
  iconSize?: number;
  iconClassName?: string;
}

export interface ButtonProps extends ButtonRawProps {
  onClick?: () => void;
  to?: To;
}

const ButtonRaw = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      iconSize = 20,
      iconClassName,
      startIcon: StartIcon,
      endIcon: EndIcon,

      ...buttonProps
    } = props;

    return (
      <button
        className={classNames(
          "flex items-center px-4 py-2 rounded-md font-medium text-xs md:text-sm lg:text-base hover:bg-opacity-80",
          className
        )}
        ref={ref}
        {...buttonProps}
      >
        {StartIcon && (
          <StartIcon
            size={iconSize}
            className={classNames("mr-2", iconClassName)}
          />
        )}
        {props.children}

        {EndIcon && (
          <EndIcon
            size={iconSize}
            className={classNames("ml-2", iconClassName)}
          />
        )}
      </button>
    );
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { onClick, to, ...buttonProps } = props;

    return to ? (
      <Link to={to}>
        <ButtonRaw ref={ref} {...buttonProps} />
      </Link>
    ) : (
      <ButtonRaw ref={ref} {...buttonProps} onClick={onClick} />
    );
  }
);

export default Button;
