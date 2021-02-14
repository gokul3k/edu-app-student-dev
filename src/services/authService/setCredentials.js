import Cookies from 'js-cookie'


export default function setCredential(token){
    Cookies.set('tk', token, { expires: 1,sameSite:true });
    // Cookies.set('exp', exp,{ expires: 1,sameSite:true })
}