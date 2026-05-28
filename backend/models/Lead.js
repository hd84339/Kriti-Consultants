const mongoose = require('mongoose')
const leadSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
  email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Valid email required'] },
  phone: { type: String, trim: true, default: '' },
  businessType: { type: String, trim: true, default: '' },
  message: { type: String, trim: true, maxlength: 2000, default: '' },
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'closed'], default: 'new' },
  source: { type: String, default: 'website' },
}, { timestamps: true })
leadSchema.index({ email: 1 })
leadSchema.index({ createdAt: -1 })
module.exports = mongoose.model('Lead', leadSchema)
