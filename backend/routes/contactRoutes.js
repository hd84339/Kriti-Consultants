const express = require('express')
const { body } = require('express-validator')
const { submitContact, getLeads } = require('../controllers/contactController')
const router = express.Router()

const validation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('phone').optional().trim().isLength({ max: 20 }),
  body('businessType').optional().trim().isLength({ max: 100 }),
  body('message').optional().trim().isLength({ max: 2000 }),
]

router.post('/', validation, submitContact)
router.get('/leads', getLeads)

module.exports = router
