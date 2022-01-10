import React from 'react';
import { renderPercentChange } from '../../helpers';
import axios from 'axios';
import Loading from '../common/Loading';
import './detail.css';
import Chart from './Chart';

class Detail extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            currency: {},
            loading: false,
        }
    }

    componentDidMount() {
        const currencyId = this.props.match.params.id;

        this.fetchCurrency(currencyId);
    }

    componentWillReceiveProps(nextProps){
        if (this.props.location.pathname !== nextProps.location.pathname){
            //Get new currency id from url
            const newCurrencyId = nextProps.match.params.id;

            this.fetchCurrency(newCurrencyId);
        }
    }

    

    fetchCurrency(currencyId) {
        this.setState({ loading: true });

        axios.get(`https://api.coingecko.com/api/v3/coins/${currencyId}`)
            .then(response => {
                this.setState({ loading: false, currency: response.data });
            })
    }

    render(){
        const { loading, currency } = this.state;
        
        // render only loading component if loading state is set to true.
        if (loading) {
            return <div className='Loading-container text-center mt-3'><Loading /></div>
        }

        if(currency.symbol) {
            return(
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-4'>
                            <div className='Detail'>
                                <h1 className='Detail-heading'>
                                    {currency.name} ({currency.symbol.toUpperCase()})
                                </h1>
                
                                <div className='Detail-container'>
                                    <div className='Detail-item'>
                                        Price <span className='Detail-value'>$ {currency.market_data.current_price.usd}</span>
                                    </div>
                                    <div className='Detail-item'>
                                        Rank <span className='Detail-value'>{currency.market_cap_rank}</span>
                                    </div>
                                    <div className='Detail-item'>
                                        24H Change 
                                        <span className='Detail-value'>
                                            {renderPercentChange(currency.market_data.price_change_24h)}
                                        </span>
                                    </div>
                                    <div className='Detail-item'>
                                        <span className='Detail-title'>Market Cap</span> 
                                        <span className='Detail-dollar'>$</span>
                                        {currency.market_data.market_cap.usd} 
                                    </div>
                                    <div className='Detail-item'>
                                        <span className='Detail-title'>Circulating Supply</span>
                                        {Math.round(currency.market_data.circulating_supply * 100) / 100}
                                    </div>
                                    <div className='Detail-item'>
                                        <span className='Detail-title'>24H Volume</span> 
                                        <span className='Detail-dollar'>$</span>
                                        {currency.volume24h} 
                                    </div>
                                    <div className='Detail-item'>
                                        <span className='Detail-title'>Total Supply</span> 
                                        {currency.market_data.total_supply} 
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-8'>
                            <Chart coinId={currency.id}/>
                        </div>
                    </div>
                    <div className='row mx-5'>
                        <h3>What is {currency.name}?</h3>
                        <div className='Detail-description' dangerouslySetInnerHTML={{ __html: currency.description.en }} />
                    </div>
                </div>
            )
        } else {
            return (null)
        }
    }
}

export default Detail;