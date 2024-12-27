const Printer = require('../models/printerModel');

const printerController = {
  getPrinters: async (req, res) => {
    try {
      const [printers] = await Printer.getAll();
      res.json(printers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching printers', error });
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
};

module.exports = printerController;