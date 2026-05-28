const { validationResult } = require('express-validator')
const Lead = require('../models/Lead')
const { sendLeadNotification, sendAutoReply } = require('../services/emailService')

const submitContact = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array().map((e) => ({ field: e.path, message: e.msg })) })
  const { name, email, phone, businessType, message } = req.body
  try {
    const lead = await Lead.create({ name, email, phone, businessType, message })
    Promise.allSettled([sendLeadNotification(lead), sendAutoReply(lead)]).then((results) => {
      results.forEach((r, i) => { if (r.status === 'rejected') console.error(`Email ${i} failed:`, r.reason?.message) })
    })
    return res.status(201).json({ success: true, message: 'Your enquiry has been received. We will contact you within 24 hours.', data: { id: lead._id } })
  } catch (error) {
    console.error('Contact error:', error)
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' })
  }
}

const getLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const [leads, total] = await Promise.all([Lead.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit), Lead.countDocuments()])
    return res.json({ success: true, data: leads, pagination: { page, limit, total, pages: Math.ceil(total / limit) } })
  } catch (error) { return res.status(500).json({ success: false, message: 'Server error' }) }
}

module.exports = { submitContact, getLeads }
