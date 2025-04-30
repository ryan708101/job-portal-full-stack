import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'
import { clerkMiddleware } from '@clerk/express'
import { ensureUserInDb } from '../middleware/ensureUserInDb.js'

const router = express.Router()

// Get user Data
router.get('/user', clerkMiddleware(), ensureUserInDb, (req, res, next) => { console.log('GET /user route hit'); next(); }, getUserData)

// Apply for a job
router.post('/apply', clerkMiddleware(), ensureUserInDb, (req, res, next) => { console.log('POST /apply route hit'); next(); }, applyForJob)

// Get applied jobs data
router.get('/applications', clerkMiddleware(), ensureUserInDb, (req, res, next) => { console.log('GET /applications route hit'); next(); }, getUserJobApplications)

// Update user profile (resume)
router.post('/update-resume', clerkMiddleware(), ensureUserInDb, upload.single('resume'), (req, res, next) => { console.log('POST /update-resume route hit'); next(); }, updateUserResume)

export default router;