import React, { Component } from 'react';
import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import Wallet from "@project-serum/sol-wallet-adapter"
import "./App.css"

let connection = new Connection(clusterApiUrl('devnet'));
let providerUrl = 'https://www.sollet.io';
let wallet = new Wallet(providerUrl);

class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      Address: "n/a",
      message: "",
      signature: "n/a"
    }
    this.signMessage = this.signMessage.bind(this);
  }

  async componentDidMount(){

    wallet.on('connect', publicKey => this.setState({Address: publicKey.toBase58()}));
    wallet.on('disconnect', () => console.log('Disconnected'));
    await wallet.connect();

  }
 

  async signMessage(){
    const message = this.state.message;
    const data = new TextEncoder().encode(message);
    let { signature } = await wallet.sign(data, 'utf8');
    this.setState({signature: Buffer(signature).toString('hex')});
  }


  render() {
    return (
      <div className="App">
        <div className="box">Connected Address: {this.state.Address}</div>
        <div className="box">
            <form>
                <label>Type your message: </label>
                <br/>
                <textarea onChange={(e) => this.setState({message: e.target.value})} placeholder="type a message here"/>
                <br/>
                <button type="button" onClick={this.signMessage}>Sign Message</button>
            </form>
        </div>
        <div className="box">Signature: {this.state.signature}</div>
    </div>
    );
  }
}

export default App;