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
import YouTube from 'react-youtube';
import Slider from "react-slick";
import "./styles.css";
import '../node_modules/font-awesome/css/font-awesome.min.css';
import videodb from "./db/data.json";

import Datepicker from "./Datepicker";
import { format,add } from 'date-fns'

// const finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${result}`;

//url to get video duration
// https://www.googleapis.com/youtube/v3/videos?id=mdISkEa5ByE&part=contentDetails&key=AIzaSyBzxPXhV5NJgmTRCJy6r06ureXpUbLaC9I

class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultyt: [],
    };
    this.clicked = this.clicked.bind(this);
  }

  clicked(startDt, endDt, num) {
    const API = "AIzaSyBzxPXhV5NJgmTRCJy6r06ureXpUbLaC9I";
    // const channelId = "UC8bbAK-AOGGYaOvJHdzxopQ";
    const channelId = "UCw-c4rIPSt0EbGUoWoHVw-g";

    console.log('log :: ', startDt, ': ',endDt,);

    let finalURL = "";

    if(startDt == "" && endDt == ""){
      finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${num}`;
    }
    else{
      const publishedAfter = format(add(startDt,{days: -1}), 'yyyy-MM-dd').toString() + 'T00:00:00Z';
      const publishedBefore = format(add(endDt,{days: 1}), 'yyyy-MM-dd').toString() + 'T00:00:00Z';

      finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&publishedAfter=${publishedAfter}&publishedBefore=${publishedBefore}&maxResults=${num}`;
    }
  
    console.log(finalURL);

    fetch(finalURL)
      .then((response) => response.json())
      .then((responseJson) => {
        // const channelDetails = responseJson.items.pop();
        const finalResult = responseJson.items;

        // console.log('finalResult : ', finalResult);

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

        // console.log("result : ", result);
        // console.log("resultyt : ", resultyt);

        this.setState({ resultyt });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    // this.clicked(new Date(new Date().getFullYear(), new Date().getMonth(), 1),new Date(),Number(25));
    this.clicked("", "",Number(25));
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
    console.log('date :: ', date);

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = this.intervals.find((i) => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
  };

  getDates = (startDt, endDt, num) =>{
    this.clicked(startDt, endDt, num);
  }

  render() {
    let rowContents = [];

    let contents = this.state.resultyt.reduce((acc,link, i) => {
			// rowContents.push(<div key={i} className="col col-md-3">Col {p}</div>);
      rowContents.push(<div key={i} className="col-md-3 border">
      <div>
        <iframe
        style={{position: 'relative',
          height: '100%',
          width: '100%'}}
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
      </div>)
			// if (i % 4 === 3) {
      // // if (i % 3 === 2) {
			// 	acc.push(<div className="row">{rowContents}</div>);
			// 	rowContents = [];
			// }
			return acc;
		},[])

    contents.push(<div className="row">{rowContents}</div>);

    const opts = {
      height: '290',
      width: '240',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1, 
      },
    };

    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <>
        {/* header */}
        <header>
          {/* navbar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
              <a className="navbar-brand" href="https://www.bits-pilani.ac.in/goa/" target="_blank">
                <img
                  className="rounded"
                  // src={process.env.PUBLIC_URL + "/bits_logo.png"}
                  src={process.env.PUBLIC_URL + "/BITS_Logo.jpg"}
                  alt="BITS"
                />
                <span>bits pilani k. k. birla goa campus</span>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" href="#video">
                      video
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#photo">
                      Photo
                    </a>
                  </li>
                </ul>
                {/* <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form> */}
              </div>
            </div>
          </nav>

          {/* carousel */}
          <div className="px-wide">
            <div
              id="carouselExampleCaptions"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="3"
                  aria-label="Slide 4"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={process.env.PUBLIC_URL + "/computer_11.jpg"}
                    className="d-block w-100"
                    alt="..."
                  />
                  <div className="carousel-caption">
                    <a className="navbar-brand" href="https://www.bits-pilani.ac.in/goa/ComputerScienceInformationsSystems/ComputerScienceandInformationSystems" target="_blank">
                      <h5>Computer Science & Information Systems</h5>
                    </a>
                    <p>VIDEO & PHOTO GALLERY</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src={process.env.PUBLIC_URL + "/computer_motherboard_2.jpg"}
                    className="d-block w-100"
                    alt="..."
                  />
                  <div className="carousel-caption">
                    <a className="navbar-brand" href="https://www.bits-pilani.ac.in/goa/ComputerScienceInformationsSystems/ComputerScienceandInformationSystems" target="_blank">
                      <h5>Computer Science & Information Systems</h5>
                    </a>
                    <p>VIDEO & PHOTO GALLERY</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src={process.env.PUBLIC_URL + "/computer_cpu_3.jpg"}
                    className="d-block w-100"
                    alt="..."
                  />
                  <div className="carousel-caption">
                    <a className="navbar-brand" href="https://www.bits-pilani.ac.in/goa/ComputerScienceInformationsSystems/ComputerScienceandInformationSystems" target="_blank">
                      <h5>Computer Science & Information Systems</h5>
                    </a>
                    <p>VIDEO & PHOTO GALLERY</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src={process.env.PUBLIC_URL + "/computer_board_4.jpg"}
                    className="d-block w-100"
                    alt="..."
                  />
                  <div className="carousel-caption">
                    <a className="navbar-brand" href="https://www.bits-pilani.ac.in/goa/ComputerScienceInformationsSystems/ComputerScienceandInformationSystems" target="_blank">
                      <h5>Computer Science & Information Systems</h5>
                    </a>
                    <p>VIDEO & PHOTO GALLERY</p>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </header>

        {/* main */}
        <main>
          <section className="section-1 pt-4 container">
            <div className="row">
                <div className="col-sm-9">
                    <Datepicker getDates={this.getDates} />
                </div>
            </div>
          </section>
          <section className="section-2 video container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-header text-center pb-4">
                    <h2>video</h2>
                    <h3 className={this.state.resultyt.length > 0 ? 'hide' : 'show'}>Video not available. Please search within date range</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-10">
                {/* Column */}
                {/* {contents} */}
                <div className="row">
            
                  <Slider {...settings}>
                    {this.state.resultyt.map((link, i) => {
                      // console.log(i, link.link);
                      var frame = (
                        <div key={i} className="col-md-3">
                          <div className="card">
                            <iframe className="card-img-top"
                              width="100%"
                              height="100%"
                              src={link.link}
                              // onInferredClick={() => alert('You clicked')}
                              // title="Testing Video 1"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                            <ul><li>{link.snippet}</li><li>{this.timeSince(link.publishedAt)}</li></ul>
                          </div>
                        </div>
                      );
                      return frame;
                    })}
                    {this.frame}
                  </Slider>
                 
                </div>
              </div>
              <div className="col-lg-2">
                  <TwitterTimelineEmbed 
                    sourceType="profile"
                    screenName="csisbitsgoa"
                    options={{ height: 400 }}
                  />
                  <TwitterMentionButton
                    screenName={'csisbitsgoa'}
                  />
              </div>
            </div>
          </section>
        </main>

        {/* footer */}
        <footer>
        <div className="container-fluid p-0 text-center">
          <div className="row text-left">
            <div className="col-md-12 col-sm-12">
              <p className="text-light text-muted">© {new Date().getFullYear()} BITS Pilani Goa Campus</p>
              <hr />
              {/* <div> */}
                <p className="text-light">FOLLOW US</p>
                <p id="social" className="text-light text-muted">Let us be social</p>
                <div className="column">
                  <a  href="https://www.facebook.com/csisbitsgoa" target="_blank">
                    <i className="fa fa-facebook text-light"></i>
                  </a>
                  {/* <a  href="https://www.bits-pilani.ac.in/goa/" target="_blank"><i className="fa fa-instagram text-light"></i></a> */}
                  <a  href="https://twitter.com/csisbitsgoa?ref_src=twsrc%5Etfw" target="_blank">
                    <i className="fa fa-twitter text-light"></i>
                  </a>
                  <a  href="https://www.linkedin.com/company/department-of-csis-bits-pilani-goa-campus/?originalSubdomain=in" target="_blank">
                    <i className="fa fa-linkedin text-light"></i>
                  </a>
                </div>
                <div id="imgdiv">
                  <img
                    src={process.env.PUBLIC_URL + "/bits-line.gif"}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              {/* </div> */}
            </div>
          </div>
        </div>
        </footer>
      </>
    );
  }
}

export default Youtube;
