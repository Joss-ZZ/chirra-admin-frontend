import { ProductsTable } from "../components/products";
import DefaultLayout from "../layout/DefaultLayout";

export const ProductsPage = () => {

  return (
    <DefaultLayout>
      <div className="w-full pt-3 px-6">
        <h1 className="text-2xl font-bold">Productos</h1>
      </div>
      <ProductsTable />
    </DefaultLayout>
  );
};