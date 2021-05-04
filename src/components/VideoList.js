import React from "react"
import { connect } from "react-redux"
import VideoItem from "./VideoItem"
import { individualVideo } from "../actions"



const VideoList = (props) => {
    console.log("Videos from with VideoList: ", props.videos)
    const renderedList = props.videos.map((video) => {
        return <VideoItem key={video.EmbedID} video={video} />
    })
 

    return (
        <div className="ui relaxed item list">{renderedList}</div>
)
}

const mapStateToProps = state => {
    return { videos: state.videos.videoList }
}

export default connect(mapStateToProps)(VideoList)