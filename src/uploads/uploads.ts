import multer from "multer";
import path from "path";
import crypto from "crypto";

export const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), "uploads"),
    filename(req, file, cb) {
      const hash = crypto.randomBytes(8).toString("hex");
      const filename = `${hash}-${file.originalname.replace(/\s/g, "_")}`;
      cb(null, filename);
    },
  }),
});