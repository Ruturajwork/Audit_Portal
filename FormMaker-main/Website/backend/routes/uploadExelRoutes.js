import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import csvtojson from "csvtojson";
// import readXlsxFile from "read-excel-file";
// import Text from "../models/textModel.js";
import Questions from "../models/questionsModel.js";

const router = express.Router();

// router.route("/").post(impdata)
// router.post('/impdata',async(req,res)=>{

const importData = async (req, res, next) => {
  const path = req.file.path;
  console.log(path);
  let xlFile = xlsx.readFile(path);
  let sheet = xlFile.Sheets[xlFile.SheetNames[0]];
  let pjson = xlsx.utils.sheet_to_json(sheet);
  // console.log(pjson);
  //    res.json(pjson)
  var arrayToInsert = [];

  for (var i = 0; i < pjson.length; i++) {
    console.log(pjson[i]["question"]);
    var singleRow = {
      header: pjson[i]["header"],
      standard: pjson[i]["standard"],
      subHeader1: pjson[i]["subHeader1"],
      subHeader2: pjson[i]["subHeader2"],
      subHeader3: pjson[i]["subHeader3"],
      subHeader4: pjson[i]["subHeader4"],
      subHeader5: pjson[i]["subHeader5"],

      questions: {
        question: pjson[i]["question"],
        areaofaudit: pjson[i]["AreaofAudit"],
        description: pjson[i]["description"],
        expectedProofs: pjson[i]["expectedProofs"],
      },
    };
    arrayToInsert.push(singleRow);
    console.log(arrayToInsert);
  }
  //    //inserting into the table student
  Questions.insertMany(arrayToInsert, (err, result) => {
    if (err) console.log(err);
    if (result) {
      console.log("File imported successfully.");
      // res.redirect('/')
    }
  });
};

// try {
//     if (req.file == undefined) {
//       return res.status(400).send("Please upload an excel file!");
//     }

//     readXlsxFile(path).then((rows) => {
//       // skip header
//       rows.shift();

//       let tutorials = [];

//       rows.forEach((row) => {
//         let tutorial = {
//           header: row[0],
//           standard: row[1],
//           subHeader1: row[2],
//           questions: {
//             question: row[7],
//             areaofaudit: row[8],
//             description: row[9],
//             expectedProofs: row[10]
//           }
//         };

//         tutorials.push(tutorial);
//       });

//       Text.Create(tutorials)
//         .then(() => {
//           res.status(200).send({
//             message: "Uploaded the file successfully: " + req.file.originalname,
//           });
//         })
//         .catch((error) => {
//           res.status(500).send({
//             message: "Fail to import data into database!",
//             error: error.message,
//           });
//         });
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Could not upload the file: " + req.file.originalname,
//     });
//   }

//   }
const validateExcelUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const allowedTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  if (!allowedTypes.includes(req.file.mimetype)) {
    return res
      .status(400)
      .send("Invalid file type. Only Excel files are allowed.");
  }

  next();
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.post(
  "/impdata",
  uploads.single("xlsx"),
  validateExcelUpload,
  importData
);

{
  /*For reading Csv file to json*/
}
// const importFile = ((req, res) => {
//     //  Read Excel File to Json Data
//     const path = req.file.path;
//       var arrayToInsert = [];
//       csvtojson().fromFile(path).then(source => {
//     // Fetching the all data from each row
//       for (var i = 0; i < source.length; i++) {
//           console.log(source[i]["header"])
//           var singleRow = {
//               header: source[i]["header"],
//               standard: source[i]["standard"],
//               questions: {
//                   question: source[i]["question"],
//                   areaofaudit: source[i]["Area of Audit"],
//                   description: source[i]["description"],
//                   expectedProofs: source[i]["expected Proofs"]
//               }
//           };
//           arrayToInsert.push(singleRow);
//       }
//    //inserting into the table student
//    Questions.insertMany(arrayToInsert, (err, result) => {
//           if (err) console.log(err);
//               if(result){
//                   console.log("File imported successfully.");
//                   // res.redirect('/')
//               }
//           });
//       });
//  })

//  router.post('/impdata', uploads.single('xlsx'), importFile)
//})
export default router;
