import React, { Component } from 'react'
import EmpresaService from '../services/EmpresaService'


class ViewEmpresa extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            empresa: {}
        }
    }

    componentDidMount(){
        EmpresaService.getEmpresaById(this.state.id).then( res => {
            this.setState({empresa: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> Ver Detalhes da Empresa</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> Nome Fantasia: </label>
                            <div> { this.state.empresa.nome_fantasia }</div>
                        </div>
                        <div className="row">
                            <label> CNPJ: </label>
                            <div> { this.state.empresa.cnpj }</div>
                        </div>
                        <div className="row">
                            <label> CEP: </label>
                            <div> { this.state.empresa.cep }</div>
                        </div>
                        <div className="row">
                            <label> UF: </label>
                            <div> { this.state.empresa.uf }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewEmpresa;