const db = require('../database/dbinfo');
const PrintJobModel = {
  create: async (data) => {
     // Đảm bảo tất cả các giá trị đều hợp lệ
     if (
      isNaN(data.user_id) ||
      isNaN(data.printer_id) ||
      typeof data.file_name !== 'string' ||
      isNaN(data.page_count_a4) ||
      isNaN(data.page_count_a3) ||
      isNaN(data.copies)
    ) {
      throw new Error('Invalid data passed to create Print Job');
    }

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
  getAll: () => db.query('SELECT * FROM Print_Jobs'),
  getById: async (printer_id) => {
      const [rows] = await db.query(`SELECT 
        pj.job_id, 
        pj.user_id, 
        pj.printer_id, 
        pj.file_name, 
        pj.start_time, 
        pj.end_time, 
        pj.page_count_a4, 
        pj.page_count_a3, 
        pj.sides, 
        pj.copies, 
        pj.created_at,
        p.brand, 
        p.model, 
        p.description,
        p.campus_name,
        p.building_name,
        p.room_number,
        p.status
      FROM 
        Print_Jobs pj
      JOIN 
        Printers p ON pj.printer_id = p.printer_id
      WHERE 
        pj.user_id = ?`, [printer_id]);
      return rows;
    },
};

module.exports = PrintJobModel;