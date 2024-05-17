import { useForm } from "react-hook-form";
import { CreateUserDto } from "../../api";
import { FC, useEffect } from "react";
import { Product } from "../../entities";
import { Subject } from "rxjs";

type ProductForm = CreateUserDto;
type Props = {
  setShowModal: (show: boolean) => void;
  product?: Product;
};

export const productFormDataSubject = new Subject<CreateUserDto>();

export const ProductForm: FC<Props> = ({ setShowModal, product }) => {

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: product,
  });

  const onSubmit = async (dto: CreateUserDto) => {
    let success = false;
    if (success) {
      setShowModal(false);
      reset();
      productFormDataSubject.next(dto);
    }
  };

  useEffect(() => {
    if(!product?.id){
      reset();
    }

    if (product) setShowModal(true);
  }, [product]);

  return (
    <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 mb-16 grid-cols-2">
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="name"
            className="block mb-2 text-sm text-gray-900 dark:text-white text-start"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type product name"
            {...register("name", {
              required: "El nombre es requerido",
            })}
          />
        </div>
      </div>

      <button
        type="submit"
        className="text-white inline-flex items-center bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Guardar
      </button>
    </form>
  );
};
