let csvToJson = require("convert-csv-to-json");

let fileInputName = "./hng9csv.csv";
let fileOutputName = "";

let json = csvToJson.fieldDelimiter(",").parseSubArray('"',';').getJsonFromCsv(fileInputName);
let object= {}
const firstArray = []
for (let i = 0; i < json.length; i++) {
 // console.log(JSON.parse(`'{${JSON.stringify(json[1].Attributes)}}'`));
 console.log(json[i].Attributes.split(';'));
//  json[i].Attributes.split(';').forEach((ele, i) => {
//     //firstArray.push([ele])
//     console.log([ele])
//  })

 
}

//console.log(firstArray)