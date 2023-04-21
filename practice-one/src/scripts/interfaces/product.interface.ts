export enum Action {
  VIEW = 'View',
  EDIT = 'Edit',
  DELETE = 'Delete',
  LINK = 'Link',
}

export interface Product {
  readonly id: string;
  productName: string;
  price: number;
  description: string;
  productUrl: string;
  readonly createdAt: Date;
  updatedAt: Date;
}

export type NewProduct = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export type EditProduct = Omit<Product, 'id' | 'createdAt'>;
