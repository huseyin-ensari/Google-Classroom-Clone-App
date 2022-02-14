const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

const convertJsonToExcel = (array, classroomAccessCode) => {
  const workSheet = XLSX.utils.json_to_sheet(array);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "scores");

  XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  const publicDir = path.join(__dirname, "../../../public");
  const uploadsDir = path.join(publicDir, "/uploads");
  const fileDir = path.join(uploadsDir, "/excels");

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
  if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir);
  const excelPath = `${fileDir}/${classroomAccessCode}.xlsx`;
  XLSX.writeFile(workBook, excelPath);

  return `${classroomAccessCode}.xlsx`;
};

module.exports = convertJsonToExcel;
