import fs from "fs";
import path from "path";
import { IDataEntry } from "./storageService";

const filePath = path.join(__dirname, "..", "data", "measurements.json");

export const checkDuplicateReading = (
  customerCode: string,
  measureType: string,
  measureDateTime: string
): boolean => {
  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  const duplicate = data.some(
    (e: IDataEntry) =>
      e.customer_code === customerCode &&
      e.measures.some((x) => x.measure_type === measureType) &&
      e.measures.some((x) => x.measure_datetime === measureDateTime)
  );

  return duplicate;
};
