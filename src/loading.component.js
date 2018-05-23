import React from "react";
import { branch, renderComponent } from "recompose";

const Loading = () => <p>Loading...</p>;
export const WithLoading = branch(
  ({ loading }) => loading,
  renderComponent(Loading)
);
export default Loading;
