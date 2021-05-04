// binanace API intel
// https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md

// Link to add in candle sticks
// https://www.youtube.com/watch?v=6PnCr14chcY

import React from "react"
import "../styleSheets/PriceTicker.css"

// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
  });


let binanceSocketBTC = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade")
let binanceSocketETH = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@trade")
let binanceSocketEOS = new WebSocket("wss://stream.binance.com:9443/ws/eosusdt@trade")
let binanceSocketATOM = new WebSocket("wss://stream.binance.com:9443/ws/atomusdt@trade")




class PriceTicker extends React.Component {
    state = {btcPrice: "", ethPrice: "", eosPrice: "", atomPrice: ""}


    componentDidMount() {
        binanceSocketBTC.onmessage = (event) => {
            let objectData = JSON.parse(event.data)
            let currency = formatter.format(objectData.p)
            this.setState({
                btcPrice: currency
            })
        }

        binanceSocketETH.onmessage = (event) => {
            let objectData = JSON.parse(event.data)
            let currency = formatter.format(objectData.p)
                this.setState({
                    ethPrice: currency
                })
        }
        
        binanceSocketATOM.onmessage = (event) => {
            let objectData = JSON.parse(event.data)
            let currency = formatter.format(objectData.p)
            this.setState({
                atomPrice: currency
            })
        }
        
        binanceSocketEOS.onmessage = (event) => {
            let objectData = JSON.parse(event.data)
            let currency = formatter.format(objectData.p)
            this.setState({
                eosPrice: currency
            })
        }
    }

    render() {
        return (
            <div className="outer-class">
                <div>
                    <div>Bitcoin / USD:</div>
                    <div className="price">{this.state.btcPrice}</div>
                </div>
                <div>
                    <div>Ethereum / USD:</div>
                    <div className="price">{this.state.ethPrice}</div>
                </div>
                <div>
                    <div>Cosmos / USD:</div>
                    <div className="price">{this.state.atomPrice}</div>
                </div>
                <div>
                    <div>EOS / USD:</div>
                    <div className="price">{this.state.eosPrice}</div>
                </div>
            </div>

        )
    }
}

export default PriceTicker

