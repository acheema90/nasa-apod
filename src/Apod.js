/*
* the app js
*/
import React, { Component } from 'react';
import getApod from './services/apodService';
import {DIV, H1, H2, IMG, INPUT, P, SMALL} from './styles/styledComponents'; 

export default class Apod extends Component {
  constructor(props){
    super(props);
    // initial state
    this.state = {
      imgSrc: '',
      imgTitle: 'No title available',
      imgDesc: 'No Description Available',
      imgDate: this.getDate(),
      imgCopy: 'No copyright infomration available'
    };
  }
  componentDidMount(){
    // call init
    this.init();
  }
  // returns a date string
  getDate(){
    return new Date().toDateString();
  }
 // make the apod request and set state 
 init(){
      getApod()
        .then(function(res) {
          console.info('Fetch complete',res);
          this.setState({
            imgSrc: res.url||'',
            imgSrcHD: res.hdurl||'',
            imgTitle: res.title||' No title available',
            imgDesc: res.explanation||'No Description Available',
            imgCopy: res.copyright||'No copyright information available',
            imgWidth:'',
            imgDate: this.getDate()
          });
        }.bind(this))
        .catch((err)=>{
          console.error(err);
        });
    }
  render() {
    return (
      <DIV>
        <H1>Astronomy Picture of the Day ({this.state.imgDate})</H1>
        <IMG src={this.state.imgSrc}  style={{ width: this.state.imgWidth + 'px'}}/>
        <H2><a href={this.state.imgSrc}>{this.state.imgTitle}</a></H2>
        <SMALL>&copy; {this.state.imgCopy}</SMALL>
        <br/>
        <span>
          <strong>Set Image Width:</strong> 
          <INPUT type="number" min="0" default="900" placeholder="enter a pixel value" value={this.state.imgWidth} onChange={this.setWidth.bind(this)} />
        </span>
        <P>
          <strong>Explanation:</strong> {this.state.imgDesc}
        </P>
      </DIV>
    )
  }
  // set dynamic image width
  setWidth(e){
    // if width more than 1000px use hdurl as src
    if(e.target.value>=1000){
      this.setState({imgSrc: this.state.imgSrcHD});
    }
    // change width on input
    this.setState({imgWidth:e.target.value});
  }
}