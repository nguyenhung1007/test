import * as Joi from "joi";
import { CreatePet } from "@src/modules/pets/dtos/createPetDto";

export class PetValidate {
  private joi: Joi.AnySchema;
 
  public vCreatePet(signupObj: CreatePet) {
    const object = {
        title: Joi.string().required(),
        description: Joi.string().required() 
    };
    return this.setUpJoi(object, signupObj);
  }
  private setUpJoi(objectInit: any, objectUpdate: any) {
    this.joi = Joi.object(objectInit);
    return this.joi.validateAsync(objectUpdate);
  }
}