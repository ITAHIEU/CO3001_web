const UserModel = require('../models/userModel');
const PrintJobModel = require('../models/printJob');
const PrinterModel = require('../models/printerModel');

const createPrintJob = async (req, res) => {
  const { user_id, printer_id, file_name, page_size, sides, copies } = req.body;

  try {
    
    // Kiểm tra các giá trị bắt buộc
    if (!user_id || isNaN(user_id)) {
      return res.status(400).json({ error: 'Invalid or missing user_id' });
    }
    if (!printer_id || isNaN(printer_id)) {
      return res.status(400).json({ error: 'Invalid or missing printer_id' });
    }
    if (!file_name || typeof file_name !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing file_name' });
    }
    if (!page_size || !['A4', 'A3'].includes(page_size)) {
      return res.status(400).json({ error: 'Invalid page_size. Must be A4 or A3' });
    }
    if (!sides || !['one-sided', 'double-sided'].includes(sides)) {
      return res.status(400).json({ error: 'Invalid sides. Must be one-sided or double-sided' });
    }
    if (!copies || isNaN(copies) || copies <= 0) {
      return res.status(400).json({ error: 'Invalid copies. Must be a positive number' });
    }

    // Kiểm tra người dùng
    const user = await UserModel.getById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Kiểm tra máy in
    const printer = await PrinterModel.getById(printer_id);
    if (!printer || printer.status !== 'enabled') {
      return res.status(400).json({ error: 'Printer not available or disabled' });
    }

    // Tính toán số trang in
    const page_count_a4 = page_size === 'A4' ? copies : 0;
    const page_count_a3 = page_size === 'A3' ? copies : 0;

    if (isNaN(page_count_a4) || isNaN(page_count_a3)) {
      return res.status(400).json({ error: 'Error calculating page counts' });
    }

    // Kiểm tra số dư
    const total_pages = page_count_a4 + (page_count_a3 * 2); // A3 tương đương 2 trang A4
    if (user.balance < total_pages) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    console.log({
      user_id,
      user  
    })
    // Cập nhật số dư người dùng
    await UserModel.updateBalance(user_id, user.balance - total_pages);

    console.log({
      user_id,
      printer_id,
      file_name,
      page_count_a4,
      page_count_a3,
      sides,
      copies,
    });
    
    // Tạo print job
    await PrintJobModel.create({
      user_id,
      printer_id,
      file_name,
      page_count_a4,
      page_count_a3,
      sides,
      copies,
    });

    res.status(201).json({ message: 'Print job created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating print job', details: error.message });
  }
};


module.exports = { createPrintJob };
