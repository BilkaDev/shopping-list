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
      const ext: string = (MIME_TYPE_MAP as any)[file.mimetype] as string;
      return cb(null, `${uuid()}.${ext}`);
    },
  });
}

export function multerFileFilter(req: Request, file: Express.Multer.File, cb: (error: Error, destination: boolean) => void) {
  const isValid = !!(MIME_TYPE_MAP as any)[file.mimetype];
  if (!isValid) {
    cb(new BadRequestException("Unsupported file type"), false);
  } else {
    cb(null, true);
  }
}
