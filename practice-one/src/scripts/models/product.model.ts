import * as uuid from 'uuid';
import { EditProduct, NewProduct, Product } from '../interfaces/product.interface';
import {
  getProducts,
  getProductById,
  editProduct,
  addNewProduct,
  deleteProduct,
} from '../services/product.service';
import endpoint from '../helpers/endpoints.config';

export default class ProductModel {
  private APIUrl: string;

  constructor() {
    this.APIUrl = `${process.env.API_ENDPOINT}/${endpoint.ProductsBaseUrl}`;
  }

  /**
   * Get data when calling API
   * @returns {Promise<Product[]>} data
   */
  getDataProducts = async (): Promise<Product[] | undefined> => {
    const res = await getProducts(this.APIUrl);
    return res;
  };

  /**
   Call api get Product by id
   * @param {string } id id of Product
   * @returns {Promise<Product>} Product
   */
  getProductById = async (id: string): Promise<Product | undefined> => {
    const res = await getProductById(this.APIUrl, id);
    return res;
  };

  /**
   * Add new product to the list
   * @param product new data for product
   * @returns {Promise<Product>} product
   */
  addProduct = async (product: NewProduct): Promise<Product | undefined> => {
    const newProduct: Product = {
      ...product,
      id: uuid.v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const res = await addNewProduct(this.APIUrl, newProduct);
    return res;
  };

  /**
   * Delete product
   * @param { string } id - id of product
   * @returns {Promise<Product>} product
   * */
  deleteProduct = async (id: string): Promise<Product | undefined> => {
    const res = await deleteProduct(this.APIUrl, id);
    return res;
  };

  /**
   * Update product information
   * @param { string} id - id of product   *
   * @returns {Promise<Product>} product
   * */
  editProduct = async (id: string, product: EditProduct): Promise<Product | undefined> => {
    const productEdit = {
      ...product,
      updatedAt: new Date(),
    };

    const res = await editProduct(this.APIUrl, id, productEdit);
    return res;
  };

  /**
   * Search product by name
   * @param query
   * @returns string
   */
  searchProduct = async (query: string): Promise<Product[]> => {
    const products = (await this.getDataProducts()) || [];

    return products.filter((product) =>
      product.productName.toLowerCase().includes(query.toLowerCase())
    );
  };
}
