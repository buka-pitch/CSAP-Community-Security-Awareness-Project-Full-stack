import { Router } from "express";


const router = Router();


router.route('/').get();
router.route('/new').post();
router.route('/:id').get();
router.route('/:id').patch();
router.route('/:id').delete();


export default router;