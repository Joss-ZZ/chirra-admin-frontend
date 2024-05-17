import { AuthApi } from "./auth";
import { instance } from "./instance";
import { ProductApi } from "./product";
import { WantedPlatesApi } from "./wantedPlates";

export const authApi = new AuthApi(instance);
export const producApi = new ProductApi(instance);
export const wantedPlatesApi = new WantedPlatesApi(instance);

export * from "./types";
