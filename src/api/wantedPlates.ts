import { ApiResponse } from "./types";
import { AxiosInstance } from "axios";
import { Product } from "../entities";
import { WantedPlatesCreate } from "./types/wantedPlates";

export class WantedPlatesApi {
  private readonly path = "/wanted-plates";

  constructor(private readonly instance: AxiosInstance) {}
  async create(dto: WantedPlatesCreate) {
    const response = await this.instance.post<ApiResponse<Product>>(
      this.path,
      dto
    );
    return response.data;
  }
}
