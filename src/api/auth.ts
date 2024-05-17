import { joinUrl } from "../utils/join-url";
import { ApiResponse, SignInDto, SignInResponse } from "./types";
import { AxiosInstance } from "axios";

export class AuthApi {
  private readonly path = "/auth";

  constructor(private readonly instance: AxiosInstance) {}
  async signIn(dto: SignInDto) {
    const response = await this.instance.post<ApiResponse<SignInResponse>>(
      joinUrl(this.path, "login"),
      dto
    );
    return response.data;
  }

  async signOut(userId: string) {
    await this.instance.post(joinUrl(this.path, "sign-out", userId));
  }
}
