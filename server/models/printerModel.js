const db = require('../database/dbinfo');
const documentModel= require('../models/documentModel');
const config= require('../config/config')

const Printer = {
  getAll: () => db.query('SELECT * FROM Printers'),
  create: (brand, model, description, campus_name, building_name, room_number, status) =>
    db.query(
      'INSERT INTO Printers (brand, model, description, campus_name, building_name, room_number, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [brand, model, description, campus_name, building_name, room_number, status || 'enabled']
    ),
  updateStatus: (printerId, status) =>
    db.query('UPDATE Printers SET status = ? WHERE printer_id = ?', [status, printerId]),
  delete: (printerId) => db.query('DELETE FROM Printers WHERE printer_id = ?', [printerId]),
  validatePrintRequest: (paperSize, printDuplex, orientation) => {
    const validPaperSizes = ['A4', 'A3'];
    const validOrientations = ['portrait', 'landscape'];

    return validPaperSizes.includes(paperSize) && validOrientations.includes(orientation) && typeof printDuplex === 'boolean';
  },

  validateFileType: (fileType) => {
    if (!fileType) return false;
    return config.PERMITTED_FILE_TYPES.includes(fileType.toLowerCase());
  },
  getById: async (printerId) => {
    const [rows] = await db.query('SELECT * FROM Printers WHERE printer_id = ?', [printerId]);
    return rows[0];
  },

  async sendPrintRequest(printerId, documentModel, properties) {
    if (!documentModel || !documentModel.name) {
      throw new Error('Invalid document model: name is required.');
    }
    if (!properties.paperSize || typeof properties.printDuplex !== 'boolean') {
      throw new Error('Invalid print properties: paperSize and printDuplex are required.');
    }

    // Simulate sending print request
    return `Print job sent to printer ${printerId} for document ${documentModel.name} with properties: ${JSON.stringify(properties)}`;
  },
};

module.exports = Printer;