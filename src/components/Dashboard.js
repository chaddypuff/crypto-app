import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = 'CG-YjmpX6oc9rZXBGSSDLm8Bgbs';

const Dashboard = () => {
  const [topCryptos, setTopCryptos] = useState([]);

  useEffect(() => {
    const fetchTopCryptos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
          params: {
            vs_currency: 'zar',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
            price_change_percentage: '1h,24h,7d',
            x_cg_demo_api_key: API_KEY,
          },
        });

        setTopCryptos(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTopCryptos();
  }, []);

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ZAR' }).format(number);
  };

  return (
    <div className="dashboard-container">
      <h2 className="text-primary mb-4">Top 10 Cryptocurrencies</h2>
      <table className="table table-hover crypto-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Price (ZAR)</th>
            <th>Change (24h)</th>
          </tr>
        </thead>
        <tbody>
          {topCryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td>
                <Link to={`/crypto/${crypto.id}`} className="crypto-link">
                  {crypto.name}
                </Link>
              </td>
              <td>{crypto.symbol.toUpperCase()}</td>
              <td>{formatNumber(crypto.market_cap)}</td>
              <td className="crypto-price">{formatNumber(crypto.current_price)}</td>
              <td>
                <span className={`crypto-change ${crypto.price_change_percentage_24h_in_currency >= 0 ? 'positive' : 'negative'}`}>
                  {crypto.price_change_percentage_24h_in_currency >= 0 ? '+' : '-'} {Math.abs(crypto.price_change_percentage_24h_in_currency).toFixed(2)}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
