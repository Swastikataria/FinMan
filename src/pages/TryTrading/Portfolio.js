import React from 'react';
import { useLocation } from 'react-router-dom';
import './Portfolio.css';
import Header2 from "../../components/Header2";

const Portfolio = () => {
    const location = useLocation();
    const { portfolio } = location.state || { portfolio: [] };

    return (
        <div className="main">
            <Header2 />
            <div className="portfolio-container">
                <h2>Your Portfolio</h2>
                {portfolio.length === 0 ? (
                    <p>Your portfolio is empty.</p>
                ) : (
                    <table className="portfolio-table">
                        <thead>
                            <tr>
                                <th>Share Name</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolio.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.action}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Portfolio;