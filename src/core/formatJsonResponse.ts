export const formatJSONResponse = (statusCode: number, response: any): any => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};