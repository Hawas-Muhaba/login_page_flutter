// const fs = require("fs");
// const path = require("path");

// //require files
// const calculateSizeD = require("./calculateSizeD.js");
// const calculateSizeF = require("./calculateSizeF.js");

// const buildMainContent = (fullStaticPath, pathname)=>{
//     let mainContent = '';
//     let item;

//     //loop through the elelments inseide the folder

//     try{
//         items = fs.readdirSync(fullStaticPath);
//         console.log(items);
//     }catch(err){
//         console.log("readdirSync error: " + err);
//         return '<div class = "alert alert-danger">Internal server error</div>';
//     }

//     // remove  .Ds_Store
//     items = items.filter(element => element !== '.DS_Store');

//     //Home directory, remove project_files
//     if(pathname === '/'){
//         items = item.filter(element => !['project_files', 'ace-builds-master'].includes(element));
//     }

//     //get the following elements for each item:

//     items.forEach(item =>{
//       //store item details in an object

//       let itemDetails = {};

//       //name
//       itemDetails.name = item;

//       //link
//       const itemFullStaicPath = path.join(fullStaticPath, item);
//       try {
//         itemDetails.stats = fs.statSync(itemFullStaticPath);
//       } catch (err) {
//         console.log("statSync error: " + err);
//         mainContent = '<div class="alert alert-danger">Internal Error</div>';
//         return false;
//       }
//       if (itemDetails.stats.isDirectory()) {
//         itemDetails.icon = '<ion-icon name="folder"></ion-icon>';

//         [itemDetails.size, itemDetails.sizeBytes] =
//           calculateSizeD(itemFullStaticPath);
//       } else if (itemDetails.stats.isFile()) {
//         itemDetails.icon = '<ion-icon name="document"></ion-icon>';

//         [itemDetails.size, itemDetails.sizeBytes] = calculateSizeF(
//           itemDetails.stats
//         );
//       }
//       //when was the file last changed? (unix timestamp)
//       itemDetails.timeStamp = parseInt(itemDetails.stats.mtimeMs);

//       console.log(itemDetails.timeStamp);

//       //convert timestamp to a date
//       itemDetails.date = new Date(itemDetails.timeStamp);

//       itemDetails.date = itemDetails.date.toLocaleString();

//       console.log(itemDetails.date);
//       mainContent +=  `
// <tr data-name="${itemDetails.name}" data-size="${itemDetails.sizeBytes}" data-time="${itemDetails.timeStamp}">
// <td>${itemDetails.icon}<a href="${link}" target='${itemDetails.stats.isFile() ? "_blank" : ""}'>${item}</a></td>
// <td>${itemDetails.size}</td>
// <td>${itemDetails.date}</td>
// </tr>`;
   
//     });
//     //name
//     //icon
//     //link to the item
//     //size
//     //last modified

//     return mainContent;
// };


const fs = require("fs");
const path = require("path");

const calculateSizeD = require("./calculateSizeD.js");
const calculateSizeF = require("./calculateSizeF.js");

const buildMainContent = (fullStaticPath, pathname) => {
  let mainContent = "";
  let items;

  try {
    items = fs.readdirSync(fullStaticPath);
    console.log(items);
  } catch (err) {
    console.log("readdirSync error: " + err);
    return '<div class="alert alert-danger">Internal server error</div>';
  }

  items = items.filter((element) => element !== ".DS_Store");

  if (pathname === "/") {
    items = items.filter(
      (element) => !["project_files", "ace-builds-master"].includes(element)
    );
  }

  items.forEach((item) => {
    let itemDetails = {};

    itemDetails.name = item;

    const itemFullStaticPath = path.join(fullStaticPath, item);
    try {
      itemDetails.stats = fs.statSync(itemFullStaticPath);
    } catch (err) {
      console.log("statSync error: " + err);
      mainContent = '<div class="alert alert-danger">Internal Error</div>';
      return false;
    }
    if (itemDetails.stats.isDirectory()) {
      itemDetails.icon = '<ion-icon name="folder"></ion-icon>';

      [itemDetails.size, itemDetails.sizeBytes] =
        calculateSizeD(itemFullStaticPath);
    } else if (itemDetails.stats.isFile()) {
      itemDetails.icon = '<ion-icon name="document"></ion-icon>';

      [itemDetails.size, itemDetails.sizeBytes] = calculateSizeF(
        itemDetails.stats
      );
    }

    itemDetails.timeStamp = parseInt(itemDetails.stats.mtimeMs);

    console.log(itemDetails.timeStamp);

    itemDetails.date = new Date(itemDetails.timeStamp);

    itemDetails.date = itemDetails.date.toLocaleString();

    console.log(itemDetails.date);
    mainContent += `
<tr data-name="${itemDetails.name}" data-size="${
      itemDetails.sizeBytes
    }" data-time="${itemDetails.timeStamp}">
<td>${itemDetails.icon}<a href="${link}" target='${
      itemDetails.stats.isFile() ? "_blank" : ""
    }'>${item}</a></td>
<td>${itemDetails.size}</td>
<td>${itemDetails.date}</td>
</tr>`;
  });
  return mainContent;
};

module.exports = buildMainContent;
