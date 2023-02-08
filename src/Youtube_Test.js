import React, { Component } from "react";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";

const API = "AIzaSyCcV_5UHhX2ULkreCzxRfTF66TxslzVAac";
const channelId = "UC8bbAK-AOGGYaOvJHdzxopQ";
const result = 10;
const publishedAfter = "2022-11-01T00:00:00Z";
const publishedBefore = "2022-11-30T00:00:00Z";

// npm install react-youtube

// const finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${result}`;

const finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&publishedAfter=${publishedAfter}&publishedBefore=${publishedBefore}`;

class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultyt: [],
    };
    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    fetch(finalURL)
      .then((response) => response.json())
      .then((responseJson) => {
        // const channelDetails = responseJson.items.pop();
        const finalResult = responseJson.items;

        // const resultyt = finalResult.map(
        //   (obj) => `https://www.youtube.com/embed/${obj.id.videoId}`
        // );

        const result = finalResult.map((obj) => {
          return {
            videoId: obj.id.videoId,
            link: `https://www.youtube.com/embed/${obj.id.videoId}`,
            snippet: obj.snippet.description,
            publishedAt: new Date(obj.snippet.publishedAt),
          };
        });

        const resultyt = result.filter((obj) => obj.videoId !== undefined);

        console.log("resultyt : ", resultyt);

        this.setState({ resultyt });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  timeSince = (date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = this.intervals.find((i) => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
  };

  render() {
    // console.log("Video Result :- ", this.state.resultyt);
    // console.log("snippet :- ", this.state.snippet);

    return (
      <div>
        <button onClick={this.clicked}>Get Youtube Videos</button>

        <div>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcsisbitsgoa&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="340"
            height="500"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
          <div style={{ width: "20%" }}>
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="csisbitsgoa"
              options={{ height: 400 }}
            />
          </div>
        </div>

        {this.state.resultyt.map((link, i) => {
          // console.log(i, link.link);
          var frame = (
            <div key={i} className="youtube">
              <iframe
                width="520"
                height="215"
                src={link.link}
                title="Testing Video 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <label>{link.snippet}</label>
              <label>{this.timeSince(link.publishedAt)}</label>
            </div>
          );
          return frame;
        })}
        {this.frame}
      </div>
    );
  }
}

export default Youtube;
