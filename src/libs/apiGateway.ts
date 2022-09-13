// = after arg means default value
// question mark signify value might be passed

export const formatJSONResponse = ({
  statusCode = 200,
  data,
}: {
  statusCode?: number;
  data?: any;
}) => {
  return {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      //any web url allowed to make api request
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};
