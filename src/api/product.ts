import { ApiResponse } from "./types";
import { AxiosInstance } from "axios";
import { CreateProductDto } from "./types/product";
import { Product } from "../entities";

export class ProductApi {
  private readonly path = "/products";

  constructor(private readonly instance: AxiosInstance) {}
  async create(dto: CreateProductDto) {
    const formData = new FormData();

    Object.entries(dto).forEach(([key, value]) => {
      if (key === "images" && value instanceof FileList) {
        Array.from(value).forEach((file) => {
          formData.append(key, file);
        })
      } else {
        formData.append(key, value as any)
      }
    })

    const response = await this.instance.post<ApiResponse<Product>>(
      this.path,
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  async findAll() {
    const response = await this.instance.get<ApiResponse<Product[]>>(
      this.path
    );
    return response.data;
  }
}
