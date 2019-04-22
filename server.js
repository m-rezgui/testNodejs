import express from 'express';
import bodyParser from 'body-parser';
import router from './api/router';
import cacheProvider from './api/services/cache-provider';
import usersService from './api/services/users-service';

const PORT = 3000;
const server = express();

cacheProvider.start((err) => {
  if (err) console.error(err);
});

usersService();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded( {extended: true} ));
server.use(router);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}!`);
});

export default server; // for testing with Mocha
