import axios from 'axios'

const instance = axios.create({
    baseURL:  'http://api.zhuishushenqi.com',
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'},
    responseType:'json'
})

export default instance