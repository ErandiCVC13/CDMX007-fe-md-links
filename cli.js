const fs = require('fs');
const path = require('path');

const mdLink = (fileName) => new Promise((resolve, err) => {

  let urlToAbsolute = path.resolve(fileName);

  // console.log(urlToAbsolute)
  let extFile = path.extname(urlToAbsolute);
  // console.log(extFile)
  if (extFile === '.md') {
    let dataMd = fs.readFileSync(urlToAbsolute).toString();

    // console.log(dataMd);
    let linksMd = [];

    const expRegLinks = /\[((.+?))\]\((http|https|ftp|ftps).+?\)/g;
    const expRegHref = /\((http|https|ftp|ftps).+?\)/g;
    const expRegLinktext = /\[.+?\]/g;

    let dataLinks = dataMd.toString();
    let dataStrings = dataLinks.toString().match(expRegLinks);

    for (let i in dataStrings) {
      let txtLinkMd = dataStrings[i].match(expRegLinktext)[0].substring(1, dataStrings[i].match(expRegLinktext)[0].length - 1);
      let urlLinkMd = dataStrings[i].match(expRegHref)[0].substring(1, dataStrings[i].match(expRegHref)[0].length - 1);
      //Este codigo agrega array un objetos con las siguientes propiedades
      linksMd.push({
        text: txtLinkMd,
        href: urlLinkMd,
        file: fileName
      });
    }
    resolve(linksMd);
    //  console.log(linksMd)
  } else {
    console.log('Archivo ingresado no es de extención .md');
  }
});

module.exports = mdLink;
