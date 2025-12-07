import { ImageService } from "../services/image.service";

export class ImageController {
  private imageService: ImageService;

  constructor() {
    this.imageService = new ImageService();
  }

  async postImage(file: Express.Multer.File) {
    try {
      return await this.imageService.imageUpload(file);
    } catch (error: any) {
      throw new Error(`Erro ao fazer upload da imagem:${error.message}`);
    }
  }

  async getImage(id: string): Promise<any> {
    try {
      return await this.getImage(id);
    } catch (error: any) {
      throw new Error(`Erro ao buscar imagem:${error.message}`);
    }
  }
}
