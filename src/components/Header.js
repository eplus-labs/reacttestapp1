import React from "react"
import { Link } from "react-router-dom"
import GoogleAuth from "./GoogleAuth"

const Header = () => {
    return (
        <div className="ui secondary pointing menu" id="header-main">
            <Link to="/currency" className="item" id="text-style" >
                Currency
            </Link>
            <Link to="/ethereum" className="item" id="text-style" >
                Ethereum
            </Link>
            <Link to="/nft" className="item" id="text-style" >
                NFT
            </Link>
            <Link to="/lotteryhome" className="item" id="text-style" >
                Crypto Lottery
            </Link>
            <Link to="/campaigns" className="item" id="text-style">
                CrowdChain
            </Link>
            <Link to="/chaineventsmain" className="item" id="text-style">
                ChainEvents
            </Link>
            <div className="right menu">
                <GoogleAuth />
            </div>
        </div>
    )
}

export default Header