const notFound = (req, res, next) => { const error = new Error(`Route not found: ${req.originalUrl}`); res.status(404); next(error) }
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  if (err.name === 'ValidationError') return res.status(400).json({ success: false, message: 'Validation Error', errors: Object.values(err.errors).map((e) => ({ field: e.path, message: e.message })) })
  if (err.code === 11000) return res.status(409).json({ success: false, message: 'Duplicate entry found' })
  return res.status(statusCode).json({ success: false, message: err.message || 'Internal Server Error' })
}
module.exports = { notFound, errorHandler }
