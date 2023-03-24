import { Product, NewProduct, EditProduct, Action } from '../interfaces/product.interface';
import { createElement, displayElement } from '../helpers/dom-elements';
import { checkValidate } from '../helpers/validation';
import {
  productsListTemple,
  productDetailModal,
  productModal,
} from '../templates/product.template';

export default class ProductView {
  private overlay: HTMLDivElement;
  private productsList: HTMLDivElement;
  private listProduct: HTMLElement;
  private search: HTMLInputElement;
  private confirmModal: HTMLDivElement;

  constructor() {
    this.overlay = <HTMLDivElement>document.querySelector('.modal-overlay');
    this.productsList = <HTMLDivElement>document.querySelector('.products__list');
    this.listProduct = <HTMLElement>document.getElementById('list-products');
    this.search = <HTMLInputElement>document.querySelector('.search-input');
    this.confirmModal = <HTMLDivElement>document.getElementById('confirm-modal');
  }

  /**
   * Apply template to get products
   * @param {Array} products
   */
  renderProductsTable = (products: Product[]): void => {
    products.map((product: Product) => {
      const productTemp = productsListTemple(product);
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
      return this.renderProductsTable(list.reverse());
    } else {
      const noneProductMessage = createElement('div', 'message');
      noneProductMessage.textContent = 'Have no product yet !';
      this.listProduct.appendChild(noneProductMessage);
    }
  };

  /**
   * Show/hide loading when render list products
   * @param {boolean} status
   */
  toggleLoadingProducts(status: boolean): void {
    displayElement(this.productsList, status, 'loading');
  }

  /**
   * Show/hide loading when render list products
   * @param {boolean} status
   */
  toggleLoadingAddProducts(status: boolean): void {
    displayElement(this.productsList, status, 'loading');
  }

  /**
   * Add modal to the DOM
   * @param {object} product
   */
  openModal = (product: Product = {} as Product): void => {
    const form: string = productModal(product);
    const reuseModal = createElement('div', 'modal');
    reuseModal.id = 'product-modal';
    reuseModal.innerHTML = form;
    document.body.appendChild(reuseModal);
    this.overlay.classList.replace('hide', 'display');
  };

  /**
   * Add modal to the DOM
   * @param {object} product
   */
  openDetailModal = (product: Product = {} as Product): void => {
    const form: string = productDetailModal(product);
    const detailModal = createElement('div', 'modal');
    detailModal.id = 'product-detail-modal';
    detailModal.innerHTML = form;
    document.body.appendChild(detailModal);
    this.overlay.classList.replace('hide', 'display');
  };

  /**
   * Show message with error message
   * @param message string
   * @returns void
   */
  displayMessages(message: string): void {
    const showMessage = createElement('div', 'show');

    showMessage.id = 'show-messages';
    showMessage.innerHTML = message;

    const bodyElement: HTMLElement | null = document.getElementById('page-body');

    if (!bodyElement) {
      return;
    }

    bodyElement.appendChild(showMessage);
    this.overlay.classList.replace('hide', 'display');

    setTimeout(() => {
      bodyElement.removeChild(showMessage);
      this.overlay.classList.replace('display', 'hide');
    }, 3000);
  }

  /**
   * Add new product
   * @param {function} handleNewProduct
   */

  bindAddProduct = (handleNewProduct: (newProduct: NewProduct) => void): void => {
    document.getElementById('open-modal')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.openModal();
      const submitBtn = document.getElementById('submit');
      const cancelBtn = document.getElementById('cancel');

      // Check is the button exist in DOM
      if (submitBtn) {
        submitBtn.addEventListener('click', (e: MouseEvent) => {
          e.preventDefault();
          const inputName = document.getElementById('productName') as HTMLInputElement;
          const inputPrice = document.getElementById('productPrice') as HTMLInputElement;
          const inputDesc = document.getElementById('productDesc') as HTMLTextAreaElement;
          const inputUrl = document.getElementById('productUrl') as HTMLInputElement;

          const isValid = checkValidate();

          // Check is valid form exist & price value is not negative number
          if (isValid && Number(inputPrice.value) > 0) {
            const newProduct: NewProduct = {
              productName: inputName.value.trim(),
              price: Number(inputPrice.value),
              description: inputDesc.value.trim(),
              productUrl: inputUrl.value.trim(),
            };

            handleNewProduct(newProduct);
            document.getElementById('product-modal')?.remove();
            this.overlay.classList.replace('display', 'hide');
            this.productsList.classList.replace('hide', 'display');
          }
        });
      }

      // Check is the button exist in DOM
      if (cancelBtn) {
        cancelBtn.addEventListener('click', (e) => {
          e.preventDefault();
          document.getElementById('product-modal')?.remove();
          this.overlay.classList.replace('display', 'hide');
        });
      }

      // Close modal by using Escape key
      document.onkeydown = (evt: KeyboardEvent) => {
        evt = evt || window.event;
        let isEscape: boolean = false;

        if ('key' in evt) {
          isEscape = evt.key === 'Escape' || evt.key === 'Esc';
        }
        if (isEscape) {
          document.getElementById('product-modal')?.remove();
          this.overlay.classList.replace('display', 'hide');
        }
      };
    });
  };

  /**
   * Handle render information product when click view product
   * @param {function} handleGetProductId
   */
  bindShowProductDetail = (handleGetProductId: (id: string) => Promise<Product | undefined>) => {
    this.listProduct.addEventListener('click', async (e: MouseEvent) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const itemAction = target.getAttribute('data-action');

      if (itemAction === Action.VIEW) {
        const id = (e.target as any).parentNode.parentNode.id;
        const product = await handleGetProductId(id);

        if (product) {
          this.openDetailModal(product);
          const closeBtn = document.getElementById('close');

          this.overlay.classList.replace('hide', 'display');

          // Check is the button exist in DOM
          if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
              e.preventDefault();
              document.getElementById('product-detail-modal')?.remove();
              this.overlay.classList.replace('display', 'hide');
            });
          }

          // Close modal by using Escape key
          document.onkeydown = (evt: KeyboardEvent) => {
            evt = evt || window.event;
            let isEscape: boolean = false;

            if ('key' in evt) {
              isEscape = evt.key === 'Escape' || evt.key === 'Esc';
            }
            if (isEscape) {
              document.getElementById('product-detail-modal')?.remove();
              this.overlay.classList.replace('display', 'hide');
            }
          };
        }
      }
    });
  };

  /**
   * Edit product
   * @param {function} handleGetProductId
   * @param {function} handleEditProduct
   */

  bindEditProduct = (
    handleGetProductId: (id: string) => Promise<Product | undefined>,
    handleEditProduct: (id: string, editProduct: EditProduct) => void
  ) => {
    this.listProduct.addEventListener('click', async (e: MouseEvent) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const itemAction = target.getAttribute('data-action');

      // Get product by id
      if (itemAction === Action.EDIT) {
        const id = (e.target as any).parentNode.parentNode.id;
        const product = await handleGetProductId(id);

        if (product) {
          this.openModal(product);
          const submitBtn = document.getElementById('submit');
          const cancelBtn = document.getElementById('cancel');

          // Check is the button exist in DOM
          if (submitBtn) {
            submitBtn.addEventListener('click', (e: MouseEvent) => {
              e.preventDefault();
              const inputName = document.getElementById('productName') as HTMLInputElement;
              const inputPrice = document.getElementById('productPrice') as HTMLInputElement;
              const inputDesc = document.getElementById('productDesc') as HTMLTextAreaElement;
              const inputUrl = document.getElementById('productUrl') as HTMLInputElement;

              const isValid = checkValidate();

              // Check is valid form exist & price value is not negative number
              if (isValid && Number(inputPrice.value) > 0) {
                const editProduct: EditProduct = {
                  productName: inputName.value.trim(),
                  price: Number(inputPrice.value),
                  description: inputDesc.value.trim(),
                  productUrl: inputUrl.value.trim(),
                  updatedAt: new Date(),
                };

                handleEditProduct(id, editProduct);
                document.getElementById('product-modal')?.remove();
                this.overlay.classList.replace('display', 'hide');
              }
            });

            // Check is the button exist in DOM
            if (cancelBtn) {
              cancelBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('product-modal')?.remove();
                this.overlay.classList.replace('display', 'hide');
              });
            }

            // Close modal by using Escape key
            document.onkeydown = (evt: KeyboardEvent) => {
              evt = evt || window.event;
              let isEscape: boolean = false;

              if ('key' in evt) {
                isEscape = evt.key === 'Escape' || evt.key === 'Esc';
              }
              if (isEscape) {
                document.getElementById('product-modal')?.remove();
                this.overlay.classList.replace('display', 'hide');
              }
            };
          }
        }
      }
    });
  };

  /**
   * Delete product
   * @param {function} handleDeleteProduct
   */

  bindDeleteProduct = (handleDeleteProduct: (id: string) => void): void => {
    this.listProduct.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const itemAction = target.getAttribute('data-action');

      const closeConfirmModal = () => {
        this.overlay.classList.replace('display', 'hide');
        this.confirmModal.classList.replace('display', 'hide');
      };

      if (itemAction === Action.DELETE) {
        const id = (e.target as any).parentNode.parentNode.id;
        this.confirmModal.classList.replace('hide', 'display');
        this.overlay.classList.replace('hide', 'display');

        document.getElementById('delete')?.addEventListener('click', () => {
          document.getElementById(id)?.remove();
          handleDeleteProduct(id);
          closeConfirmModal();
        });

        document.getElementById('delete-cancel')?.addEventListener('click', () => {
          closeConfirmModal();
        });

        // Close modal by using Escape key
        document.onkeydown = (evt: KeyboardEvent) => {
          evt = evt || window.event;
          let isEscape: boolean = false;

          if ('key' in evt) {
            isEscape = evt.key === 'Escape' || evt.key === 'Esc';
          }
          if (isEscape) {
            this.overlay.classList.replace('display', 'hide');
            this.confirmModal.classList.replace('display', 'hide');
          }
        };
      }
    });
  };

  /**
   * Search product by name
   * @param {function} handleSearchProduct
   */

  bindSearchProduct = (handleSearchProduct: (query: string) => void): void => {
    this.search.addEventListener('keypress', (e: KeyboardEvent) => {
      const keyName = e.key;

      if (keyName === 'Enter') {
        handleSearchProduct(this.search.value.trim());
      }
    });
  };
}
