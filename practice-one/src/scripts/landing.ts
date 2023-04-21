import ProductModel from './models/product.model';
import FootwearView from './views/footwear.view';
import FootwearController from './controllers/footwear.controller';

new FootwearController(new ProductModel(), new FootwearView());
