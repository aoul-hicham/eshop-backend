const multer = require('multer')
const { generateUniqueFilename } = require('../helpers/file-helpers')

// Allowed types for product images
const ALLOWED_FILES = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
}

// multer control on storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValidImage = ALLOWED_FILES[file.mimetype]

    // Product image validation
    if (!isValidImage) cb(new Error('Invalid provided image'), 'public/uploads')
    else cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, generateUniqueFilename(file.originalname))
  },
})

const uploadOptions = multer({ storage: storage })

module.exports = { uploadOptions }
