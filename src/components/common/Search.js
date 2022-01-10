import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './Search.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            coins: [],
            filteredCoins: [],
        }
    }

    componentDidMount(){
        axios.get(`https://api.coingecko.com/api/v3/coins/list`)
            .then(response => {
                this.setState({ coins: response.data })
            });
    }

    handleChange = (e) => {
        this.setState({searchQuery: e.target.value});

        // const filteredCoins = this.state.coins.filter(coin => {
        //     return coin.name.toLowerCase().includes(e.target.value.toLowerCase())
        // });

        const filteredCoins = this.state.coins.filter(coin => {
            if(e.target.value.length) {
                const xyz = coin.name.substring(0, e.target.value.length);
                if(xyz.toLowerCase() === e.target.value.toLowerCase()) return true;
                return false;
            } else {
                return false;
            }
        })

        this.setState({ filteredCoins });
    }

    handleRedirect =  (currencyId) => {
        this.setState({
            searchQuery: '',
            filteredCoins: []
        })

        this.props.history.push(`/coin/${currencyId}`);
    }

    renderSearchResults() {
        const { filteredCoins, searchQuery } = this.state;

        if(!searchQuery){
            return '';        
        }

        if (filteredCoins.length > 0) {
            return(
                <div className='Search-result-container'>
                    {filteredCoins.map(result => (
                        <div 
                            key={result.id}
                            className='Search-result'
                            onClick = {() => this.handleRedirect(result.id)}>
                                {result.name} ({result.symbol.toUpperCase()})
                        </div>
                    ))}
                </div>
            ) 
        }
    }

    render() {
        const { searchQuery } = this.state;

        return (
            <div className='Search'>
                <span className='Search-icon' />

                <input
                    className='Search-input'
                    type='text'
                    placeholder='Search' 
                    onChange={this.handleChange}
                    value={searchQuery} 
                />

                {this.renderSearchResults()}
               
            </div>  
        )
    }
}

export default withRouter(Search);