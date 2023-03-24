import { getErrorMessages } from '../helpers/get-error-messages';
import { Product, NewProduct, EditProduct } from '../interfaces/product.interface';
import ProductModel from '../models/product.model';
import ProductView from '../views/product.view';

export default class ProductController {
  constructor(private model: ProductModel, private view: ProductView) {
    this.model = model;
    this.view = view;

    this.view.bindAddProduct(this.handleAddProduct);
    this.view.bindShowProductDetail(this.handleShowProductDetail);
    this.view.bindDeleteProduct(this.handleDeleteProduct);
    this.view.bindEditProduct(this.handleGetProductId, this.handleEditProduct);
    this.view.bindSearchProduct(this.handleSearchProduct);
    this.onListProductChanged([]);
  }

  /**
   * Get data from API and list products
   */
  onListProductChanged = async ([]): Promise<void> => {
    try {
      this.view.toggleLoadingProducts(true);
      const res = await this.model.getDataProducts();
      this.view.toggleLoadingProducts(false);

      // List products
      this.view.displayProducts(res || []);
    } catch (error) {
      const errorMessage: string = getErrorMessages(error);

      this.view.displayMessages(errorMessage);
    }
  };

  /**
   * Get product by id
   * @param { string } id id of product
   */
  handleGetProductId = async (id: string): Promise<Product | undefined> => {
    const res = await this.model.getProductById(id);
    return res;
  };

  /**
   * Handle add new product
   */
  handleAddProduct = async (product: NewProduct): Promise<void> => {
    try {
      this.model.addProduct(product);
      const res = await this.model.getDataProducts();

      this.onListProductChanged(res || []);
    } catch (error) {
      const errorMessage: string = getErrorMessages(error);

      this.view.displayMessages(errorMessage);
    }
  };

  /**
   * @description handle show product detail with product have id get
   * @param { string} id id of User
   */
  handleShowProductDetail = async (id: string): Promise<Product | undefined> => {
    try {
      const res = await this.model.getProductById(id);
      return res;
    } catch (error) {
      const errorMessage: string = getErrorMessages(error);

      this.view.displayMessages(errorMessage);
    }
  };

  /**
   * Handle show product edit when click edit button
   */
  handleEditProduct = async (id: string, editProduct: EditProduct): Promise<void> => {
    try {
      this.model.editProduct(id, editProduct);
      const res = await this.model.getDataProducts();

      await this.onListProductChanged(res || []);
    } catch (error) {
      const errorMessage: string = getErrorMessages(error);

      this.view.displayMessages(errorMessage);
    }
  };

  /**
   * Handle delete product by id
   * @param { string } id id of product
   */
  handleDeleteProduct = async (id: string): Promise<Product | undefined> => {
    const res = await this.model.deleteProduct(id);
    return res;
  };

  /**
   * Handle search product
   */
  handleSearchProduct = async (query: string): Promise<void> => {
    try {
      this.view.toggleLoadingProducts(true);
      const res = await this.model.searchProduct(query);
      this.view.toggleLoadingProducts(false);
      this.view.displayProducts(res);
    } catch (error) {
      const errorMessage: string = getErrorMessages(error);

      this.view.displayMessages(errorMessage);
    }
  };
}
