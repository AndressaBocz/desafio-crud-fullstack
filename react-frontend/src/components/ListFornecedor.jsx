import React, { Component } from 'react'
import FornecedorService from '../services/FornecedorService'
import { Link } from 'react-router-dom';
import './style.css';


class ListFornecedor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fornecedor: [],
            searchNome: '', 
            searchCnpjCpf: '',
        }
        this.addFornecedor = this.addFornecedor.bind(this);
        this.editFornecedor = this.editFornecedor.bind(this);
        this.deleteFornecedor = this.deleteFornecedor.bind(this);
        this.viewFornecedor = this.viewFornecedor.bind(this);
    }

    deleteFornecedor(id){
        FornecedorService.deleteFornecedor(id).then( res => {
            this.setState({fornecedor: this.state.fornecedor.filter(fornecedor => fornecedor.id !== id)});
        });
    }

    viewFornecedor(id){
        this.props.history.push(`/view-fornecedor/${id}`);
    }

    editFornecedor(id){
        this.props.history.push(`/add-fornecedor/${id}`);
    }

    componentDidMount(){
        FornecedorService.getFornecedor().then((res) => {
            this.setState({ fornecedor: res.data});
        });
    }

    addFornecedor(){
        this.props.history.push('/add-fornecedor/_add');
    }

    // atualizar o estado de pesquisa por nome
    handleSearchNome = (event) => {
        this.setState({ searchNome: event.target.value });
    }

    // atualizar o estado de pesquisa por CPF/CNPJ
    handleSearchCnpjCpf = (event) => {
        this.setState({ searchCnpjCpf: event.target.value });
    }

    render() {
        // filtrar fornecedores 
        const filteredFornecedores = this.state.fornecedor.filter(fornecedor => {
            const nomeMatches = fornecedor.nome.toLowerCase().includes(this.state.searchNome.toLowerCase());
            const cnpjCpfMatches = fornecedor.cnpj_cpf.includes(this.state.searchCnpjCpf);
            return nomeMatches && cnpjCpfMatches;
        });

        return (
            <div>
                <h2 className="text-center title-spacing">Lista de Fornecedores</h2>
                <div className="row">
                <button className="btn-purple" onClick={this.addFornecedor}>Adicionar Fornecedor</button>
                </div>
                <br />
                <div className="row search-fields">
                    {/* campos de entrada para os filtros */}
                    <input 
                        type="text"
                        placeholder="Buscar por Nome"
                        value={this.state.searchNome}
                        onChange={this.handleSearchNome}
                    />
                    <input 
                        type="text"
                        placeholder="Buscar por CPF/CNPJ"
                        value={this.state.searchCnpjCpf}
                        onChange={this.handleSearchCnpjCpf}
                    />
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Nome</th>
                                <th> CNPJ ou CPF</th>
                                <th> Email</th>
                                <th> CEP</th>
                                <th> RG</th>
                                <th> Data de nascimento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.fornecedor.map(fornecedor =>
                                <tr key={fornecedor.id}>
                                    <td> {fornecedor.nome} </td>
                                    <td> {fornecedor.cnpj_cpf}</td>
                                    <td> {fornecedor.email}</td>
                                    <td> {fornecedor.cep}</td>
                                    <td> {fornecedor.rg}</td>
                                    <td> {fornecedor.data_nascimento}</td>
                                    <td>
                                        <button onClick={() => this.editFornecedor(fornecedor.id)} className="btn btn-info">Atualizar</button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => this.deleteFornecedor(fornecedor.id)} className="btn btn-danger">Excluir</button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => this.viewFornecedor(fornecedor.id)} className="btn btn-info">Visualizar</button>
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

export default ListFornecedor;
