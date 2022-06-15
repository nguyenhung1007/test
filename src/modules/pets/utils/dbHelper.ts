import { DEFAULT_LIMIT } from "@src/config";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { isEmpty, has } from "lodash";

export const listPetHelper = async (
  docClient: DocumentClient,
  tableName: string,
  title: string = "",
  limit?: number,
  keyName?: string,
  nextToken?: any
): Promise<{
  nextToken: string;
  items: any[];
}> => {
  if (!limit) {
    limit = DEFAULT_LIMIT.PET;
  }

  let params: DocumentClient.ScanInput = {
    Limit: limit,
    TableName: tableName
  };

  if(title){
    params = {...params, 
      FilterExpression: "contains(title, :title)",
      ExpressionAttributeValues: {
        ":title": title,
      }
    }
  }

  if (nextToken) {
    params.ExclusiveStartKey = { [keyName]: nextToken };
  }

  const result = await docClient.scan(params).promise();

  let newNextToken = null;
  if (has(result, "LastEvaluatedKey")) {
    newNextToken = result.LastEvaluatedKey[keyName];
  }

  return {
    nextToken: newNextToken,
    items: result.Items,
  };
}