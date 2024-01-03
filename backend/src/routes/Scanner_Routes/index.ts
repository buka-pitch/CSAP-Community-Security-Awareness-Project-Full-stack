import { Router } from 'express';


const router = Router();
router.route('/file').post();
router.route('/url').post();
export default router;