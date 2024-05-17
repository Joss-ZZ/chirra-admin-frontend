import { Bounce, Id, toast } from "react-toastify";

export class Toast {
  static success(message: string) {
    toast.success(message);
  }
  static error(message: string) {
    toast.error(message);
  }
  static info(message: string) {
    toast.info(message);
  }
  static warning(message: string) {
    toast.warning(message);
  }

  static loading(message: string) {
    const id = toast.loading(message);
    return id;
  }

  static hide(id: Id) {
    toast.dismiss(id);
  }

  static static(message: string, onClick: () => void) {
    toast.success(message, {
      icon: false,
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      onClick,
    });
  }
}
