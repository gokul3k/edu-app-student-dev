import { STORAGE_KEYS } from '../../constants';
import Cookie from 'js-cookie';

const getIsLoggedIn = () => {
    return Cookie.get("tk") ? true: false;
};

export default getIsLoggedIn;
