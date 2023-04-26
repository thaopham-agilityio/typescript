import { Product } from '../interfaces/product.interface';
import { Action } from '../interfaces/product.interface';
import { formatDate } from '../helpers/format-date';

export const productsListTemple = ({
  id,
  productName,
  price,
  description,
  productUrl,
  createdAt,
  updatedAt,
}: Product): string =>
  `<ul class="products__info" id="${id}">
    <li>
      <img width="60" height="75" class="products__img--thumb" loading="lazy" alt="Product of ${productName}" src="${productUrl}">
    </li>
    <li class="name">${productName}</li>
    <li class="price">${price}$</li>
    <li class="desc">${description}</li>
    <li class="created">${formatDate(createdAt)}</li>
    <li class="updated">${formatDate(updatedAt)}</li>
    <li class="products-action">
      <button class="btn btn-info btn-view-product" data-action="${Action.VIEW}">View</button>
      <button class="btn btn-success btn-edit-product" data-action="${Action.EDIT}">Edit</button>
      <button class="btn btn-danger btn-delete-product" data-action="${
        Action.DELETE
      }">Delete</button>
    </li>
  </ul>`;

export const footwearsListTemple = ({ id, productName, productUrl }: Product): string =>
  `<li class="footwear__product-item" id=${id}>
    <div class="footwear__product-link">
      <img width="252" height="315" class="footwear__img" loading="lazy" src="${productUrl}" alt="Featured Footwear Product of ${productName}" data-action="${Action.LINK}">
      <p class="footwear__para" data-action="${Action.LINK}">${productName}</p>
    </div>
  </li>`;

export const productDetailTemple = ({
  productName,
  price,
  description,
  productUrl,
}: Product): string => {
  return `<img class="footwear__detail-img" loading="lazy" alt="Product" src="${productUrl}">
          <div class="footwear__detail-content">
            <h3 class="footwear__detail-title">${productName}</h3>
            <p class="footwear__detail-price">Price: ${price}$</p>
            <p class="footwear__detail-desc">${description}</p>
          </div>`;
};

export const productDetailModal = ({
  productName,
  price,
  description,
  productUrl,
}: Product): string => {
  return `
  <div class="modal-container">
    <header class="modal-header">
      <button type="button" id="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
    </header>
    <div class="modal-body">
      <form class="product-form detail">
        <img class="products__img--detail" loading="lazy" alt="Product" src="${productUrl}">
        <div class="products__detail">
          <h3 class="products__title">${productName}</h3>
          <p class="products__price">Price: ${price}$</p>
          <p class="products__desc">${description}</p>
        </div>
      </form>
    </div>
  </div>`;
};

export const productModal = ({
  id,
  productName = '',
  price,
  description = '',
  productUrl = '',
}: Product): string => {
  return `
    <div class="modal-container">
      <header class="modal-header">
        <h2 class="modal-title">${id ? 'Edit Product' : 'Add New Product'}</h2>
      </header>
      <div class="modal-body">
        <form class="product-form">
          <div class="input-row">
            <label for="productName" class="modal-label">Product name</label>
            <input type="text" class="form-input" name="productName" id="productName" placeholder="Product name" value="${productName}">
            <p class="validate-message" id="validateProductName"></p>
          </div>
          <div class="input-row">
            <label for="productPrice" class="modal-label">Product price</label>
            <input type="number" min="1" class="form-input" name="productPrice" id="productPrice" placeholder="Product price" value="${price}">
            <p class="validate-message" id="validateProductPrice"></p>
          </div>
          <div class="input-row">
            <label for="productDesc" class="modal-label">Product description</label>
            <textarea rows="5" class="form-input" name="productDesc" id="productDesc" placeholder="Product description" value="${description}">${description}</textarea>
            <p class="validate-message" id="validateProductDesc"></p>
          </div>
          <div class="input-row">
            <label for="productUrl" class="modal-label">Product URL</label>
            <input type="text" id="productUrl" class="form-input" name="productUrl" placeholder="Product URL" value="${productUrl}">
            <p class="validate-message" id="validateProductUrl"></p>
          </div>
        </form>
      </div>
      <footer class="modal-footer">
        <button class="btn btn-secondary" id="cancel">Cancel</button>
        <button class="btn btn-primary" id="submit">Submit</button>
      </footer>
    </div>`;
};
