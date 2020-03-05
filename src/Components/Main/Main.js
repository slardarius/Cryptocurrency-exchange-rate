import React, { Component } from 'react';

import './main-style.css';
import { environment } from '../../environment/environment';
import exchangeService from '../../service/exchange.service';
import CryptoExchange from './main-crypto-exchange/Crypto-exchange';
import Preloader from '../Preloader/Preloader';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaPath: environment.mediaPath,
            listOfCrypto: [],
            listOfCryptoKeys: [],
            cards: [],
            mouseX: 0,
            mouseY: 0,
            element: undefined,
        };
    }

    componentWillMount() {
        document.addEventListener('mousemove', this.onChangeState);
    }

    componentWillUnmount() {
        document.removeEventListener(this.onChangeState);
    }

    onChangeState = (e) => {
        const { clientX, clientY } = e;
        this.setState((state) => ({ ...state, mouseX: clientX, mouseY: clientY }));
        this.onDragElement();
    }

    onDragElement = () => {
        if (this.state.element) {
            const element = this.state.element;
            element.style.left = (this.state.mouseX - element.offsetWidth / 2) + 'px';
            element.style.top = (this.state.mouseY - element.offsetHeight / 2) + 'px';
        }
    }

    currencyCard = (node) => {
        // console.log(node);
    }

    onMouseDown = (event) => {
        const { target: element } = event;
        if (element.classList.contains('card')) {
            element.classList.add('card--catch');
            this.setState((state) => ({ ...state, element: element }));
            this.onDragElement();
        }
    }

    onMouseUp = (event) => {
        const { target: element } = event;
        if (element.classList.contains('card')) {
            event.target.classList.remove('card--catch');
            this.setState((state) => ({ ...state, element: undefined }));
        }
    }

    async componentDidMount() {
        exchangeService.getCoinList()
            .then(({ Data }) => {
                this.state.listOfCrypto = Data;
                this.state.listOfCryptoKeys = Object.keys(this.state.listOfCrypto).slice(10, 30);
                const cards = this.state.listOfCryptoKeys.map(key => {
                    const currentCion = this.state.listOfCrypto[key];
                    return (
                        <div onMouseDown={this.onMouseDown}
                            onMouseUp={this.onMouseUp}
                            ref={this.currencyCard}
                            key={currentCion.Id}
                            className='card'>
                            <div className='card-image'>
                                <img src={this.state.mediaPath + '/' + currentCion.ImageUrl} alt="Crypto image" />
                            </div>
                            <div className='card-title'>
                                <a target="_blank" href={this.state.mediaPath + currentCion.Url}>  {currentCion.Name} </a>
                            </div>
                            <div className='card-description'>
                                <CryptoExchange name={currentCion.Name} />
                            </div>
                            <div className='card-price'>

                            </div>
                        </div>
                    );
                });
                this.setState({ cards });
            });
    }



    render() {
        if (!this.state.listOfCryptoKeys.length) {
            return <div>
                <Preloader />
            </div>
        }

        return (
            <div>
                <div className='card-wrapper'>
                    {this.state.cards}
                </div>
            </div>
        );
    }
}