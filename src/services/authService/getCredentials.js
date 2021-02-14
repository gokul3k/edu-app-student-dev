import { STORAGE_KEYS } from '../../constants';
import Cookie from 'js-cookie';

const getCredentials = () => {
    return Cookie.get('tk');
};

export default getCredentials;
