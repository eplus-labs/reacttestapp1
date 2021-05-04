import React from "react"
import web3 from "../web3"
import lottery from "../components/lottery/lottery"
import PriceTicker from "./PriceTicker"
import "../styleSheets/LotteryHome.css"

class LotteryHome extends React.Component {
    state = {
        manager: "",
        players: [],
        balance: "",
        value: "",
        message: ""
    }
    
    async componentDidMount() {
        const manager = await lottery.methods.manager().call()
        const players = await lottery.methods.getPlayers().call()
        const balance = await web3.eth.getBalance(lottery.options.address)

        this.setState({ manager, players })
    }

    componentDidUpdate() {
        this.updatePlayersBalance()
      }

    updatePlayersBalance = async () => {
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);
        this.setState({ players, balance });
    }

    onSubmit = async (event) => {
        event.preventDefault()

        const accounts = await web3.eth.getAccounts()

        this.setState({ message: "Waiting on transaction success..." })

        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value, "ether")
        })

        this.setState({ message: "You have been entered!" })


    }

    onClick =  async () => {
        const accounts = await web3.eth.getAccounts()

        this.setState({ message: "Waiting on transaction success..." })

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        })

        this.setState({ message: "A winner has been picked!" })
    }

    render() {
        web3.eth.getAccounts()
        .then(console.log)
        return (
            <div>
                <div id="price-tracker"><PriceTicker /></div>
                <div className="outer-class-lottery">
                    <h2 className='lottery-highlight-text'>Lottery Contract</h2>
                    <div>
                        <p> This contract is managed by:
                            <span style={{paddingLeft:"12px"}}></span>
                            {this.state.manager}
                        </p>
                        <p>
                            There are currently {this.state.players.length} people entered,
                            <span style={{paddingLeft:"8px"}}></span> 
                            competing to win {web3.utils.fromWei(this.state.balance, "ether")} ether!
                        </p>
                    </div>

                    <hr/>

                    <form onSubmit={this.onSubmit}>
                        <h4>Want to try your luck?</h4>
                        <div>
                            <label style={{paddingRight:"8px"}}>Amount of ether to enter</label>
                            <input 
                                value={this.state.value} 
                                onChange={event => this.setState({ value: event.target.value })}
                            />
                        </div>
                        <button>Enter</button>
                    </form>

                    <hr/>

                    <h4>Ready to pick a winner?</h4>
                    <button onClick={this.onClick}>Pick a winner!</button>

                    <hr/>

                    <h1 className='lottery-highlight-text'>{this.state.message}</h1>
                </div>
            </div>
        )
    }
}



export default LotteryHome

