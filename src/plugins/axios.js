import axios from 'axios';
import store  from '@/store';
import router  from '@/router';
const base = process.env.VUE_APP_API_BASE_URL + '/api';

const http = axios.create({
    baseURL: base,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token') || null,
    }
})

http.interceptors.request.use(function(config) {
    const accessToken = localStorage.getItem('access_token');
    if ( accessToken != null ) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, function(err) {
    return Promise.reject(err);
});

http.interceptors.response.use(undefined, function (error) {
    if(error.response.status === 422){
        store.commit('user/LOG_OUT');
        router.push({path: '/'});
    }

    return Promise.reject(error);
});
export default http;
