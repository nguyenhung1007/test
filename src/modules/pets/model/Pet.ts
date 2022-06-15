export interface Pet {
  petId: string;
  title?: string;
  description?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RequestPet {
  limit: number;
  next: string;
  title: string;
}