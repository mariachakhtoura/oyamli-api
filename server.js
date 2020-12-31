import express from 'express';
import fetch from 'node-fetch';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/oyamli/:key', (req, res) => {
  console.log(req.params);
  var result = [];
  var success = false;
  fetch(
    `https://api.yamli.com/transliterate.ashx?word=${req.params.key}&tool=api&account_id=000006&prot=https%3A&hostname=www.yamli.com&path=%2Farabic-keyboard%2F&build=5515&sxhr_id=15`,
    {
      headers: {
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Access-Control-Allow-Origin': '*',
      },
      referrer: 'https://www.yamli.com/arabic-keyboard/',
    }
  )
  .then(res => res.text())
    .then(body => {
        let items;
            const matchedData = body
              .toString()
              .match(/(?<=\{"data":")(.*?)(?=",")/);
              console.log(matchedData);
            if (matchedData && matchedData.length > 0) {
              // const itemObjects = JSON.parse( matchedData[ 0 ] );
              // const rItems = JSON.parse( itemObjects.data ).r;
              const rItems = matchedData[0];
              const arabicChoices = rItems.match(/[\u0621-\u064A ]+/g);
              const totalChoices = [req.params.key, ...arabicChoices];
              result = totalChoices;
              console.log(totalChoices);
              success = true;
            } else {
              console.log([]);
              success = false;
            }
    }).finally(() => {
      res.status(200).send({
        success,
        result,
      })
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});