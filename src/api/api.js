import axios from 'axios';
export const BASE_URL = 'https://hsstwebapp.uc.r.appspot.com';
const DEV_URL = 'https://bestenlist.com/api';

export default axios.create({
    baseURL: DEV_URL + '/rest/v1',
});
