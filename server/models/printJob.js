const db = require('../database/dbinfo');

class printLog {
    static async create({ userId, printerId, document_name, start_time, end_time, pageCount_a4, pageCount_a3, paperSize, printDuplex, numberOfCopies, }) {
      try {
        await db.promise().query(
          'INSERT INTO PrintLogs (user_id, printId, document_name, start_time, end_time, page_count_a4, page_count_a3, paper_size, print_duplex, number_of_copies, orientation, timestamp, printer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [userId, printerId, document_name, start_time, end_time, pageCount_a4, pageCount_a3, paperSize, printDuplex, numberOfCopies, orientation, timestamp, printerId]
        );
      } catch (error) {
        throw new Error('Error logging print job: ' + error.message);
      }
    }
  }
  
  module.exports = printLog;
  