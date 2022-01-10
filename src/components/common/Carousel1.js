import React, { useState, useEffect } from "react";
import Carousel from "react-elastic-carousel";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "./Carousel.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Carousel1() {

  let formatter = Intl.NumberFormat('en', { notation: 'compact' });

  const history = useHistory();

  const [trendingCoins, setTrendingCoins] = useState([]);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h')
      .then(response => setTrendingCoins(response.data))
  }, []);

  function handleItemClick(coinId) {
    history.push(`/coin/${coinId}`);
  }

  return (
    <div>
      <h3 className="text-center m-5">Top-10 Trending Coins</h3>
      <div className="carousel">
        <Carousel breakPoints={breakPoints} enableAutoPlay enableMouseSwipe enableSwipe>
          {
            trendingCoins.map(coin => {
              return (
              <div className="item" onClick={() => handleItemClick(coin.id)}>
                <div className="row title">
                  <div className="col-8">
                    <div className="item-name">{coin.name}</div>
                    <div className="item-symbol">{coin.symbol.toUpperCase()}</div>
                    <div className="item-symbol">{coin.price_btc}</div>
                  </div>
                  <div className="col-4">
                    <img className="item-image" alt="coin-img" src={coin.image} />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-8">
                    <div className="item-symbol small">Price</div>
                  </div>
                  <div className="col-4">
                    <div className="item-symbol small">${formatter.format(coin.current_price)}</div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-8">
                    <div className="item-symbol small">24h High</div>
                  </div>
                  <div className="col-4">
                    <div className="item-symbol small green">${formatter.format(coin.high_24h)}</div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-8">
                    <div className="item-symbol small">24h Low</div>
                  </div>
                  <div className="col-4">
                    <div className="item-symbol small red">${formatter.format(coin.low_24h)}</div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-8">
                    <div className="item-symbol small">Market Cap</div>
                  </div>
                  <div className="col-4">
                    <div className="item-symbol small">{formatter.format(coin.market_cap)}</div>
                  </div>
                </div>
              </div>
              )
            })
          }
        </Carousel>
      </div>
    </div>
  );
}

export default Carousel1;
