import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Login from "./pages/Login";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Login,
  errorBoundary(_err, _info, _props) {
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
