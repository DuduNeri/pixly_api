import Image from "../models/image.model";
import { AppError } from "../utils/appError";

export class ImageService {
  //permite fazer o upload de arquivos
  async imageUpload(file: Express.Multer.File) {
    if (!file) {
      throw new AppError(400, "Nenhuma imagem enviada");
    }

    const base64 = file.buffer.toString("base64");

    const newImage = await Image.create({
      name: file.originalname,
      type: file.mimetype,
      data: base64,
    });

    return {
      id: newImage.id,
      name: newImage.name,
      type: newImage.type,
    };
  }
  //busca uma imagem especifica pelo id
  async getImage(id: string) {
    const image = await Image.findByPk(id);

    if (!image) {
      throw new AppError(404, "Imagem não encontrada");
    }

    return {
      id: image.id,
      name: image.name,
      type: image.type,
      data: image.data,
    };
  }
}
