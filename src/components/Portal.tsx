import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  element: Element;
  children: ReactNode;
}

const Portal: React.FC<PortalProps> = ({ element, children }) => {
  return ReactDOM.createPortal(children, element);
};

export default Portal;
