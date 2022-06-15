import { ResponseUtil } from '@src/core/response';
import petService from '@src/modules/pets/service';
import { Context } from 'aws-lambda';
import * as uuid from 'uuid';
import { PetValidate } from '@src/modules/pets/utils/petValidate';
import { RequestPet } from '../model/Pet';
import axios from 'axios';

export default class PetController {
  petValidate = new PetValidate();

  /**
   * Get all pet
   * @param {*} event
   */
  public gets = async (event: any, context?: Context) => {
    const params: RequestPet = event.queryStringParameters;
    try {
      const pets = await petService.getAllPets(params);
      return ResponseUtil.success(pets);
    } catch (err) {
      return ResponseUtil.error(err.message);
    }
  }

  /**
   * Find one
   * @param {*} event
   */
  public getById = async (event: any, context?: Context) => {
    const petId: string = event.pathParameters.petId;
    try {
      const pet = await petService.getPet(petId);
      return ResponseUtil.success(pet);
    } catch (err) {
      console.error(err);
      return ResponseUtil.error(err.message);
    }
  }


  /**
   * Create pet
   * @param {*} event
   */
  public create = async (event: any, context?: Context) => {
    try {
      const petId: string = uuid.v4();
      const params = await this.petValidate.vCreatePet(event.body);
      const pet = await petService.createPet({
        ...params,
        petId,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return ResponseUtil.success(pet);
    } catch (err) {
      console.error(err);
      return ResponseUtil.error(err.message);
    }
  }

  /**
   * Update pet
   * @param {*} event
   */
  public update = async (event: any, context?: Context) => {
    const petId: string = event.pathParameters.petId;
    const { body } = event;
    try {
      const pet = await petService.updatePet(petId, body);
      return ResponseUtil.success(pet);
    } catch (err) {
      console.error(err);
      return ResponseUtil.error(err.message);
    }
  }

  /**
   * Delete pet
   * @param {*} event
   */
  public delete = async (event: any, context?: Context) => {
    const petId: string = event.pathParameters.petId;
    try {
      const pet = await petService.deletePet(petId);
      return ResponseUtil.success(pet);
    } catch (err) {
      console.error(err);
      return ResponseUtil.error(err.message);
    }
  }

}