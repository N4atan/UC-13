import { Router } from 'express';
import { createUser,  findById, readUsers, updateById, deleteById } from '../controllers/userController';

const router = Router();

router.post     ('/user'          , createUser );
router.get      ('/user/:id'      , findById   );
router.get      ('/user'          , readUsers  );
router.put      ('/user/:id'      , updateById );
router.delete   ('/user/:id'      , deleteById );

export default router;