import {Router} from 'express';
import { getAllStages } from '../controllers/stagesControllers';

const router = Router();

router.get('/getstages', getAllStages);

export default router;