// import React, { Suspense } from 'react';
import React from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from 'styled-components/macro';
import Header from './Header';
import Menu from './Menu';
// const Menu = React.lazy(() => import('./Menu'));
import { TouchHandler } from './control';

const initialTime = window.performance.now();

const imageExt = true ? '.png' : '.webp';
console.log(imageExt)

let landscape = window.innerWidth > window.innerHeight;
if (landscape) {
  alert('Please visit in portrait mode on a mobile device for now :|');
}
let headerHeight = window.innerWidth * 0.2;
let blackLogo = false;
let logoPath = `./assets/logosegments${blackLogo ? '/black' : ''}`;

let logoWidth = window.innerWidth >= 1800 ? 1200 : 600;;
let wagsworthLogo = require(`${logoPath}/wagsworth${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
// let wagsworthHeaderLogo = require(`${logoPath}/wagsworth${blackLogo ? 'black' : 'white'}${headerlogoWidth}${imageExt}`);
let groomingLogo = require(`${logoPath}/grooming${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
// let groomingHeaderLogo = require(`${logoPath}/grooming${blackLogo ? 'black' : 'white'}${headerlogoWidth}${imageExt}`);
let dogHeadLogo = require(`${logoPath}/doghead${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
// let dogHeadHeaderLogo = require(`${logoPath}/doghead${blackLogo ? 'black' : 'white'}${headerlogoWidth}${imageExt}`);
let monocleLogo = require(`${logoPath}/monocle${blackLogo ? 'white' : 'black'}${logoWidth}${imageExt}`);
// let monocleHeaderLogo = require(`${logoPath}/monocle${blackLogo ? 'white' : 'black'}${headerlogoWidth}${imageExt}`);

let sectionHeight = window.innerHeight - headerHeight;
let shiftSpeed = 420;

document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
document.documentElement.style.setProperty('--shift-speed', `${shiftSpeed}ms`);

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;
const LogoContainer = styled.div`
background-color: var(--header-color);
  position: fixed;
  top: calc(var(--header-height) * 0.4);
  left: 6vmin;
  display: flex;
  width: 72vmin;
  z-index: 4;
  ${props => props.collapsed ? 
    'transform: scale(0.54) translate( -39vw, -9vw);'
    :
    props => (props.showing ?
      `transform: none; opacity: 0.99;`
      :
      `transform: scale(1.1); opacity: 0;`
    )
  }    
  transition: transform var(--shift-speed) ease, opacity 1000ms ease;
  will-change: transform, opacity;
`;
const MainLogo = styled.img`
  position: absolute;
  width: 72vw;
  transition: transform 600ms ease, opacity 620ms ease;
`;
const Wagsworth = styled(MainLogo)`
  z-index: 3;
`;
const Grooming = styled(MainLogo)`
  ${props => (props.showing ?
    `opacity: 1; transform: none;`
    :
    `opacity: 0; transform: translateX(4%);`
  )}
  transition-delay: 300ms;
  z-index: 6;
  `;
const Dog = styled.div`
  animation: wag 90ms infinite;
  animation-direction: alternate;
  animation-fill-mode: both;
  animation-play-state: paused;
`;
const DogHead = styled(MainLogo)`
  ${props => (props.showing ?
  `opacity: 1; transform: 'none';`
  :
  `opacity: 0; transform: translate(0.7vw, 0.8vw);`
  )}
  transition-delay: 750ms;
  z-index: 0;
`;
const Monocle = styled(MainLogo)`
  animation-name: raise-monocle;
  animation-duration: 1200ms;
  animation-delay: 1500ms;
  animation-fill-mode: forwards;
  transform-origin: 70% 60%;
  transform: translateY(6%) rotate(12deg);
  opacity: 0;
  // transition: opacity 1200ms ease;
  // transition-delay: 1500ms;
  z-index: 1;
`;
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translateY(-${props => sectionHeight * props.phase}px);
  ${props => props.animating &&
    'transition: transform var(--shift-speed) ease'
  };
`;
const ScrollSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: #ddd;
  text-align: center;
  background: linear-gradient(rgba(0,0,0,0.3), transparent,  transparent, rgba(0,0,0,0.3));  
  & > div {
    font-family: var(--title-font);
  }
  & > .title-marquee {
    animation: pulse-text infinite 2s ease;
    animation-direction: alternate;
    opacity: ${props => (props.landed ? '1' : '0')};
    font-size: calc(var(--header-height) / 1.7);
    transform: ${props => (props.landed ? 'none' : 'translateX(-4vmin)')};
    transition: transform 1200ms ease, opacity 1000ms ease;
    transition-delay: 300ms;
    ${props => props.instantMode && `transition-delay: 0ms !important;`}
  }
  & > .secondary-marquee {
    opacity: ${props => (props.landed ? '1' : '0')};
    animation: pulse-text-wide infinite 3s ease;
    animation-direction: alternate-reverse;
    font-size: calc(var(--header-height) / 1.25);
    font-weight: 600;
    transform: ${props => (props.landed ? 'none' : 'translateY(4vmin)')};
    transition: transform 1800ms ease, opacity 800ms ease;
    transition-delay: 1000ms;
    ${props => props.instantMode && `transition-delay: 0ms !important;`}
  }
  & > img {
    height: ${sectionHeight * 0.4}px;
    --off-transform: scale(1.2);
    transition-duration: ${props => props.leaving ? '180ms' : '500ms'} !important;
    transition-delay: ${props => props.leaving ? 'calc(var(--shift-speed) / 2)' : 'calc(var(--shift-speed) / 2)'} !important;
    ${props => props.instantMode && `transition-delay: 0ms !important;`}
  }
`;
const FadeImage = styled.img`
  // width: 60vmin;
  opacity: ${props => (props.showing ? 1 : 0)};
  transform: ${props => (props.showing ? 'none' : 'var(--off-transform)')};
  transition: opacity 500ms ease, transform 500ms ease;
  transition-duration: 500ms;
`;
const FramedPhoto = styled(FadeImage)`
  border-radius: 1vw;
  box-shadow: 0.2vw 0.2vw 1vw 0 black;
  opacity: ${props => (props.showing ? 1 : 0)};
  transform: ${props => (props.showing ? 'none' : 'translateX(2vmin)')};

`;
const IntroSection = styled(ScrollSection)`
  border: 0;
  background-color: var(--header-color);
  background-image: none;
  justify-content: space-evenly;
  min-height: ${window.innerHeight}px;
  max-height: ${window.innerHeight}px;
  z-index: 12;
  box-shadow: ${props => (props.phase === 1 && props.inTransit.to === 1 && props.lastPhase === 0) && 'var(--header-shadow)'};
`;
const Chickens = styled(ScrollSection)`
  background-color: white;
  justify-content: space-evenly;
  height: ${sectionHeight}px;
`;
const Scissors = styled(ScrollSection)`
  background-color: var(--background-color-1);
  justify-content: space-evenly;
  height: ${sectionHeight}px;
  & > .title-marquee {
    transform: ${props => (props.landed ? 'none' : 'translateX(4vw)')};
  }
`;
const OtherChickens = styled(ScrollSection)`
  background-color: white;
  justify-content: space-evenly;
  height: ${sectionHeight}px;
  & > img {
    transform: ${props => (props.landed ? 'translateX(-4vw)' : 'translateX(-60%)')};
  }
`;
const Tomatoes = styled(ScrollSection)`
  background-color: var(--background-color-3);
  justify-content: space-evenly;
  height: ${sectionHeight}px;
  & > .title-marquee {
    transform: ${props => (props.landed ? 'none' : 'translateX(4vw)')};
  }
  & > img {
    transform: ${props => (props.landed ? 'scaleX(1)' : 'scaleX(0)')};
  }
`;
const Indians = styled(ScrollSection)`
  background-color: white;
  justify-content: space-evenly;
  height: ${sectionHeight}px;
  & > img {
    transform: ${props => (props.landed ? 'scale(1)' : 'scale(0.8)')};
  }
`;
const MardiGras = styled(ScrollSection)`
background-color: var(--background-color-4);
  justify-content: space-evenly;
  min-height: 0;
  min-height: calc(${sectionHeight}px - var(--footer-height));
  max-height: calc(${sectionHeight}px - var(--footer-height));
  // height: ${sectionHeight}px;

  & > .title-marquee {
    transform: ${props => (props.landed ? 'none' : 'translateX(4vw)')};
  }
`;
const DownArrow = styled.div`
  position: absolute;
  bottom: 5vh;
  width: 0; 
  height: 0; 
  border-left: 8vw solid transparent;
  border-right: 8vw solid transparent;
  border-top: 6vw solid #88888899;
  opacity: ${props => (props.landed ? '1' : '0')};
  animation: bob infinite 800ms linear alternate !important;
  transition: opacity 1000ms ease;
  transition-delay: 2400ms;
`;
const UpArrow = styled(DownArrow)`
  border-top: 0;
  border-bottom: 6vw solid #88888899;
`;
const Footer = styled.footer`
  // position: absolute;
  left: 0;
  bottom: 0;  
  font-family: var(--main-font), sans-serif;  
  width: 100%;
  color: #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  white-space: pre;
  height: var(--footer-height);
  min-height: var(--footer-height);
  background-color: var(--header-color);
  box-shadow: var(--header-shadow);
  z-index: 15;
  & a {
    color: #dddddd88;
  }
`;
const ByLine = styled.div`
  font-size: calc(var(--footer-height) / 5);
`;
class App extends React.PureComponent {
  constructor(props) {
    // console.log('running App');
    super(props);
    this.state = {
      sections: [
        {title: 'intro', ref: React.createRef()},
        {title: 'Chickens', ref: React.createRef()},
        {title: 'Scissors', ref: React.createRef()},
        {title: 'Other Chickens', ref: React.createRef()},
        {title: 'Tomatoes', ref: React.createRef()},
        {title: 'Indians', ref: React.createRef()},
        {title: 'Mardi Gras', ref: React.createRef()}
      ],
      dogHeadContainer: React.createRef(),      
      phase: 0,
      lastPhase: 0,
      landed: false,
      menuOn: false,
      lastShifted: 0,
      instantMode: false,
      inTransit: {
        to: null,
        from: null
      }, // set by this.changePhase to {from: phase1, to: phase2}
      lazyLoad1: false,
      lazyLoad2: false,
      lazyLoad3: false
    }
    // setTimeout(() => {
    //   this.setState({event.preventDefault();
    //     landed: true
    //   });      
    // }, 40)
    window.addEventListener('DOMContentLoaded', event => {
      console.big('DOM LOADED ' + (window.performance.now() - initialTime), 'brown')
    })
    window.addEventListener('load', event => {
      console.big('LOAD EVENT ' + (window.performance.now() - initialTime), 'green')
      this.setState({
        landed: true
      });      
      window.addEventListener('touchmove', event => {
        event.preventDefault();
      }, { passive: false });
      window.addEventListener('wheel', event => {
        event.preventDefault();
        if (this.state.inTransit.to === null) {
          let newPhase = event.deltaY > 0 ? this.state.phase + 1 : this.state.phase - 1;
          this.changePhase(newPhase);
        }
      }, {passive: false});
      window.addEventListener("keydown", event => {
        if (event.code === 'ArrowDown') {
          this.changePhase(this.state.phase + 1);
        }
        if (event.code === 'ArrowUp') {
          this.changePhase(this.state.phase - 1);
        }
      });
      // window.addEventListener('transitionend', event => {      
      //   let isScroller = event.target.classList.contains(SectionContainer.componentStyle.componentId);
      //   if (this.state.inTransit && event.propertyName === 'transform' && isScroller) {
      //     this.setState({
      //       instantMode: false
      //     });                          
      //   }
      // });      
    });
    this.touchHandler = new TouchHandler();
    this.touchHandler.setInputs();
    this.touchHandler.swipeActions.south = () => {
      if (!this.state.menuOn) {
        this.changePhase(this.state.phase - 1)
      } else {
        this.handleHamburgerClick();
      }
    }
    this.touchHandler.swipeActions.north = () => {
      if (!this.state.menuOn) {
        this.changePhase(this.state.phase + 1)
      } else {
        this.handleHamburgerClick();
      }
    }
  }

  componentDidMount = () => {    
    setTimeout(() => {
      this.setState({
        lazyLoad1: true
      });
      console.big('LAZY 1 ' + (window.performance.now() - initialTime), 'orange')
    }, 600);
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.setState({
          lazyLoad2: true
        });
        console.big('LAZY 2 ' + (window.performance.now() - initialTime), 'yellow')
      }, 600);
    })
    setTimeout(() => {
      this.setState({
        lazyLoad3: true
      });
      console.big('LAZY 3 ' + (window.performance.now() - initialTime), 'pink')
    }, 1800);
  };
  
  changePhase = (newPhase, instant) => {
    // console.orange('trying to change.............................', this.state.inTransit)
    // if ((window.performance.now() - this.state.lastShifted) > shiftSpeed * 0.9 && newPhase >= 0 && newPhase < this.state.sections.length) {      
    if (this.state.inTransit.to === null && newPhase >= 0 && newPhase < this.state.sections.length) {
      if (!this.state.lazyLoad3) {
        this.setState({
          lazyLoad1: true,
          lazyLoad2: true,
          lazyLoad3: true
        });
      }
      this.setState({
        lastPhase: this.state.phase,
        phase: newPhase,
        inTransit: {
          from: this.state.phase,
          to: newPhase
        },
        instantMode: instant
      });
      setTimeout(() => {
        this.setState({
          inTransit: {
            to: null,
            from: null
          },
          instantMode: false
        });
      }, shiftSpeed);
    }
  }

  handleHamburgerClick = (event) => {
    // console.log(event);
    if (!this.state.lazyLoad3) {
      this.setState({
        lazyLoad1: true,
        lazyLoad2: true,
        lazyLoad3: true,
      });
    }
    this.setState({
      menuOn: !this.state.menuOn
    });
  }

  handleNavItemClick = (phase) => {
    console.log('clicked for phase', phase);
    this.setState({
      menuOn: false,
    }, () => {
      this.changePhase(phase, true);
    })
  }

  handleTitleClick = () => {
    this.changePhase(0);
  }
  render() {
    let collapsed = this.state.phase > 0 || this.state.menuOn;
    return (
      <MainContainer>
        <Header
          onHamburgerClick={this.handleHamburgerClick}         
          onClickTitle={this.handleTitleClick}          
          phase={this.state.phase}
          lastPhase={this.state.lastPhase}
          inTransit={this.state.inTransit}
          menuOn={this.state.menuOn}
          instantMode={this.state.instantMode}
          landscape={landscape}
          landed={this.state.landed}
          collapsed={collapsed}
        />
        <LogoContainer 
          onClick={(event) => {
            if (this.state.menuOn) {
              this.handleHamburgerClick();
            } else {
              if (collapsed) {
                this.changePhase(0, true);
              } else {
                // pet the dog
                this.state.dogHeadContainer.current.style.animationPlayState = 'running';
                setTimeout(() => {
                  this.state.dogHeadContainer.current.style.animationPlayState = 'paused';                
                }, 180 * randomInt(1, 3));
              }
            }
          }}
          showing={this.state.landed}
          collapsed={collapsed}>
          <Dog ref={this.state.dogHeadContainer}>
            <DogHead src={dogHeadLogo} showing={this.state.landed} collapsed={collapsed} />
            <Monocle src={monocleLogo} showing={this.state.landed} collapsed={collapsed} />
          </Dog>
          <Wagsworth src={wagsworthLogo} showing={this.state.landed} collapsed={collapsed} />
          <Grooming src={groomingLogo} showing={this.state.landed} collapsed={collapsed} />
        </LogoContainer>
        
          <SectionContainer animating={!this.state.instantMode} phase={this.state.phase} moving={this.state.inTransit}>
          <IntroSection phase={this.state.phase} lastPhase={this.state.lastPhase} inTransit={this.state.inTransit} instantMode={this.state.instantMode} entering={this.state.inTransit.to === 0} leaving={this.state.inTransit.from === 0} ref={this.state.sections[0].ref} landed={this.state.landed && this.state.phase === 0}>
              <div style={{ height: '10vh' }}></div>
              <div className='title-marquee'>canine adjustment protocols</div>
              <div className='secondary-marquee'>for your bunghole</div>
              <DownArrow landed={this.state.landed} onTouchStart={() => { this.changePhase(1) }} />
          </IntroSection>
          {(this.state.lazyLoad1) &&
            <Chickens instantMode={this.state.instantMode} entering={this.state.inTransit.to === 1} leaving={this.state.inTransit.from === 1} ref={this.state.sections[1].ref} id='cock' landed={this.state.phase === 1}>
              <FadeImage showing={this.state.phase === 1} src={require(`./assets/largechicken${imageExt}`)} />
              <div className='title-marquee'>{this.state.sections[1].title}</div>
              <DownArrow landed={this.state.landed} onTouchStart={() => { this.changePhase(2) }} />
            </Chickens>
          }
          
          {(this.state.lazyLoad2) &&
            <>
              <Scissors instantMode={this.state.instantMode} entering={this.state.inTransit.to === 2} leaving={this.state.inTransit.from === 2} ref={this.state.sections[2].ref} landed={this.state.phase === 2}>
                <FadeImage showing={this.state.phase === 2} src={require(`./assets/scissors${imageExt}`)} />
                <div className='title-marquee'>{this.state.sections[2].title}</div>
                <DownArrow landed={this.state.landed} onTouchStart={() => { this.changePhase(3) }} />
              </Scissors>
              <OtherChickens instantMode={this.state.instantMode} entering={this.state.inTransit.to === 3} leaving={this.state.inTransit.from === 3} ref={this.state.sections[3].ref} landed={this.state.phase === 3}>
                <FadeImage showing={this.state.phase === 3} src={require(`./assets/whitechicken${imageExt}`)} />
                <div className='title-marquee'>{this.state.sections[3].title}</div>
                <DownArrow landed={this.state.landed} onTouchStart={() => { this.changePhase(4) }} />
              </OtherChickens>
            </>
          }
          {(this.state.lazyLoad3) &&
            <>
              <Tomatoes instantMode={this.state.instantMode} entering={this.state.inTransit.to === 4} leaving={this.state.inTransit.from === 4} ref={this.state.sections[4].ref} landed={this.state.phase === 4}>
                <FramedPhoto showing={this.state.phase === 4} src={require('./assets/tomatoes.jpg')} />
                <div className='title-marquee'>{this.state.sections[4].title}</div>
                <DownArrow landed={this.state.landed} onTouchStart={() => { this.changePhase(5) }} />
              </Tomatoes>

              <Indians instantMode={this.state.instantMode} entering={this.state.inTransit.to === 5} leaving={this.state.inTransit.from === 5} ref={this.state.sections[5].ref} landed={this.state.phase === 5}>
                <FadeImage showing={this.state.phase === 5} src={require(`./assets/orangechicken${imageExt}`)} />
                <div className='title-marquee'>{this.state.sections[5].title}</div>
                <DownArrow landed={this.state.landed} onTouchStart={() => { this.changePhase(6) }} />
              </Indians>

              <MardiGras instantMode={this.state.instantMode} entering={this.state.inTransit.to === 6} leaving={this.state.inTransit.from === 6} ref={this.state.sections[6].ref} landed={this.state.phase === 6}>
                <FadeImage showing={this.state.phase === 6} src={require(`./assets/graychicken${imageExt}`)} />
                <div className='title-marquee'>{this.state.sections[6].title}</div>
                <UpArrow landed={this.state.landed} onTouchStart={() => { this.changePhase(1) }} />
              </MardiGras>
              <Footer>
                <ByLine>© {new Date().getFullYear()} <a href='http://wagsworthgrooming.com'>Wagsworth Grooming</a>  |  Website by <a href='mailto:mike@mikedonovan.dev'>mike@mikedonovan.dev</a></ByLine>
              </Footer>
            </>
          }
        </SectionContainer>
        {this.state.lazyLoad2 &&
          <Menu
          sections={this.state.sections.slice(1, this.state.sections.length)}
          onNavItemClick={this.handleNavItemClick}
          onClickMenuContainer={this.handleHamburgerClick}
          phase={this.state.phase}
          showing={this.state.menuOn}
          landscape={landscape} />
        }
      </MainContainer>
    );
  }
}

export default App;
