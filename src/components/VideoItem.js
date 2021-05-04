import React from "react"
import { connect } from "react-redux"
import { onVideoSelect } from "../actions"
import "../styleSheets/VideoItem.css"

const VideoItem = (props) => {
    console.log("props within video item: ", props)
    return (
        <div onClick={() => onVideoSelect(props.video)} className="video-item item">
            <img alt={props.video.Title} className="ui image" src={props.video.Thumbnail} />
            <div className="content">
                <div className="header">
                    <div className="video-item item">
                        {props.video.Title}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoItem

// const mapStateToProps = state => {
//     // return { video: state.video }
//     return { }

// }

// export default connect(
//     mapStateToProps,
//     { onVideoSelect }
//     )(VideoItem)