import React from "react"
import "../styleSheets/VideoDetail.css"

const VideoDetail = (props) => {
    console.log("videos from video detail: ", props.videos)

    let EmbedID = ""
    let Title = ""
    let Description = ""

    
    if (!props.video) {
        if (props.videos.length > 0) {
        EmbedID = props.videos[0].EmbedID
        Title = props.videos[0].Title
        Description = props.videos[0].Description
        } else {
            return <div>Loading...</div>
        }
    } else {
        console.log("video within if statement: ", props.video)
        EmbedID = props.video.EmbedID
        Title = props.video.Title
        Description = props.video.Description
    }

    

    console.log("video from video detail: ", props.video)
    console.log("videos from video detail: ", props.videos)


    const videoSrc = `https://www.youtube.com/embed/${EmbedID}`


    return (
        <div className="iframe page">
            <div className="ui embed">
                <iframe title="video player" src={videoSrc} />
            </div>
            <div className="ui segment">
                <h4 className="ui segment">{Title}</h4>
                <p>{Description}</p>
            </div>
        </div>
    )
}

export default VideoDetail