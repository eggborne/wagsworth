import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { TouchHandler } from './control';
import Header from './Header';
import Menu from './Menu';
let chicken = require('./assets/largechicken.png');
let poochie = require('./assets/poochie.png');
let tomatoes = require('./assets/tomatoes.jpg');

setTimeout(() => {
  window.scrollTo({ top: 0 });
}, 100);
  
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
    justify-content: space-evenly;
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
    transition-delay: 300ms;
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
  transition-delay: 2700ms;
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
const FadeImage = styled.img`
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 620ms ease;
  transition-delay: 300ms;
`;
class App extends React.Component {
  constructor(props) {
    console.log('running App');
    super(props);
    this.state = {
      sections:  [
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef()
      ],
      phase: 0,
      landed: false,
      menuOn: false,
      lastShifted: 0
    }
    this.touchHandler = new TouchHandler();
    this.touchHandler.setInputs();
    this.touchHandler.swipeActions.south = () => {
      if (!this.state.menuOn) {
        let newPhase = this.state.phase - 1;
        this.scrollToPhase(newPhase)
      }
    }
    this.touchHandler.swipeActions.north = () => {
      if (!this.state.menuOn) {
        let newPhase = this.state.phase + 1;
        this.scrollToPhase(newPhase)
      }
    }
  }

  componentDidMount = () => {
    window.addEventListener('touchmove', event => {
      event.preventDefault();
    }, { passive: false });
    window.addEventListener('wheel', event => {
      if ((window.performance.now() - this.state.lastShifted) > 500) {
        let newPhase = event.deltaY > 0 ? this.state.phase + 1 : this.state.phase - 1;
        this.scrollToPhase(newPhase);
      }
    });
    window.addEventListener("keydown", event => {
      if (event.code === 'ArrowDown') {
        this.scrollToPhase(this.state.phase + 1);
      }
      if (event.code === 'ArrowUp') {
        this.scrollToPhase(this.state.phase - 1);
      }
    });
    setTimeout(() => {
      this.setState({
        landed: true
      });
    },10)
  };  
  
  scrollToPhase = (newPhase, instant) => {
    if ((window.performance.now() - this.state.lastShifted) > 500 && newPhase >= 0 && newPhase < this.state.sections.length) {
      let smooth = instant ? 'auto' : 'smooth';
      console.log(this.state.sections[3]);
      let newY = this.state.sections[newPhase].current.offsetTop - (window.innerWidth * 0.15);
      window.scrollTo({ top: newY, behavior: smooth });
      this.setState({
        phase: newPhase,
        lastShifted: window.performance.now()
      });
    }
  }

  handleHamburgerClick = (event) => {
    console.log(event);
    this.setState({
      menuOn: !this.state.menuOn
    })
  }

  handleNavItemClick = (phase) => {
    console.log('clicked for phase', phase)
    this.setState({
      menuOn: false,
    }, () => {
      this.scrollToPhase(phase, true);
    })
  }

  handleTitleClick = () => {
    this.scrollToPhase(0);
  }

  render() {
    return (
      <MainContainer>
        <Header
          onHamburgerClick={this.handleHamburgerClick}          
          onClickTitle={this.handleTitleClick}          
          phase={this.state.phase}
          menuOn={this.state.menuOn}
          landscape={landscape}
          landed={this.state.landed}
        />        
        <MainBody ref={this.state.sections[0]} landed={this.state.landed}>
          {/* {!true && <PhoneNumber><a href='tel:+1-303-499-711'>503-867-5309  <i className="fa fa-phone"></i></a></PhoneNumber>} */}
          <div className='title-marquee'>gung-ho, no-foolin', double secret canine adjustment protocols</div>
          <div className='secondary-marquee'>for your bunghole</div>
          <DownArrow landed={this.state.landed} onTouchStart={() => { this.scrollToPhase(1) }} />
        </MainBody>

        <MainBody ref={this.state.sections[1]} id='cock' landed={this.state.phase === 1}>
          <FadeImage showing={this.state.phase === 1} src={chicken} />
          <div className='title-marquee'>Chickens</div>
          <DownArrow landed={this.state.landed} onTouchStart={() => { this.scrollToPhase(2) }} />
        </MainBody>

        <MainBody ref={this.state.sections[2]} landed={this.state.phase === 2}>
          <FadeImage showing={this.state.phase === 2} src={poochie} />
          <div className='title-marquee'>Poochie</div>
          <DownArrow landed={this.state.landed} onTouchStart={() => { this.scrollToPhase(3) }} />
        </MainBody>

        <MainBody ref={this.state.sections[3]} landed={this.state.phase === 3}>
          <FadeImage css={{transform:'scaleX(-1)'}} showing={this.state.phase === 3} src={chicken} />
          <div className='title-marquee'>Other chickens</div>
          <DownArrow landed={this.state.landed} onTouchStart={() => { this.scrollToPhase(4) }} />
        </MainBody>

        <MainBody ref={this.state.sections[4]} landed={this.state.phase === 4}>
          <FadeImage css={{width: '100%'}} showing={this.state.phase === 4} src={tomatoes} />
          <div className='title-marquee'>Tomatoes</div>
        </MainBody>

        <SocialIcons landed={this.state.landed}>
          <a style={{ color: '#3c5a99' }} href='https://instagram.com/wagsworths' target='blank'><i className="fab fa-facebook"></i></a>
          <a style={{ color: 'blue' }} href='https://instagram.com/wagsworths' target='blank'><i className="fab fa-instagram circle"></i></a>
          <a style={{ color: '#55acee' }} href='https://twitter.com/wagsworths' target='blank'><i className="fab fa-twitter circle"></i></a>
          <a style={{ color: '#bd081c' }} href='https://pinterest.com/wagsworths' target='blank'><i className="fab fa-pinterest"></i></a>
        </SocialIcons>
        <Footer>
          © 2019 <a href='http://wagsworthgrooming.com'>Wagsworth Grooming LLC</a>  |  Website by <a href='https://mikedonovan.dev'>mikedonovan.dev</a>
        </Footer>
        <Menu onNavItemClick={this.handleNavItemClick} phase={this.state.phase} showing={this.state.menuOn} landscape={landscape} />
      </MainContainer>
    );
  }
}

export default App;
