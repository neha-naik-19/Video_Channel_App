import React, { Component } from "react";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfWeek, isSameWeek } from "date-fns";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCalendar, faSearch, faTimes } from '@fortawesome/fontawesome-free-solid'

class Datepicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),  //new Date()  
      endDate: new Date(),
      count: 25
    };

    this.startHandleChange = this.startHandleChange.bind(this);
    this.endHandleChange = this.endHandleChange.bind(this);  
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
    // console.log(this.props);
  // }

  startHandleChange(date) {  
    this.setState({  
      startDate: date  
    })  
  }

  endHandleChange(date) {  
    this.setState({  
      endDate: date  
    })  
  }
  
  onFormSubmit(e) {  
    e.preventDefault();  
    console.log(this.state.startDate)
    console.log(this.state.endDate)
  }

  clearDates = () => {  
    this.setState({  
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: new Date(),
      count: 25
    })
  }

  handleChange(event) {
    // console.log(event.target.value);
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if (event.target.value === '' || re.test(event.target.value)) {
      if(event.target.value > 25) {event.target.value = 25;}
      this.setState({count: event.target.value})
    }
  }

  render() {
    return (
      <div className="row datepicker">
        <div className="col-sm-3">
          <ReactDatePicker
            // selected={this.state.date}
            // onChange={this.handleChange}
            // onWeekSelect={this.handleWeekSelect}
            // onDayMouseEnter={this.handleDayMouseEnter}
            // dayClassName={this.dayClassName}
            selected={ this.state.startDate }  
            onChange={ this.startHandleChange }
            dateFormat="dd/MM/yyyy"
            // showWeekNumbers
            // peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            popperPlacement="bottom" 
            placeholderText="Start Date"
            popperModifiers={{ flip: { behavior: ["bottom"] }, preventOverflow: { enabled: false }, hide: { enabled: false } }}
            maxDate={new Date()}
          />
        </div>
        <div className="col-sm-3">
          <ReactDatePicker
            selected={ this.state.endDate }  
            onChange={ this.endHandleChange }
            dateFormat="dd/MM/yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            popperPlacement="bottom" 
            placeholderText="End Date"
            popperModifiers={{ flip: { behavior: ["bottom"] }, preventOverflow: { enabled: false }, hide: { enabled: false } }}
            // maxDate={new Date()}
            minDate={this.state.startDate}
          />
        </div>
        <div className="col-sm-2 inpudiv">
          <input
            type="text"
            // placeholder="Count"
            aria-label="Count"
            maxLength="2"
            onChange={this.handleChange}
            value={this.state.count}
          />
        </div>
        <div className="col-sm-2 offset-sm-2">
          <div className="row">
            <div className="col-sm-5">
              <button type="button" className="btn btn-primary" onClick={() => this.props.getDates(this.state.startDate,this.state.endDate,this.state.count)}>
                <FontAwesomeIcon icon={faSearch} style={{color: '#d8e5ec'}} /> 
              </button>
            </div>
            <div className="col-sm-5">
              <button type="button" className="btn btn-primary" onClick={() => this.clearDates()}>
                <FontAwesomeIcon icon={faCalendar} style={{color: '#d8e5ec'}} /> 
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default Datepicker;