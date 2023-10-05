// Get filename
const getFileName = (filename, req = null) => {
  if (req) {
    const urlPath = `${req.protocol}://${req.hostname}:${process.env.port}/${process.env.apiUrl}`
    filename.replace(urlPath, null)
  }

  return filename
}

// Get file extension
const getFileExt = (filename) => {
  return filename.split('.').pop()
}

// Generate a unique file name from a given filename
const generateUniqueFilename = (filename) => {
  let ext = getFileExt(filename)
  filename = filename.replace(' ', '_') // replace spaces
  filename = filename.replace(`.${ext}`, '') // replace the extension

  filename += `_${Date.now()}.${ext}` // conbine date and extension to filename

  return filename
}

// p

module.exports = {
  getFileName,
  getFileExt,
  generateUniqueFilename,
}
