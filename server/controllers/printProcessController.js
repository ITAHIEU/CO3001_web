const UserModel  = require('../models/userModel');
// const Document = require('../models/documentModel');
const PrintJobModel  = require('../models/printJob');
const PrinterModel  = require('../models/printerModel');

const createPrintJob = async (req, res) => {
  const { user_id, printer_id, file_name, page_size, sides, copies } = req.body;

  try {
    const user = await UserModel.getById(user_id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const printer = await PrinterModel.getById(printer_id);
    if (!printer || printer.status !== 'enabled') {
      return res.status(400).json({ error: 'Printer not available' });
    }

    const totalPages = page_size === 'A3' ? copies * 2 : copies;
    if (user.balance < totalPages) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    await UserModel.updateBalance(user_id, user.balance - totalPages);

    await PrintJobModel.create({
      user_id,
      printer_id,
      file_name,
      page_count_a4: page_size === 'A4' ? copies : 0,
      page_count_a3: page_size === 'A3' ? copies : 0,
      sides,
      copies,
    });

    res.status(201).json({ message: 'Print job created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating print job', details: error.message });
  }
};

module.exports = { createPrintJob };