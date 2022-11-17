import * as path from "path";
import { diskStorage } from "multer";
import { v4 as uuid } from "uuid";
import { BadRequestException } from "@nestjs/common";

enum MIME_TYPE_MAP {
  "image/png" = "png",
  "image/jpeg" = "jpeg",
  "image/jpg" = "jpg",
}

export function storageDir() {
  return path.join(__dirname, "../../../src/storage");
}

export function multerStorage(dest: string) {
  return diskStorage({
    destination: (req, file, cb) => cb(null, dest),
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      return cb(null, `${uuid()}.${ext}`);
    },
  });
}

export function multerFileFilter(req, file, cb) {
  const isValid = !!MIME_TYPE_MAP[file.mimetype];
  if (!isValid) {
    cb(new BadRequestException("Unsupported file type"), false);
  } else {
    cb(null, true);
  }
}
