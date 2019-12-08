import React, { createRef, Suspense } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from 'styled-components/macro';
import Header from './components/Header';
import { TouchHandler } from './scripts/control';
import Hamburger from './components/Hamburger';
import ImageCarousel from './components/ImageCarousel';
// import ScrollPanel from './components/ScrollPanel';
import Footer from './components/Footer';
import { randomInt } from './scripts/quotes.js';
// import Menu from './components/Menu';
import axios from 'axios';
const WebFont = require('webfontloader');
const ScrollPanel = React.lazy(() => import('./components/ScrollPanel'));
const Menu = React.lazy(() => import('./components/Menu'));


const okForPublic = true;
let testMode = process.env.NODE_ENV === 'development';
// testMode = false;
let lastDefaultWheelAction = 0;
let editOrigin = testMode ? 'http://localhost:3001' : 'cms.eggborne.com';
let editorData;

const getCookie = cookieName => {
  let cookieObj;
  let name = cookieName + '=';
  console.log('DOCUMENT COOKIE IS ------->', document.cookie)
  let decodedCookie = decodeURIComponent(document.cookie).split('; ');
  console.log('decodedCookie COOKIE IS ------->', decodedCookie)
  cookieObj = decodedCookie.filter(str => str.split('=')[0] === cookieName);
  if (cookieObj.length === 1) {
    cookieObj = JSON.parse(cookieObj[0].split('=')[1]);
  } else {
    cookieObj = undefined;
  }
  console.warn('got cookie', cookieObj)
  return cookieObj;
};

const validateToken = (username, token) => {
  console.log('validating', username)
  return axios({
    method: 'post',
    url: `https://cms.eggborne.com/php/cmsvalidatetoken.php`,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      username: username,
      token: token
    }
  });
};

window.CLICK_METHOD = window.PointerEvent ? 'onPointerDown' : window.TouchEvent ? 'onTouchStart' : 'onClick';

console.error('USING CLICK -------', window.CLICK_METHOD, ' ------------------------');

let swipeToScroll = true;

const imageExt = true ? '.png' : '.webp';

const textItems = {
  headlines: [],
  paragraphs: []
};

function adjustToSize() {
  landscape = window.innerWidth > window.innerHeight;
  window.IS_LANDSCAPE = landscape;
  headerHeight = window.innerWidth * 0.15;
  if (landscape) {
    headerHeight = window.innerHeight * 0.1;
  }

  logoWidth = window.innerWidth >= 1800 ? 1200 : 600;;
  sectionHeight = window.innerHeight - headerHeight;

  // blackLogo = false;
  // logoPath = `./assets/logosegments${blackLogo ? '/black' : ''}`;
  // wagsworthLogo = require(`${logoPath}/wagsworth${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
  // groomingLogo = require(`${logoPath}/grooming${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
  // dogHeadLogo = require(`${logoPath}/doghead${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
  // monocleLogo = require(`${logoPath}/monocle${blackLogo ? 'white' : 'black'}${logoWidth}${imageExt}`);

  document.documentElement.style.setProperty('--view-height', `${window.innerHeight}px`);
  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  document.documentElement.style.setProperty('--section-height', `${sectionHeight}px`);
}

let landscape = window.innerWidth > window.innerHeight;
window.IS_LANDSCAPE = landscape;
let headerHeight = window.innerWidth * 0.15;
if (landscape) {
  headerHeight = window.innerHeight * 0.1;
}

let logoWidth = window.innerWidth >= 1800 ? 1200 : 600;;
let sectionHeight = window.innerHeight - headerHeight;

let blackLogo = false;
let logoPath = `./assets/logosegments${blackLogo ? '/black' : ''}`;
let wagsworthLogo = require(`${logoPath}/wagsworthwhite${logoWidth}${imageExt}`);
let groomingLogo = require(`${logoPath}/groomingwhite${logoWidth}${imageExt}`);
let dogHeadLogo = require(`${logoPath}/dogheadwhite${logoWidth}${imageExt}`);
let monocleLogo = require(`${logoPath}/monocleblack${logoWidth}${imageExt}`);

document.documentElement.style.setProperty('--view-height', `${window.innerHeight}px`);
document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
document.documentElement.style.setProperty('--section-height', `${sectionHeight}px`);

let shiftSpeed = 420;
document.documentElement.style.setProperty('--shift-speed', `${shiftSpeed}ms`);

// function changeLogoColor(newColor) {
//   blackLogo = newColor === 'black';
//   logoPath = `./assets/logosegments${blackLogo ? '/black' : ''}`;
//   wagsworthLogo = require(`${logoPath}/wagsworth${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
//   groomingLogo = require(`${logoPath}/grooming${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
//   dogHeadLogo = require(`${logoPath}/doghead${blackLogo ? 'black' : 'white'}${logoWidth}${imageExt}`);
//   monocleLogo = require(`${logoPath}/monocle${blackLogo ? 'white' : 'black'}${logoWidth}${imageExt}`);
// }
let scissors = undefined;

const titlePicUrl = "https://wagsworthgrooming.com/titlepic.png";

const facebookIcon = require(`./assets/icons/facebookicon.png`);
const instagramIcon = require(`./assets/icons/instagramicon.png`);
const twittericon = require(`./assets/icons/twittericon.png`);
const pinteresticon = require(`./assets/icons/pinteresticon.png`);


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  overscroll-behavior: none;
  
  @media screen and (orientation: landscape) {
    align-items: center;
    max-width: var(--main-width);
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
  padding-top: 64vmin;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr var(--header-height);
  justify-items: center;
  font-size: var(--main-font-size);
  font-family: var(--title-font);
  /* color: #ddd; */
  border: 0;
  background-color: var(--header-color) !important;
  min-height: var(--view-height);
  max-height: var(--view-height);
  z-index: 2;
  /* box-shadow: ${props => (props.phase === 1 && props.inTransit.to === 1 && props.lastPhase === 0) && 'var(--header-shadow)'}; */
  ${props => props.leaving && 'opacity: 0;'}

  @media screen and (orientation: landscape) {
    padding-top: calc(var(--header-height) * 3);
    padding-bottom: var(--footer-height);
  }
`;
// const TitlePhoto = styled.img`
//   width: 60vmin;
//   height: 40vmin;
//   border-radius: var(--card-radius);
//   box-shadow: 0 0.1rem 0.25em #00000066, 0 0px 0 1px #00000066;

//   opacity: ${props => (props.landed ? '1' : '0')};
//   transform: ${props => (props.landed ? 'none' : 'scale(0.9)')};
//   transition: transform 1200ms ease, opacity 1200ms ease;
//   transition-delay: 0ms;


// `;
const IntroMessage = styled.div`
  width: 80vw;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;

  & > div:last-child {
  }
  
  & > .title-marquee {
    flex-grow: 1;
    height: 100%;
    display: ${okForPublic ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    /* line-height: 90%; */
    text-align: center;
    color: var(--header-text-color);
    ${props => props.landed &&
    `animation: pulse-text-wide infinite 5s ease;
      animation-direction: alternate-reverse;`
    }
    font-size: calc(var(--header-height) / 3);
    opacity: ${props => (props.landed ? '1' : '0')};
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
export const DownArrow = styled(Arrow)`
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
    text-shadow:
      1px 1px 1px #00000099,
      -1px 1px 1px #00000099,
      1px -1px 1px #00000099,
      -1px -1px 1px #00000099
    ;
  }
`;
const EditIndicator = styled.div`
  position: fixed;
  width: 100%;
  text-align: center;
  top: 0;
  font-size: 0.75rem;
  color: #aaffaa;
  pointer-events: none;
  font-weight: bold;
  font-family: 'Open Sans' !important;
  z-index: 12;

  &#edit-message {
    top: 1rem;
    color: #f30;
    font-size: calc(var(--header-height) / 3);
    animation-name: wave;
    animation-duration: 500ms;
    animation-play-state: running;
    animation-iteration-count: infinite;
  }
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
    super();
    this.dogHeadContainer = createRef();
    this.state = {
      ready: false,
      sections: [],
      faqs: [],
      requirements: [],
      globalStyles: {},
      phase: 0,
      lastPhase: 0,
      landed: false,
      menuOn: false,
      lastShifted: 0,
      instantMode: false,
      contactInfo: {},
      inTransit: {
        from: null,
        to: null
      },
      lazyLoad1: false,
      lazyLoad2: false,
      lazyLoad3: false,
      saveStatus: undefined
    };    
    
    window.addEventListener('load', event => {
      this.setState({
        landed: true
      });
      scissors = require(`./assets/scissors${imageExt}`);
      if (swipeToScroll) {
        window.addEventListener('wheel', event => {
          if (!event.ctrlKey) {          
            const scrollDirection = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;
            console.warn('wheel');
            const sectionElement = this.state.sections[this.state.phase].ref.current;
            const sectionHeight = sectionElement.offsetHeight;
            const sectionScrollHeight = sectionElement.scrollHeight;
            const scrollPosition = sectionElement.scrollTop;                         
            const scrollable = sectionScrollHeight !== sectionHeight && (
              (scrollDirection < 0 && scrollPosition > 0) ||
              (scrollDirection > 0 && scrollPosition < (sectionScrollHeight - sectionHeight))
            );
            if (!scrollable) {
              // event.preventDefault();
              if (this.state.inTransit.to === null && !(sectionScrollHeight !== sectionHeight && Date.now()-lastDefaultWheelAction < 300)) {
                let newPhase = this.state.phase + scrollDirection;
                this.changePhase(newPhase);
              }
            } else {
              lastDefaultWheelAction = Date.now();
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
      // this.touchHandler.swipeActions.west = () => {
      //   console.warn('suck em balls')
      // } 
      this.touchHandler.swipeActions.south = (event) => {
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

  cleanseString = (str) => {
    console.warn('trying to clean', str)
    let newStr = str.replace(/\|qq\|/g,"\"" ).replace(/`/g,"'" );
    console.warn(newStr);
    return newStr;
  }
  fillFromDB = async (editorContent) => {
    console.log(('filling from DB..................'))
    // let response = await fetch('content.json');
    // let contentObj = await response.json();
    let contentObj = editorContent || await axios({
      method: 'get',
      url: `https://cms.eggborne.com/php/get${testMode ? 'test' : ''}content.php`,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    });
    let content = contentObj.data;
    console.log('contentObj.data.saveStatus', contentObj.data.saveStatus)
    if (editorContent) {      
      content = content.content;
      console.log('we is editor content', content)
    } else {
      console.log('we is DB content', content)
      for (let entry in content) {
        console.log('DOING', JSON.parse(content[entry]))
        // content[entry].replace(/`/, "'");
        // content[entry].replace(/\|qq\|/, "\"");
        content[entry] = JSON.parse(content[entry]);
      }
    }

    console.warn('checking fonts', content.fonts)

    let oldTitle = getComputedStyle(document.documentElement).getPropertyValue('--title-font');
    let oldMain = getComputedStyle(document.documentElement).getPropertyValue('--main-font');
    let oldTitleSize = getComputedStyle(document.documentElement).getPropertyValue('--title-font-size');
    let oldMainSize = getComputedStyle(document.documentElement).getPropertyValue('--main-font-size');

    if (content.fonts.mainFont.fontFamily !== oldMain || content.fonts.titleFont.fontFamily !== oldTitle) {
      WebFont.load({
        google: {
          families: [content.fonts.mainFont.fontFamily, content.fonts.titleFont.fontFamily],
        }
      });
      document.documentElement.style.setProperty('--main-font', content.fonts.mainFont.fontFamily);
      document.documentElement.style.setProperty('--title-font', content.fonts.titleFont.fontFamily);
    }
    if (content.fonts.mainFont.fontSize !== oldMainSize || content.fonts.titleFont.fontSize !== oldTitleSize) {
      document.documentElement.style.setProperty('--main-font-size', content.fonts.mainFont.fontSize + 'rem');
      document.documentElement.style.setProperty('--title-font-size', content.fonts.titleFont.fontSize + 'rem');
    }




    document.documentElement.style.setProperty('--header-color', content.globalStyles.headerColor);
    document.querySelector("meta[name=theme-color]").setAttribute('content', content.globalStyles.headerColor);
    let niceNewData = content;
    let newSections = content.sections;
    if (editorContent) {
      let existingSections = [...this.state.sections];
      newSections.forEach((section, i) => {
        section.ref = existingSections[i].ref;
        if (section.slides) {
          section.slides.forEach((slide, j) => {
            // slide.lowerText && slide.lowerText.forEach((para, p) => slide.lowerText[p] = this.cleanseString(para));
            for (let imageType in slide.images) {
              slide.images[imageType] = existingSections[i].slides[j].images[imageType];
            }
          });
        }
      })
    } else {
      newSections.forEach((section, i) => {
        console.log('on sec', section);
        section.ref = createRef();
        if (section.slides) {
          section.slides.forEach((slide, j) => {
            slide.lowerText && slide.lowerText.forEach((para, p) => slide.lowerText[p] = this.cleanseString(para));
            for (let imageType in slide.images) {
              let newImageEntry = require('./assets/' + slide.images[imageType]);          
              slide.images[imageType] = newImageEntry;
            }
          });
        }
      });
    }

    let contactData = newSections.filter(sec => sec.email)[0]
    let email, phone, emailName, emailDomain, rawPhone;
    email = contactData.email;
    phone = contactData.phone;
    emailName = contactData.email.split('@')[0];
    emailDomain = contactData.email.split('@')[1];
    rawPhone = contactData.phone.replace(/\(/g, "")
    rawPhone = rawPhone.replace(/\)/g, "");
    rawPhone = `${rawPhone.split(' ')[0]}-${rawPhone.split(' ')[1]}`
    console.warn('niceNewData', niceNewData);

    niceNewData.faqs.map((qSet, i) => {
      console.log('fixi saq', qSet.question)
      let newSet = {
        question: this.cleanseString(qSet.question),
        answer: qSet.answer.map(para => para = this.cleanseString(para))
      }
      console.log('fixed to', newSet);
      niceNewData.faqs[i] = newSet;
    });
    niceNewData.requirements.map((qSet, i) => {
      console.log('fixi req', i)
      let newSet = {
        headline: this.cleanseString(qSet.headline),
        bodyText: qSet.bodyText[0].subheadline ? 
        qSet.bodyText.map(subSet => 
          ({
            subheadline: this.cleanseString(subSet.subheadline),
            subtext: subSet.subtext.map(subPara => subPara = this.cleanseString(subPara))
          })
        ) 
        : 
        qSet.bodyText.map(para => para = this.cleanseString(para))
      }
      console.log('fixed to', newSet);
      niceNewData.requirements[i] = newSet;
    });
    niceNewData.sections[0].headline = this.cleanseString(niceNewData.sections[0].headline);

    this.setState({
      globalStyles: content.globalStyles,
      sections: newSections,
      faqs: niceNewData.faqs,
      requirements: niceNewData.requirements,
      contactInfo: {
        email,
        phone,
        emailName,
        emailDomain,
        rawPhone,
        address: contactData.address
      },
      saveStatus: contentObj.data.saveStatus
    }, async () => {
      console.warn('we doin it')
      if (!editorContent && !this.state.ready) {
        this.setState({ ready: true });        
        console.log('LOCATIO', window.location.href)
        // let foundCookie = getCookie('eggborne-cms');
        let foundToken = window.location.href.indexOf('?') > -1 && window.location.href.split('?')[1].split('=')[1];
        console.log('foundToken?', foundToken)
        if (foundToken) {
          let username = testMode ? 'Mike' : 'susan';
          let response = await validateToken(username, foundToken);
          if (response.data) {
            console.warn('IS GOOD', window);
            if (window.parent.opener) {   
            // if (window.location !== window.parent.location) {   
              window.EDIT_MODE = true;              
            }
          } else {
            console.warn('TOKEN NO GOOD')
          }
        } else {
          console.error('cookie not found')
        }
        // this.touchHandler.setInputs();
        // WAG
      }
    });

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
    //   if (window.EDIT_MODE) {
    //     this.setState({
    //       justRefreshed: false
    //     });
    //   }
    // });
  }

  // fillDummyText = (newPhase) => {
  //   if (!newPhase) {
  //     // headline1 = getLine(4, 0, true);
  //     // if (!this.state.sections[0].legend) {
  //     //   headline2 = getLine(6, 0, true);
  //     // }
  //   } else if (newPhase === 1) {
  //     textItems.headlines[newPhase] = getLine(4, 0, true);
  //     textItems.paragraphs[newPhase] = getLine(16);
  //   } else if (newPhase === 2) {
  //     textItems.headlines[newPhase] = getLine(5, 0, true);
  //     textItems.paragraphs[newPhase] = getLine(24) + ' ' + getLine(24);
  //   } else if (newPhase === 3) {
  //     textItems.headlines[newPhase] = getLine(6, 0, true);
  //     textItems.paragraphs[newPhase] = getLine(21, 12);
  //   } else if (newPhase === 4) {
  //     // textItems.headlines[newPhase] = getLine(8, 0, true);
  //     // textItems.paragraphs[newPhase] = getLine(20, 12);
  //     textItems.headlines[newPhase] = getSelfStatement(20, true)
  //     textItems.paragraphs[newPhase] = getSelfStatement();
  //   } else if (newPhase === 5) {
  //     textItems.headlines[newPhase] = getLine(5, 0, true);
  //     textItems.paragraphs[newPhase] = getLine(40, 12);
      
  //   } else if (newPhase === 6) {
  //     textItems.headlines[newPhase] = getLine(4, 0, true);
  //     // textItems.paragraphs[newPhase] =  getLine(20, 12);
  //   }
  // }

  componentWillMount = async () => {
    if (okForPublic) {
      // this.fillFromDB();
      // this.touchHandler.setInputs();
      // WAG 2
      await this.fillFromDB();
      this.touchHandler.setInputs();
      // WAG 2
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
      // headline2 = `coming soon...`;
    }
    window.addEventListener('resize', e => {
      // adjustToSize();
      // this.changePhase(this.state.phase, true);
      // WAG 3
    });
  }
  componentDidMount = () => {
    window.addEventListener("message", this.receiveMessage, false);
  };

  receiveMessage = (event) => {
    console.warn(event.origin);
    console.warn(editOrigin)
    if (window.EDIT_MODE && event.origin.indexOf(editOrigin) > -1) {
      console.warn('000000000000000000000 MESSAGE is', event)
      console.warn('000000000000000000000 message is', event.data);
      this.fillFromDB(event);
    }
  }

  changePhase = (newPhase, instant) => {
    let currentTransit = { ...this.state.inTransit };
    if (newPhase >= 0 && newPhase < this.state.sections.length && currentTransit.to === null) {      
      const currentPhase = this.state.phase;      
      currentTransit.from = currentPhase;
      currentTransit.to = newPhase;
      // requestIdleCallback(() => {
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
      // })
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
  handleClickSmallLogo = (event) => {
    if (this.state.menuOn) {
      this.handleHamburgerClick();
    } else {
      if (this.state.phase > 0 || this.state.menuOn) {
        this.changePhase(0, true);
      } else {
        // pet the dog
        this.dogHeadContainer.current.style.animationPlayState = 'running';
        // this.state.dogHeadContainer.current.style.animationPlayState = 'running';
        setTimeout(() => {
          this.dogHeadContainer.current.style.animationPlayState = 'paused';
          // this.state.dogHeadContainer.current.style.animationPlayState = 'paused';
        }, 180 * randomInt(1, 3));
      }
    }
  }

  titlePhotoSize = () => {
    if (landscape) {
      let titleSpace = window.innerHeight * 0.35;
      console.warn('wid',  (titleSpace * 1.5) + 'px')
      return {
        width: (titleSpace * 1.25) + 'px',
        height: titleSpace + 'px'
      };
    } else {
      return {
        width: window.innerWidth - (headerHeight * 2) + 'px',
        height: 'auto'
      };
    }
  }

  render() {
    let collapsed = this.state.phase > 0 || this.state.menuOn;
    let totalSections = this.state.sections.length;
    let phaseTitles = Object.values(this.state.sections).map(secData => secData = secData.title);
    return (
      <MainContainer>
        <Header
          ready={this.state.ready}
          logoPieces={{
            dogHeadLogo: dogHeadLogo,
            monocleLogo: monocleLogo,
            wagsworthLogo: wagsworthLogo,
            groomingLogo: groomingLogo,
          }}
          blackLogo={this.state.globalStyles.blackLogo}
          onHamburgerClick={this.handleHamburgerClick}
          onClickSmallLogo={this.handleClickSmallLogo}
          phase={this.state.phase}
          lastPhase={this.state.lastPhase}
          inTransit={this.state.inTransit}
          menuOn={this.state.menuOn}
          instantMode={this.state.instantMode}
          landscape={landscape}
          landed={this.state.landed}
          collapsed={collapsed}
          contactInfo={this.state.contactInfo}
        />
        {this.state.ready && <SectionScrollContainer fancyBorder={true} allLoaded={this.state.lazyLoad3} animating={!this.state.instantMode} phase={this.state.phase} moving={this.state.inTransit}>
          <IntroSection phase={this.state.phase} index={0} lastPhase={this.state.lastPhase} inTransit={this.state.inTransit} instantMode={this.state.instantMode} entering={this.state.inTransit.to === 0} leaving={this.state.inTransit.from === 0} ref={this.state.sections[0].ref} landed={this.state.landed && this.state.phase === 0}>
            {/* <div></div> */}
            <IntroMessage landed={this.state.phase === 0} instantMode={this.lastPhase !== 1}>
              <ImageCarousel 
                touchHandler={this.touchHandler}
                titlePhotoSize = {this.titlePhotoSize()}
                images={[
                  'https://wagsworthgrooming.com/titlepic0.jpg',
                  'https://wagsworthgrooming.com/titlepic1.jpg',
                  'https://wagsworthgrooming.com/titlepic2.jpg'
                ]}
                landed={this.state.landed && this.state.phase === 0}
                phase={this.state.phase}
              />
              {/* <TitlePhoto src='http://wagsworthgrooming.com/titlepic.jpg' landed={this.state.landed && this.state.phase === 0}/> */}
              <div className='title-marquee'>{this.state.sections[this.state.phase].headline}</div>        
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
            <BottomPanel phase={this.state.phase} landed={this.state.phase === 0} entering={this.state.inTransit.to === 0} leaving={this.state.inTransit.from === 0}>
              <DownArrow landed={this.state.landed && this.state.phase === 0} {...{ [window.CLICK_METHOD]: () => this.changePhase(1) }} />
            </BottomPanel>
          </IntroSection>
              {this.state.sections.map((section, i) => {
                if (okForPublic && this.state.ready && totalSections && i > 0) {
                  return (
                    <Suspense key={i} fallback={<></>}>
                    <ScrollPanel                   
                      key={section.title}
                      title={section.title}
                      faq={i === 3}
                      type={section.type}
                      index={i}
                      landed={this.state.phase === i}
                      style={section.style}
                      slides={section.slides}
                      centerImages={section.centerImages}
                      headline={section.headline}
                      faqs={section.type === 'faq' && [...this.state.faqs]}
                      requirements={section.type === 'req' && [...this.state.requirements]}
                      lowerText={section.lowerText}
                      phaseTitles={phaseTitles}
                      phase={this.state.phase}
                      nextSectionTitle={this.state.sections[i + 1] ? this.state.sections[i + 1].title : null}
                      sectionData={this.state.sections[i]}
                      onClickNextPhase={() => this.changePhase(i + 1)}
                      contactInfo={this.state.contactInfo}
                      totalSections={totalSections}
                      instant={Math.abs(this.state.lastPhase - this.state.phase) > 1}
                    />
                  </Suspense>
                  );
                }
              })}
              {!window.IS_LANDSCAPE && <Footer />}
        </SectionScrollContainer>}
              {window.EDIT_MODE &&
              <>
                <EditIndicator>
                  LIVE EDITING
                </EditIndicator>
                {(this.state.saveStatus === `unsaved`) && <EditIndicator id='edit-message' flashing={false}>
                  UNSAVED
                </EditIndicator>}
              </>
              }
        {window.IS_LANDSCAPE && <Footer />}
        <Suspense fallback={<></>}>
          <Menu
            sections={[...this.state.sections].slice(1, this.state.sections.length)} // no button for uppermost title section
            onNavItemClick={this.handleNavItemClick}
            onClickMenuContainer={this.handleHamburgerClick}
            phase={this.state.phase}
            showing={this.state.menuOn}
            landscape={landscape} />
        </Suspense>      
        {this.state.sections[0] && <Hamburger dark={this.state.globalStyles.blackLogo} onHamburgerClick={this.handleHamburgerClick} showing={!landscape} landed={this.state.landed} menuOn={this.state.menuOn} />}
      </MainContainer>
    );
  }
}

export default App;
