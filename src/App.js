import React, { Suspense } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from 'styled-components/macro';
import Header from './components/Header';
import Menu from './components/Menu';
import { TouchHandler } from './scripts/control';
import Hamburger from './components/Hamburger';
import ScrollPanel from './components/ScrollPanel';
import { getLine } from './scripts/quotes.js';

// const Menu = React.lazy(() => import('./components/Menu'));

const initialTime = window.performance.now();

let swipeToScroll = true;
let lastScrollY = 0;
let lastCheckedY = 0;

const imageExt = true ? '.png' : '.webp';

let headline1 = undefined;
let headline2 = undefined;

const textItems = {
  headlines: [],
  paragraphs: []
};


let landscape = window.innerWidth > window.innerHeight;
if (landscape) {
  alert('Please visit in portrait mode on a mobile device for now :|');
}
let headerHeight = window.innerWidth * 0.2;
let blackLogo = false;
let logoPath = `./assets/logosegments${blackLogo ? '/black' : ''}`;

let logoWidth = window.innerWidth >= 1800 ? 1200 : 600;;

let wagsworthLogo = require(`${logoPath}/wagsworth${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
let groomingLogo = require(`${logoPath}/grooming${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
let dogHeadLogo = require(`${logoPath}/doghead${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
let monocleLogo = require(`${logoPath}/monocle${blackLogo ? 'white' : 'black'}${logoWidth}${imageExt}`);

let sectionHeight = window.innerHeight - headerHeight;
let shiftSpeed = 420;

document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
document.documentElement.style.setProperty('--section-height', `${sectionHeight}px`);
document.documentElement.style.setProperty('--shift-speed', `${shiftSpeed}ms`);

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let largeChicken = undefined;
let orangeChicken = undefined;
let grayChicken = undefined;
let whiteChicken = undefined;
let scissors = undefined;
let tomatoes = undefined;
// const largeChicken = require(`./assets/largechicken${imageExt}`);
// const orangeChicken = require(`./assets/orangechicken${imageExt}`);
// const grayChicken = require(`./assets/graychicken${imageExt}`);
// const whiteChicken = require(`./assets/whitechicken${imageExt}`);
// const scissors = require(`./assets/scissors${imageExt}`);
// const tomatoes = require(`./assets/tomatoes.jpg`);

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
  z-index: 1;
`;
const SectionContainer = styled.div`
  --bottom-panel-height: calc(var(--header-height) * 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translateY(-${props => sectionHeight * props.phase}px);
  will-change: transform;
  ${props => props.animating &&
    'transition: transform var(--shift-speed) ease'
  };

`;
const ScrollSec = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: calc(var(--header-height) * 1.5) 1fr var(--header-height);
  grid-template-columns: var(--footer-height) 1fr var(--footer-height);
  align-items: center;
  justify-items: center;
  font-size: var(--normal-font-size);
  color: #ddd;
  background: linear-gradient(rgba(0,0,0,0.2), transparent,  transparent,  transparent, rgba(0,0,0,0.2));
  font-family: var(--title-font);
  height: ${sectionHeight}px;
  min-height: ${sectionHeight}px;
  max-height: ${sectionHeight}px;
  ${false ?
  `
  // opacity: 1;
  // transition: none;
  `
  :
  `
  // opacity: 0;
  `
  }
  & .title-marquee {
    text-align: center;
    opacity: ${props => (props.landed ? '1' : '0')};
    font-size: calc(var(--header-height) / 1.4);
    transform: ${props => (props.landed ? 'none' : 'translateX(-4vmin)')};
    transition: transform 1200ms ease, opacity 1200ms ease;
    transition-delay: 300ms;
    ${props => props.instantMode && `transition-delay: 0ms !important;`}
  }
  & .secondary-marquee {
    text-align: center;
    opacity: ${props => (props.landed ? '1' : '0')};
    ${props => props.phase === 0 &&
      `animation: pulse-text-wide infinite 3s ease;
      animation-direction: alternate-reverse;`
    }
    font-size: calc(var(--header-height) / 1.8);
    line-height: calc(var(--header-height) / 1.6);
    font-weight: 700;
    transform: ${props => (props.landed ? 'none' : 'translateY(4vmin)')};
    transition: transform 1800ms ease, opacity 800ms ease;
    transition-delay: 1200ms;
    ${props => props.instantMode && `transition-delay: 0ms !important;`}
  }
  & img {
    /* height: ${sectionHeight * 0.35}px; */
    height: ${sectionHeight / 4}px;
    --off-transform: scale(1.2);
    transition-duration: ${props => props.leaving ? '180ms' : '500ms'} !important;
    transition-delay: ${props => props.leaving ? 'calc(var(--shift-speed) / 2)' : 'calc(var(--shift-speed) / 2)'} !important;
    ${props => props.instantMode && `transition-delay: 0ms !important;`}
  }
  & :last-of-type {
    & > div:last-of-type {
      background: transparent !important;
    }
  }
  & > div, header {
    grid-column-start: 0;
    grid-column-end: span 3;
  }
  ${props => props.leaving &&
    `
      // transition: none !important;
      // & * {
      //   transition: none !important;
      // }
    `
  }
  /* & > * {
    opacity: 0;
  } */
`;
const SectionBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  padding-top: 10vw;
  padding-bottom: 10vw;
`;
const SectionText = styled.summary`
  text-align: center;
  font-family: var(--main-font);
  color: #333;
  font-size: var(--normal-font-size);
  padding-left: 15vw;
  padding-right: 15vw;
  transition: transform 800ms ease, opacity 600ms ease;
  transition-delay: calc(var(--shift-speed));
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  will-change: transform, opacity;
  ${props => (props.showing ?
  `
  opacity: 1
  `
    :
  `
  opacity: 0
  `
  )};
`;
const FadeImage = styled.img`
  opacity: ${props => (props.showing ? 1 : 0)};
  transform: ${props => (props.showing ? 'none' : 'var(--off-transform)')};
  transition: opacity 500ms ease, transform 500ms ease;
  transition-duration: 500ms;
  // will-change: transform, opacity;
`;
const FramedPhoto = styled(FadeImage)`
  border-radius: 1vw;
  box-shadow: 0.2vw 0.2vw 1vw 0 black;
  opacity: ${props => (props.showing ? 1 : 0)};
  transform: ${props => (props.showing ? 'none' : 'translateX(2vmin)')};
`;
const IntroSection = styled(ScrollSec)`
  border: 0;
  background-color: var(--header-color);
  background-image: none;
  justify-content: flex-end;
  min-height: ${window.innerHeight}px;
  max-height: ${window.innerHeight}px;
  z-index: 12;
  box-shadow: ${props => (props.phase === 1 && props.inTransit.to === 1 && props.lastPhase === 0) && 'var(--header-shadow)'};
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 40vh var(--header-height);
  ${props => props.leaving && 'opacity: 0;'}

`;
const IntroMessage = styled.div`
  width: 80vw;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-evenly;
  & > .title-marquee {
    line-height: 90%;
  }
  & > .secondary-marquee {
    line-height: 90%;
  }
`;
const BottomPanel = styled.div`
  /* position: absolute; */
  bottom: 0;
  width: 100vw;
  height: calc(var(--header-height) * 0.9);
  /* box-shadow: var(--header-shadow); */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (swipeToScroll && props.landed) ? 1 : 0};
  pointer-events: ${swipeToScroll ? 'all' : 'none'};
  transition: opacity 600ms ease;
  z-index: 6;
  ${props => props.entering ?
    `transition-delay: calc(var(--shift-speed) / 2)`
    :
    `transition-delay: 0ms`
  };
  ${props => props.leaving &&
    `transition-duration:  200ms`
  };
`;
const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 8vw solid transparent;
  border-right: 8vw solid transparent;
  opacity: ${props => props.landed ? 0.86 : 0};
  transition: opacity 1000ms ease;
  transition-delay: 2400ms;
  ${props => !props.showing &&
  `animation-play-state: paused !important;`
  }
`;
const DownArrow = styled(Arrow)`
  border-top: 6vw solid var(--arrow-color);
  bottom: 5vh;
  animation: bob infinite 800ms linear alternate;
  `;
const UpArrow = styled(DownArrow)`
  border-top: 0;
  border-bottom: 6vw solid var(--arrow-color);
  animation: bob infinite 800ms linear alternate;
`;
const Footer = styled.footer`
  position: absolute;
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
  opacity: 0.8;
`;
class App extends React.PureComponent {
  constructor() {
    // // console.log('running App');
    super();
    this.state = {
      sections: [
        {
          title: 'intro', ref: React.createRef()
        },
        {
          title: 'Chickens', ref: React.createRef(),
          style: { backgroundColor: `#efefef` },
          mainImage: require(`./assets/largechicken${imageExt}`),
          slides: [{},{},{}]
        },
        {
          title: 'Services', ref: React.createRef(),
          style: { backgroundColor: `var(--background-color-1)` },
          mainImage: require(`./assets/scissors${imageExt}`),
          slides: [{}, {}, {}, {}]
        },
        {
          title: 'About Me', ref: React.createRef(),
          style: {backgroundColor: 'white'},
          mainImage: require(`./assets/whitechicken${imageExt}`),
          slides: [{},{},{}]
        },
        {
          title: 'Tomatoes', ref: React.createRef(),
          style: {backgroundColor: `var(--background-color-3)`},
          mainImage: require(`./assets/tomatoes.jpg`),
          slides: [{},{}]
        },
        {
          title: 'F.A.Q.', ref: React.createRef(),
          style: { backgroundColor: 'white' },
          mainImage: require(`./assets/orangechicken${imageExt}`),
          slides: [{},{},{}]
        },
        {title: 'Mardi Gras', ref: React.createRef(),
        style: {backgroundColor: `var(--background-color-4)`},
        mainImage: require(`./assets/graychicken${imageExt}`),
          slides: []
        }
      ],
      dogHeadContainer: React.createRef(),
      phase: 0,
      lastPhase: 0,
      landed: false,
      menuOn: false,
      lastShifted: 0,
      instantMode: false,
      inTransit: {
        from: null,
        to: null
      },
      lazyLoad1: false,
      lazyLoad2: false,
      lazyLoad3: false
    }
    window.addEventListener('load', event => {
      // console.big('LOAD EVENT ' + (window.performance.now() - initialTime), 'green');
      largeChicken = require(`./assets/largechicken${imageExt}`);
      orangeChicken = require(`./assets/orangechicken${imageExt}`);
      grayChicken = require(`./assets/graychicken${imageExt}`);
      whiteChicken = require(`./assets/whitechicken${imageExt}`);
      scissors = require(`./assets/scissors${imageExt}`);
      tomatoes = require(`./assets/tomatoes.jpg`);
      this.setState({
        landed: true
      });
      if (swipeToScroll) {
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
            event.preventDefault();
            this.changePhase(this.state.phase + 1);
          }
          if (event.code === 'ArrowUp') {
            event.preventDefault();
            this.changePhase(this.state.phase - 1);
          }
        });
      } else {
        this.handleScroll = event => {
          if (Date.now() - lastCheckedY > 100) {
            let scrollY = window.scrollY;

            let phase = this.state.phase;
            [...this.state.sections].filter(sec => sec !== null && sec.ref.current).map((section, i) => {
              let sectionCenterY = section.ref.current.offsetTop + (sectionHeight / 2);
              if (lastScrollY < scrollY) {
                // if (this.state.phase !== 1+1) {
                //   this.setState({
                //     phase: i+1
                //   });
                // }
              }

            })
            lastScrollY = scrollY;
            lastCheckedY = Date.now();
          }
        }
        window.addEventListener('scroll', this.handleScroll);
      }
    });
    if (swipeToScroll) {
      this.touchHandler = new TouchHandler();
      this.touchHandler.setInputs();
      this.touchHandler.swipeActions.south = () => {
        if (!this.state.menuOn) {
          this.changePhase(this.state.phase - 1)
        } else {
          // this.handleHamburgerClick();
        }
      }
      this.touchHandler.swipeActions.north = () => {
        if (!this.state.menuOn) {
          this.changePhase(this.state.phase + 1)
        } else {
          // this.handleHamburgerClick();
        }
      }
    }
  }

  fillDummyText = (newPhase) => {
    if (newPhase === 0) {
      headline1 = getLine(4,0,true);
      headline2 = getLine(6,0,true);
    } else if (newPhase === 1) {
      textItems.headlines[newPhase] = getLine(4,0,true);
      textItems.paragraphs[newPhase] = getLine(16);
    } else if (newPhase === 2) {
      textItems.headlines[newPhase] = getLine(5,0,true);
      textItems.paragraphs[newPhase] = getLine(24) + ' ' + getLine(24);
    } else if (newPhase === 3) {
      textItems.headlines[newPhase] = getLine(6,0,true);
      textItems.paragraphs[newPhase] =  getLine(21, 12);
    } else if (newPhase === 4) {
      textItems.headlines[newPhase] = getLine(8,0,true);
      textItems.paragraphs[newPhase] =  getLine(20, 12);
    } else if (newPhase === 5) {
      textItems.headlines[newPhase] = getLine(5,0,true);
      textItems.paragraphs[newPhase] =  getLine(40, 12);
    } else if (newPhase === 6) {
      textItems.headlines[newPhase] = getLine(4,0,true);
      textItems.paragraphs[newPhase] =  getLine(20, 12);
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        lazyLoad1: true
      });
      // console.big('LAZY 1 ' + (window.performance.now() - initialTime), 'orange')
    }, 600);
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.setState({
          lazyLoad2: true
        });
        // console.big('LAZY 2 ' + (window.performance.now() - initialTime), 'yellow')
      }, 1200);
    })
    setTimeout(() => {
      this.setState({
        lazyLoad3: true
      });
      // console.big('LAZY 3 ' + (window.performance.now() - initialTime), 'pink')
    }, 3000);
    headline1 = getLine(5,0,true);
    headline2 = getLine(8,0,true);
  };

  // shouldComponentUpdate(prevProps, nextState) {
  //   let should = (
  //     this.state.landed !== nextState.landed
  //     || this.state.phase !== nextState.phase
  //     || this.state.menuOn !== nextState.menuOn
  //     || this.state.lazyLoad1 !== nextState.lazyLoad1
  //     || this.state.lazyLoad2 !== nextState.lazyLoad2
  //     || this.state.lazyLoad3 !== nextState.lazyLoad3
  //   );
  //   return should;
  // }

  changePhase = (newPhase, instant) => {
    let currentTransit = { ...this.state.inTransit };
    if (currentTransit.to === null && newPhase >= 0 && newPhase < this.state.sections.length) {
      let currentPhase = this.state.phase;
      currentTransit.from = currentPhase;
      currentTransit.to = newPhase;
      this.fillDummyText(newPhase);
      // console.pink('-------------------------------------------- changePhase setting phase', newPhase)
      // console.pink('-------------------------------------------- changePhase setting lastPhase', currentPhase)
      this.setState({
        lastPhase: currentPhase,
        phase: newPhase,
        inTransit: currentTransit,
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
    this.setState({
      menuOn: !this.state.menuOn
    }, () => {
      if (!this.state.lazyLoad3) {
        this.setState({
          lazyLoad1: true,
          lazyLoad2: true,
          lazyLoad3: true,
        });
      }
    });
  }

  handleNavItemClick = (phase) => {
    this.changePhase(phase, true);
    this.setState({
      menuOn: false,
    });
  }
  handleTitleClick = () => {
    this.changePhase(0);
  }
  handleClickLogo = (event) => {
    if (this.state.menuOn) {
      this.handleHamburgerClick();
    } else {
      if (this.state.phase > 0 || this.state.menuOn) {
        this.changePhase(0, true);
      } else {
        // pet the dog
        this.state.dogHeadContainer.current.style.animationPlayState = 'running';
        setTimeout(() => {
          this.state.dogHeadContainer.current.style.animationPlayState = 'paused';
        }, 180 * randomInt(1, 3));
      }
    }
  }

  render() {

    console.log('adjfhkdjsfhjdsf');
    console.log(textItems)
    if (this.state.landed) {
      // console.count('App');
    }
    let collapsed = this.state.phase > 0 || this.state.menuOn;
    let sectionCount = this.state.sections.length;
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
          onClick={this.handleClickLogo}
          showing={this.state.landed}
          collapsed={collapsed}>
          <Dog ref={this.state.dogHeadContainer}>
            <DogHead src={dogHeadLogo} showing={this.state.landed} collapsed={collapsed} />
            <Monocle src={monocleLogo} showing={this.state.landed} collapsed={collapsed} />
          </Dog>
          <Wagsworth src={wagsworthLogo} showing={this.state.landed} collapsed={collapsed} />
          <Grooming src={groomingLogo} showing={this.state.landed} collapsed={collapsed} />
        </LogoContainer>

        <SectionContainer allLoaded={this.state.lazyLoad3} animating={!this.state.instantMode} phase={this.state.phase} moving={this.state.inTransit}>
          <IntroSection phase={this.state.phase} index={0} phase={this.state.phase} lastPhase={this.state.lastPhase} inTransit={this.state.inTransit} instantMode={this.state.instantMode} entering={this.state.inTransit.to === 0} leaving={this.state.inTransit.from === 0} ref={this.state.sections[0].ref} landed={this.state.landed && this.state.phase === 0}>
            <div></div>
            <IntroMessage>
              <div className='title-marquee'>{headline1}</div>
              <div className='secondary-marquee'>{headline2}</div>
            </IntroMessage>
            <BottomPanel phase={this.state.phase} sections={sectionCount} landed={this.state.phase === 0} entering={this.state.inTransit.to === 0} leaving={this.state.inTransit.from === 0}>
              <DownArrow landed={this.state.landed} onTouchStart={() => { this.changePhase(1) }} />
            </BottomPanel>
          </IntroSection>
          {(this.state.lazyLoad1) &&
            <>
            {this.state.sections.filter(section => section.title !== 'intro').map((section, i) => {
                if (this.state.lazyLoad1 & i < 2 || this.state.lazyLoad2 && i < 4 || this.state.lazyLoad3) {
                  return (
                    <ScrollPanel
                      key={this.state.sections[i + 1].title}
                      slides={this.state.sections[i + 1].slides}
                      landed={this.state.landed}
                      headline={textItems.headlines[i + 1]}
                      bottomText={textItems.paragraphs[i + 1]}
                      style={this.state.sections[i + 1].style}
                      height={sectionHeight}
                      inTransit={this.state.inTransit}
                      onClickNextPhase={() => this.changePhase(i + 2)}
                      centerImage={this.state.sections[i + 1].mainImage}
                      phase={this.state.phase}
                      lastPhase={this.state.lastPhase}
                      index={i + 1}
                      instantMode={this.state.instantMode}
                      entering={this.state.inTransit.to === i + 1}
                      leaving={this.state.inTransit.from === i + 1}
                      sections={this.state.sections}
                    />
                  );
                }
              })}
              <Footer>
                <ByLine>© {new Date().getFullYear()} <a href='http://wagsworthgrooming.com'>Wagsworth Grooming</a>  |  Website by <a href='mailto:mike@mikedonovan.dev'>mike@mikedonovan.dev</a></ByLine>
              </Footer>
            </>
          }
        </SectionContainer>
        {/* <Suspense fallback={<></>}> */}
          <Menu
          sections={this.state.sections.slice(1, this.state.sections.length)}
          onNavItemClick={this.handleNavItemClick}
          onClickMenuContainer={this.handleHamburgerClick}
          phase={this.state.phase}
          showing={this.state.menuOn}
          landscape={landscape} />
          <Hamburger onHamburgerClick={this.handleHamburgerClick} showing={!landscape} landed={this.state.landed} menuOn={this.state.menuOn} />
        {/* </Suspense> */}
      </MainContainer>
    );
  }
}

export default App;
