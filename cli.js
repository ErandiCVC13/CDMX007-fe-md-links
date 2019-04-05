const fs = require('fs');
const path = require('path');

const mdLink = (pathDocument) => new Promise((resolve, err) => {

  let toAbsolutePath = path.resolve(pathDocument);
  let docExtension = path.extname(toAbsolutePath);

  if (docExtension === '.md') {
    const linksRegExp = /\[((.+?))\]\((http|https|ftp|ftps).+?\)/g;
    const hrefRegExp = /\((http|https|ftp|ftps).+?\)/g;
    const textLinksRegExp = /\[.+?\]/g;
    const docMdToString = fs.readFileSync(toAbsolutePath).toString();
    const linksMatchInMd = docMdToString.match(linksRegExp);
    const arrayLinksMd = [];

    for (let i in linksMatchInMd) {
      let textLinksMd = linksMatchInMd[i].match(textLinksRegExp)[0];
      let urlsLinksMd = linksMatchInMd[i].match(hrefRegExp)[0];
      arrayLinksMd.push({
        text: textLinksMd.substring(1, textLinksMd.length - 1),
        href: urlsLinksMd.substring(1, urlsLinksMd.length - 1),
        file: pathDocument
      });
    }
    resolve(arrayLinksMd);
    //  console.log(arrayLinksMd)
  } else {
    console.log('Archivo ingresado no es de extención .md');
  }
});


module.exports = mdLink;
