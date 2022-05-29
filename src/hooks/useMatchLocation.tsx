import React from "react";
import { matchRoutes, useLocation } from "react-router";
import routes from "../router";

const routeObj = routes.map(({ component: Component, path }) => ({
  caseSensitive: false,
  element: <Component />,
  path,
}));

const useMatchLocation = () => {
  const location = useLocation();

  const matchedRoute = matchRoutes(routeObj, location)?.[0];

  console.log(matchedRoute);

  return matchedRoute;
};

export default useMatchLocation;
