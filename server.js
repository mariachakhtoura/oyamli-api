import express from 'express';

const app = express();

app.get('/oyamli/:key', (req, res) => {
  var resut = [];
  fetch(
    `https://api.yamli.com/transliterate.ashx?word=${req.params.key.toString()}&tool=api&account_id=000006&prot=https%3A&hostname=www.yamli.com&path=%2Farabic-keyboard%2F&build=5515&sxhr_id=15`,
    {
      headers: {
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Access-Control-Allow-Origin': '*',
      },
      referrer: 'https://www.yamli.com/arabic-keyboard/',
    }
  )
    .then((response) => response.json())
    .then((response) => {
      let items;
      const matchedData = response
        .toString()
        .match(/(?<=\{"data":")(.*?)(?=",")/);
      if (matchedData && matchedData.length > 0) {
        // const itemObjects = JSON.parse( matchedData[ 0 ] );
        // const rItems = JSON.parse( itemObjects.data ).r;
        const rItems = matchedData[0];
        const arabicChoices = rItems.match(/[\u0621-\u064A ]+/g);
        const totalChoices = [queryText, ...arabicChoices];
        // console.log( arabicChoices );
        resut = totalChoices;
      } else {
        result = [];
      }
    }).finally(() => {
      res.status(200).send({
        success: 'true',
        result
      })
    });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});