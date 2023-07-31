import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

const Home = () => {
  return (
    <div className="home"> 
      <h2>Escolha uma opção para visualizar:</h2>
      <div>
        <Link to="/empresa">
          <button className="btn-purple">Empresas</button>
        </Link>
      </div>
      <div>
        <Link to="/fornecedor">
          <button className="btn-purple">Fornecedores</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
