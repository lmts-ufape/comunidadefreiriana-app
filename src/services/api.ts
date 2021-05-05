import axios from 'axios';

const api = axios.create({
    baseURL: 'http://sistemas.ufape.edu.br/comunidadefreiriana/api',
});

export default api;