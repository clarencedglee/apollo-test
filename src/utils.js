import React from "react";
import { ApolloProvider, Query, Mutation } from "react-apollo";

export const unwrapGqlResults = (name, result, index) => {
  let out = result.data || {};
  out = out[name] || [];
  if (typeof index === "number") {
    return out[index] || {};
  }
  return out;
};

export const QueryProvider = query => ({ render }) => (
  <Query query={query}>{query => render(query)}</Query>
);

export const MutationProvider = mutation => ({ render }) => (
  <Mutation mutation={mutation}>{(fn, obj) => render([fn, obj])}</Mutation>
);
