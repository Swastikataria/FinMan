
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Welcome.css';
import Header2 from "../../components/Header2";

const Welcome = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { username, coins: initialCoins, portfolio: initialPortfolio = [] } = location.state || {};
    const [coins, setCoins] = useState(initialCoins || 0);
    const [stocks, setStocks] = useState([]);
    const [gainers, setGainers] = useState([]);
    const [portfolio, setPortfolio] = useState(initialPortfolio);

    useEffect(() => {
        fetchStockData();
        fetchTopGainers();
    }, []);

    const fetchStockData = async () => {
        const apiKey = 'U3FOOFTTT52BRWX4'; 
        const symbols = ['AAPL', 'GOOGL', 'MSFT', 'META', 'AMZN', 'TSLA', 'NFLX', 'IBM'];

        const fetchWithFallback = async (symbol) => {
            try {
                const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`);
                const data = await response.json();
                const timeSeries = data?.['Time Series (5min)'];
                if (timeSeries) {
                    const latestTimestamp = Object.keys(timeSeries)[0];
                    const price = timeSeries[latestTimestamp]['1. open'];
                    return {
                        name: symbol,
                        price: parseFloat(price).toFixed(2),
                    };
                } else {
                    throw new Error(`No data for ${symbol}`);
                }
            } catch (error) {
                console.error(`Error fetching data for ${symbol}:`, error);
                return { name: symbol, price: symbol === 'GOOGL' ? 184 : symbol === 'AAPL' ? 210 : symbol === 'MSFT' ? 456 : 'N/A' };
            }
        };

        const promises = symbols.map(symbol => fetchWithFallback(symbol));
        const stockData = await Promise.all(promises);
        setStocks(stockData);
    };

    const fetchTopGainers = async () => {
        const gainersData = ['Apple', 'Google', 'Tesla', 'Amazon', 'Adani', 'Netflix', 'Nomura', 'Workday'];
        setGainers(gainersData);
    };

    const handleStockClick = (stock) => {
        const quantity = parseInt(prompt("Enter quantity to buy/sell:"));
        if (quantity > 0) {
            const action = prompt("Type 'buy' to purchase or 'sell' to sell:");
            if (action === 'buy') {
                if (coins >= stock.price * quantity) {
                    setCoins(coins - stock.price * quantity);
                    setPortfolio([...portfolio, { ...stock, quantity, action: 'Bought' }]);
                } else {
                    alert("Insufficient coins to buy the shares.");
                }
            } else if (action === 'sell') {
                setCoins(coins + stock.price * quantity);
                setPortfolio([...portfolio, { ...stock, quantity, action: 'Sold' }]);
            } else {
                alert("Invalid action. Please type 'buy' or 'sell'.");
            }
        } else {
            alert("Quantity must be a positive number.");
        }
    };

    return (
        <div className="main">
            <Header2 />
            <div className="welcome-header">
                <h2>Welcome, {username}!</h2>
                <h3>{coins} 🪙</h3>
            </div>
            <div className="news-bar">
                Top Gainers: {gainers.join(', ')}
            </div>
            <div className="welcome-container">
                <button className="portfolio-button" onClick={() => navigate('/portfolio', { state: { coins, portfolio } })}>
                    Portfolio
                </button>
                <table className="stock-table">
                    <thead>
                        <tr>
                            <th>Stock</th>
                            <th>Current Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock, index) => (
                            <tr key={index}>
                                <td>
                                    <button onClick={() => handleStockClick(stock)} className="stock-button">
                                        {stock.name}
                                    </button>
                                </td>
                                <td>${stock.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Welcome;