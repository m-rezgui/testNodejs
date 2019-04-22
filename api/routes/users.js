import express from 'express';
import cacheProvider from '../services/cache-provider';
const router = express.Router();

router.use((req, res, next) => {
  res.data = cacheProvider.instance().get('USERS');

  if (!res.data) {
    res.status(404).json( {error: 'data not found'} );
  } else if (req.method === 'PUT') {
    if (!req.body.firstname || !req.body.lastname) {
      res.status(404).json( {error: 'Missing data'} );
    } else if (typeof req.body.firstname !== 'string' || typeof req.body.firstname !== 'string') {
      res.status(404).json( {error: 'Invalid data type'} );
    } else {
      next();
    }
  } else {
    next();
  }
});


router.get('/', async (req, res) => {
  res.status(200).json(res.data);
});

router.get('/:id', async (req, res) => {
  const data = res.data;
  const userId = +req.params.id;
  const user = [];

  data.forEach((el) => {
    if (el.id === userId) {
      user.push(el);
    }
  });

  if (user.length) {
    res.status(200).json(user[0]);
  } else {
    res.status(404).json( {error: 'Invalid id'} );
  }
});

router.put('/:id', async (req, res) => {
  let data = res.data;
  const userId = +req.params.id;
  let find = false;

  data.forEach((el) => {
    if (el.id === userId) {
      find = true;
      el.firstname = req.body.firstname;
      el.lastname = req.body.lastname;
    }
  });

  cacheProvider.instance().set('USERS', data, 0); // return true
  data = cacheProvider.instance().get('USERS');

  if (find) {
    res.status(201).json(data[userId - 1]);
  } else {
    res.status(404).json( {error: 'Invalid id'} );
  }
});

export default router;
