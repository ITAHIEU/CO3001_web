const db = require('../database/dbinfo');

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
};

module.exports = Printer;
