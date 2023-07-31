import React, { Component } from 'react'
import FornecedorService from '../services/FornecedorService'


class ViewFornecedor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            fornecedor: {}
        }
    }

    componentDidMount(){
        FornecedorService.getFornecedorById(this.state.id).then( res => {
            this.setState({fornecedor: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> Ver Detalhes do Fornecedor</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> Nome do Fornecedor: </label>
                            <div> { this.state.fornecedor.nome }</div>
                        </div>
                        <div className="row">
                            <label> Email do Fornecedor: </label>
                            <div> { this.state.fornecedor.email }</div>
                        </div>
                        <div className="row">
                            <label> CNPJ ou CPF: </label>
                            <div> { this.state.fornecedor.cnpj_cpf }</div>
                        </div>
                        <div className="row">
                            <label> CEP do Fornecedor: </label>
                            <div> { this.state.fornecedor.cep }</div>
                        </div>
                        <div className="row">
                            <label> RG do Fornecedor: </label>
                            <div> { this.state.fornecedor.rg }</div>
                        </div>
                        <div className="row">
                            <label> Data de Nascimento: </label>
                            <div> { this.state.fornecedor.data_nascimento }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewFornecedor;
