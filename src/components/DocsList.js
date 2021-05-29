import React from "react"
import { connect } from "react-redux"
import DocItem from "./DocItem"
import { individualVideo } from "../actions"



class DocsList extends React.Component {
    render() {
        return (
            <div>
                <DocItem />
            </div>
        )
    }
}



export default DocsList