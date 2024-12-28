class printProperties {
    constructor(userId=0, paperSize = 'A4', DocumentId= 1, PrintID= 1, pageCount, printDuplex = false, numberOfCopies = 1, pageToPrint = [], orientation = 'portrait') {
        this.userId=userId;
        this.DocumentId= DocumentId;
        this.PrintID=PrintID;
        this.paperSize = paperSize;
        this.pageCount = pageCount;
        this.printDuplex = printDuplex;
        this.numberOfCopies = numberOfCopies;
        this.pageToPrint = pageToPrint; // array of specific pages to print
        this.orientation = orientation; // portrait or 
    }
}

module.exports = printProperties;