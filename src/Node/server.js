const fs = require('fs');
const xlsx = require('xlsx');

// Load the Excel file
const fileContents = fs.readFileSync('worldcities.xlsx');

// Parse the Excel file
const workbook = xlsx.read(fileContents, { type: 'buffer' });

const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Specify the column index you want to extract (e.g., 0 for the first column)
const columnIndex = 0;

// Define an array to store the column values
const columnArray = [];

// Loop through the rows of the worksheet
let i=0;
let string='';
for (const cell in worksheet) {
  const cellAddress = xlsx.utils.decode_cell(cell);
  if(cellAddress.c===1){
    columnArray.push(string);
    string='';
    }
  if (cellAddress.c === 1) {
    const cellValue = worksheet[cell].v;
    string=cellValue
  }
  
}


// The data you want to write to the file
const data = 'This is the content you want to write to the file.\n';

// The file path where you want to write the data
const filePath = 'example.txt';

// Use the `fs.writeFile` method to write the data to the file
fs.writeFile(filePath, JSON.stringify(columnArray), (err) => {
  if (err) {
    console.error('Error writing to the file:', err);
  } else {
    console.log('Data has been written to the file successfully.');
  }
});
console.log(columnArray);
