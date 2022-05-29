import React from "react";
import classNames from "classnames";

interface TextIconProps {
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  icon: React.ComponentType<{ className?: string; size: number }>;
  text: string;
  iconSize?: number;
}

const TextIcon = (props: TextIconProps) => {
  const {
    className,
    textClassName,
    icon: Iconic,
    iconSize = 16,
    iconClassName,
    text,
  } = props;

  return (
    <div className={classNames("flex items-center", className)}>
      <Iconic size={iconSize} className={iconClassName} />
      <p className={classNames("line-clamp-1", textClassName)}>{text}</p>
    </div>
  );
};

export default TextIcon;
