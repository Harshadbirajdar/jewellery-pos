import FileSaver from "file-saver";
import Excel from "exceljs";

export const ConvertToExcel = async (column, data, filename) => {
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet("Tutorials");
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const fileExtension = ".xlsx";

  worksheet.columns = column;
  worksheet.addRows(data);

  const buffer = await workbook.xlsx.writeBuffer();
  const datas = new Blob([buffer], { type: fileType });

  FileSaver.saveAs(datas, filename + fileExtension);
};
