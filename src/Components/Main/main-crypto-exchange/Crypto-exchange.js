import React, {Component, Fragment} from 'react';

import exchangeService from '../../../service/exchange.service';
import './crypto-exchange.css'

export default class CryptoExchange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyList: ['USD','JPY','EUR'],
            name: props.name,
            exchangeRateData: {},
            tableValues: [],
        }
    }

    componentDidMount() {
        exchangeService.getDataPrice(this.state.name, this.state.currencyList)
            .then(this.setInfoExchange);
    }

    setInfoExchange = (response) => {
        const tableValues = <tr> 
            {Object.keys(response).slice().map((field, index) => {
                return ([<td key={response}> {field} </td>, <td key={response}> {response[field]} </td>]);
            })}
        </tr>;
        this.setState(({state}) => ({...state, exchangeRateData: response, tableValues}));
    }
    
    render() {
        const keysRender = Object.keys(this.state.exchangeRateData);
        return (
          <div> 
              <table className="crypto-table">
                  <tbody>
                      {keysRender.map((field, index) => {
                          return (
                              <tr key={index}>
                                  <Fragment>
                                    <td className="crypto-name">{field}:</td>
                                    <td className="crypto-value">{this.state.exchangeRateData[field]}</td>
                                  </Fragment>
                              </tr>
                          );
                      })}
                  </tbody>
              </table>
          </div>  
        );
    }
}