import type { AWS } from "@serverless/typescript";

const functions: AWS["functions"] = {
  combinationAPI: {
    // lambda handler
    handler: "src/functions/combinationAPI/index.handler",
    // find API GW config to trigger handler
    events: [
      {
        httpApi: {
          path: "/gameDeals",
          method: "get",
        },
      },
    ],
  },
};

export default functions;

// line 6 -> look inside index, find the handler function and call it anytime there is a lambda called
