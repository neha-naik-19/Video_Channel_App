import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import logo from "./logo.svg";
import "./App.css";
import Youtube from "./Youtube";
import Testanimation from "./Testanimation";
import Slickslider from "./Slickslider";
import Datepicker from "./Datepicker";

import YoutubePopup from "./YoutubePopup";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Youtube />
      </div>
    );
  }
}

export default App;
