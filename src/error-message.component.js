import React from "react";
import { branch, renderComponent } from "recompose";

const ErrorMessage = () => <p>Whoops... we've an error</p>;
export const WithError = branch(
  ({ error }) => error,
  renderComponent(ErrorMessage)
);
export default ErrorMessage;
