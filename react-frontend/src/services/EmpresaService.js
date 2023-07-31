import axios from 'axios';

const EMPRESA_API_BASE_URL = "http://localhost:8080/empresa";

class EmpresaService {

    getEmpresa(){
        return axios.get(EMPRESA_API_BASE_URL);
    }

    createEmpresa(empresa){
        return axios.post(EMPRESA_API_BASE_URL, empresa);
    }

    getEmpresaById(empresaId){
        return axios.get(EMPRESA_API_BASE_URL + '/' + empresaId);
    }

    updateEmpresa(empresa, empresaId){
        return axios.put(EMPRESA_API_BASE_URL + '/' + empresaId, empresa);
    }

    deleteEmpresa(empresaId){
        return axios.delete(EMPRESA_API_BASE_URL + '/' + empresaId);
    }
}

export default new EmpresaService();