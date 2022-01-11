import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext';

function About(props) {

    const ctx = useContext(AppContext);

    return (
        <div>
            <h1 className="header">About</h1>
            <span>Account {ctx.accounts[0]}</span>
            <br />
            <span>Contract account {ctx.contract._address}</span>
            <br />
        </div>
    );
};

export default About;