// //require node modules
// const url = require("url");
// const path = require("path");
// const fs = require("fs");

// //file imports
// const buildMainContent = require("./mainContent.js");
// const buildBreadcrum= require('./breadcrumb.js');
// const getMimeType = require("./getMimeType.js");
// const { response } = require("express");

// //static base bath: location of the static folder

// const staticBasePath = path.join(__dirname,'..','static');


// //respond to a request
// //following is function passed to creatServer used to creater the server

// const respond = (request,response) =>{

//     //before working the pathname, you need to decode it
//     let pathname = url.parse(request.url,true).pathname;

//     //if favicon stop
//     if(pathname === '/favicon.ico'){
//         return false;
//     }

//     pathname = decodeURIComponent(pathname);

//     //get the corresponding full static path located in the static folder

//     const fullStaticPath = path.join(staticBasePath, pathname);

//     //can we find something in th fullStaticPath?
//     //no: send '404: file not found'

//     if(!fs.existsSync(fullStaticPath)) {
//         console.log(fullStaticPath + " Does not exist");
//         response.write('404: file not found');
//         response.end();
//         return false; 
// }

//     //we found something 
//     //is ti a file or directory?
//     let stats;
//     try{
//         stats = fs.lstatSync(fullStaticPath);
//     }catch(err){
//         console.log('lstatSync error: '+ err);
//     }

//     //It is directory:
//     if(stats.isDirectory()){
//         //get content from the template index.hmtl
//         let data = fs.readFileSync(path.join(staticBasePath, 'project_files/index.html', 'utf-8'));

//         //build the page title

//         console.log(pathname);
//         let pathElements = pathname.split('/').reverse();
//         pathElements = pathElemetns.filter(element => element !== '');
//         let foldrName = pathElements[0];
//         if(folderName === undefined){
//             folderName = 'Home';
//         }
//         console.log(folderName);

//         //build breadcrumb

//         const breadcrumb = buildBreadcrumb(pathname);

//         //build table rows (main_content)
//         const mainContent  =buildMainContent(fullStaticPath, pathname);

//         //fill the template data with: the page title, breadcrumb and table rows (main_content)
//         data = data.replace('[age_title',folderName);
//         data = data.replace('pathname', breadcrumb);
//         data = data.replace('maincontent', mainContent);

//         //print data to teh webpage
//         response.statusCode = 200;
//         response.write(data);
//         return response.end();
//     }

//     //Is is not directory but not a file either
//     //send: 401: Access denied!
//     if(!stats.isFile()){
//         response.statusCode = 401;
//         response.write('401: Access denied!\n');
//         console.log('not a file');
//         return response.end();
//     }

//     //It is a file
//     //Let's get the file extension

//     let fileDetails = {};
//     fileDetails.extname = path.extname(fullStaticPath);
//     console.log(fileDetails.extname);

//     //file size 

//     let stat; 
//     try{
//         stat = fs.statSync(fullStaticPath);
//     }catch(err){
//         console.log(err + " Error");
//     }
//     fileDetails.size = stat.size;

//     //get the file mime type and add it to the response header

//     getMimeType(fileDetails, extname)
//     .then(mime=>{

//         //store headers here

//         let head = {};
//         let options = {};

//         //response status code
//         let statusCode = 200;

//         //set "Content-Type" for all file types

//         head['Content-Type'] = mime;

//         //get the file size and add it to the response header
//         //pdf file? -> display in browser

//         if(fileDetails.extname === '.pdf'){
//             head['Content-Disposition'] = 'inline';
//         }

//         //audio/video file? -> stream in ranges
//         if(RegExp('audio').test(mime) || RegExp('video').test(mime)){
//             //header
//             head['Accept-Ranges'] = 'bytes';
//             const range = request.header.range;
//             console.log('range: ' + range);
//             console.log('range: ' + range);
//             if(range){
//                 const start_end = range.replace(/bytes=/,"").split('-');
//                 const start = parseInt(start_end[0]);
//                 const end = start_end[1]
//                 ? parseInt(start_end[1]):fileDetails.size-1;
//                 //headers
//                 //Content-Range
//                 head['Content-Range'] = 'bytes='+start+'-'+end '/' + fileDetails.size;

//                 //Content-Length
//                 head['Content-Range'] = end -start+1;

//                 //options

//                 options = {start,end};

//             }
//         }

//         //streaming method:
//         const  fileStream = fs.createReadStrean(fullStaticPath, options);

//         response.writeHead(statusCode, head);
//         fileStream.pipe(response);

//         //events: close and error
//         fileStream.on('close', error=> {
//             return response.end();
//         });

//         fileStream.on('error', error=>{
//             console.log(error.code);
//             response.statusCode =404;
//             response.write('404: FileStream error!');
//             reurn response.end();
//         });


//     })
//     .catch(err=>{
//         response.statusCode = 500;
//         response.write('500: Internal server error!');
//         console.log('Promise error: '+err);
//         return response.end();
//     })


// }

// module.exports = respond;



const url = require("url");
const path = require("path");
const fs = require("fs");

const buildMainContent = require("./mainContent.js");
const buildBreadcrumb = require("./breadcrumb.js");
const getMimeType = require("./getMimeType.js");

const staticBasePath = path.join(__dirname, "../", "static");
console.log(__dirname);
console.log(staticBasePath);
const respond = (request, response) => {
  let pathname = url.parse(request.url, true).pathname;

  if (pathname === "/favicon.ico") {
    return false;
  }

  pathname = decodeURIComponent(pathname);

  const fullStaticPath = path.join(staticBasePath, pathname);

  if (!fs.existsSync(fullStaticPath)) {
    console.log(fullStaticPath + " Does not exist");
    response.write("404: file not found");
    response.end();
    return false;
  }

  let stats;
  try {
    stats = fs.lstatSync(fullStaticPath);
  } catch (err) {
    console.log("lstatSync error: " + err);
  }

if (stats.isDirectory()) {
    let data = fs.readFileSync(
    path.join(staticBasePath, "project_files/index.html")
    );

    console.log(pathname);
    let pathElements = pathname.split("/").reverse();
    pathElements = pathElemetns.filter((element) => element !== " ");
    let folderName = pathElements[0];
    if (folderName === undefined) {
    folderName = "Home";
    }

    console.log(folderName);

    const breadcrumb = buildBreadcrumb(pathname);
    
    const mainContent = buildMainContent(fullStaticPath, pathname);

    data = data.replace("[age_title", folderName);
    data = data.replace("pathname", breadcrumb);
    data = data.replace("maincontent", mainContent);

    response.statusCode = 200;
    response.write(data);
    return response.end();
  }

  if (!stats.isFile()) {
    response.statusCode = 401;
    response.write("401: Access denied!\n");
    console.log("not a file");
    return response.end();
  }

  let fileDetails = {};
  fileDetails.extname = path.extname(fullStaticPath);
  console.log(fileDetails.extname);

  let stat;
  try {
    stat = fs.statSync(fullStaticPath);
  } catch (err) {
    console.log(err + " Error");
  }
  fileDetails.size = stat.size;

  getMimeType(fileDetails.extname)
    .then((mime) => {
      let head = {};
      let options = {};
      let statusCode = 200;

      head["Content-Type"] = mime;

      if (fileDetails.extname === ".pdf") {
        head["Content-Disposition"] = "inline";
      }

      if (RegExp("audio").test(mime) || RegExp("video").test(mime)) {
        head["Accept-Ranges"] = "bytes";
        const range = request.headers.range;
        console.log("range: " + range);
        if (range) {
          const start_end = range.replace(/bytes=/, "").split("-");
          const start = parseInt(start_end[0]);
          const end = start_end[1]
            ? parseInt(start_end[1])
            : fileDetails.size - 1;

          head["Content-Range"] =
            "bytes=" + start + "-" + end + "/" + fileDetails.size;

          head["Content-Length"] = end - start + 1;

          options = { start, end };
        }
      }

      const fileStream = fs.createReadStream(fullStaticPath, options);

      response.writeHead(statusCode, head);
      fileStream.pipe(response);

      fileStream.on("close", (error) => {
        return response.end();
      });

      fileStream.on("error", (error) => {
        console.log(error.code);
        response.statusCode = 404;
        response.write("404: FileStream error!");
        return response.end();
      });
    })
    .catch((err) => {
      response.statusCode = 500;
      response.write("500: Internal server error!");
      console.log("Promise error: " + err);
      return response.end();
    });
};

module.exports = respond;
