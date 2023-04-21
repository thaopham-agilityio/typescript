import { Product, Action } from '../interfaces/product.interface';
import { createElement, displayElement } from '../helpers/dom-elements';
import { TIME_OUT } from '../constants/products';
import { footwearsListTemple, productDetailTemple } from '../templates/product.template';

export default class FootwearView {
  private overlay: HTMLDivElement;
  private discover: HTMLDivElement;
  private dailySource: HTMLDivElement;
  private footwearTitle: HTMLDivElement;
  private footwearBack: HTMLDivElement;
  private productsList: HTMLDivElement;
  private listProduct: HTMLElement;
  private detailProduct: HTMLElement;

  constructor() {
    this.overlay = <HTMLDivElement>document.querySelector('.modal-overlay');
    this.discover = <HTMLDivElement>document.querySelector('.discover');
    this.dailySource = <HTMLDivElement>document.querySelector('.daily-source');
    this.footwearTitle = <HTMLDivElement>document.querySelector('.footwear__title');
    this.footwearBack = <HTMLDivElement>document.querySelector('.footwear__detail-back');
    this.productsList = <HTMLDivElement>document.querySelector('.footwear__product');
    this.listProduct = <HTMLElement>document.getElementById('list-footwears');
    this.detailProduct = <HTMLElement>document.getElementById('detail-product');
  }

  /**
   * Apply template to get products
   * @param {Array} products
   */
  renderProducts = (products: Product[]): void => {
    products.map((product: Product) => {
      const productTemp = footwearsListTemple(product);
      this.listProduct.innerHTML += productTemp;
    });
  };

  /**
   * Display products list to screen
   * @param {Array} list
   */
  displayProducts = async (list: Product[]): Promise<void> => {
    while (this.listProduct.firstChild) {
      this.listProduct.removeChild(this.listProduct.firstChild);
    }

    if (list.length) {
      return this.renderProducts(list.reverse());
    } else {
      const noneProductMessage = createElement('div', 'message');
      noneProductMessage.textContent = 'Have no product yet !';
      this.listProduct.appendChild(noneProductMessage);
    }
  };

  /**
   * Apply template to get product detail
   * @param {Array} product
   */
  renderProductDetail = (product: Product): void => {
    const productDetailTemp = productDetailTemple(product);
    this.detailProduct.innerHTML = productDetailTemp;
  };

  /**
   * Display product detail to screen
   * @param {Object} product - product info
   */
  displayProductDetail = (product: Product): void => {
    while (this.detailProduct.firstChild) {
      this.detailProduct.removeChild(this.detailProduct.firstChild);
    }

    if (product) {
      return this.renderProductDetail(product);
    }
  };

  /**
   * @description Handle render information product when click view product
   * @param {function} handleProductDetail
   */
  bindShowProductDetail = (handleProductDetail: (id: string) => void): void => {
    this.listProduct.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const itemAction = target.getAttribute('data-action');

      if (itemAction === Action.LINK) {
        const id = e.target.parentNode.parentNode.id;
        this.discover.classList.replace('display', 'hide');
        this.dailySource.classList.replace('display', 'hide');
        this.footwearTitle.classList.replace('display', 'hide');
        this.productsList.classList.replace('display', 'hide');
        this.footwearBack.classList.replace('hide', 'display');
        this.detailProduct.classList.replace('hide', 'display');
        handleProductDetail(id);
      }
    });
  };

  /**
   * Show/hide loading when render list products
   * @param {boolean} status
   */
  toggleLoadingProducts(status: boolean): void {
    displayElement(this.productsList, status, 'loading');
  }

  /**
   * Show message with error message
   * @param message string
   * @returns void
   */
  displayMessages(message: string): void {
    const showMessage = createElement('div', 'show');
    const bodyElement: HTMLElement | null = document.getElementById('page-body');

    showMessage.id = 'show-messages';
    showMessage.innerHTML = message;

    bodyElement.appendChild(showMessage);
    this.overlay.classList.replace('hide', 'display');

    setTimeout(() => {
      bodyElement.removeChild(showMessage);
      this.overlay.classList.replace('display', 'hide');
    }, TIME_OUT);
  }
}
