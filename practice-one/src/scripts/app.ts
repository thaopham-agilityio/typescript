import ProductModel from './models/product.model';
import ProductView from './views/product.view';
import ProductController from './controllers/product.controller';

new ProductController(new ProductModel(), new ProductView());
