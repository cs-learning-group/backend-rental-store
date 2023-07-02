var express = require('express');
const fs = require('fs/promises');
var router = express.Router();


/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.contentType('json')
  const filePath = `${__dirname}/../db.txt`;
  console.log('inside get function');
  const data = await getRecords(filePath);
  res.send(data);
  
});


router.post('/', async (req, res, next) => {
  console.log('inside post function');
  res.contentType('json')
  console.log(req.body);
  const filePath = `${__dirname}/../db.txt`;
  // console.log(req.query);
  const data = await getRecords(filePath);
  data.push(req.body);
  await fs.writeFile(filePath, JSON.stringify(data));
  res.send(`Record updated successfully`);
});

async function getRecords(filePath) {
 const resultSet = await fs.readFile(filePath, 'utf8');
 console.log(resultSet, 'result');
 return JSON.parse(resultSet.length ? resultSet :  '[]');
}




module.exports = router;
