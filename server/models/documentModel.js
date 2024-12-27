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
  }
  
  module.exports = document;