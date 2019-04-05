#!/usr/bin/env node

const mdLinks = require('./cli.js')
const fetch = require('node-fetch');
const colors = require('colors');
const chalk = require('chalk');
const fileUser = process.argv[2];
let options = {
  validate: false,
  stats: false
}



mdLinks(fileUser, options).then((response) => {

  if (process.argv[3] === '--validate') {
    options.validate = true;
    response.forEach((element) => {
      fetch(element.href).then(res => {

        if (res.status === 200) {
          console.log(`File: ${element.file} Titulo: ${chalk.yellowBright(element.text)} Link: ${chalk.underline.blueBright(res.url)} Status: ${chalk.greenBright(res.status)} ${res.statusText.green}(✔✔ )`);

        } else if (res.status === 404) {
          console.log(`File: ${element.file} Texto: ${chalk.yellowBright(element.text)} Link: ${element.href.red.underline} Status: ${chalk.redBright(res.status)} ${res.statusText.red} (✘ )`);
        }
      }).catch(err => {
        console.log(`File: ${element.file.red} Texto: ${element.text.green} Link: ${element.href.error} <--- Enlace con Problemas` + err);
      });

    });
    // } else if (process.argv[3] === '--stats') {
    //   options.stats = true;
    //   let urlArray = [];
    //     response.forEach(element => {
    //     urlArray.push(element.href)
    //     console.log(urlArray)
    //   })
    //   console.log('El total de links en el archivo ' + fileUser + ' es: ' + response.length);
  } else {
    response.forEach((element) => {
      let file = element.file,
        href = element.href,
        text = element.text;
      console.log(file + ' ' + text + ' ' + href);
    });
  }
});

module.exports = mdLinks;
