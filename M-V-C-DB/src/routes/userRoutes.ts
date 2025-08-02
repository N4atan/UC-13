import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const controller = new UserController();

router.get('/users', controller.list);
router.post('/login', controller.login);
router.get('users/busca', controller.getByName) //Rotas com query declaradas sempre antes das que possuem params. Devido ao codigo ententer a query como params 
router.get('/users/:id', controller.getById);
router.post('/users', controller.create);
router.put('/users/:id', controller.update);
router.delete('/users/:id', controller.delete);

export default router;