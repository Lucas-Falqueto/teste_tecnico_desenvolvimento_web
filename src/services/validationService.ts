import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "..", "data", "measurements.json");

export const checkDuplicateReading = (
  customerCode: string,
  measureType: string,
  measureDateTime: Date
): boolean => {
  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  const duplicate = data.some(
    (e) =>
      e.customer_code === customerCode &&
      e.measures.measure_type === measureType &&
      e.measures.measure_datetime === measureDateTime
  );

  return duplicate;
};
