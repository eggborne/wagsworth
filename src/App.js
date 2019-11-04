import React, { Suspense } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from 'styled-components/macro';
import Header from './components/Header';
import { TouchHandler } from './scripts/control';
import Hamburger from './components/Hamburger';
// import ScrollPanel from './components/ScrollPanel';
import Footer from './components/Footer';
import { getLine, randomInt, getSelfStatement } from './scripts/quotes.js';
const ScrollPanel = React.lazy(() => import('./components/ScrollPanel'));
const Menu = React.lazy(() => import('./components/Menu'));
const okForPublic = true;

window.CLICK_METHOD = window.PointerEvent ? 'onPointerDown' : window.TouchEvent ? 'onTouchStart' : 'onClick';

console.error('USING CLICK -------', window.CLICK_METHOD, ' ------------------------');

const initialTime = window.performance.now();

let headline1;
let headline2;

let swipeToScroll = true;

const imageExt = true ? '.png' : '.webp';

const textItems = {
  headlines: [],
  paragraphs: []
};

let landscape = window.innerWidth > window.innerHeight;
let headerHeight = window.innerWidth * 0.15;
if (landscape) {
  headerHeight = window.innerHeight * 0.1;
  // alert('Please visit in portrait mode on a mobile device for now :|');
}
let blackLogo = false;
let logoPath = `./assets/logosegments${blackLogo ? '/black' : ''}`;

let logoWidth = window.innerWidth >= 1800 ? 1200 : 600;;

let wagsworthLogo = require(`${logoPath}/wagsworth${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
let groomingLogo = require(`${logoPath}/grooming${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
let dogHeadLogo = require(`${logoPath}/doghead${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
let monocleLogo = require(`${logoPath}/monocle${blackLogo ? 'white' : 'black'}${logoWidth}${imageExt}`);

function changeLogoColor(newColor) {
  blackLogo = newColor === 'black';
  logoPath = `./assets/logosegments${blackLogo ? '/black' : ''}`;
  wagsworthLogo = require(`${logoPath}/wagsworth${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
  groomingLogo = require(`${logoPath}/grooming${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
  dogHeadLogo = require(`${logoPath}/doghead${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
  monocleLogo = require(`${logoPath}/monocle${blackLogo ? 'white' : 'black'}${logoWidth}${imageExt}`);
}

let sectionHeight = window.innerHeight - headerHeight;
let shiftSpeed = 420;

document.documentElement.style.setProperty('--view-height', `${window.innerHeight}px`);
document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
document.documentElement.style.setProperty('--section-height', `${sectionHeight}px`);
document.documentElement.style.setProperty('--shift-speed', `${shiftSpeed}ms`);

let scissors = undefined;

const facebookIcon = require(`./assets/icons/facebookicon.png`);
const instagramIcon = require(`./assets/icons/instagramicon.png`);
const twittericon = require(`./assets/icons/twittericon.png`);
const pinteresticon = require(`./assets/icons/pinteresticon.png`);

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: stretch; */
  overflow: hidden;
  
  @media screen and (orientation: landscape) {
    width: 100vh;
    align-items: center;
  }
`;
const SectionScrollContainer = styled.div`
  --bottom-panel-height: calc(var(--header-height) * 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transform: translateY(-${props => sectionHeight * props.phase}px);
  will-change: transform;
  ${props => props.animating &&
    'transition: transform var(--shift-speed) ease'
  };
`;
const IntroSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: calc(var(--header-height) * 1.5) 1fr var(--header-height);
  justify-items: center;
  font-size: var(--main-font-size);
  font-family: var(--title-font);
  /* color: #ddd; */
  height: var(--section-height);
  min-height: var(--section-height);
  border: 0;
  background-color: var(--header-color) !important;
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
    display: ${okForPublic || 'none'};
    /* line-height: 90%; */
    text-align: center;
    color: var(--header-text-color);
    ${props => props.landed &&
    `animation: pulse-text-wide infinite 5s ease;
      animation-direction: alternate-reverse;`
    }
    opacity: ${props => (props.landed ? '1' : '0')};
    font-size: calc(var(--header-height) / 3);
    transform: ${props => (props.landed ? 'none' : 'translateX(-4vmin)')};
    transition: transform 1200ms ease, opacity 1200ms ease;
    transition-delay: 300ms;
    
    ${props => props.instantMode && `transition-delay: 0ms;`}
  }
  & > .secondary-marquee {
    line-height: 90%;
    text-align: center;
    opacity: ${props => (props.landed ? '1' : '0')};
    font-size: calc(var(--header-height) / 1.8);
    line-height: calc(var(--header-height) / 1.6);
    transform: ${props => (props.landed ? 'none' : 'translateY(4vmin)')};
    transition: transform 1800ms ease, opacity 800ms ease;
    transition-delay: 1200ms;
    color: var(--header-text-color);
    ${props => props.landed &&
    `animation: pulse-text-wide infinite 5s ease;
      animation-direction: alternate-reverse;`
    }
    ${props => props.instantMode && `transition-delay: 0ms;`}
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
  opacity: ${props => (props.landed) ? 1 : 0};
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
  border-left: 2.5rem solid rgba(255,255,255,0);
  border-right: 2.5rem solid rgba(255,255,255,0);
  opacity: ${props => props.landed ? 0.86 : 0};
  transition: opacity 1000ms ease;
  transition-delay: 1000ms;
  z-index: 20;
  filter: drop-shadow(0 0 2px #000000aa);
  ${props => !props.landed &&
    `animation-play-state: paused !important;`
  }
`;
// const DownArrow = styled(Arrow)`
//   border-top: 6vw solid var(--arrow-color);
//   bottom: 5vh;
//   animation: bob infinite 800ms linear alternate;
// `;
const DownArrow = styled(Arrow)`
  position: relative;
  border-top: 2.2rem solid var(--arrow-color);
  animation: bob infinite 800ms linear alternate;
  & ::before {
    width: max-content;
    font-size: 1rem;
    height: 1rem;
    position: absolute;
    color: white;
    content: 'Services';
    transform: translate(-50%, -100%);
    top: -1rem;
    left: 50%;
    text-shadow: 2px 2px 1vw #00000099;
  }
`;
const PageFooter = styled.footer`
  /* position: absolute; */
  left: 0;
  bottom: 0;
  font-family: var(--main-font), sans-serif;
  font-size: 0.7rem;
  /* opacity: 0.8; */
  width: 100%;
  color: #ddd;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-evenly;
  justify-self: flex-end;
  white-space: pre;
  height: var(--footer-height);
  background-color: var(--header-color);
  box-shadow: var(--header-shadow);
  /* padding: 3vh 0; */
  z-index: 6;
  & a {
    color: #dddddd88;
  }
`;
const EditIndicator = styled.div`
  position: fixed;
  bottom: 2vh;
  right: 5vw;
  color: white;
  text-shadow: 1px 1px 2px black;
  font-size: calc(var(--header-height) / 6);
  /* display: ${window.location.hostname.indexOf('wagsworthgrooming') === -1 ? 'none' : 'static'}; */
  display: ${props => props.editMode ? 'static' : 'none'};
  color: ${props => props.flashing ? '#aaffaa' : '#00ff00'};
  pointer-events: none;
  font-weight: bold;
  font-family: 'Open Sans' !important;
`;
const SocialIcons = styled.div`
  font-size: calc(var(--header-height) / 8);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #aaaaaa99;
  letter-spacing: calc(var(--main-font-size) / 6);
  font-family: var(--main-font);
  font-weight: bold;
  & > .social-icon-row {
    display: flex;
    margin-top: var(--main-font-size)    
  }
  & a > img {
    padding: 2vmin;
    padding-bottom: 0;
    height: calc(var(--header-height) / 1.75);
    animation: wave 1200ms infinite ease;
    // animation-direction: alternate;
    animation-play-state: ${props => props.showing ? 'playing' : 'paused'}
  }
  & a > #fb {
    animation-delay: 200ms !important;
  }
  & a > #insta {
    animation-delay: 400ms !important;
  }
  & a > #twit {
    animation-delay: 600ms;
  }
  & a > #pint {
    animation-delay: 800ms;
  }
`;
class App extends React.PureComponent {
  constructor() {
    // // console.log('running App');
    super();
    this.editing = true;   
    this.state = {
      ready: false,
      sections: [],
      faqs: [],
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
      // document.documentElement.style.setProperty('--view-height', `${window.innerHeight}px`);
      // document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      // document.documentElement.style.setProperty('--section-height', `${sectionHeight}px`);
      // document.documentElement.style.setProperty('--shift-speed', `${shiftSpeed}ms`);
      this.setState({
        landed: true
      });

      scissors = require(`./assets/scissors${imageExt}`);
      if (swipeToScroll) {
        // window.addEventListener('touchmove', event => {
        //   console.log('targ', event.target.classList)
        //   if (!event.target.classList.contains('scrollable')) {
        //     event.preventDefault();
        //   }
        // }, { passive: false });
        window.addEventListener('wheel', event => {
          if (!event.ctrlKey) {
            event.preventDefault();
            if (this.state.inTransit.to === null) {
              let newPhase = event.deltaY > 0 ? this.state.phase + 1 : this.state.phase - 1;
              this.changePhase(newPhase);
            }
          }
        }, { passive: false });
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
        // this.handleScroll = event => {
        //   if (Date.now() - lastCheckedY > 100) {
        //     let scrollY = window.scrollY;

        //     let phase = this.state.phase;
        //     [...this.state.sections].filter(sec => sec !== null && sec.ref.current).map((section, i) => {
        //       let sectionCenterY = section.ref.current.offsetTop + (sectionHeight / 2);
        //       if (lastScrollY < scrollY) {
        //         // if (this.state.phase !== 1+1) {
        //         //   this.setState({
        //         //     phase: i+1
        //         //   });
        //         // }
        //       }

        //     })
        //     lastScrollY = scrollY;
        //     lastCheckedY = Date.now();
        //   }
        // }
        // window.addEventListener('scroll', this.handleScroll);
      }
    });
    if (swipeToScroll) {
      this.touchHandler = new TouchHandler();
      this.touchHandler.setInputs();
      this.touchHandler.swipeActions.south = () => {
        let okayToScroll = true;
        const sectionElement = this.state.sections[this.state.phase].ref.current;
        const sectionHeight = sectionElement.offsetHeight;
        const sectionScrollHeight = sectionElement.scrollHeight;
        const scrollable = sectionScrollHeight !== sectionHeight;
        if (scrollable) {
          const sectionScrolled = sectionElement.scrollTop;
          if (sectionScrolled !== 0) {
            okayToScroll = false;
          }
        }
        if (okayToScroll && !this.state.menuOn) {
          this.changePhase(this.state.phase - 1)
        } else {
          // this.handleHamburgerClick();
        }
      }
      this.touchHandler.swipeActions.north = () => {
        let okayToScroll = true;
        const sectionElement = this.state.sections[this.state.phase].ref.current;
        const sectionHeight = sectionElement.offsetHeight;
        const sectionScrollHeight = sectionElement.scrollHeight;
        const scrollable = sectionScrollHeight !== sectionHeight;
        if (scrollable) {
          const sectionScrolled = sectionElement.scrollTop;
          if (sectionScrolled < (sectionScrollHeight - sectionHeight - 1)) {
            okayToScroll = false;
          }         
        }
        if (okayToScroll && !this.state.menuOn) {
          this.changePhase(this.state.phase + 1)
        } else {
          // this.handleHamburgerClick();
        }
      }
    }
  }

  handleSwipe = (direction) => {
    let okayToScroll = true;
    const sectionElement = this.state.sections[this.state.phase].ref.current;
    const sectionHeight = sectionElement.offsetHeight;
    const sectionScrollHeight = sectionElement.scrollHeight;
    const scrollable = sectionScrollHeight !== sectionHeight;
    if (scrollable) {
      const sectionScrolled = sectionElement.scrollTop;
      if (direction === 'south') {
        if (sectionScrolled !== 0) {
          okayToScroll = false;
        }
      } else if (direction === 'north') {
        if (sectionScrolled < (sectionScrollHeight - sectionHeight)) {
          okayToScroll = false;
        }
      }
    }
    okayToScroll = true;
    if (okayToScroll && !this.state.menuOn) {
      this.changePhase(this.state.phase - 1)
    } else {
      // this.handleHamburgerClick();
    }
  }

  fillFromDB = async () => {
    console.log(('filling from DB..................'))
    let response = await fetch('content.json');
    let contentObj = await response.json();
    console.log('got contentObj', contentObj);
    let niceNewData = contentObj;
    let newSections = contentObj.sections;
    newSections.forEach((section, i) => {
      console.log('on sec', section);
      section.ref = React.createRef();
      section.slides.forEach((slide, j) => {
        for (let imageType in slide.images) {
          let newImageEntry = require('./assets/' + slide.images[imageType]);          
          // slide.images[imageType] = this.state.sections[i].centerImages[j];
          slide.images[imageType] = newImageEntry;
        }
      });
    });
    console.warn('setting state.sections to', newSections);

    this.setState({
      sections: newSections,
      faqs: niceNewData.faqs,
    }, () => {
      this.setState({ ready: true });
    });
    // if (this.state.editMode) {
    //   this.setState({
    //     justRefreshed: false
    //   });
    // }

    // axios({
    //   method: 'get',
    //   url: `https://api.eggborne.com/wagsworth/getmaterial.php`,
    //   headers: {
    //     'Content-type': 'application/x-www-form-urlencoded'
    //   }
    // }).then((response) => {
    //   response = response.data[0];
    //   console.log('oooooooooooooooooooooooooooooooooooooooooooooooo')
    //   console.log('got', response.faqs)
    //   console.log('oooooooooooooooooooooooooooooooooooooooooooooooo')
    //   let niceNewData = {
    //     id: parseInt(response.id),
    //     sections: JSON.parse(response.sections),
    //     faqs: response.faqs ? JSON.parse(response.faqs) : '',
    //     fonts: JSON.parse(response.fonts)
    //   }
    //   console.log('nicenew', niceNewData);

    //   let oldTitle = getComputedStyle(document.documentElement) .getPropertyValue('--title-font');
    //   let oldMain = getComputedStyle(document.documentElement) .getPropertyValue('--main-font');
    //   let oldTitleSize = getComputedStyle(document.documentElement) .getPropertyValue('--title-font-size');
    //   let oldMainSize = getComputedStyle(document.documentElement) .getPropertyValue('--main-font-size');

    //   if (niceNewData.fonts.mainFont.fontFamily !== oldMain || niceNewData.fonts.titleFont.fontFamily !== oldTitle) {
    //     WebFont.load({
    //       google: {
    //         families: [niceNewData.fonts.mainFont.fontFamily, niceNewData.fonts.titleFont.fontFamily]
    //       }
    //     });
    //     document.documentElement.style.setProperty('--main-font', niceNewData.fonts.mainFont.fontFamily);
    //     document.documentElement.style.setProperty('--title-font', niceNewData.fonts.titleFont.fontFamily);
    //   }
    //   if (niceNewData.fonts.mainFont.fontSize !== oldMainSize || niceNewData.fonts.titleFont.fontSize !== oldTitleSize) {
    //     document.documentElement.style.setProperty('--main-font-size', niceNewData.fonts.mainFont.fontSize);
    //     document.documentElement.style.setProperty('--title-font-size', niceNewData.fonts.titleFont.fontSize);
    //   }
    //   // setCurrentMaterial(niceNewData);
      
    //   // let newSections = [...this.state.sections].slice(1, this.state.sections.length);
    //   document.documentElement.style.setProperty('--header-color', niceNewData.sections[0].style.backgroundColor);
    //   document.documentElement.style.setProperty('--header-text-color', niceNewData.sections[0].style.color);
    //   console.warn('cocks header bgcolor is', niceNewData.sections[0].style.backgroundColor)
    //   console.warn('cocks header color is', niceNewData.sections[0].style.color)
    //   let newSections = [...this.state.sections];
    //   newSections.map((sec, i, arr) => {
    //     // if (i > 0) {
    //       // console.log('sec', sec)
    //       let newAttr = niceNewData.sections[i];
    //       // console.log('newAttr', newAttr)
    //       arr[i].title = newAttr.title;
    //       arr[i].headline = newAttr.headline;
    //       arr[i].upperText = newAttr.upperText;
    //       arr[i].lowerText = newAttr.lowerText;
    //       arr[i].fancyBorder = newAttr.fancyBorder;
    //       arr[i].style = newAttr.style;
    //       arr[i].color = newAttr.color;
    //       arr[i].backgroundColor = newAttr.backgroundColor;

    //       arr[i].legend = newAttr.legend;
    //       arr[i].blackLogo = newAttr.blackLogo;
    //       // document.documentElement.style.setProperty(`--background-color-${i}`, 'red')
    //       // document.documentElement.style.setProperty(`--text-color-${i}`, newAttr.style.color)
    //       // }
    //     });
    //   console.warn('setting state.sections to', newSections);
    //   // console.warn('setting state.faqs to', niceNewData.faqs);

    //   headline2 = newSections[0].legend || getLine(8, 0, true)
    //   if (newSections[0].blackLogo !== blackLogo) {
    //     let newColor = newSections[0].blackLogo ? 'black' : 'white';
    //     changeLogoColor(newColor);
    //   }

    //   this.setState({
    //     sections: newSections,
    //     faqs: niceNewData.faqs,
    //   });
    //   if (this.state.editMode) {
    //     this.setState({
    //       justRefreshed: false
    //     });
    //   }
    // });
  }

  fillDummyText = (newPhase) => {
    if (!newPhase) {
      // headline1 = getLine(4, 0, true);
      if (!this.state.sections[0].legend) {
        headline2 = getLine(6, 0, true);
      }
    } else if (newPhase === 1) {
      textItems.headlines[newPhase] = getLine(4, 0, true);
      textItems.paragraphs[newPhase] = getLine(16);
    } else if (newPhase === 2) {
      textItems.headlines[newPhase] = getLine(5, 0, true);
      textItems.paragraphs[newPhase] = getLine(24) + ' ' + getLine(24);
    } else if (newPhase === 3) {
      textItems.headlines[newPhase] = getLine(6, 0, true);
      textItems.paragraphs[newPhase] = getLine(21, 12);
    } else if (newPhase === 4) {
      // textItems.headlines[newPhase] = getLine(8, 0, true);
      // textItems.paragraphs[newPhase] = getLine(20, 12);
      textItems.headlines[newPhase] = getSelfStatement(20, true)
      textItems.paragraphs[newPhase] = getSelfStatement();
    } else if (newPhase === 5) {
      textItems.headlines[newPhase] = getLine(5, 0, true);
      textItems.paragraphs[newPhase] = getLine(40, 12);
      
    } else if (newPhase === 6) {
      textItems.headlines[newPhase] = getLine(4, 0, true);
      // textItems.paragraphs[newPhase] =  getLine(20, 12);
    }
  }

  componentDidMount = () => {
    if (okForPublic) {
      this.fillFromDB();
      
      setTimeout(() => {
        this.setState({
          lazyLoad1: true
        });
        // console.big('LAZY 1 ' + (window.performance.now() - initialTime), 'orange')
      }, 600);
      setTimeout(() => {
        this.setState({
          lazyLoad2: true
        });
        // console.big('LAZY 2 ' + (window.performance.now() - initialTime), 'yellow')
      }, 1200);
      setTimeout(() => {
        this.setState({
          lazyLoad3: true
        });
        // console.big('LAZY 3 ' + (window.performance.now() - initialTime), 'pink')
      }, 3000);
      
    } else {
      headline2 = `coming soon...`;
    }
  };

  changePhase = (newPhase, instant) => {
    let currentTransit = { ...this.state.inTransit };
    if (newPhase >= 0 && newPhase < this.state.sections.length && currentTransit.to === null) {      
      const currentPhase = this.state.phase;      
      currentTransit.from = currentPhase;
      currentTransit.to = newPhase;
      console.warn('--- filling ----')
      // this.fillDummyText(newPhase);
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
    let collapsed = this.state.phase > 0 || this.state.menuOn;
    let sectionCount = this.state.sections.length;
    return (
      <MainContainer>
        <Header
          logoPieces={{
            dogHeadLogo: dogHeadLogo,
            monocleLogo: monocleLogo,
            wagsworthLogo: wagsworthLogo,
            groomingLogo: groomingLogo,
          }}
          onHamburgerClick={this.handleHamburgerClick}
          onClickLogo={this.handleClickLogo}
          phase={this.state.phase}
          lastPhase={this.state.lastPhase}
          inTransit={this.state.inTransit}
          menuOn={this.state.menuOn}
          instantMode={this.state.instantMode}
          landscape={landscape}
          landed={this.state.landed}
          collapsed={collapsed}
        />
        {this.state.ready && <SectionScrollContainer fancyBorder={this.state.sections[this.state.phase].fancyBorder} allLoaded={this.state.lazyLoad3} animating={!this.state.instantMode} phase={this.state.phase} moving={this.state.inTransit}>
          <IntroSection phase={this.state.phase} index={0} lastPhase={this.state.lastPhase} inTransit={this.state.inTransit} instantMode={this.state.instantMode} entering={this.state.inTransit.to === 0} leaving={this.state.inTransit.from === 0} ref={this.state.sections[0].ref} landed={this.state.landed && this.state.phase === 0}>
            <div></div>
            <IntroMessage landed={this.state.landed && this.state.phase === 0} instantMode={this.lastPhase !== 1}>
              <div className='title-marquee'>{this.state.sections[this.state.phase].headline}</div>
              <div style={{ color: this.state.sections[0].color, fontSize: this.state.sections[0].fontSize }} className='secondary-marquee'>
                {/* {this.state.sections[this.state.phase].legend} */}
              </div>
            </IntroMessage>
            {!okForPublic && 
            <SocialIcons showing={true}>
              FOLLOW US
              <div className='social-icon-row'>
                <a href='https://www.facebook.com/Wagsworth-Grooming-367796550610944' target='blank'><img id='fb' src={facebookIcon} /></a>
                <a href='https://instagram.com/wagsworths' target='blank'><img id='insta' src={instagramIcon} /></a>
                <a href='https://twitter.com/wagsworths' target='blank'><img id='twit' src={twittericon} /></a>
                <a href='https://pinterest.com/wagsworths' target='blank'><img id='pint' src={pinteresticon} /></a>
              </div>
            </SocialIcons>
            }
            <BottomPanel phase={this.state.phase} sections={sectionCount} landed={this.state.phase === 0} entering={this.state.inTransit.to === 0} leaving={this.state.inTransit.from === 0}>
              <DownArrow landed={true} {...{ [window.CLICK_METHOD]: () => this.changePhase(1) }} />
            </BottomPanel>
          </IntroSection>
          <Suspense fallback={<div></div>}>
              {this.state.sections.map((section, i) => {
                const ind = i;
                if (okForPublic && this.state.ready && this.state.sections.length && i > 0) {
                  return (
                    <ScrollPanel
                      key={section.title + i}
                      title={section.title}
                      faq={i === 3}
                      type={section.type}
                      index={ind}
                      landed={this.state.phase === ind}
                      style={section.style}
                      pricedServices={this.state.content}
                      slides={section.slides}
                      centerImages={section.centerImages}
                      headline={section.headline}
                      faqs={[...this.state.faqs]}
                      lowerText={section.lowerText}
                      phaseTitles={Object.values(this.state.sections).map(secData => secData = secData.title)}
                      phase={this.state.phase}
                      lastPhase={this.state.lastPhase}
                      nextSectionTitle={this.state.sections[i + 1] ? this.state.sections[i + 1].title : null}
                      sectionData={this.state.sections[i]}
                      onClickNextPhase={() => this.changePhase(ind + 1)}
                    />
                    );
                  }
                  // }
                })}
                </Suspense>
              <Footer showing='true' />
          }
        </SectionScrollContainer>}
        {<Suspense fallback={<></>}>
          <Menu
            sections={[...this.state.sections].slice(1, this.state.sections.length)} // no button for uppermost title section
            onNavItemClick={this.handleNavItemClick}
            onClickMenuContainer={this.handleHamburgerClick}
            phase={this.state.phase}
            showing={this.state.menuOn}
            landscape={landscape} />
          <Hamburger onHamburgerClick={this.handleHamburgerClick} showing={!landscape} landed={this.state.landed} menuOn={this.state.menuOn} />
        </Suspense>}
        <EditIndicator editMode={this.state.editMode}>
          EDIT MODE
        </EditIndicator>
      </MainContainer>
    );
  }
}

export default App;
// sect = JSON.parse([{"title":"intro","legend":"Quality velvet donkey balls","style":{"color":"#fcfcfc","backgroundColor":"#7985a3"}},{"title":"Section 1","headline":"","lowerText":"","fancyBorder":false,"style":{"titleFont":"Berkshire Swash","mainFont":"Open Sans","color":"#160a24","backgroundColor":"#cca674"}},{"title":"F.A.Q.","headline":"Frequently Asked Questions","lowerText":"","fancyBorder":true,"style":{"titleFont":"Berkshire Swash","mainFont":"Open Sans","color":"#fcfcfc","backgroundColor":"#7985a3"}},{"title":"About Me","headline":"I have a brass waterbed","lowerText":"","fancyBorder":false,"style":{"titleFont":"Berkshire Swash","mainFont":"Open Sans","color":"#a9e8eb","backgroundColor":"#383634"}},{"title":"End Section","headline":"","lowerText":"","fancyBorder":false,"style":{"titleFont":"Berkshire Swash","mainFont":"Open Sans","color":"#282828","backgroundColor":"#ddf0e4"}},{"title":"End Section","headline":"","lowerText":"","fancyBorder":false,"style":{"titleFont":"Berkshire Swash","mainFont":"Open Sans","color":"#edcdad","backgroundColor":"#1e2b52"}},])
