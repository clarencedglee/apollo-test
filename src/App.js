import React, { Component, Fragment as F } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";

import Composer from "react-composer";

import logo from "./logo.svg";
import "./App.css";

const client = new ApolloClient({
  uri: "https://lk4wrjkk3q.lp.gql.zone/graphql"
});

const queryRates = gql`
  {
    rates(currency: "USD") {
      currency
    }
  }
`;

const queryBaits = gql`
  {
    baits(name: "foo") {
      name
      color
    }
  }
`;

const unwrapGqlResults = (name, result, index) => {
  let out = result.data || {};
  out = out[name] || [];
  if (typeof index === "number") {
    return out[index] || {};
  }
  return out;
};

const RatesAndBaits = () => (
  <Composer
    components={[<Query query={queryRates} />, <Query query={queryBaits} />]}
  >
    {([rates, baits]) => {
      if (rates.loading && baits.loading) return <p>loading</p>;
      if (rates.error || baits.error) return <p>error</p>;
      const rate = unwrapGqlResults("rates", rates, 0);
      const bait = unwrapGqlResults("baits", baits, 0);
      return (
        <p>
          {rate.currency} {bait.color}
        </p>
      );
    }}
  </Composer>
);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <RatesAndBaits />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
