import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { db } from '../../firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import Header2 from "../../components/Header2";

const Login = () => {
    const [username,        setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (parseInt(age) < 18) {
            alert('You need to be 18+ to avail this feature.');
            return;
        }

        const userRef = doc(collection(db, 'users'), userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            navigate('/welcome', { state: { username, coins: userDoc.data().coins } });
        } else {
            await setDoc(userRef, {
                username,
                userId,
                age,
                coins: 10000, // Starting balance
            });
            navigate('/welcome', { state: { username, coins: 10000 } });
        }
    };

    const handleClear = () => {
        setUsername('');
        setUserId('');
        setAge('');
    };

    return (
        <div>
            <Header2/>
            <div className="login-container">
                <h2>Virtual Trading Platform Login</h2>
                <div className="login-box">
                    <input
                        type="text"
                        placeholder="Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                    <div className="button-group">
                        <button type="button" onClick={handleClear}>Clear</button>
                        <button type="button" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;