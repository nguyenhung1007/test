import config from "@src/config";
import createDynamoDBClient from "@src/config/db";
import PetService from "@src/modules/pets/service/petService";

const petService = new PetService(createDynamoDBClient(), config.DB_TABLE_NAME);

export default petService;
