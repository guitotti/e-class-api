import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve('uploads'));
  },

  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});