const db = require('../database/dbinfo');
const PrintJobModel = {
  create: async (data) => {
    const query = `
      INSERT INTO Print_Jobs (user_id, printer_id, file_name, page_count_a4, page_count_a3, sides, copies, start_time, end_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 10 MINUTE))
    `;
    await db.query(query, [
      data.user_id,
      data.printer_id,
      data.file_name,
      data.page_count_a4,
      data.page_count_a3,
      data.sides,
      data.copies,
    ]);
  },
};

module.exports = PrintJobModel;