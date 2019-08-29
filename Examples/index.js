const nightmare = nightmare
  .goto('https://www.blinkist.com/en/nc/login')
  // .click('a.headerV2__login-link')
  .type('input#login-form_login_email', account.email)
  .type('input#login-form_login_password', account.password)
  .click('input.button')
  .wait('body.users')
  .goto(categories[i])
  .wait('div.book-list')
  .evaluate(() => document.querySelector('body').innerHTML)
  .end()
  .then(response => {
    console.log(getData(response));
  })
  .catch(err => {
    console.log(err);
  });
//   div.col-xs-12.col-sm-12 1 response
let getData = html => {
  data = [];
  const $ = cheerio.load(html);
  //div.book-list div div.row div gives 95 responses
  $('div.book-list div div.row div div').each((row, row_element) => {
    // console.log("row_element", row_element);
    $(row_element)
      .find('div.letter-book-list__items')
      .each((i, elem) => {
        // console.log("elem", elem);
        const title = $(elem)
          .find('a span.letter-book-list__item__title')
          .text();
        const author = $(elem)
          .find('a span.letter-book-list__item__author')
          .text();
        if (title) {
          data.push({
            title: title,
            author: author
          });
        }
      });
  });
  return data;
};
Collapse





// var Nightmare = require('nightmare'),
//   vo = require('vo'),
//   nightmare = Nightmare();

// var run = function * () {
//   var urls = ['http://www.yahoo.com', 'http://example.com', 'http://w3c.org'];
//   var titles = [];
//   for (var i = 0; i < urls.length; i++) {
//     var title = yield nightmare.goto(urls[i])
//       .wait('body')
//       .title();
//     titles.push(title);
//   }
//   return titles;
// }

// vo(run)(function(err, titles) {
//   console.dir(titles);
// });