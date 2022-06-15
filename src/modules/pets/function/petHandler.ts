import middify from '@src/core/middify';
import { APIGatewayEvent, APIGatewayProxyResult, Context, Handler } from 'aws-lambda';

import PetController from '@src/modules/pets/controller/petController';

const petController = new PetController();

/**
 * Get all
 */
export const gets: Handler = middify(async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return petController.gets(event, context);
});

/**
 * Get one
 */
 export const getById: Handler = middify(async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return petController.getById(event, context);
});

/**
 * Create pet
 */
export const create: Handler = middify(async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return petController.create(event, context);
});

/**
 * update pet
 */
 export const update: Handler = middify(async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return petController.update(event, context);
});

/**
 * delete pet
 */
 export const remove: Handler = middify(async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return petController.delete(event, context);
});