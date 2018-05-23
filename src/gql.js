import gql from "graphql-tag";

export const queryRates = gql`
  {
    rates(currency: "USD") {
      currency
    }
  }
`;

export const queryBaits = gql`
  {
    baits(name: "foo") {
      name
      color
    }
  }
`;

export const createBait = gql`
  mutation CreateBait($name: String!) {
    createBait(name: $name, color: "red") {
      name
      color
    }
  }
`;
