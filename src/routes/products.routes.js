import { Router } from 'express'
const router = Router();

import * as productCtrl from '../controllers/products.controller'
import verifyToken from '../middlewares/verifyToken'

router.get('/', verifyToken, productCtrl.getProducts);
router.post('/', verifyToken, productCtrl.createProduct);
router.get('/:id', verifyToken, productCtrl.getProduct);
router.put('/:id', verifyToken, productCtrl.updateProduct);
router.delete('/:id', verifyToken, productCtrl.deleteProduct);

export default router;