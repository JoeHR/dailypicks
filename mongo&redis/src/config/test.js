import { getValue, setValue, getHvalue, delValue } from './RedisConfig';

setValue('test', 'rh message from redis client');

getValue('test').then((res) => {
  console.log('getValue:' + res);
});

delValue('rhObj');

setValue('rhObj', { name: 'rh', age: 30, email: 'rh@123.com' });

getHvalue('rhObj').then((res) => {
  console.log('getHValue:' + JSON.stringify(res));
});
