import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js' 
import { addLeave, getLeaves, getLeave } from '../controllers/leaveController.js'

const router = express.Router()


router.post('/add', authMiddleware, addLeave)
router.get('/:id', authMiddleware, getLeaves)
router.get('/employee/:id', authMiddleware, getLeave)


export default router