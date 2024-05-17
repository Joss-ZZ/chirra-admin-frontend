import { FC, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  RowModelType,
  SelectionChangedEvent,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type Props = {
  columns: ColDef[]; // Define el tipo de tus columnas según tus necesidades
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[];
  setGridApi: (api: GridApi) => void;
  rowSelection?: "multiple" | "single";
  rowModelType?: RowModelType;
  rowData?: any[];
  onSelectionChange?: (selectedRows: any[]) => void;
};

const CustomAgGrid: FC<Props> = ({
  columns,
  paginationPageSize,
  paginationPageSizeSelector,
  setGridApi,
  rowSelection,
  rowModelType = "clientSide",
  rowData,
  onSelectionChange,
}) => {
  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const handleSelectionChange = (event: SelectionChangedEvent) => {
    const selectedRows = event.api.getSelectedRows();
    onSelectionChange(selectedRows.map((o) => o.dropiOrderId.toString()));
  };

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      cellStyle: {
        textAlign: "center",
      },
      minWidth: 90,
    };
  }, []);

  const defaultGridOptions: GridOptions = {
    localeText: {
      page: "Página",
      to: "a",
      of: "de",
      more: "Más",
      next: "Siguiente",
      last: "Última",
      first: "Primera",
      previous: "Anterior",
      pageSizeSelectorLabel: "Tamaño de página:",
    },
    onSelectionChanged: handleSelectionChange,
    overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Cargando información...</span>',
    overlayNoRowsTemplate: '<span class="ag-overlay-loading-center">No se encontraron datos</span>',
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
      <AgGridReact
        pagination={true}
        rowModelType={rowModelType}
        paginationPageSize={paginationPageSize}
        cacheBlockSize={paginationPageSize}
        defaultColDef={defaultColDef}
        columnDefs={columns}
        rowData={rowData}
        onGridReady={onGridReady}
        gridOptions={defaultGridOptions}
        paginationPageSizeSelector={paginationPageSizeSelector}
        domLayout="autoHeight"
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default CustomAgGrid;
