import { Product, NewProduct, EditProduct } from '../interfaces/product.interface';

/**
 * Get request get data products
 * @param {string} url
 * @returns {Promise}
 */
export const getProducts = async (url: string): Promise<Product[] | undefined> => {
  const response = await fetch(url);
  const res: Product[] = await response.json();

  return res;
};

/**
 * Create get request to get data product with specific id from database
 * @param {string} url
 * @param {string} id
 *
 * @returns {Promise}
 */
export const getProductById = async (url: string, id: string): Promise<Product | undefined> => {
  const response = await fetch(`${url}/${id}`);
  const res: Product = await response.json();

  return res;
};

/**
 * Create POST request to create new product data into database
 * @param {string} url
 * @param {NewProduct} dataProduct
 *
 * @returns {Promise}
 */
export const addNewProduct = async (
  url: string,
  dataProduct: NewProduct
): Promise<Product | undefined> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataProduct),
  });
  const res: Product = await response.json();

  return res;
};

/**
 * create PUT request to edit data product with specific id in database
 * @param {string} url
 * @param {string} id
 * @param {EditProduct} dataEdit
 *
 * @returns {Promise}
 */

export const editProduct = async (
  url: string,
  id: string,
  dataEdit: EditProduct
): Promise<Product | undefined> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataEdit),
  });
  const res: Product = await response.json();

  return res;
};

/**
 * create DELETE request to delete data product with specific id in database
 * @param {string} url
 * @param {string} id
 *
 * @returns {Promise}
 */
export const deleteProduct = async (url: string, id: string): Promise<Product | undefined> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
  const res: Product = await response.json();

  return res;
};
