import { Product, NewProduct, EditProduct, Action } from '../interfaces/product.interface';
import { createElement, displayElement } from '../helpers/dom-elements';
import { InputName } from '../types/input-name';
import { checkValidate } from '../helpers/form-validation';
import { TIME_OUT } from '../constants/products';
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
  renderProducts = (products: Product[]): void => {
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
      return this.renderProducts(list.reverse());
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
   * Add modal to the DOM
   * @param {object} product
   */
  openModal = (product: Product = {}): void => {
    const form = productModal(product);
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
  openDetailModal = (product: Product): void => {
    const form = productDetailModal(product);
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

  /**
   * Disabled button submit when load add product page
   * @param inputs elements
   * @returns boolean
   */
  disabledAddButton = (btn: HTMLButtonElement) => {
    let inputs = document.querySelectorAll('input, textarea');
    let inputValidator: InputName = {
      productName: false,
      productPrice: false,
      productDesc: false,
      productUrl: false,
    };

    btn.disabled = true;

    inputs.forEach((input) => {
      input.addEventListener('input', (event) => {
        const target = event.target as HTMLInputElement;
        const name = target.getAttribute('name') as string;

        inputValidator[name] = target.value.length > 0;

        let allTrue = Object.keys(inputValidator).every((item) => inputValidator[item]);

        btn.disabled = !allTrue;
      });
    });
  };

  /**
   * Disabled button submit when edit product item
   * @param inputs elements
   * @returns boolean
   */
  disabledEditButton = (btn: HTMLButtonElement) => {
    let inputs = document.querySelectorAll('input, textarea');
    let inputValidator: InputName = {
      productName: false,
      productPrice: false,
      productDesc: false,
      productUrl: false,
    };

    inputs.forEach((input) => {
      input.addEventListener('input', (event) => {
        const target = event.target as HTMLInputElement;

        let allTrue = Object.keys(inputValidator).every(
          (item) => (inputValidator[item] = target.value.length > 0)
        );

        btn.disabled = !allTrue;
      });
    });
  };

  /**
   * Add new product
   * @param {function} handleNewProduct
   */

  bindAddProduct = (handleNewProduct: (newProduct: NewProduct) => void): void => {
    document.getElementById('open-modal')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.openModal();
      const submitBtn = document.getElementById('submit') as HTMLButtonElement;
      const cancelBtn = document.getElementById('cancel') as HTMLButtonElement;

      const closeModal = () => {
        document.getElementById('product-modal')?.remove();
        this.overlay.classList.replace('display', 'hide');
      };

      this.disabledAddButton(submitBtn);

      // Click submit button to add product
      submitBtn.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        const inputName = document.getElementById('productName') as HTMLInputElement;
        const inputPrice = document.getElementById('productPrice') as HTMLInputElement;
        const inputDesc = document.getElementById('productDesc') as HTMLTextAreaElement;
        const inputUrl = document.getElementById('productUrl') as HTMLInputElement;

        const isValid = checkValidate(inputName, inputPrice, inputDesc, inputUrl, submitBtn);

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

      // Click cancel button to cancel add product
      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
      });

      // Close modal by click outside
      this.overlay.addEventListener('click', closeModal);

      // Close modal by using Escape key
      document.onkeydown = (evt: KeyboardEvent) => {
        evt = evt || window.event;
        let isEscape: boolean = false;

        'key' in evt && (isEscape = evt.key === 'Escape' || evt.key === 'Esc');
        isEscape && closeModal();
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

      const closeDetailModal = () => {
        document.getElementById('product-detail-modal')?.remove();
        this.overlay.classList.replace('display', 'hide');
      };

      if (itemAction === Action.VIEW) {
        const id = e.target.parentNode.parentNode.id;
        const product = await handleGetProductId(id);

        if (product) {
          this.openDetailModal(product);
          const closeBtn = document.getElementById('close') as HTMLButtonElement;

          // Click close button to close the modal
          closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeDetailModal();
          });

          // Close modal by click outside
          this.overlay.addEventListener('click', closeDetailModal);

          // Close modal by using Escape key
          document.onkeydown = (evt: KeyboardEvent) => {
            evt = evt || window.event;
            let isEscape: boolean = false;

            'key' in evt && (isEscape = evt.key === 'Escape' || evt.key === 'Esc');
            isEscape && closeDetailModal();
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

      const closeModal = () => {
        document.getElementById('product-modal')?.remove();
        this.overlay.classList.replace('display', 'hide');
      };

      // Get product by id
      if (itemAction === Action.EDIT) {
        const id = e.target.parentNode.parentNode.id;
        const product = await handleGetProductId(id);

        if (product) {
          this.openModal(product);
          const submitBtn = document.getElementById('submit') as HTMLButtonElement;
          const cancelBtn = document.getElementById('cancel') as HTMLButtonElement;

          this.disabledEditButton(submitBtn);

          // Click submit button to edit product
          submitBtn.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            const inputName = document.getElementById('productName') as HTMLInputElement;
            const inputPrice = document.getElementById('productPrice') as HTMLInputElement;
            const inputDesc = document.getElementById('productDesc') as HTMLTextAreaElement;
            const inputUrl = document.getElementById('productUrl') as HTMLInputElement;

            const isValid = checkValidate(inputName, inputPrice, inputDesc, inputUrl, submitBtn);

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

          // Click cancel button to cancel edit product
          cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
          });

          // Close modal by click outside
          this.overlay.addEventListener('click', closeModal);

          // Close modal by using Escape key
          document.onkeydown = (evt: KeyboardEvent) => {
            evt = evt || window.event;
            let isEscape: boolean = false;

            'key' in evt && (isEscape = evt.key === 'Escape' || evt.key === 'Esc');
            isEscape && closeModal();
          };
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
        const id = e.target.parentNode.parentNode.id;
        this.confirmModal.classList.replace('hide', 'display');
        this.overlay.classList.replace('hide', 'display');

        document.getElementById('delete')?.addEventListener('click', () => {
          document.getElementById(id)?.remove();
          handleDeleteProduct(id);
          closeConfirmModal();
        });

        document.getElementById('delete-cancel')?.addEventListener('click', closeConfirmModal);

        // Close modal by click outside
        this.overlay.addEventListener('click', closeConfirmModal);

        // Close modal by using Escape key
        document.onkeydown = (evt: KeyboardEvent) => {
          evt = evt || window.event;
          let isEscape: boolean = false;

          'key' in evt && (isEscape = evt.key === 'Escape' || evt.key === 'Esc');
          isEscape && closeConfirmModal();
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
