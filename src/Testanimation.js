import React, { Component } from "react";

import { LinkedInEmbed } from 'react-social-media-embed';
import "./styles.css";
import '../node_modules/font-awesome/css/font-awesome.min.css';
import {Animated, animationIn } from "react-animated-css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const API = "AIzaSyCcV_5UHhX2ULkreCzxRfTF66TxslzVAac";
const channelId = "UC8bbAK-AOGGYaOvJHdzxopQ";
const result = 10;
const publishedAfter = "2022-09-01T00:00:00Z";
const publishedBefore = "2022-11-30T00:00:00Z";

// npm install react-youtube

// const finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${result}`;

const finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&publishedAfter=${publishedAfter}&publishedBefore=${publishedBefore}`;


class Testanimation extends Component {
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

  componentDidMount() {
    this.clicked();
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
    let rowContents = [];

    const contents = this.state.resultyt.reduce((acc,link, i) => {
			// rowContents.push(<div key={i} className="col col-md-3">Col {p}</div>);
      rowContents.push(<div key={i} className="col col-md-3">
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
      </div>)
			// if (i % 4 === 3) {
      if (i % 3 === 2) {
				acc.push(<div className="row">{rowContents}</div>);
				rowContents = [];
			}
			return acc;
		},[])

    contents.push(<div className="row">{rowContents}</div>);

    return (
      <div>
      <Animated 
         animationIn="fadeInDown" 
         animationOut="zoomOut" 
         animationInDuration={1000} 
         animationOutDuration={1000} 
         isVisible={true}
      >
        <h1 style={{backgroundColor: 'red'}}>TESTE - 1</h1>
      </Animated>
    </div>
    );
  }
}

export default Testanimation;