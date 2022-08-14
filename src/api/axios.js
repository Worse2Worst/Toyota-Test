import axios from 'axios';


let development = process.env.NODE_ENV !== 'production'
let url = development ? 'http://127.0.0.1:5000/v1/' : 'https://toyota-fullstack-test.herokuapp.com/v1/'

export default axios.create({
    baseURL: url
});
