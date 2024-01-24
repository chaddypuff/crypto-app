// CryptoDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './crypto-details.css';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = 'CG-YjmpX6oc9rZXBGSSDLm8Bgbs';

const CryptoDetails = () => {
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/coins/${id}`, {
          params: {
            localization: false,
            tickers: false,
            market_data: true,
            community_data: false, 
            developer_data: false,
            sparkline: false,
            x_cg_demo_api_key: API_KEY,
          },
        });

        console.log('API Response:', response.data); 

        setCryptoDetails(response.data);
      } catch (error) {
        console.error('Error fetching crypto details:', error);
      }
    };

    fetchCryptoDetails();
  }, [id]);

  const formatPrice = (price) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(price);

  return (
    <div className="crypto-details-container">
      {cryptoDetails && (
        <div className="crypto-details">
          <h1 className="crypto-title">
            {cryptoDetails.name} ({cryptoDetails.symbol.toUpperCase()})
          </h1>
  
          <div className="section">
            <h2 className="section-title">General Information</h2>
            <ul className="info-list">
              <li className="info-item">Price: {formatPrice(cryptoDetails.market_data.current_price.zar)}</li>
              <li className="info-item">Market Cap: {formatPrice(cryptoDetails.market_data.market_cap.zar)}</li>
              <li className="info-item">Total Supply: {cryptoDetails.market_data.total_supply}</li>
              <li className="info-item">Market Rank: {cryptoDetails.market_data.market_cap_rank}</li>
            </ul>
          </div>
  
          <div className="section">
            <h2 className="section-title">Price Performance</h2>
            <ul className="info-list">
              <li className={`info-item ${cryptoDetails.market_data.price_change_percentage_24h >= 0 ? 'price-change-positive' : 'price-change-negative'}`}>
                24h Price Change: {cryptoDetails.market_data.price_change_percentage_24h.toFixed(2)}%
              </li>
              <li className={`info-item ${cryptoDetails.market_data.price_change_percentage_7d >= 0 ? 'price-change-positive' : 'price-change-negative'}`}>
                7d Price Change: {cryptoDetails.market_data.price_change_percentage_7d.toFixed(2)}%
              </li>
            </ul>
          </div>
  
          <div className="section">
            <h2 className="section-title">All-Time Records</h2>
            <ul className="info-list">
              <li className="info-item">All-Time High: {formatPrice(cryptoDetails.market_data.ath.zar)}</li>
              <li className="info-item">All-Time Low: {formatPrice(cryptoDetails.market_data.atl.zar)}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoDetails;
