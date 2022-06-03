import React, { ReactNode } from "react";
import classNames from "classnames";

interface SectionProps {
  title: string;
  className: string;
  children: ReactNode;
}

const Section1 = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ title, className, children }, ref) => {
    return (
      <div ref={ref} className={classNames("px-4 md:px-12", className)}>
        {title && (
          <h1 className="uppercase text-2xl font-semibold mb-4">{title}</h1>
        )}

        {children}
      </div>
    );
  }
);
