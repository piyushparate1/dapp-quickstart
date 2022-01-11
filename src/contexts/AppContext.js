import React from 'react';

const AppContext = React.createContext({
    web3: null,
    accounts: null,
    contract: null,
});

export default AppContext;