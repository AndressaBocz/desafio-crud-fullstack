import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import FornecedorService from '../services/FornecedorService';
import axios from 'axios';
import './style.css';


class CreateFornecedor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            nome: '',
            cnpj_cpf: '',
            email: '',
            cep: '',
            rg: '',
            data_nascimento: ''
        }
        this.changeNomeHandler = this.changeNomeHandler.bind(this);
        this.changeCnpj_CpfHandler = this.changeCnpj_CpfHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeCepHandler = this.changeCepHandler.bind(this);
        this.changeRgHandler = this.changeRgHandler.bind(this);
        this.changeData_NascimentoHandler = this.changeData_NascimentoHandler.bind(this);
        this.saveOrUpdateFornecedor = this.saveOrUpdateFornecedor.bind(this);
    }

    validateCep = () => {
        const cep = this.state.cep.replace('-', '');
        axios
          .get(`http://cep.la/${cep}`, {
            headers: { 'Accept': 'application/json' }
          })
          .then((response) => {
            const { cep } = response.data;
            // Verifica se o CEP retornado pela API é válido
            if (cep && cep.replace('-', '') === this.state.cep.replace('-', '')) {
              // CEP válido, continue com o salvamento do fornecedor
              this.saveOrUpdateFornecedor();
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
            FornecedorService.getFornecedorById(this.state.id).then( (res) =>{
                let fornecedor = res.data;
                this.setState({nome: fornecedor.nome,
                    cnpj_cpf: fornecedor.cnpj_cpf,
                    email : fornecedor.email,
                    cep : fornecedor.cep,
                    rg : fornecedor.rg,
                    data_nascimento : fornecedor.data_nascimento
                });
            });
        }        
    }

    saveOrUpdateFornecedor = (e) => {
        e.preventDefault();
        let fornecedor = {nome: this.state.nome, cnpj_cpf: this.state.cnpj_cpf, email: this.state.email, cep: this.state.cep, rg: this.state.rg, data_nascimento: this.state.data_nascimento};
        console.log('fornecedor => ' + JSON.stringify(fornecedor));

        if (this.isPessoaFisica()) {
            // Verifica se o RG e a data de nascimento estão preenchidos
            if (this.state.rg.trim() === '' || this.state.data_nascimento.trim() === '') {
              alert('Preencha o RG e a Data de Nascimento para fornecedor pessoa física.');
              return;
            }
          }

          this.validateCep();

        // step 5
        if(this.state.id === '_add'){
            FornecedorService.createFornecedor(fornecedor).then(res =>{
                this.props.history.push('/fornecedor');
            });
        }else{
            FornecedorService.updateFornecedor(fornecedor, this.state.id).then( res => {
                this.props.history.push('/fornecedor');
            });
        }
    }
    
    changeNomeHandler= (event) => {
        this.setState({nome: event.target.value});
    }

    changeCnpj_CpfHandler= (event) => {
        this.setState({cnpj_cpf: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changeCepHandler= (event) => {
        this.setState({cep: event.target.value});
    }

    changeRgHandler= (event) => {
        this.setState({rg: event.target.value});
    }

    changeData_NascimentoHandler= (event) => {
        this.setState({data_nascimento: event.target.value});
    }

    cancel(){
        this.props.history.push('/fornecedor');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="btn-purple">Adicionar Fornecedor</h3>
        }else{
            return <h3 className="btn-purple">Atualizar Fornecedor</h3>
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
                                            <label> Nome: </label>
                                            <input placeholder="Nome" name="nome" className="form-control" 
                                                value={this.state.nome} onChange={this.changeNomeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> CNPJ/CPF: </label>
                                            <InputMask mask={this.state.cnpj_cpf.length === 11 ? "999.999.999-99" : "99.999.999/9999-99"} 
                                            maskPlaceholder="" placeholder={ this.state.cnpj_cpf.length === 11 ? "___.___.___-__" : "__.___.___/____-__" } type="tel" name="cnpj_cpf" className="form-control" 
                                            value={this.state.cnpj_cpf} onChange={this.changeCnpj_CpfHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email" name="emailId" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Cep: </label>
                                            <InputMask mask="99999-999" maskPlaceholder="" placeholder="_____-___"  type="tel" name="cep" className="form-control" 
                                                value={this.state.cep} onChange={this.changeCepHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> RG: </label>
                                            <InputMask mask={this.state.rg.length === 9 ? "99.999.999-9" : ""} maskPlaceholder="" placeholder={this.state.rg.length === 9 ? "__.___.___-_" : "RG"} type="tel" name="rg" className="form-control" 
                                                value={this.state.rg} onChange={this.changeRgHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Data de Nascimento: </label>
                                            <InputMask mask={this.state.data_nascimento.length === 10 ? "9999-99-99" : ""} maskPlaceholder="" placeholder="YYYY-MM-DD"  type="tel" name="data_nascimento" className="form-control" 
                                                value={this.state.data_nascimento} onChange={this.changeData_NascimentoHandler}/>
                                        </div>

                                        <button className="btn-salvar" onClick={this.saveOrUpdateFornecedor}>Salvar</button>
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

export default CreateFornecedor;