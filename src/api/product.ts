import { ApiResponse } from "./types";
import { AxiosInstance } from "axios";
import { ProductCreate } from "./types/product";
import { Product } from "../entities";

export class ProductApi {
  private readonly path = "/products";

  constructor(private readonly instance: AxiosInstance) {}
  async create(dto: ProductCreate) {
    const response = await this.instance.post<ApiResponse<Product>>(
      this.path,
      dto
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
