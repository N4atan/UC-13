import { Router } from 'express';
import BoxController from '../controller/BoxController';
import defaultMiddlware from '../middlewares/defaultMiddleware';

const router = Router();
const controller = new BoxController();

router.use(defaultMiddlware);

router.post('/box', controller.create);
router.get('/box', controller.list);
router.get('/box/:id', controller.findById);
router.put('/box/:id', controller.update);
router.delete('/box/:id', controller.delete);

export default router;