module.exports = {
  tables: [
    {
      TableName: `Pet-dev`,
      KeySchema: [{ AttributeName: "petId", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "petId", AttributeType: "S" }],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
    },
  ],
};
