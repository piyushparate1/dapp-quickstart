import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Home() {

    const [message, setMessage] = useState("...");
    const [responseMsg, setResponseMsg] = useState("");

    const ctx = useContext(AppContext);

    useEffect(() => {
        if (typeof ctx !== 'undefined'
            && typeof ctx.contract !== 'undefined')
            OnLoad();
    }, [ctx]);

    const OnLoad = async () => {
        const response = await ctx.contract.methods.Get().call();
        setMessage(response);
        console.log("load");
    };

    const OnSubmit = async (e) => {
        console.log("OnSubmit!");
        e.preventDefault();
        await ctx.contract.methods.SaySomething(responseMsg).send({ from: ctx.accounts[0] });
        setResponseMsg('');
        OnLoad();
    };

    return (
        <div>
            <h1 className="header">Welcome To DApp quickstart</h1>
            <span>{message}</span>
            <br></br>
            <br></br>
            <Form onSubmit={OnSubmit}>
                <Form.Control className="me-auto" placeholder="Type your response here..." value={responseMsg} onChange={(e)=>{ setResponseMsg(e.target.value);  }} />
                <br></br>
                <Button variant="secondary" type='submit'>Submit</Button>
            </Form>
        </div>
    );
}

export default Home;