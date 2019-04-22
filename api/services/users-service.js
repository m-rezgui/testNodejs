import fetch from 'node-fetch';
import cacheProvider from './cache-provider';
const CACHE_DURATION = 0; // Unlimited
const CACHE_KEY = 'USERS';

export default () => {
  cacheProvider.instance().get(CACHE_KEY, (err, value) => {
    if (err) {
      console.error(err);
    }

    if (value === undefined) {
      fetch('https://marcdelalonde.github.io/nodejs-test/data.json')
          .then((res)=> res.json())
          .then((json) => {
            cacheProvider.instance().set(CACHE_KEY, json, CACHE_DURATION, (err, success) => {
              if (!err && success) {
                return json;
              }
            });
          });
      console.log('Cache stored');
    } else {
      return value;
    }
  });
};
