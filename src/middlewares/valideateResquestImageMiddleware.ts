import { Request, Response, NextFunction } from "express";

export default function validateRequestImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { image } = req.body;

  if (!image || !/^data:image\/(png|jpg|jpeg);base64,/.test(image)) {
    return res.status(400).json({
      error: "Invalid image format. Only base64 encoded images are allowed.",
    });
  }

  next();
}
