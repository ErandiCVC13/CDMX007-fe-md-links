const fs = require('fs');
const path = require('path');

const mdLinks = (pathDocument) => new Promise((resolve, err) => {

  const toAbsolutePath = path.resolve(pathDocument);
  const docExtension = path.extname(toAbsolutePath);
  const linksRegExp = /\[((.+?))\]\((http|https|ftp|ftps).+?\)/g;
  const hrefRegExp = /\((http|https|ftp|ftps).+?\)/g;
  const textLinksRegExp = /\[.+?\]/g;

  if (docExtension === '.md') {

    const docMdToString = fs.readFileSync(toAbsolutePath).toString();
    const linksMatchInMd = docMdToString.match(linksRegExp);
    const arrayLinksMd = [];

    for (let i in linksMatchInMd) {

      let textLinksMd = linksMatchInMd[i].match(textLinksRegExp)[0];
      let urlsLinksMd = linksMatchInMd[i].match(hrefRegExp)[0];
      
      arrayLinksMd.push({
        href: urlsLinksMd.substring(1, urlsLinksMd.length - 1),
        text: textLinksMd.substring(1, textLinksMd.length - 1).slice(0,49),
        file: pathDocument
      });
    }
    resolve(arrayLinksMd);
  } else {
    console.log('La Extensión del archivo ingresado no es: ".md" Favor de Verificarlo!');
  }
});
module.exports = mdLinks;
