import { useForm } from "react-hook-form";
import { FC, useEffect } from "react";
import { Product } from "../../entities";
import { Subject } from "rxjs";
import { CreateProductDto, UpdateProductDto } from "../../api/types/product";
import { Toast } from "../../utils/toast";
import { producApi } from "../../api";

type ProductForm = CreateProductDto | UpdateProductDto;

type Props = {
  setShowModal: (show: boolean) => void;
  product?: Product;
};

export const productFormDataSubject = new Subject<CreateProductDto>();

export const ProductForm: FC<Props> = ({ setShowModal, product }) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ProductForm>({ defaultValues: product });

  const onSubmit = async (data: ProductForm) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "images" && data.images) {
        Array.from(data.images as FileList).forEach((file) => {
          formData.append("images", file);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    if (data.id) {
      // ACTUALIZAR
    } else {
      const toastId = Toast.loading("Registrando Producto...");
      try {
        const createProduct: CreateProductDto = {
          description: data.description,
          contactNumber: data.contactNumber,
          price: data.price,
          images: data.images,
        };
        await producApi.create(createProduct);
        Toast.success("Placas registradas correctamente");
        reset();
        setShowModal(false);
        productFormDataSubject.next(data);
      } catch (error) {
        Toast.loading("Ha ocurrido un error al registrar los productos");
      } finally {
        Toast.hide(toastId);
      }
    }
  };

  useEffect(() => {
    if (product) setShowModal(true);
  }, [product]);

  return (
    <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 mb-16 grid-cols-2">
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="description"
            className="block mb-2 text-sm text-gray-900 dark:text-white text-start"
          >
            Descripción
          </label>
          <textarea
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type product description"
            {...register("description", {
              required: "La descripción es requerida",
            })}
          />
          {errors.description && (
            <span className="text-red-600">{errors.description.message}</span>
          )}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="price"
            className="block mb-2 text-sm text-gray-900 dark:text-white text-start"
          >
            Precio
          </label>
          <input
            type="text"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type product price"
            {...register("price", {
              required: "El precio es requerido",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Ingrese un precio válido con hasta 2 decimales",
              }
            })}
          />
          {errors.price && (
            <span className="text-red-600">{errors.price.message}</span>
          )}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="contactNumber"
            className="block mb-2 text-sm text-gray-900 dark:text-white text-start"
          >
            Número de Contacto
          </label>
          <input
            type="tel"
            id="contactNumber"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type contact number"
            {...register("contactNumber", {
              required: "El número de contacto es requerido",
            })}
          />
          {errors.contactNumber && (
            <span className="text-red-600">{errors.contactNumber.message}</span>
          )}
        </div>
        <div className="col-span-2">
          <label
            htmlFor="photos"
            className="block mb-2 text-sm text-gray-900 dark:text-white text-start"
          >
            Fotos
          </label>
          <input
            type="file"
            id="photos"
            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            multiple
            {...register("images", {
              required: "Las fotos son requeridas",
            })}
          />
          {errors.images && (
            <span className="text-red-600">{errors.images.message}</span>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
