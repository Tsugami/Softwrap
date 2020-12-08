
module.exports = (error, _req, res, next) => {
  if (error) {
    console.error(error)
    return res.status(500).json({
      message: 'INTERNAL SERVER ERROR'
    })
  }
  return next()
}
