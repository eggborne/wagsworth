import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { TouchHandler } from './control';
import Header from './Header';
let chicken = require('./assets/largechicken.png');
let poochie = require('./assets/poochie.png');

setTimeout(() => {
  window.scrollTo({ top: 0 });
}, 400)
  
  

let landscape = window.innerWidth > window.innerHeight;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;  
`;
const MainBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: #ddd;
  padding: 2rem;  
  text-align: center;
  &:nth-of-type(1) {
    background-color: var(--header-color);
    justify-content: space-evenly;
    min-height: ${window.innerHeight}px;
    max-height: ${window.innerHeight}px;
  }
  &:nth-of-type(2) {
    background-color: white;
    justify-content: space-evenly;
    height: calc(${window.innerHeight}px - var(--header-height));
  }
  &:nth-of-type(3) {
    justify-content: space-evenly;
    height: calc(${window.innerHeight}px - var(--header-height));
  }
  &:nth-of-type(4) {
    background-color: white;
    justify-content: space-evenly;
    height: calc(${window.innerHeight}px - var(--header-height));
  }
  &:nth-of-type(5) {
    justify-content: flex-end;
    background-color: var(--background-color-2);
    min-height: 0;
    height: calc(${window.innerHeight}px - var(--footer-height) - var(--header-height));
  }
  & > div {
    font-family: var(--title-font);
    animation: pulse-text infinite 2s ease;
    animation-direction: alternate;
    opacity: ${props => (props.landed ? '1' : '0')};
    transition: transform 1200ms ease, opacity 1000ms ease;
  }
  & > .title-marquee {
    font-size: calc(var(--header-height) / 1.4);
    transform: ${props => (props.landed ? 'none' : 'translateX(-5%)')};
    transition-delay: 800ms;
  }
  & > .secondary-marquee {
    animation: pulse-text-wide infinite 3s ease;
    animation-direction: alternate-reverse;
    font-size: var(--header-height);
    text-shadow: 0px 0px 1vmin #222;
    font-weight: 600;
    transform: ${props => (props.landed ? 'none' : 'translateY(5%)')};
    transition-duration: 1800ms;
    transition-delay: 2400ms;
  }
`;
const DownArrow = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 0; 
  height: 0; 
  border-left: 8vw solid transparent;
  border-right: 8vw solid transparent;
  border-top: 6vw solid #88888899;
  opacity: ${props => (props.landed ? '1' : '0')};
  animation: bob infinite 800ms linear alternate !important;
  transition: opacity 1000ms ease;
  transition-delay: 2700ms !important;
`;
const SocialIcons = styled.div`
  position: fixed;
  right: 0;
  bottom: 3vmin;
  background-color: #282c3488;
  border: 0.2vmin solid var(--header-color);
  border-right: 0;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  font-size: calc(var(--header-height) / 2);
  display: flex;
  flex-direction: column;
  align-items: center;  
  transform: ${props => props.landed ? 'none' : 'translateX(100%)'};
  transition: transform 210ms ease;
  transition-delay: 1200ms;
  will-change: transform;

  & i {
    padding: 2vmin;
  }
`;
const Footer = styled.footer`
  font-size: calc(var(--footer-height) / 5);
  background-color: var(--header-color);
  width: 100%;
  height: var(--footer-height);  
  color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vmin;
  box-shadow: 0 0.1vmin 1vmin #222;
  white-space: pre;

  & a {
    color: #ddd;
  }
`;
class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('running App');
    this.touchHandler = new TouchHandler();
    this.touchHandler.setInputs();
    this.touchHandler.swipeActions.south = () => {
      let newPhase = this.state.phase - 1;
      if (newPhase < 0) {
        return;
      }
      this.scrollToPhase(newPhase)
      this.setState({
        phase: newPhase
      })
    }
    this.touchHandler.swipeActions.north = () => {
      let newPhase = this.state.phase + 1;
      if (newPhase === this.state.sections.length) {
        return;
      }
      this.scrollToPhase(newPhase)
      this.setState({
        phase: newPhase
      });
    }
    this.state = {
      sections:  [
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef()
      ],
      phase: 0
    }
  }
  
  scrollToPhase = (newPhase) => {
    console.log(this.state.sections[3]);
    let newY = this.state.sections[newPhase].current.offsetTop - (window.innerWidth * 0.15);
    window.scrollTo({ top: newY, behavior: 'smooth' });
    this.setState({
      phase: newPhase
    })
  }

  render() {
    let landed = true;
    return (
      <MainContainer>
        <Header phase={this.state.phase} landscape={landscape} landed={landed} />
        
        <MainBody ref={this.state.sections[0]} landed={landed}>
          {/* {!true && <PhoneNumber><a href='tel:+1-303-499-711'>503-867-5309  <i className="fa fa-phone"></i></a></PhoneNumber>} */}
          <div className='title-marquee'>gung-ho, no-foolin', double secret canine adjustment protocols</div>
          <div className='secondary-marquee'>for your bunghole</div>
          <DownArrow landed={landed} onClick={() => { this.scrollToPhase(1) }} />
        </MainBody>

        <MainBody ref={this.state.sections[1]} id='cock' landed={landed}>
          <img src={chicken} />
          <div className='title-marquee'>Chickens</div>
          <DownArrow landed={landed} onClick={() => { this.scrollToPhase(2) }} />
        </MainBody>

        <MainBody ref={this.state.sections[2]} landed={landed}>
          <img src={poochie} />
          <div className='title-marquee'>Poochie</div>
          <DownArrow landed={landed} onClick={() => { this.scrollToPhase(3) }} />
        </MainBody>

        <MainBody ref={this.state.sections[3]} landed={landed}>
          <img style={{ transform: 'scaleX(-1)' }} src={chicken} />
          <div className='title-marquee'>Other chickens</div>
          <DownArrow landed={landed} onClick={() => { this.scrollToPhase(4) }} />
        </MainBody>

        <MainBody ref={this.state.sections[4]} landed={landed}>
          <div className='title-marquee'>and the axe haiku.</div>
        </MainBody>

        <SocialIcons landed={landed}>
          <a style={{ color: 'blue' }} href='https://instagram.com/wagsworths' target='blank'><i className="fab fa-instagram circle"></i></a>
          <a style={{ color: '#55acee' }} href='https://twitter.com/wagsworths' target='blank'><i className="fab fa-twitter circle"></i></a>
          <a style={{ color: '#bd081c' }} href='https://pinterest.com/wagsworths' target='blank'><i className="fab fa-pinterest"></i></a>
        </SocialIcons>
        <Footer>
          © 2019 <a href='http://wagsworthgrooming.com'>Wagsworth Grooming LLC</a>  |  Website by <a href='https://mikedonovan.dev'>mikedonovan.dev</a>
        </Footer>
      </MainContainer>
    );
  }
}

export default App;
