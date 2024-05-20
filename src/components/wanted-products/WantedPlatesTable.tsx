import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Toast } from "../../utils/toast";
import * as XLSX from "xlsx";
import { wantedPlatesApi } from "../../api";

export const WantedPlatesTable = () => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [plates, setPlates] = useState<string[]>([]);

  const onDragEnter = useCallback(() => {
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragActive(false);
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const excelFiles = acceptedFiles.filter(
      (file) =>
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    if (excelFiles.length > 0) {
      setSelectedFile(excelFiles[0]);
      extractPlates(excelFiles[0]);
    } else {
      Toast.error("Por favor, seleccione un archivo válido de tipo xlsx");
    }
    setIsDragActive(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDragEnter,
    onDragLeave,
    onDrop,
  });

  const extractPlates = async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const platesData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        raw: true,
      });
      const columnA = platesData.map((row) => row[0]);
      columnA.shift();
      const validPlates = columnA.filter((plate) => typeof plate === "string" && plate.length === 6);
      setPlates(validPlates);
      Toast.success(`Se han encontrado ${validPlates.length} placas`);
    } catch (error) {
      console.error("Error al extraer las placas del archivo Excel:", error);
      Toast.error("Error al extraer las placas del archivo Excel");
    }
  };

  const onClickCreateWantedPlates = async () => {
    if (!selectedFile) return Toast.error("Por favor, asegúrese de seleccionar un archivo antes");
    if (plates.length === 0) return Toast.error("No se han encontrado placas a registrar");
    const toastId = Toast.loading("Registrando Placas");
    try {
      await wantedPlatesApi.create({plates});
      Toast.success("Placas registradas correctamente");
    } catch (error) {
      Toast.loading("Ha ocurrido un error al registrar las placas");
    } finally {
      setSelectedFile(null);
      setPlates([]);
      Toast.hide(toastId);
    }
  };

  return (
    <div className="mt-8 mx-6">
      <div
        className={`dropzone-container ${isDragActive ? "active" : ""}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>
          Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar
          archivos
        </p>
      </div>
      {selectedFile && (
        <div className="file-info">
          <p>Archivo seleccionado: {selectedFile.name}</p>
          <p>Peso total: {selectedFile.size} bytes</p>
        </div>
      )}
      <div className="mx-auto px-6">
        <div className="flex justify-center">
          <button
            onClick={onClickCreateWantedPlates}
            className="px-6 my-4 bg-blue-500 leading-8 rounded border-sky-300 text-white font-semibold"
          >
            Registrar placas
          </button>
        </div>
      </div>
    </div>
  );
};
