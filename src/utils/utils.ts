import fs from "fs";
import path from "path";
import { IDataEntry } from "../services/storageService";

const filePath = path.join(__dirname, "..", "data", "measurements.json");

export const loadMeasurements = (): IDataEntry[] => {
  return fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];
};

export const saveMeasurements = (data): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const validateRequestBody = (body): boolean => {
  return (
    typeof body.measure_uuid === "string" &&
    Number.isInteger(Number(body.confirmed_value))
  );
};

export const createTemporaryLink = (req, filename: string): string => {
  const protocol = req.protocol;
  const host = req.get("host");
  return `${protocol}://${host}/uploads/${filename}`;
};
