import React from "react"
import { connect } from "react-redux"
import { onVideoSelect } from "../actions"
import "../styleSheets/DocItem.css"

const DocItem = (props) => {
    console.log("props within video item: ", props)
    return (
        <div id="outer-edge">
            <div className="doc-item">
                <a href="https://www.automation.com/en-us/articles/january-2021/the-future-of-blockchain-in-intellectual-property" className="inner-edge">
                    <img className="ui image" id="doc-image" src="https://chainzero.s3.amazonaws.com/webImages/emergingtechnology/blockchainIntellectualProperty.png" />
                    <div>Five applications of blockchain in intellectual property (IP)</div>
                </a>
            </div>

            <div className="doc-item">
                <a href="https://akash.network/" className="inner-edge">
                    <img className="ui image" id="doc-image" src="https://chainzero.s3.amazonaws.com/webImages/emergingtechnology/akash.png" />
                    <div>The world's first decentralized open source cloud</div>
                </a>
            </div>

            <div className="doc-item">
                <a href="https://sociable.co/technology/digital-identity-and-microsofts-move-blockchain-based-id-system/" className="inner-edge">
                    <img className="ui image" id="doc-image" src="https://chainzero.s3.amazonaws.com/webImages/emergingtechnology/blockchainIdentity.png" />
                    <div>Microsoft’s drive to a blockchain-based ID system</div>
                </a>
            </div>

        </div>
    )
}

export default DocItem
