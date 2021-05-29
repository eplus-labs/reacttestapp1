import React from "react"
import { connect } from "react-redux"
import videoDbApi from "../apis/videoDBApi"
import DocsList from "../components/DocsList"
import VideoDetail from "../components/VideoDetail"
import PriceTicker from "./PriceTicker"
import VideoList from "./VideoList"
import { listofVideos } from "../actions"
import "../styleSheets/VideoAndDocumentation.css"


class VideoAndDocumentation extends React.Component {


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
            this.props.listofVideos("emerging")
        } else {
            this.props.listofVideos("currency") 
        }
    }

    render() {
        return (
                <div className="video-page-main">
                    <div id="price-tracker"><PriceTicker /></div>
                    <div>
                        <div>
                            <div className="outer-edge">
                                <div id="video-class">
                                    <h3 id="video-title">Prominent Commentary</h3>
                                    <div className="video-player">
                                        <VideoDetail video={this.props.video} videos={this.props.videos} />
                                    </div>
                                    <div id="video-list">
                                        <h3 id="library-title">Video Library</h3>
                                        <VideoList />
                                    </div>
                                </div>
                                <div  id="documentation-class">
                                    <h3 id="documentation-title">Emergent Documentation</h3>
                                    <DocsList />
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
    )(VideoAndDocumentation)