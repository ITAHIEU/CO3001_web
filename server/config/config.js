const path = require('path');

const UPLOAD_FOLDER = path.join(__dirname, '../uploads');
const PERMITTED_FILE_TYPES = ['pdf', 'docx', 'jpg', 'png', 'pptx'];

module.exports = {
  UPLOAD_FOLDER,
  PERMITTED_FILE_TYPES,
};