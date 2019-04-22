import express from 'express';
import userRoute from './routes/users';

const router = express();

router.use('/users/', userRoute);

router.use('/', (req, res) => {
  res.status(404).json( {error: '404 Page not found'} );
});

export default router;
