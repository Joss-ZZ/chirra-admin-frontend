import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../hooks";
import { SignInDto } from "../api";
import { SubmitButton } from "../components";
import Logo from "../assets/svg/logo.svg";

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInDto>();
  const { signIn, isLoadingAuth } = useAuth();

  const onSubmit: SubmitHandler<SignInDto> = async (data) => {
    await signIn(data);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      ></a>
      <img src={Logo} alt="Logo de Chirra" />
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-900 md:text-2xl dark:text-white text-center">
            Iniciar sesión
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Correo electrónico
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ingrese su correo electrónico"
                {...register("email", {
                  required: "Correo electrónico requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "El correo electrónico es invalido",
                  },
                })}
              />
              <p className="text-rose-600 text-xs mt-2 text-xs mt-2">
                {errors.email && errors.email.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("password", {
                  required: "La contraseña es requerida",
                })}
              />
              <p className="text-rose-600 text-xs mt-2">
                {errors.password && errors.password.message}
              </p>
            </div>
            <SubmitButton
              buttonText="Iniciar sesión"
              isLoading={isLoadingAuth}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
