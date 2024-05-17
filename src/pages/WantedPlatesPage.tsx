import { WantedPlatesTable } from "../components/wanted-products";
import DefaultLayout from "../layout/DefaultLayout";

export const WantedPlatesPage = () => {

  return (
    <DefaultLayout>
      <div className="w-full pt-3 px-6">
        <h1 className="text-2xl font-bold">Placas buscadas</h1>
      </div>
      <WantedPlatesTable />
    </DefaultLayout>
  );
};