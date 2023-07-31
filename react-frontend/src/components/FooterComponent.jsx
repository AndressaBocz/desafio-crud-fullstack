import React, { Component } from 'react'
import './style.css'


class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <footer className = "footer">
                    <span >Feito por Andressa Bocz @ 2023 </span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent;