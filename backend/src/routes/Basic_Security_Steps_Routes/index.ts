import { Router } from 'express';


const router = Router();
router.route('/').get()
router.route('/:name').get()
router.route('/:name')
    .post()
    .delete()
    .patch()


export default router;