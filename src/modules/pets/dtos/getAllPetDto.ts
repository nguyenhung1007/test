import { Pet } from "../model/Pet";

export interface ResponseListPet {
  data: any[];
  next: string;
  limit: number;
}