import React, { Component, Fragment as F } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Composer from "react-composer";
import { compose } from "recompose";

import { createBait, queryBaits, queryRates } from "./gql";
import { QueryProvider, MutationProvider, unwrapGqlResults } from "./utils";
import { WithLoading } from "./loading.component";
import { WithError } from "./error-message.component";
import Display from "./display.component";
import "./App.css";

const client = new ApolloClient({
  uri: "https://lk4wrjkk3q.lp.gql.zone/graphql"
});

const Enhance = compose(WithLoading, WithError);

const EnhancedDisplay = Enhance(props => <Display {...props} />);

const RatesAndBaits = () => (
  <Composer
    components={[
      QueryProvider(queryRates),
      QueryProvider(queryBaits),
      MutationProvider(createBait)
    ]}
  >
    {([rates, baits, [createBaitFn, createBaitObj]]) => {
      return (
        <F>
          <EnhancedDisplay
            loading={rates.loading || baits.loading}
            error={rates.error || baits.error}
            {...{ rates, baits }}
          />
          <button onClick={() => createBaitFn({ variables: { name: "red" } })}>
            {createBaitObj.loading ? "Adding" : "Add"} Bait
          </button>
        </F>
      );
    }}
  </Composer>
);

const RAB = composeComponents(
  [Query, { query: queryRates }],
  [Query, { query: queryBaits }],
  [Mutation, { mutation: createBait }]
)(([rates, baits, createBait]) => {
  const { createBaitFn, createBaitObj } = createBait;
  if (rates.loading || baits.loading) return "Loading";
  if (rates.error || baits.error) return "Error";
  return (
    <F>
      <p>
        {unwrapGqlResults(rates, "rates", 0).currency}
        {unwrapGqlResults(rates, "rates", 0).color}
      </p>
      <button onClick={() => createBaitFn({ variables: { name: "foo" } })}>
        {createBaitObj.loading ? "Adding" : "Add"} Bait
      </button>
    </F>
  );
});

const apolloQuery = query => [Query, { query }];
const apolloMutation = mutation => [Mutation, { mutation }];

const RAB = composeComponents(
  apolloQuery(queryRates),
  apolloQuery(queryBaits),
  apolloMutation(createBait)
)(([rates, baits, createBait]) => {
  const { createBaitFn, createBaitObj } = createBait;
  if (rates.loading || baits.loading) return "Loading";
  if (rates.error || baits.error) return "Error";
  return (
    <F>
      <p>
        {unwrapGqlResults(rates, "rates", 0).currency}
        {unwrapGqlResults(rates, "rates", 0).color}
      </p>
      <button onClick={() => createBaitFn({ variables: { name: "foo" } })}>
        {createBaitObj.loading ? "Adding" : "Add"} Bait
      </button>
    </F>
  );
});

Gql = {
  Mutation: 0,
  Query: 1
};

const RAB = composeGql(
  [Gql.Query, queryRates],
  [Gql.Query, queryBaits],
  [Gql.Mutation, createBait]
)(([rates, baits, createBait]) => {
  const { createBaitFn, createBaitObj } = createBait;
  if (rates.loading || baits.loading) return "Loading";
  if (rates.error || baits.error) return "Error";
  return (
    <F>
      <p>
        {unwrapGqlResults(rates, "rates", 0).currency}
        {unwrapGqlResults(rates, "rates", 0).color}
      </p>
      <button onClick={() => createBaitFn({ variables: { name: "foo" } })}>
        {createBaitObj.loading ? "Adding" : "Add"} Bait
      </button>
    </F>
  );
});

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
