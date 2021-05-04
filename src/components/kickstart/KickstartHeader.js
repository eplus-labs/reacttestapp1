import React from "react"
import PriceTicker from "../PriceTicker"
import { Menu, Container } from "semantic-ui-react"
import { Link } from "react-router-dom"
import "../../styleSheets/KickstartHeader.css"

const KickstartHeader = (props) => {
    // Menu comes from the Semantic UI library and is used for CSS below
    return (
        <div>
            <div id="price-tracker"><PriceTicker /></div>
            <Container className="kickstart-header-main">
                <Menu>
                    <Link className="item" to="/campaigns">
                        CrownChain
                    </Link> 

                    <Menu.Menu position="right">

                    <Link className="item" to="/campaigns">
                        Campaigns
                    </Link> 

                    <Link className="item" to="/campaigns/new">
                        +
                     </Link> 

                    </Menu.Menu>
                </Menu>
            </Container>
        </div>

    )
}

export default KickstartHeader