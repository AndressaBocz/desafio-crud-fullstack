import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home';
import ListEmpresa from './components/ListEmpresa';
import CreateEmpresa from './components/CreateEmpresa';
import ViewEmpresa from './components/ViewEmpresa';
import ListFornecedor from './components/ListFornecedor';
import CreateFornecedor from './components/CreateFornecedor';
import ViewFornecedor from './components/ViewFornecedor';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';


function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path="/" exact component={Home} />
                          <Route path = "/fornecedor" component = {ListFornecedor}></Route>
                          <Route path = "/add-fornecedor/:id" component = {CreateFornecedor}></Route>
                          <Route path = "/view-fornecedor/:id" component = {ViewFornecedor}></Route>
                          
                          <Route path = "/empresa" component = {ListEmpresa}></Route>
                          <Route path = "/add-empresa/:id" component = {CreateEmpresa}></Route>
                          <Route path = "/view-empresa/:id" component = {ViewEmpresa}></Route>
                          {/*<Route path = "/update-fornecedor/:id" component = {UpdateFornecedor}></Route> */}
                          {/*<Route path = "/update-empresa/:id" component = {UpdateEmpresa}></Route> */}
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;