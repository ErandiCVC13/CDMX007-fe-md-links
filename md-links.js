// const fs = require('fs'); // to read file
// const MarkdownIt = require('markdown-it'); // to html
// const jsdom = require('jsdom'); // to use dom
// const fetch = require('node-fetch'); // to fetch whith node
// const path = require('path'); //  working with file and directory paths 
// const {
//   JSDOM
// } = jsdom; // is a pure-JavaScript implementation of many web standards


// const fetchLink = (arr) => {
//   return new Promise((resolve, reject) => {
//     if (!arr) {
//       reject('Tenemos un problema en la función fetchLink');
//     } else {
//       // const newArr = [];onst newArr = [];
//       resolve(arr.forEach(elementArr => {
//         // console.log(elementArr);
//         const url = elementArr.href;
//         fetch(url)
//           .then((res) => {
//             const val = `El estatus es: ${res.status}, ${res.statusText}`;
//             console.log('--------------------------------------');
//             console.log(`text: ${elementArr.text}`); 
//             console.log(`href: ${url}`);        
//             console.log(`File: ${elementArr.path}`);
//             console.log(`Status: ${val}`);
//             // newArr.push({
//             //   href: url,
//             //   text: elementArr.textContent,
//             //   file: elementArr.path,
//             //   status: val
//             // });
//           })
//           .catch(error => console.log(`tenemos un error con el fetch ${error}`));
//       }));
//     }
//   });
// };


// const mdFilterLinks = (fileHTML, path) => {
//   return new Promise((resolve, reject) => {
//     if (!fileHTML) {
//       reject(`tenemos un erro con ${fileHTML}`);
//     } else {
//       const dom = new JSDOM(fileHTML);
//       let obj = {};
//       const arr = [];
//       const result = dom.window.document.querySelectorAll('a');
//       result.forEach((element) => {
//         const href = element.href;
//         const text = element.textContent;
//         obj = {
//           href,
//           text,
//           path,
//         };
//         arr.push(obj);
//       });
//       return resolve(arr);
//     }
//   });
// };

// const readFile = (path) => {
//   return new Promise((resolve, reject) => {
//     if (!path) {
//       reject(`tenemos un erro con ${path}`);
//     } else {
//       fs.readFile(path, 'utf8', (err, data) => {
//         if (err) {
//           console.log(`Error en la lectura del archivo: ${err}`);
//         } else {
//           const md = new MarkdownIt();
//           const fileHTML = md.render(data);
//           return resolve({
//             fileHTML,
//             path
//           });
//         }
//       });
//     }
//   });
// };

// const mdConvertDir = (docMd) => {
//   return new Promise((resolve, reject) => {
//     if (!docMd) {
//       reject('Tenemos un error en la funcion mdConvertDir');
//     } else {
//       const pathQuestion = path.isAbsolute(docMd);
//       let pathDir;
//       if (pathQuestion) {
//         pathDir = file;
//       } else {
//         pathDir = path.resolve(docMd);
//       }
//       return resolve(pathDir);
//     }
//   });
// };

// // Funcion que llama a todas las demas desde la linea de comandos
// const mdLinks = (docMd) => {
//   return new Promise((resolve, reject) => {
//     if (!docMd) {
//       reject('Tenemos un error en la función mdLinks');
//     } else {
//       return resolve(docMd);
//     }
//   });
// };

// module.exports = {
//   mdLinks,
//   mdConvertDir,
//   readFile,
//   mdFilterLinks,
//   fetchLink
// };