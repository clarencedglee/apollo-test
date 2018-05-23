import React from "react";
import { unwrapGqlResults } from "./utils";

const Display = ({ rates, baits }) => {
  const rate = unwrapGqlResults("rates", rates, 0);
  const bait = unwrapGqlResults("baits", baits, 0);
  return (
    <p>
      {rate.currency} {bait.color}
    </p>
  );
};

export default Display;
