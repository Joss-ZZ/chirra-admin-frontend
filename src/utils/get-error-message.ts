import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown) => {
  let message = "Error desconocido";
  if (error instanceof AxiosError) {
    if (error.response) {
      message = error.response.data.message;
    } else {
      message = "No se pudo establecer conexión con el servidor";
    }
  } else {
    message = (error as Error).message;
  }
  return message;
};
