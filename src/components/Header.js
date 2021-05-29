import React from "react"
import { Link } from "react-router-dom"
import GoogleAuth from "./GoogleAuth"
import { Dropdown, Menu } from 'semantic-ui-react'
import "../styleSheets/Header.css"

const options = [
    { key: 1, text: 'Crypto Currency', value: "/currency" },
    { key: 2, text: 'Ethereum', value: "/ethereum" },
    { key: 3, text: 'Non Fungible Tokens (NFT)', value: "/nft" },
  ]

  const education = (
    <span style={{ marginTop: "2px" }}>
        <i aria-hidden="true" class="book big icon" size="big" style={{color: "white"}} />
    </span>
);

const blockchain = (
    <span style={{ marginTop: "2px" }}>
        <i aria-hidden="true" class="chain big icon" size="big" style={{color: "white"}} />
    </span>
);


class Header extends React.Component {

    onChange = (event, data) => {
        console.log("in on change")
        console.log(data.value)
        console.log(this.props)
    }

    render() {
        return (
            <div className="ui secondary pointing menu" id="header-main">
                <div id="left-menus">
                    <Dropdown trigger={education} pointing='top left' icon={null}>
                    <Dropdown.Menu>
                        <Dropdown.Item text='Currency' icon='dollar sign' as={Link} to='/currency'/>
                        <Dropdown.Item text='Ethereum' icon='ethereum' as={Link} to='/ethereum'/>
                        <Dropdown.Item text='Non Fungible Tokens' icon='code' as={Link} to='/nft'/>
                        <Dropdown.Item text='Blockchain Concepts' icon='chain' as={Link} to='/blockchain'/>
                        <Dropdown.Item text='Decentralized Finance' icon='money bill alternate outline' as={Link} to='/defi'/>
                    </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown trigger={blockchain} pointing='top left' icon={null}>
                        <Dropdown.Menu>
                            <Dropdown.Item text='Lottery App' icon='dollar sign' as={Link} to='/lotteryhome'/>
                            <Dropdown.Item text='Crypto Crowd Source' icon='ethereum' as={Link} to='/campaigns'/>
                            <Dropdown.Item text='Blockchain Events' icon='code' as={Link} to="/chaineventsmain"/>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>


                <h3 id="primary-title">Blockchain Emerging Technologies</h3>

                    <div className="right menu" id="google-auth">
                        <GoogleAuth />
                    </div>
            </div>
        )
    }    
}

export default Header