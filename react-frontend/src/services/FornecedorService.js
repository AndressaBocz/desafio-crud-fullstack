import axios from 'axios';

const FORNECEDOR_API_BASE_URL = "http://localhost:8080/fornecedor";

class FornecedorService {

    getFornecedor(){
        return axios.get(FORNECEDOR_API_BASE_URL);
    }

    createFornecedor(fornecedor){
        return axios.post(FORNECEDOR_API_BASE_URL, fornecedor);
    }

    getFornecedorById(fornecedorId){
        return axios.get(FORNECEDOR_API_BASE_URL + '/' + fornecedorId);
    }

    updateFornecedor(fornecedor, fornecedorId){
        return axios.put(FORNECEDOR_API_BASE_URL + '/' + fornecedorId, fornecedor);
    }

    deleteFornecedor(fornecedorId){
        return axios.delete(FORNECEDOR_API_BASE_URL + '/' + fornecedorId);
    }
}

export default new FornecedorService();