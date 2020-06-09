import axios from '@/util/axios';
import store from '@/store';

const headers = {
  Authorization: 'Bearer ' + store.state.token,
  'Content-Type': 'application/json'
};

// 用户签到
const userSign = () => axios.get('/user/fav', {headers});

export {
  userSign
};
