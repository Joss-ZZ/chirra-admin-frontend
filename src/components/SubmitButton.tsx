import { FC } from "react";

interface SubmitButtonProps {
  isLoading: boolean;
  buttonText: string;
}

export const SubmitButton: FC<SubmitButtonProps> = ({
  isLoading,
  buttonText,
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-primary-800 ${
        isLoading ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {isLoading ? "Cargando..." : buttonText}
    </button>
  );
};
