import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import EmpresaService from '../services/EmpresaService';
import './style.css';

class UpdateEmpresa extends Component {
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
        this.changeCepandler = this.changeCepHandler.bind(this);
        this.changeUfHandler = this.changeUfHandler.bind(this);
        this.updateEmpresa = this.updateEmpresa.bind(this);
    }

    componentDidMount(){
        EmpresaService.getEmpresaById(this.state.id).then( (res) =>{
                let empresa = res.data;
                this.setState({nome_fantasia: empresa.nome_fantasia,
                                cnpj: empresa.cnpj,
                                cep : empresa.cep,
                                uf : empresa.uf
                });
        });
    }

    updateEmpresa = (e) => {
        e.preventDefault();
        let empresa = {nome_fantasia: empresa.nome_fantasia, cnpj: empresa.cnpj, cep : empresa.cep, uf : empresa.uf};
        console.log('empresa => ' + JSON.stringify(empresa));
        console.log('id => ' + JSON.stringify(this.state.id));
        EmpresaService.updateEmpresa(empresa, this.state.id).then( res => {
            this.props.history.push('/empresa');
        });
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
        this.props.history.push('/fornecedor');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="btn-purple">Atualizar Empresa</h3>
                                <div className = "card-body">
                                    <form>
                                    <div className = "form-group">
                                            <label> Nome Fantasia: </label>
                                            <input placeholder="Digite o nome fantasia" name="nome_fantasia" className="form-control" 
                                                value={this.state.nome_fantasia} onChange={this.changeNome_FantasiaHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> CNPJ: </label>
                                            <InputMask mask="99.999.999/9999-99" maskPlaceholder="" placeholder="**.***.***/****-**" type="tel" name="cnpj" className="form-control" 
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

                                        <button className="btn btn-success" onClick={this.updateEmpresa}>Salvar</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateEmpresa;