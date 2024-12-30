const Printer = require('../models/printerModel');
const db = require('../database/dbinfo');

const printerController = {
  getPrinters: async (req, res) => {
    try {
      const [printers] = await Printer.getAll();
      res.json(printers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching printers', error });
    }
  },
  getPrinterById: async (req, res) => {
    const { userId } = req.params;
    try {
      const printer = await Printer.getById(userId);
      res.status(200).json(printer);
    } catch (error) {
      res.status(500).json({ message: `Error fetching printer by ${userId}`, error });
    }
  },
  createPrinter: async (req, res) => {
    const { brand, model, description, campus_name, building_name, room_number, status } = req.body;
    try {
      await Printer.create(brand, model, description, campus_name, building_name, room_number, status);
      res.status(201).json({ message: 'Printer created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating printer', error });
    }
  },
  updatePrinterStatus: async (req, res) => {
    const { printerId } = req.params;
    const { status } = req.body;
    try {
      await Printer.updateStatus(printerId, status);
      res.status(200).json({ message: 'Printer status updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating printer status', error });
    }
  },
  updatePrinter: async (req, res) => {
    const { printerId } = req.params;
    const { brand, model, description, campus_name, building_name, room_number, status } = req.body;
    try {
      const query = `
        UPDATE Printers
        SET brand = ?, model = ?, description = ?, campus_name = ?, building_name = ?, room_number = ?, status = ?
        WHERE printer_id = ?
      `;
      const [result] = await db.query(query, [brand, model, description, campus_name, building_name, room_number, status, printerId]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Printer not found' });
      }
      res.status(200).json({ message: 'Printer updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating printer', details: error.message });
    }
  },

  deletePrinter: async (req, res) => {
    const { printerId } = req.params;
    try {
      const query = `
        DELETE FROM Printers WHERE printer_id = ?
      `;
      const [result] = await db.query(query, [printerId]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Printer not found' });
      }
      res.status(200).json({ message: 'Printer deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting printer', details: error.message });
    }
  },

};

module.exports = printerController;