import { getErrorMessage } from "./get-error-message";
import { Toast } from "./toast";

export const asyncWrapper = async (
  func: () => Promise<any>,
  setIsLoading: (show: boolean) => void
) => {
  let response = {
    success: false,
    data: null,
  };
  try {
    setIsLoading(true);
    response.data = await func();
    response.success = true;
  } catch (error) {
    let message = getErrorMessage(error);
    if (Array.isArray(message)) {
      for (const m of message) {
        Toast.error(m);
      }
    } else {
      Toast.error(message);
    }
  }
  setIsLoading(false);
  return response;
};
