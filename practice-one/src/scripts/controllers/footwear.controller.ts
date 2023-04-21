import { getErrorMessages } from '../helpers/server-error';
import { Product, NewProduct, EditProduct } from '../interfaces/product.interface';
import ProductModel from '../models/product.model';
import FootwearView from '../views/footwear.view';

export default class FootwearController {
  private productDetail: Product | undefined;

  constructor(private model: ProductModel, private view: FootwearView) {
    this.productDetail = undefined;
    this.model = model;
    this.view = view;

    this.view.bindShowProductDetail(this.handleShowProductDetail);
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
   * @description handle show product detail with product have id get
   * @param { string} id id of User
   */
  handleShowProductDetail = async (id: string): Promise<void> => {
    const res = await this.model.getProductById(id);

    this.productDetail = res;
    this.view.displayProductDetail(res as Product);
  };
}
