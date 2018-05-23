import React, { Component, Fragment as F } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Composer from "react-composer";
import { compose } from "recompose";

import { createBait, queryBaits, queryRates } from "./gql";
import { QueryProvider, MutationProvider } from "./utils";
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
