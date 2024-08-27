import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { checkDuplicateReading } from "../services/validationService";
import { getMeasurementFromImage } from "../services/geminiService";
import { addMeasurement, saveImage } from "../services/storageService";
import { createTemporaryLink } from "../utils/utils";

export const uploadImageController = async (req: Request, res: Response) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  if (!image || !customer_code || !measure_datetime || !measure_type) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos",
    });
  }

  if (checkDuplicateReading(customer_code, measure_type, measure_datetime)) {
    return res.status(409).json({
      error_code: "DOUBLE_REPORT",
      error: "Leitura do mês já realizada",
    });
  }

  try {
    const value = await getMeasurementFromImage(image);
    const guid = uuidv4();
    const filename = `${guid}.png`;

    //save img in uploads
    saveImage(image, filename);

    const temporaryLink = createTemporaryLink(req, filename);

    const measurementData = {
      measure_uuid: guid,
      measure_datetime: measure_datetime,
      measure_type: measure_type,
      has_confirmed: false,
      measure_value: value.toString(),
      image_url: temporaryLink,
    };

    addMeasurement(customer_code, measurementData);
    res.json({
      image_url: temporaryLink,
      measure_uuid: guid,
      measure_value: measurementData.measure_value,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing the image." });
  }
};
