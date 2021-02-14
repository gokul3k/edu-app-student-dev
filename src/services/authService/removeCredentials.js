import Cookies from 'js-cookie'


export default function removeCredentials(){
    Cookies.remove('tk');
    Cookies.remove('exp')
}