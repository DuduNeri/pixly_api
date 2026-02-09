import { UPLOADS_DIR } from "../config/paths";
import multer from "multer";
import { randomBytes } from "crypto";

export const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOADS_DIR,
    filename(req, file, cb) {
      const hash = randomBytes(8).toString("hex");
      cb(null, `${hash}-${file.originalname}`);
    },
  }),
});
