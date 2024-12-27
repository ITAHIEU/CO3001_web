const User = require('../models/userModel');
const Document = require('../models/documentModel');
const PrintLog = require('../models/printJob');
const Printer = require('../models/Printer');

class PrintProcessController {
  static async printDocument(req, res) {
    const printProp = req.body;

    if (typeof printProp.pageDuplex !== 'boolean') {
      return res.status(400).json({ error: 'Invalid pageDuplex value. It must be a boolean.' });
    }
    if (!printProp.documentID || !printProp.printerId) {
      return res.status(400).json({ error: 'documentID and printerId are required.' });
    }

    try {
      const [user] = await User.getById(printProp.userId);

      if (!user.length) {
        return res.status(404).json({ error: 'User not found' });
      }

      const [document] = await Document.getById(printProp.documentID);
      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }

      const { fileType } = document;
      const { pageCount, pageSize } = printProp;

      let pageCountA4 = 0;
      let pageCountA3 = 0;

      if (pageSize === 'A4') {
        pageCountA4 = pageCount * printProp.numberOfCopies;
      } else if (pageSize === 'A3') {
        pageCountA3 = pageCount * printProp.numberOfCopies;
      }

      const totalPageCount = pageCountA4 + pageCountA3;

      if (user[0].balance < totalPageCount) {
        return res.status(400).json({ error: 'Insufficient page balance to print' });
      }

      const [printer] = await Printer.getById(printProp.printerId);
      if (!printer || !printer.state) {
        return res.status(400).json({ error: 'Printer not available or disabled' });
      }

      if (!Printer.validateFileType(fileType)) {
        return res.status(400).json({ error: 'Invalid document type for printing' });
      }

      const newBalance = user[0].balance - totalPageCount;
      await User.updateBalance(printProp.userId, newBalance);

      const printResult = await Printer.sendPrintRequest(printProp.printerId, document, printProp);

      await PrintLog.create({
        userId: printProp.userId,
        printerId: printProp.printerId,
        fileName: document.name,
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 600000),
        pageCountA4,
        pageCountA3,
        sides: printProp.pageDuplex ? 'double-sided' : 'one-sided',
        numberOfCopies: printProp.numberOfCopies,
      });

      res.status(200).json({
        message: 'Document printed successfully',
        remainingBalance: newBalance,
        printResult,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error processing print request', details: error.message });
    }
  }
}

module.exports = PrintProcessController;
