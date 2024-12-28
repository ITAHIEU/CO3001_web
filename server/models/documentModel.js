class document {
    constructor(documentID, name, fileType, pageCount) {
      this.documentID = documentID; // Unique identifier for the document
      this.name = name;            // Name of the document
      this.fileType = fileType;    // File type (e.g., 'pdf', 'docx')
      this.pageCount = pageCount;  // Number of pages in the document
    }
  
    static validateFileType(fileType, permittedTypes) {
      return permittedTypes.includes(fileType.toLowerCase());
    }
      // Add document metadata to the in-memory collection
  static addDocument(document) {
    if (!this.validateFileType(document.fileType)) {
      throw new Error(`Invalid file type: ${document.fileType}`);
    }
    this.documents.push(document);
  }

  // Get a document by its ID from the in-memory collection
  static getById(documentID) {
    return this.documents.find(doc => doc.documentID === documentID);
  }

  // Retrieve the file path for a document
  static getFilePath(documentID) {
    const doc = this.getById(documentID);
    if (!doc) {
      throw new Error(`Document with ID ${documentID} not found`);
    }
    const fileName = `${doc.name}.${doc.fileType}`;
    const filePath = path.join(UPLOAD_FOLDER, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found in uploads folder: ${fileName}`);
    }
    return filePath;
  }
  }
  
  module.exports = document;