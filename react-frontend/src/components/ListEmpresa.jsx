import React, { Component } from 'react'
import EmpresaService from '../services/EmpresaService'


class ListEmpresa extends Component {
    constructor(props) {
        super(props)

        this.state = {
            empresa: []
        }
        this.addEmpresa = this.addEmpresa.bind(this);
        this.editEmpresa = this.editEmpresa.bind(this);
        this.deleteEmpresa = this.deleteEmpresa.bind(this);
        this.viewEmpresa = this.viewEmpresa.bind(this);
    }

    deleteEmpresa(id){
        EmpresaService.deleteEmpresa(id).then( res => {
            this.setState({empresa: this.state.empresa.filter(empresa => empresa.id !== id)});
        });
    }

    viewEmpresa(id){
        this.props.history.push(`/view-empresa/${id}`);
    }

    editEmpresa(id){
        this.props.history.push(`/add-empresa/${id}`);
    }

    componentDidMount(){
        EmpresaService.getEmpresa().then((res) => {
            this.setState({ empresa: res.data});
        });
    }

    addEmpresa(){
        this.props.history.push('/add-empresa/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center title-spacing">Lista de Empresas</h2>
                <div className="row">
                    <button className="btn-purple" onClick={this.addEmpresa}> Adicionar Empresa</button>
                </div>
                <br />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Nome Fantasia</th>
                                <th> CNPJ</th>
                                <th> CEP</th>
                                <th> UF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.empresa.map(empresa =>
                                <tr key={empresa.id}>
                                    <td> {empresa.nome_fantasia} </td>
                                    <td> {empresa.cnpj}</td>
                                    <td> {empresa.cep}</td>
                                    <td> {empresa.uf}</td>
                                    <td>
                                        <button onClick={() => this.editEmpresa(empresa.id)} className="btn btn-info">Atualizar</button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmpresa(empresa.id)} className="btn btn-danger">Excluir</button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmpresa(empresa.id)} className="btn btn-info">Visualizar</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListEmpresa;
