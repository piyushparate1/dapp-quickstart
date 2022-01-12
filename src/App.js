import React, { useEffect, useState } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import About from './components/about';
import Home from './components/home';
import Web3Setup from './components/web3setup';
import Web3Svc from './services/Web3Svc';
import AppContext from './contexts/AppContext';
import HelloWorldContract from './contracts/HelloWorld.json';
import SocialLinks from './components/sociallinks';

import './App.css';

function App(props) {

  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(undefined);

  const appName = "DApp quickstart";

  useEffect(() => {
    const init = async () => {
      const web3 = await Web3Svc();
      if (!web3) return;

      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HelloWorldContract.networks[networkId];
      if (!deployedNetwork) return;
      const contract = new web3.eth.Contract(
        HelloWorldContract.abi,
        deployedNetwork && deployedNetwork.address);

      const networkType = await web3.eth.net.getNetworkType();
      /*
        "main" for main network
        "morden" for the morden test network
        "ropsten" for the morden test network
        "private" for undetectable networks.
      */
      const chainId = await web3.eth.getChainId();

      debugger;
      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);

      console.log("Init");

    };

    window.ethereum && window.ethereum.on('accountsChanged', ((e) => {
      init();
    }));

    init();
  }, []);

  function ConditionalRoutes(props) {
    if (props.anonymous === true) {
      return (
        <Routes>
          <Route path="*" element={<Web3Setup />} />
        </Routes>
      );
    }
    else {
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      );
    }
  };

  return (
    <MemoryRouter>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">{appName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <span>
                  {accounts[0]}
                </span>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AppContext.Provider value={{ web3: web3, accounts: accounts, contract: contract }}>

        <Container className="p-3">
          <Container className="p-5 mb-4 bg-light rounded-3">
            <ConditionalRoutes anonymous={!web3} />
          </Container>
        </Container>

      </AppContext.Provider>

      <Navbar bg="light" variant="light" fixed="bottom">
        <Container>
          <Navbar.Text>
            <span>{appName} template by Piyush Parate</span>
          </Navbar.Text>
          <SocialLinks />
        </Container>
      </Navbar>

    </MemoryRouter >
  );
};

export default App;