#!/usr/bin/env node

const mdLinks = require('./cli.js')
const fetch = require('node-fetch');
const colors = require('colors');
const fileUser = process.argv[2];
let options = {
  validate: false,
  stats: false
}



mdLinks(fileUser, options).then((response) => {
  let arrValidate = [];

  if (process.argv[3] === '--validate') {
    options.validate = true;
    return response.forEach((element) => {
      fetch(element.href).then(res => {
        arrValidate.push(element);

        if (res.status === 200) {

          console.log(`File: ${element.file.blue} Titulo: ${element.text.yellow} Link: ${res.url.blue.underline} Status: ${colors.green(res.status)} ${res.statusText.green}(✔✔ )`);
        }
         else if(res.status === 404){
          console.log(`File: ${element.file.blue} Texto: ${element.text.yellow} Link: ${element.href.red.underline} Status: ${colors.red(res.status)} ${res.statusText.red} (✘ )` );

          } 
      }).catch(err =>{
        console.log(`File: ${element.file.red} Texto: ${element.text.green} Link: ${element.href.error} <--- Enlace con Problemas` + err);
      });

    });

  } else if (process.argv[3] === '--stats') {
    options.stats = true;
    let urlArray = [];
    response.forEach(element => {
      urlArray.push(element.href)
    })
    console.log('El total de links en el archivo ' + fileUser + ' es: ' +urlArray.length);
  } else {
    return response.forEach((element) => {
      let file = element.file,
        href = element.href,
        text = element.text;
      return console.log(file + ' ' + text + ' ' + href);
    });
  }
});

module.exports = mdLinks;
