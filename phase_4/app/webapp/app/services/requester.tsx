import axios from "axios";
import Cookies from 'js-cookie';

const useRequest = () => {

    const h: any = {};
    const token = Cookies.get('token');

    if (token != null) {
        h['Authorization'] = 'Bearer ' + token;
    }

    const requester = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            'Content-Type': 'application/json',
            ...h
        },
        withCredentials: true
    });

    return requester;
}

export default useRequest;