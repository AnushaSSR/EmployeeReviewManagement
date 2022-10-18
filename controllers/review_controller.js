// const Interview = require('../models/interviews');// Interview model
// const Student = require('../models/student');// Student model
// const Score = require('../models/course_scores');// Score model
// const csvWriter= require('json-2-csv');// A JSON to CSV and CSV to JSON converter
// const fs= require('fs');//enables interacting with file system

// module.exports.downloadReport = async function(req,res) {
//     try {
//         //fetch interviews and populate the students and their scores
//         const interview = await Interview.find().populate({
//             path:"studentsList.student",
//             model:"Student",
//             populate: {
//                 path: "scores",
//                 model: "Scores"
//             }
//         });

//         //Create a array list to stote the JSON data
//         const studentsData=[];

//         //Form the objects from the values and formatting them if needed
//         for(i of interview) {
//             for(s of i.studentsList) {
//                 let obj= {};
//                 //get the value of student id from the object id
//                 let db_student_id= s.student._id;
//                 let student_id= db_student_id.valueOf();
//                 obj["Student ID"] = student_id;
                
//                 obj["Student Name"] = s.student.name;
//                 obj["Student College"] = s.student.college;
//                 obj["Student Status"] = s.student.status;
//                 obj["DSA Final Score"] = s.student.scores.dsa_score;
//                 obj["WebD Final Score"] = s.student.scores.webd_score;
//                 obj["React Final Score"] = s.student.scores.react_score;

//                 //to format the date in dd/mm/yy  format
//                 let dateVal = new Date(i.date);
//                 let date= (dateVal.toLocaleString('en-GB', {day:'numeric', month: 'numeric', year:'numeric'}));
//                 obj["Interview Date"]= date;

//                 obj["Interview Company"]= i.company_name;
//                 let result =null;
//                 if(s.result !=" "){ result=s.result; }
//                 obj["Interview Student Result"]= result;
                
//                 //push the values to object obj
//                 studentsData.push(obj);
//             }            
//         }
//     const report = await csvWriter.json2csvAsync(studentsData);

//     res.setHeader('Content-disposition', 'attachment: filename=report.csv');//set the header 
//     res.set('Content-Type', 'text/csv');//set the content type to csv
//     res.status(200).send(report);//send teh report for download

//     //write the csv data into a file studentReport.csv(optional)
//     fs.writeFileSync('studentReport.csv', report);
//     } catch(err) {
//         console.log(err);
//     }
// }