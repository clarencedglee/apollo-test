import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";

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

const ExchangeRates = () => (
  <Query query={queryRates}>
    {({ loading, error, data: rates }) => {
      if (loading) return <p>loading</p>;
      if (error) return <p>error</p>;
      return (
        <Query query={queryBaits}>
          {({ loading, error, data: baits }) => {
            if (loading) return <p>loading</p>;
            if (error) return <p>error</p>;
            console.log(rates, baits);
            return <p>d</p>;
          }}
        </Query>
      );
    }}
  </Query>
);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <ExchangeRates />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
