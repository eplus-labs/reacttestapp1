import axios from "axios"

const KEY = "AIzaSyAya5REfQqq96eOMmTXk3yXUYuLqsVFYXE"

export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: "snippet",
        maxResults: 5,
        key: KEY,
        type: "video"
    }
})

