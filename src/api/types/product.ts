import { Product } from "../../entities";

export interface CreateProductDto
  extends Pick<
    Product,
    "price" | "description" | "contactNumber" | "images"
  > {
  id?: number;
}

export interface UpdateProductDto extends CreateProductDto {}