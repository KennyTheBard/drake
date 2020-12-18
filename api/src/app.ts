import express from 'express';
import * as dotenv from 'dotenv';
import neo4j, { QueryResult } from 'neo4j-driver';


dotenv.config();

var driver = neo4j.driver('neo4j://localhost:7687');

const app = express();
const port = process.env.PORT;

app.get('/', async (req, res) => {
   var session = driver.session()
   const result : QueryResult = await session.run('create (s:SCENE {text: $text}) return s', {
         text: 'This is a scene',
      });
   session.close()

   res.send(result.records);
});

app.get('/all', async (req, res) => {
   var session = driver.session()
   const result : QueryResult = await session.run('match (s:SCENE) RETURN s.text as text');
   session.close()

   res.send(result.records.map(r => r.get('text')));
});

app.listen(port, () => {
   return console.log(`server is listening on ${port}`);
});

driver.close()