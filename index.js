#!/usr/bin/env node

const mdLinks = require('./mdLinks.js')
const fetch = require('node-fetch');
const chalk = require('chalk');
const pathDoc = process.argv[2];
let options = {
  validate: false,
  stats: false
}

mdLinks(pathDoc, options).then((response) => {

  if (process.argv[3] === '--validate' && process.argv[4] === '--stats') {
    options.validate = true;
    options.stats = true;
    let urlArray = [];
    let arrayStatusOk = 0;
    let arrayStatusFail = [];
    response.forEach(element => {
      urlArray.push(element.href)
      fetch(element.href).then(res => {
        if (res.status >= 200 && res.status <= 309) {
          arrayStatusOk = arrayStatusOk + 1;

        } else if (res.status >= 400) {
          arrayStatusFail.push(res.status);

        }
      });
    })

    let uniqs = new Set(urlArray);

    setTimeout(function () {
      console.log(`El TOTAL de links en el archivo ${chalk.cyanBright(pathDoc)} es: ${chalk.yellowBright(response.length)} `);
      console.log(`El total de links OK ✔ en el archivo ${chalk.cyanBright(pathDoc)} es: ${chalk.green(arrayStatusOk)}`);
      console.log(`El total de links FAIL ✘ en el archivo ${chalk.cyanBright(pathDoc)} es: ${chalk.red(arrayStatusFail.length)} `);
      console.log(`El total de links UNICOS en el archivo ${chalk.cyanBright(pathDoc)} es: ${chalk.yellowBright([...uniqs].length)} `);
    }, 4000);

  } else if (process.argv[3] === '--validate') {
    options.validate = true;
    response.forEach((element) => {
      fetch(element.href).then(res => {

        if (res.status >= 200 && res.status <= 309) {
          console.log(`|Status:(✔✔ ) ${chalk.greenBright(res.status)} ${chalk.green(res.statusText)}| File: ${chalk.cyanBright(element.file)} | Text: ${chalk.yellowBright(element.text)} | Link: ${chalk.underline.blueBright(res.url)} `);

        } else if (res.status >= 400) {
          console.log(`|Status:(✘ ) ${chalk.redBright(res.status)} ${chalk.red(res.statusText)}| File: ${chalk.cyanBright(element.file)} | Text: ${chalk.yellowBright(element.text)} | Link: ${chalk.underline.redBright(res.url)} `);

        }
      }).catch(err => {
        console.log(`|Status:( ⚠ ) |File: ${chalk.cyanBright(element.file)} | Text: ${chalk.yellowBright(element.text)} | Link: ${chalk.underline.yellowBright(res.url)}<--- Este enlace presenta problemas` + err);
      });

    });
  } else if (process.argv[3] === '--stats') {
    options.stats = true;
    let urlArray = [];
    response.forEach(element => {
      urlArray.push(element.href)
    })

    let uniqs = new Set(urlArray);
    
    console.log(`El TOTAL de links en el archivo ${chalk.cyanBright(pathDoc)} es: ${chalk.yellowBright(response.length)} `);
    console.log(`El TOTAL de links UNICOS en el archivo ${chalk.cyanBright(pathDoc)} es: ${chalk.yellowBright([...uniqs].length)} `);


  } else {
    response.forEach((element) => {
      console.log(`|File: ${chalk.cyanBright(element.file)} | Text: ${chalk.yellowBright(element.text)} | Link: ${chalk.underline.blueBright(element.href)}`);
    });
  }
});
module.exports = mdLinks;
