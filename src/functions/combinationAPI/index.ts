import { APIGatewayProxyEvent } from "aws-lambda";
import Axios from "axios";

import { formatJSONResponse } from "@libs/apiGateway";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    // url/gameDeals?currency=usd

    // if !queryStringParameters, then pass {}
    const { queryStringParameters = {} } = event;

    const { currency } = queryStringParameters;

    if (!currency) {
      return formatJSONResponse({
        statusCode: 400,
        data: {
          message: "Missing currency query parameters",
        },
      });
    }

    const deals = await Axios.get(
      "https://www.cheapshark.com/api/1.0/deals?upperPrice=15&pageSize=5"
    );

    const currencyData = await Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${currency}.json`
    );

    const currencyConversion = currencyData.data[currency];

    const repriceDeals = deals.data.map((deal) => {
      const {
        title,
        storeID,
        salePrice,
        normalPrice,
        savings,
        steamRatingPercent,
        releaseDate,
      } = deal;

      return {
        title,
        storeID,
        steamRatingPercent,

        salePrice: salePrice * currencyConversion,
        normalPrice: normalPrice * currencyConversion,
        savings: savings * currencyConversion,

        releaseDate: new Date(releaseDate * 1000).toDateString(),
      };
    });

    return formatJSONResponse({
      // default 200 is set in the function
      data: repriceDeals,
    });
  } catch (error) {
    console.log("error", error);
    return formatJSONResponse({
      statusCode: 502,
      data: {
        message: error.message,
      },
    });
  }
};

// This is my lambda because that is the code that is going to be run when users check deals
