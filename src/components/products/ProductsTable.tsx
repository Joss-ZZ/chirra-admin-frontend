import { FC, useEffect, useState } from "react";
import { ColDef, GridApi } from "ag-grid-community";
import CustomAgGrid from "../generic/AgGridCustom";
import { Toast } from "../../utils/toast";
import { Product } from "../../entities";
import { UpdateOrCreateProductModal } from "./UpdateOrCreateProductModal";
import { ProductForm, productFormDataSubject } from "./ProductForm";
import { producApi } from "../../api";
import { Subscription } from "rxjs";

export const ProductsTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState<Product>();
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50, 100];
  const [rowData, setRowData] = useState<any[]>();
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const subscription = new Subscription();

  const columns: ColDef[] = [
    {
      headerName: "Producto",
      field: "description",
    },
    {
      headerName: "Precio",
      field: "price",
      valueFormatter: params => `S/. ${params.value}`,
    },
    {
      headerName: "Contacto",
      field: "contactNumber",
    },
  ];

  async function fetchData() {
    gridApi?.showLoadingOverlay();
    const toastId = Toast.loading("Obteniendo productos");
    try {
      const response = await producApi.findAll();
      setRowData(response.result);
    } catch (error) {
      Toast.loading("Ha ocurrido un error al obtener la información");
      setRowData([]);
    } finally {
      gridApi?.hideOverlay();
      Toast.hide(toastId);
    }
  }

  async function searchReports() {
    await fetchData();
  }

  const onClickCreateProduct = () => {
    setShowModal(true);
    setProduct(undefined);
  }

  useEffect(() => {
    subscription.add(productFormDataSubject.subscribe((_) => {
      if (_)
        searchReports();
    }));
    if (gridApi) {
      setRowData([]);
    };
    fetchData();
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [gridApi]);

  return (
    <>
      <div className="mx-auto px-6">
        <div>
          <button
            onClick={onClickCreateProduct}
            className="px-6 my-4 bg-blue-500 leading-8 rounded border-sky-300 text-white font-semibold"
          >
            Crear Producto
          </button>
        </div>
      </div>
      <CustomAgGrid
        columns={columns}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        rowData={rowData}
        setGridApi={setGridApi}
      />
      <UpdateOrCreateProductModal
        show={showModal}
        setShow={setShowModal}
        id={product?.id}
      >
        <ProductForm setShowModal={setShowModal} product={product} />
      </UpdateOrCreateProductModal>
    </>
  );
};
