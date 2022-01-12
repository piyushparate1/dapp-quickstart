import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../contexts/AppContext';

function About(props) {

    const [networkType, setNetworkType] = useState("...");

    const ctx = useContext(AppContext);

    useEffect(async () => {
        const _networkType = await ctx.web3.eth.net.getNetworkType();
        setNetworkType(_networkType);
    }, [ctx]);

    return (
        <div>
            <h1 className="header">About</h1>
            <span>Account {ctx.accounts[0]}</span>
            <br />
            <span>Contract account {ctx.contract._address}</span>
            <br />
            <span>Required connected network 'ropsten'</span>
            <br />
            <span>Actual connected network '{networkType}'</span>
        </div>
    );
};

export default About;