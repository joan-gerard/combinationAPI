import { APIGatewayProxyEvent } from "aws-lambda";
import Axios from "axios";

import { formatJSONResponse } from "@libs/apiGateway";

type Deal = {
  title: string;
  storeID: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  steamRatingPercent: string;
  releaseDate: number;
  thumb: string;
};

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
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
      "https://www.cheapshark.com/api/1.0/deals?upperPrice=25"
    );

    const currencyData = await Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${currency}.json`
    );

    const currencyConversion = currencyData.data[currency];

    const repriceDeals = deals.data.map((deal: Deal) => {
      const {
        title,
        storeID,
        salePrice,
        normalPrice,
        savings,
        steamRatingPercent,
        releaseDate,
        thumb,
      } = deal;

      return {
        title,
        storeID,
        steamRatingPercent,
        thumb,

        salePrice: +salePrice * currencyConversion,
        normalPrice: +normalPrice * currencyConversion,
        savingsPercent: savings,

        releaseDate: new Date(releaseDate * 1000).toDateString(),
      };
    });

    return formatJSONResponse({
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
