import { Request, Response } from "express";
import { loadMeasurements } from "../utils/utils";

export const customerGetController = async (req: Request, res: Response) => {
  const { customer_code } = req.params;
  const measureTypeQuery = req.query.measure_type as string;

  const measurements = loadMeasurements();

  const customerMeasurements = measurements.filter(
    (m) => m.customer_code === customer_code
  );

  if (customerMeasurements.length === 0) {
    return res.status(404).json({
      error_code: "MEASURES_NOT_FOUND",
      error_description: "Nenhuma leitura encontrada",
    });
  }

  if (measureTypeQuery) {
    const measureType = measureTypeQuery.toUpperCase();
    if (measureType !== "WATER" && measureType !== "GAS") {
      return res.status(400).json({
        error_code: "INVALID_MEASURE_TYPE",
        error_description: 'O tipo de medição deve ser "WATER" ou "GAS".',
      });
    }

    const filteredMeasurements = customerMeasurements.filter(
      (m) => m.measures.measure_type.toUpperCase() === measureType
    );

    if (filteredMeasurements.length == 0) {
      return res.status(404).json({
        error_code: "MEASURES_NOT_FOUND",
        error_description: "Nenhuma leitura encontrada",
      });
    }
    return res.status(200).json(filteredMeasurements);
  }
  return res.status(200).json(customerMeasurements);
};
