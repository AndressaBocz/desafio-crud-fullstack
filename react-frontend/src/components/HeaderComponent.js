import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <header>
          <nav className="footer">
            <div>
              <Link to="/" className="btn-purple">
                Gerenciamento de Fornecedores e Empresas
              </Link>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
