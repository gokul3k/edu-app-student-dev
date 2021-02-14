import { AUTH_ONLY } from '../types';
import { getIsLoggedIn } from '../../services/authService';

const requireLogin = (to, from, next) => {
  if (to.meta[AUTH_ONLY] && !getIsLoggedIn()) {
    next.redirect('/signin');
  }
  next();
};

export default requireLogin;
