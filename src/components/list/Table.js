import React from 'react';
import { withRouter } from 'react-router-dom';
import './Table.css';
import { renderPercentChange, numberWithCommas } from '../../helpers';
import PropTypes from 'prop-types';

const Table = (props) => {
    const { currencies, history } = props;
    return (
        <div className='Table-container'>
                
                <table className='Table'>
                    <thead className='Table-head'>
                        <tr>
                            <th>Coin</th>
                            <th>Price</th>
                            <th>Market Cap</th>
                            <th>Circulating Supply</th>
                            <th>Price 24H Change</th>
                        </tr>
                    </thead>
                    <tbody className='Table-body'>
                        {currencies.map((currency) => (
                            <tr 
                                key={currency.id}
                                onClick={() => history.push(`/coin/${currency.id}`)}>
                                <td>
                                    <span className='Table-rank'>{currency.market_cap_rank}</span>
                                    {`${currency.name} / ${currency.symbol.toUpperCase()}`}
                                    <img className='Table-image' alt='coin-img' src={currency.image}></img>
                                </td>
                                <td>
                                    <span className='Table-dollar'>$</span>
                                    {numberWithCommas(currency.current_price)}
                                </td>
                                <td>
                                    <span className='Table-dollar'>$</span>
                                    {numberWithCommas(currency.market_cap)}
                                </td>
                                <td>
                                    {`${numberWithCommas(Math.round(currency.circulating_supply * 100) / 100)} ${currency.symbol.toUpperCase()}`}
                                </td>
                                <td>
                                    {renderPercentChange(currency.price_change_percentage_24h)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>
    );
}

Table.propTypes = {
    currencies: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(Table);