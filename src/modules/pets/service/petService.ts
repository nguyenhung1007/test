import config from "@src/config";
import { Pet, RequestPet } from "@src/modules/pets/model/Pet";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { ResponseListPet } from "../dtos/getAllPetDto";
import { listPetHelper } from "../utils/dbHelper";

class PetService {
  private mustHaveTableName = "notHaveTableName";

  constructor(
    private readonly docClient: DocumentClient,
    private readonly tableName: string
  ) { }

  async getAllPets(params: RequestPet): Promise<ResponseListPet> {
    const results = await listPetHelper(
      this.docClient,
      this.tableName,
      params?.title,
      params?.limit,
      "petId",
      params?.next
    );
    return {
      data: results.items,
      next: params?.next,
      limit: params?.limit
    };
    
  }

  async getPet(petId: string): Promise<Pet> {
    const result = await this.docClient
      .get({
        TableName: this.tableName || this.mustHaveTableName,
        Key: { petId },
      })
      .promise();

    return result.Item as Pet;
  }

  async createPet(pet: Pet): Promise<Pet> {
    await this.docClient
      .put({
        TableName: this.tableName || this.mustHaveTableName,
        Item: pet,
      })
      .promise();

    return pet;
  }

  async updatePet(petId: string, partialPet: Partial<Pet>): Promise<Pet> {
    const updated = await this.docClient
      .update({
        TableName: this.tableName || this.mustHaveTableName,
        Key: { petId },
        UpdateExpression:
          "set #title = :title, description = :description, active = :active",
        ExpressionAttributeNames: {
          "#title": "title",
        },
        ExpressionAttributeValues: {
          ":title": partialPet.title,
          ":description": partialPet.description,
          ":active": partialPet.active,
        },
        ReturnValues: "UPDATED_NEW",
      })
      .promise();

    return updated.Attributes as Pet;
  }

  async deletePet(petId: string) {
    return this.docClient
      .delete({
        TableName: this.tableName || this.mustHaveTableName,
        Key: { petId },
      })
      .promise();
  }
}

export default PetService;
