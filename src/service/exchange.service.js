import {environment} from '../environment/environment';

class ExchangeService {
    constructor() {
        this.contentSettingsGET = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        };

        if(!ExchangeService.exchangeService){
            ExchangeService.exchangeService = this;
        }
        return ExchangeService.exchangeService;
        console.log(environment);
    }
    
    getCoinList() {
        return fetch(environment.baseURL + 'all/coinlist??api_key=' + environment.apiKey, {
            ...this.contentSettingsGET,
        }).then(response => response.json());
    }

    getDataPrice(name, exchangeList = []) {
        const params = {
            fsym: name,
            tsyms: exchangeList.join(','),
        };
    
        return fetch(environment.baseURL + `price?api_key=${environment.apiKey}&fsym=${name}&tsyms=${exchangeList.slice().join(',')}`, {
                ...this.contentSettingsGET,
                }).then(response => response.json())
                  .then(response => {
                      const isEmpty = Object.keys(response).length === 0;
                      if (isEmpty) {
                        const preparationResponse = {};
                        exchangeList.forEach(field => {
                            preparationResponse[field] = 0;
                        })
                        return preparationResponse;
                      }
                      return response;
                  });
    }
}

const exchangeService = new ExchangeService();
Object.freeze(exchangeService);

export default exchangeService;