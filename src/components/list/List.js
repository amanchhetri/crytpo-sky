import React from 'react';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';
import axios from 'axios';
import Carousel1 from '../common/Carousel1';

class List extends React.Component {
    state = {
        loading: false,
        currencies: [],
        error: null,
        totalPages: 0,
        page:1
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies() {
        this.setState({ loading: true });

        const { page } = this.state;

        axios.get(`https://api.coingecko.com/api/v3/coins/list`)
            .then(response => {
                this.setState({
                    totalPages: Math.ceil(response.data.length/20)
                })
            });

        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false`)
            .then(response => {
                this.setState({
                    currencies: response.data,
                    loading: false
                })
            })
    }

    handlePaginationClick = (direction) => {
        let nextPage = this.state.page;

        // Increment nextPage if direction variable is next, otherwise decrement
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

        this.setState({ page: nextPage }, () => {
            // call fetchCurrencies function inside setState's callback
            // because we have to make sure first page state is updated 
            this.fetchCurrencies();
        });
    }

    render() {
        const {loading, error, currencies, page, totalPages} = this.state;

        console.log('asdf', totalPages)

        if (loading) {
            return <div className='loading-container'><Loading /></div>
        }

        if(error) {
            return <div className='error'>{error}</div>
        }

        return(
            <div>
                <Carousel1 />
                <h2 className='text-center m-5'>Today's Cryptocurrency Prices by Market Cap</h2>
                <Table 
                    currencies={currencies}
                />
                <Pagination 
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>
        );
    }
}

export default List