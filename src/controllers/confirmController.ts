import { Request, Response } from "express";
import {
  loadMeasurements,
  saveMeasurements,
  validateRequestBody,
} from "../utils/utils";

export const confirmController = async (req: Request, res: Response) => {
  const { measure_uuid, confirmed_value } = req.body;
  if (!validateRequestBody(req.body)) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos.",
    });
  }

  const measurements = loadMeasurements();
  const measure = measurements.find(
    (m) => m.measures.measure_uuid === measure_uuid
  );

  if (!measure) {
    return res.status(404).json({
      error_code: "MEASURE_NOT_FOUND",
      error_description: "Leitura não encontrada.",
    });
  }

  if (measure.measures.has_confirmed) {
    return res.status(409).json({
      error_code: "CONFIRMATION_DUPLICATE",
      error_description: "Leitura já confirmada.",
    });
  }

  if (Number(measure.measures.measure_value === confirmed_value)) {
    measure.measures.has_confirmed = true;
    saveMeasurements(measurements);
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos.",
    });
  }
};
