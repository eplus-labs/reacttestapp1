import React from "react"
import { connect } from "react-redux"
import videoDbApi from "../apis/videoDBApi"
import VideoList from "../components/VideoList"
import VideoDetail from "../components/VideoDetail"
import PriceTicker from "./PriceTicker"
import { listofVideos } from "../actions"
import "../styleSheets/App.css"


class VideoPage extends React.Component {


    componentDidMount() {
        if (this.props.location.pathname === "/currency") {
            this.props.listofVideos("currency") 
        } else if (this.props.location.pathname === "/ethereum") {
            this.props.listofVideos("ethereum") 
        } else if (this.props.location.pathname === "/nft") {
            this.props.listofVideos("nft") 
        } else if (this.props.location.pathname === "/defi") {
            this.props.listofVideos("defi")
        } else if (this.props.location.pathname === "/blockchain") {
            this.props.listofVideos("blockchain")
        } else if (this.props.location.pathname === "/") {
            this.props.listofVideos("currency")
        } else {
            this.props.listofVideos("currency") 
        }
    }

    // dbVideoList = async (category) => {
    // }


    // onVideoSelect = () => {
    // }

    // <VideoDetail video={this.state.selectedVideo} />
    //<VideoDetail videos={this.props.videos} />



    //<VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
    //<VideoList videos={this.props.videos} />

    render() {
        console.log("Props.videos: ",this.props.videos)
        return (
                <div className="video-page-main">
                    <div id="price-tracker"><PriceTicker /></div>
                    <div className="ui container">
                        <div className="ui grid">
                            <div className="ui row">
                                <div className="eleven wide column">
                                    <VideoDetail video={this.props.video} videos={this.props.videos} />
                                </div>
                                <div className="five wide column">
                                    <VideoList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return { videos: state.videos.videoList, video: state.videos.videoSelected }
}

export default connect(
    mapStateToProps,
    { listofVideos }
    )(VideoPage)