import fs from "fs";
import path from "path";

export interface IMeasurement {
  measure_datetime: string;
  has_confirmed: boolean;
  measure_type: string;
  image_url: string;
  measure_uuid: string;
  measure_value: string;
}

export interface IDataEntry {
  customer_code: string;
  measures: IMeasurement;
}
const filePath = path.join(__dirname, "..", "data", "measurements.json");

export const saveImage = (base64Image: string, filename: string) => {
  const uploadDir = path.join(__dirname, "../uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
};

export const addMeasurement = (
  customer_code: string,
  { ...rest }: IMeasurement
): void => {
  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  data.push({
    customer_code,
    measures: { ...rest },
  }) as IDataEntry;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
