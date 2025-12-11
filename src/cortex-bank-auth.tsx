import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import AuthPage from "./AuthPage";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: AuthPage,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
