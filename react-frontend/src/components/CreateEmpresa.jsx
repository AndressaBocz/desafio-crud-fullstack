import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import EmpresaService from '../services/EmpresaService';
import axios from 'axios';
import './style.css'

class CreateEmpresa extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            nome_fantasia: '',
            cnpj: '',
            cep: '',
            uf: ''
        }
        this.changeNome_FantasiaHandler = this.changeNome_FantasiaHandler.bind(this);
        this.changeCnpjHandler = this.changeCnpjHandler.bind(this);
        this.changeCepHandler = this.changeCepHandler.bind(this);
        this.changeUfHandler = this.changeUfHandler.bind(this);
        this.saveOrUpdateEmpresa = this.saveOrUpdateEmpresa.bind(this);
    }

    validateCep = () => {
        const cep = this.state.cep.replace('-', '');
        axios
          .get(`http://cep.la/${cep}`, {
            headers: { 'Accept': 'application/json' }
          })
          .then((response) => {
            const { city, state } = response.data;
            // Verifica se a cidade e o estado retornados pela API são válidos
            if (city && state) {
              // Atualiza o estado da empresa com o CEP e UF validados
              this.setState({
                cep: cep,
                uf: state
              });
            } else {
              alert('CEP inválido. Verifique o CEP informado.');
            }
          })
          .catch((error) => {
            console.error('Erro ao consultar CEP na API:', error);
            alert('Erro ao consultar CEP. Verifique a conexão com a internet.');
          });
      };

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmpresaService.getEmpresaById(this.state.id).then( (res) =>{
                let empresa = res.data;
                this.setState({nome_fantasia: empresa.nome_fantasia,
                                cnpj: empresa.cnpj,
                                cep : empresa.cep,
                                uf : empresa.uf
                });
            });
        }        
    }
    saveOrUpdateEmpresa = (e) => {
        e.preventDefault();
        this.validateCep(); // valida o CEP antes de criar a empresa
        let empresa = {nome_fantasia: empresa.nome_fantasia, cnpj: empresa.cnpj, cep : empresa.cep, uf : empresa.uf};
        if (empresa.uf.toUpperCase() === 'PR') {
            // Verifica se o fornecedor é pessoa física menor de idade
            if (this.isMenorIdadeFornecedor()) {
                alert('Não é permitido cadastrar fornecedor pessoa física menor de idade para empresa do Paraná.');
                return;
            }
        }
        console.log('empresa => ' + JSON.stringify(empresa));
        
        // step 5
        if(this.state.id === '_add'){
            EmpresaService.createEmpresa(empresa).then(res =>{
                this.props.history.push('/empresa');
            });
        }else{
            EmpresaService.updateEmpresa(empresa, this.state.id).then( res => {
                this.props.history.push('/empresa');
            });
        }
    }

    isMenorIdadeFornecedor() {
        // Verifica se o fornecedor é pessoa física
        if (this.state.cnpj.trim().length === 11) {
            // Extrai o ano de nascimento do campo data_nascimento (formato YYYY-MM-DD)
            const anoNascimento = parseInt(this.state.data_nascimento.split('-')[0], 10);
            const anoAtual = new Date().getFullYear();

            // Verifica se o fornecedor é menor de idade (menor que 18 anos)
            return anoAtual - anoNascimento < 18;
        }
        return false;
    }
    
    changeNome_FantasiaHandler= (event) => {
        this.setState({nome_fantasia: event.target.value});
    }

    changeCnpjHandler= (event) => {
        this.setState({cnpj: event.target.value});
    }

    changeCepHandler= (event) => {
        this.setState({cep: event.target.value});
    }

    changeUfHandler= (event) => {
        this.setState({uf: event.target.value});
    }

    cancel(){
        this.props.history.push('/empresa');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="btn-purple">Adicionar Empresa</h3>
        }else{
            return <h3 className="btn-purple">Atualizar Empresa</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Nome Fantasia: </label>
                                            <input placeholder="Digite o nome fantasia" name="nome_fantasia" className="form-control" 
                                                value={this.state.nome_fantasia} onChange={this.changeNome_FantasiaHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> CNPJ: </label>
                                            <InputMask mask="99.999.999/9999-99" maskPlaceholder=""placeholder="**.***.***/****-**" type="tel" name="cnpj" className="form-control" 
                                                value={this.state.cnpj} onChange={this.changeCnpjHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Cep: </label>
                                            <InputMask mask="99999-999" maskPlaceholder="" placeholder="*****-***"  type="tel" name="cep" className="form-control" 
                                                value={this.state.cep} onChange={this.changeCepHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> UF: </label>
                                            <input placeholder="Digite o UF" name="rg" className="form-control" 
                                                value={this.state.uf} onChange={this.changeUfHandler}/>
                                        </div>

                                        <button className="btn-salvar" onClick={this.saveOrUpdateEmpresa}>Salvar</button>
                                        <button className="btn-cancelar" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmpresa;