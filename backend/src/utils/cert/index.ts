import fs from "fs";
import PDFDocument from "pdfkit";
// const PDFDocument = require('pdfkit');

export async function GenerateCertificate(
  FullName: string,
  CourseName: string
) {
  function jumpLine(doc: any, lines: number) {
    for (let index = 0; index < lines; index++) {
      doc.moveDown();
    }
  }
  try {
    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
    });

    // Helper to move to next line

    doc.pipe(fs.createWriteStream("/output.pdf"));

    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");

    doc.fontSize(10);

    // Margin
    const distanceMargin = 18;

    doc
      .fillAndStroke("#0e8cc3")
      .lineWidth(20)
      .lineJoin("round")
      .rect(
        distanceMargin,
        distanceMargin,
        doc.page.width - distanceMargin * 2,
        doc.page.height - distanceMargin * 2
      )
      .stroke();

    // Header
    const maxWidth = 140;
    const maxHeight = 70;

    doc.image("assets/winners.png", doc.page.width / 2 - maxWidth / 2, 60, {
      fit: [maxWidth, maxHeight],
      align: "center",
    });

    jumpLine(doc, 5);

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("Cyber security Awarness for Digital Safty", {
        align: "center",
      });

    jumpLine(doc, 2);

    // Content
    doc
      .font("fonts/NotoSansJP-Regular.otf")
      .fontSize(16)
      .fill("#021c27")
      .text("CERTIFICATE OF COMPLETION", {
        align: "center",
      });

    jumpLine(doc, 1);

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("Present to", {
        align: "center",
      });

    jumpLine(doc, 2);

    doc
      .font("fonts/NotoSansJP-Bold.otf")
      .fontSize(24)
      .fill("#021c27")
      .text(`${FullName}`, {
        align: "center",
      });

    jumpLine(doc, 1);

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(10)
      .fill("#021c27")
      .text(
        `this CERTIFICATE is Given to Prove for Successfully completing  the CSAP - (Commnuity Scam Awarness Programm) ${CourseName} `,
        {
          align: "center",
        }
      );

    jumpLine(doc, 7);

    // Validation link
    const link = "CSAP - (Commnuity Scam Awarness program) for Cyber Awarness";

    const linkWidth = doc.widthOfString(link);
    const linkHeight = doc.currentLineHeight();

    doc
      .underline(
        doc.page.width / 2 - linkWidth / 2,
        448,
        linkWidth,
        linkHeight,
        { color: "#021c27" }
      )
      .link(
        doc.page.width / 2 - linkWidth / 2,
        448,
        linkWidth,
        linkHeight,
        link
      );

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(10)
      .fill("#021c27")
      .text(
        link,
        doc.page.width / 2 - linkWidth / 2,
        500
        // linkWidth
        // linkHeight
      );

    // Footer
    const bottomHeight = doc.page.height - 100;

    doc.end();
    const pdfCert = fs.readFileSync("/output.pdf");
    return pdfCert;
  } catch (error) {
    console.log(error);
  }
}
