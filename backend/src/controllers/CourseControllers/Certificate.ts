import { NextFunction, Request, Response } from "express";
import { GenerateCertificate } from "../../utils/cert";
export async function CertificateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("inside");
    if (!req.body.FullName || !req.body.CourseName)
      throw new Error("missing Required Fields!");
    let cert = await GenerateCertificate(
      req.body.FullName,
      req.body.CourseName
    );
    const responseData = {
      status: "success",
      statusCode: 200,
      message: "Course Data",
      data: cert,
    };

    res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposiion", "inline; filename=certificate.pdf");
    return res.send(cert);
    // return res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    return next(error);
  }
}
