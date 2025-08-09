import { Router } from 'express';
import PokemonController from '../controller/PokemonController';
import defaultMiddlware from '../middlewares/defaultMiddleware';


const router = Router();
const controller = new PokemonController();

router.use(defaultMiddlware);

router.post('/pokemon', controller.create);
router.get('/pokemon', controller.list);
router.get('/pokemon/:id', controller.findById);
router.put('/pokemon/:id', controller.update);
router.delete('/pokemon/:id', controller.delete);

export default router;