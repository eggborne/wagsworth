import React, { createRef, Suspense } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from 'styled-components/macro';
// import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import { TouchHandler } from './scripts/control';
import Hamburger from './components/Hamburger';
import ImageCarousel from './components/ImageCarousel';
// import ScrollPanel from './components/ScrollPanel';
// import FilledScrollPanel from './components/FilledScrollPanel';
import Footer from './components/Footer';
import { generator, randomInt, getQuote } from './scripts/quotes.js';
import Menu from './components/Menu';
import axios from 'axios';
const WebFont = require('webfontloader');
const ScrollPanel = React.lazy(() => import('./components/ScrollPanel'));
const FilledScrollPanel = React.lazy(() => import('./components/FilledScrollPanel'));
// const Menu = React.lazy(() => import('./components/Menu'));

document.title = 'Wagsworth Grooming | Professional Dog Grooming in Tualatin, Oregon';
window.TEST_MODE = process.env.NODE_ENV === 'development';

window.TEST_MODE = false;

// 'signed in' as guest from CMS window
window.GUEST_MODE = window.location.href.indexOf('Guest-') > -1 || window.location.search.indexOf('Guest-') > -1;

// is Susan editing window from CMS
window.STAGING_MODE = window.location.href.indexOf('eggborne.com/wag') > -1 || window.location.hostname.indexOf('eggborne.com/wag') > -1;

// determined later by checking for token in URL
window.EDIT_MODE = false;

window.FILL_FIELDS = (window.location.href.indexOf('fancy') > -1 || window.location.hostname.indexOf('fancy') > -1);

if (window.GUEST_MODE || window.FILL_FIELDS) {
  document.title = 'Fancy Website';
} else if (window.STAGING_MODE) {
  document.title = 'STAGING AREA | NOT LIVE';
} else if (window.location.href.indexOf('wagsworthgrooming.com') > -1 || window.location.hostname.indexOf('wagsworthgrooming.com') > -1) {
  window.LIVE = true;
}



let editOrigin = window.TEST_MODE ? 'http://localhost:3001' : 'cms.eggborne.com';
let lastDefaultWheelAction = 0;
let editorData;

const fillSection = (sectionIndex, newSections) => {
  generator.tempUsedQuotes.length = 0;
  if (sectionIndex === 'titles') {
    newSections.forEach(sec => {
      console.log('sec', sec)
      let newQuote = getQuote({
        minChars: 0,
        maxChars: 22,
        maxWords: 5,
        noEndPunctuation: true,
        capitalize: true
      }, true);
      sec.title = newQuote;
    })
  }
  if (sectionIndex === 0) {
    let newQuote = getQuote({
      minChars: 0,
      maxChars: 84,
      minWords: 0,
      maxWords: 6,
      noEndPeriod: true,
    }, true);
    newSections[0].headline = newQuote;
  }
  if (sectionIndex === 1) {
    let cardHeadline0 = getQuote({
      maxWords: 4,
      noEndPunctuation: true,
      capitalize: true
    }, true);
    let cardHeadline1 = getQuote({
      maxWords: 4,
      noEndPunctuation: true,
      capitalize: true
    }, true);
    newSections[1].slides[0].headline = cardHeadline0;
    newSections[1].slides[1].headline = cardHeadline1;
    let cardText0 = [
      getQuote({ minChars: 16 }) + ' ' + getQuote({ minChars: 3, maxChars: 200 }) + ' ' + getQuote({ minChars: 3, maxChars: 200 }),
      getQuote({ minChars: 16 }),
    ];
    let cardText1 = [
      getQuote({ minChars: 16 }),
      getQuote({ minChars: 16 }) + ' ' + getQuote({ minChars: 3, maxChars: 100 }),
    ];
    newSections[1].slides[0].lowerText = cardText0;
    newSections[1].slides[1].lowerText = cardText1;

    newSections[1].pricedServices.length = 0;
    let servicesArr = [
      getQuote({ maxWords: 4, noEndPunctuation: true, capitalize: true }),
      getQuote({ maxWords: 4, noEndPunctuation: true, capitalize: true }),
      getQuote({ maxWords: 4, noEndPunctuation: true, capitalize: true })
    ]
    newSections[1].pricedServices = [
      { name: servicesArr[0], price: '$10' },
      { name: servicesArr[1], price: '$15' },
      { name: servicesArr[2], price: '$25' }
    ];
    let serviceNote =
      getQuote({ minChars: 3, maxChars: 100 }) + ' ' + getQuote({ minWords: 16 }) + ' ' + getQuote({ minChars: 3, maxChars: 100 }) + ' ' + getQuote({ minChars: 3, maxChars: 100 });
    newSections[1].note = serviceNote;
  }
  if (sectionIndex === 2) {
    newSections[sectionIndex].slides[0].lowerText = [
      getQuote({ minChars: 16 }),
      getQuote({ minChars: 106 }) + ' ' + getQuote({ maxChars: 2000 }) + ' ' + getQuote({ minChars: 106 }) + ' ' + getQuote({ minChars: 106 }),
      getQuote({ minChars: 16 }),
      getQuote({ minChars: 50 }) + ' ' + getQuote({ minChars: 3, maxChars: 100 }),      
      getQuote({ minChars: 16 }) + ' ' + getQuote({ minChars: 3, maxChars: 100 }) + ' ' + getQuote({ minChars: 26 }),
      getQuote({ minChars: 16 }) + ' ' + getQuote({ minChars: 16 }) + ' ' + getQuote({ minChars: 3, maxChars: 100 })
    ]
  }
  if (sectionIndex === 3) {
    let newFaqs = [
      {
        question: getQuote({ maxWords: 15, question: true }),
        answer: [ getQuote() + ' ' + getQuote() ]
      },
      {
        question: getQuote({ maxWords: 15, question: true }),
        answer: [ getQuote() + ' ' + getQuote() + ' ' + getQuote() + ' ' + getQuote(), getQuote() ]
      },
      {
        question: getQuote({ maxWords: 15, question: true }),
        answer: [ getQuote({ minWords: 18 }) + ' ' + getQuote() ]
      },
      {
        question: getQuote({ maxWords: 15, question: true }),
        answer: [ getQuote() + ' ' + getQuote() + ' ' + getQuote() + ' ' + getQuote() ]
      },
      {
        question: getQuote({ maxWords: 15, question: true }),
        answer: [ getQuote() + ' ' + getQuote() + ' ' + getQuote() + ' ' + getQuote() ]
      },
      {
        question: getQuote({ maxWords: 15, question: true }),
        answer: [ getQuote() + ' ' + getQuote() + ' ' + getQuote() + ' ' + getQuote() ]
      },
      {
        question: getQuote({ maxWords: 15, question: true }),
        answer: [ getQuote({ minWords: 27 }) ]
      }
    ];
    return newFaqs;
  }
  if (sectionIndex === 4) {
    newSections[sectionIndex].legend = 
      getQuote({ minWords: 12 }) + ' ' + getQuote() + ' ' + getQuote()
    let newReqs = [
      {
        headline: getQuote({ maxWords: 6 }),
        bodyText: [getQuote() + ' ' + getQuote() + ' ' + getQuote()]
      },
      {
        headline: getQuote({ maxWords: 7 }),
        bodyText: [getQuote() + ' ' + getQuote() + ' ' + getQuote() + ' ' + getQuote() + ' ' + getQuote() + ' ' + getQuote(), getQuote()]
      },
      {
        headline: getQuote({ maxWords: 5 }),
        bodyText: [getQuote() + ' ' + getQuote() + ' ' + getQuote() + ' ' + getQuote() + ' ' + getQuote() + ' ' + getQuote() + ' ' + getQuote()]
      },
      {
        headline: getQuote({ maxWords: 8 }),
        bodyText: [getQuote() + ' ' + getQuote() + ' ' + getQuote() + ' ' + getQuote() + ' ' + getQuote(), getQuote()]
      },
      {
        headline: getQuote({ maxWords: 13 }),
        bodyText: [getQuote({ minWords: 16 })]
      }
    ];
    return { newSections, newReqs };
  }
  // if (newSections[sectionIndex] && newSections[sectionIndex].bodyText && newSections[sectionIndex].bodyText.length) {
  // }
  return newSections;
}

// window.addEventListener('load', (e) => {
//   // const map = window.USER_MAP.map('user-map').setView([51.505, -0.09], 13);
// });

const scrollableSections = [1, 2, 3, 4];

const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)'
};

const getCookie = cookieName => {
  let cookieObj;
  let name = cookieName + '=';
  let decodedCookie = decodeURIComponent(document.cookie).split('; ');
  cookieObj = decodedCookie.filter(str => str.split('=')[0] === cookieName);
  if (cookieObj.length === 1) {
    cookieObj = JSON.parse(cookieObj[0].split('=')[1]);
  } else {
    cookieObj = undefined;
  }
  console.warn('got cookie', cookieObj)
  return cookieObj;
};

const checkTokenForEditMode = async () => {
  let editing = false;
  let foundToken = window.location.href.indexOf('?') > -1 && window.location.href.split('?')[1].split('=')[1];
  let paramData;
  console.log('loc', window.location.href);
  if (foundToken) {
    paramData = {
      username: window.location.href.split('?')[1].split('=')[1].split('&')[0],
      token: window.location.href.split('?')[1].split('=')[2]
    }
    console.log('param is', paramData)
    if (paramData.username.indexOf('Guest-') > -1) {
      window.GUEST_MODE = true;
      console.error('GUEST MODE ON ------------------------------------')
    }
    let response = await validateToken(paramData.username, paramData.token);
    console.log('validate resp', response.data)
    if (response.data && response.data.id && response.data.username) {
      console.error('token OK, checking for parent...');
      if (window.parent.opener) {
        console.error('has parent, edit mode ON!');
        editing = true;
      }
    } else {
      console.warn('TOKEN IN URL NO GOOD');
    }
  } else {
    console.error('token not found in URL');
  }
  return window.EDIT_MODE = editing && paramData.username;
}

const validateToken = (username, token) => {
  console.log('validating', username, token)
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

let landscape;
let mobile;
let headerHeight;
let sectionHeight;
let wagsworthLogo;
let groomingLogo;
let dogHeadLogo;
let monocleLogo;
let shiftSpeed;



function adjustToSize() {
  // landscape = window.innerWidth > window.innerHeight;
  // window.IS_LANDSCAPE = landscape;
  // headerHeight = window.innerWidth * 0.15;
  // if (landscape) {
  //   headerHeight = window.innerHeight * 0.1;
  // }

  // logoWidth = window.innerWidth >= 1800 ? 1200 : 600;
  // let logoDisplayWidth;
  // if (window.IS_LANDSCAPE) {
  //   logoDisplayWidth = window.innerWidth * 0.62;
  // } else {
  //   logoDisplayWidth = window.innerWidth * 0.72;
  // }
  // sectionHeight = window.innerHeight - headerHeight;

  // document.documentElement.style.setProperty('--logo-width', `${logoDisplayWidth}px`);
  // document.documentElement.style.setProperty('--view-height', `${window.innerHeight}px`);
  // document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  // document.documentElement.style.setProperty('--section-height', `${sectionHeight}px`);

  landscape = window.innerWidth > window.innerHeight;
  mobile = window.innerWidth > window.innerHeight && window.innerWidth < 720;
  window.IS_LANDSCAPE = landscape;
  window.IS_MOBILE = mobile;
  headerHeight = window.innerWidth * 0.15;
  if (landscape) {
    // headerHeight = window.innerHeight * 0.1;
    headerHeight = 64;
  }

  let logoWidth = window.innerWidth >= 1800 ? 1200 : 600;
  let logoDisplayWidth;
  if (window.IS_LANDSCAPE) {
    logoDisplayWidth = headerHeight * 5;
    sectionHeight = window.innerHeight - headerHeight;
  } else {
    logoDisplayWidth = window.innerWidth * 0.72;
    sectionHeight = window.innerHeight - headerHeight;
  }

  let logoPath = `./assets/logosegments`;

  if (window.GUEST_MODE || window.FILL_FIELDS) {
    wagsworthLogo = require(`${logoPath}/fancy1200${imageExt}`);
    groomingLogo = require(`${logoPath}/website1200${imageExt}`);
  } else {
    wagsworthLogo = require(`${logoPath}/wagsworthwhite${logoWidth}${imageExt}`);
    groomingLogo = require(`${logoPath}/groomingwhite${logoWidth}${imageExt}`);
    dogHeadLogo = require(`${logoPath}/dogheadwhite${logoWidth}${imageExt}`);
    monocleLogo = require(`${logoPath}/monocleblack${logoWidth}${imageExt}`);
  }

  document.documentElement.style.setProperty('--logo-width', `${logoDisplayWidth}px`);
  document.documentElement.style.setProperty('--view-height', `${window.innerHeight}px`);
  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  document.documentElement.style.setProperty('--section-height', `${sectionHeight}px`);

  shiftSpeed = 420;
  document.documentElement.style.setProperty('--shift-speed', `${shiftSpeed}ms`);
}

adjustToSize();

// let landscape = window.innerWidth > window.innerHeight;
// window.IS_LANDSCAPE = landscape;
// let headerHeight = window.innerWidth * 0.15;
// if (landscape) {
//   headerHeight = window.innerHeight * 0.1;
// }

// let logoWidth = window.innerWidth >= 1800 ? 1200 : 600;
// let logoDisplayWidth;
// if (window.IS_LANDSCAPE) {
//   logoDisplayWidth = window.innerHeight * 0.62;
// } else {
//   logoDisplayWidth = window.innerWidth * 0.72;
// }
// let sectionHeight = window.innerHeight - headerHeight;

// let blackLogo = false;
// let logoPath = `./assets/logosegments${blackLogo ? '/black' : ''}`;
// let wagsworthLogo;
// let groomingLogo;
// if (!window.GUEST_MODE) {
//   wagsworthLogo = require(`${logoPath}/wagsworthwhite${logoWidth}${imageExt}`);
//   groomingLogo = require(`${logoPath}/groomingwhite${logoWidth}${imageExt}`);
// } else {
//   wagsworthLogo = require(`${logoPath}/fancy${logoWidth}${imageExt}`);
//   groomingLogo = require(`${logoPath}/website${logoWidth}${imageExt}`);  
// }
// let dogHeadLogo = require(`${logoPath}/dogheadwhite${logoWidth}${imageExt}`);
// let monocleLogo = require(`${logoPath}/monocleblack${logoWidth}${imageExt}`);

// document.documentElement.style.setProperty('--logo-width', `${logoDisplayWidth}px`);
// document.documentElement.style.setProperty('--view-height', `${window.innerHeight}px`);
// document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
// document.documentElement.style.setProperty('--section-height', `${sectionHeight}px`);

// let shiftSpeed = 420;
// document.documentElement.style.setProperty('--shift-speed', `${shiftSpeed}ms`);

// const facebookIcon = require(`./assets/icons/facebookicon.png`);
// const instagramIcon = require(`./assets/icons/instagramicon.png`);
// const twittericon = require(`./assets/icons/twittericon.png`);
// const pinteresticon = require(`./assets/icons/pinteresticon.png`);


const MainContainer = styled.div`
  max-height: var(--view-height);
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
  /* box-sizing: border-box; */
  --bottom-panel-height: calc(var(--header-height) * 0.2);
  --portrait-border-width: calc(var(--header-height) * var(--border-image-size));
  --landscape-border-width: calc(var(--header-height) * var(--border-image-size) * 1.25);
  --actual-border-width: ${window.IS_LANDSCAPE ? 'var(--landscape-border-width)' : 'var(--portrait-border-width)'};
  --section-header-height: calc(var(--actual-border-width) / 1.5);
  --section-footer-height: calc(var(--actual-border-width) / 1.5);
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  /* justify-content: space-between; */
  transform: translateY(-${props => sectionHeight * props.phase}px);
  will-change: transform;
  opacity: ${props => (props.menuOn ? 0 : 1)};
  /* position: absolute; */
  /* max-height: calc(var(--view-height) - var(--header-height)); */
  /* margin-bottom: var(--header-height); */
  /* top: var(--header-height); */

  ${props => props.animating && 'transition: transform var(--shift-speed) ease, opacity var(--shift-speed) ease'};

  @media screen and (orientation: landscape) {
    --section-header-height: calc(var(--actual-border-width) / 2);
    /* --section-footer-height: calc(var(--actual-border-width) / 2); */
  }
`;
const IntroSection = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  grid-template-columns: 1fr;
  align-items: center;
  font-size: var(--main-font-size);
  font-family: var(--title-font);
  border: 0;
  min-height: var(--view-height);
  max-height: var(--view-height);
  ${props => props.leaving && 'opacity: 0;'}
  padding-top: calc(var(--header-height) * 4.25);
  
  @media screen and (orientation: landscape) {
    box-sizing: border-box;
    padding-top: calc(var(--header-height) * 3);
    padding-bottom: var(--footer-height);    
    /* grid-template-rows: calc(var(--view-height) - var(--header-height) * 4) 1fr; */
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  & > .title-marquee {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
    color: var(--header-text-color);
    /* text-shadow: 1px 1px 1px #00000022, -1px 1px 1px #00000022, 1px -1px 1px #00000022, -1px -1px 1px #00000022; */

    ${props => props.landed && `
      animation: pulse-text-wide infinite 5s ease;
      animation-direction: alternate-reverse;
    `}
    font-size: 1.25rem;
    opacity: ${props => (props.landed ? '1' : '0')};
    /* transform: ${props => (props.landed ? 'none' : 'translateX(-4vmin)')}; */
    transform: ${props => (props.landed ? 'none' : 'scale(1.2)')};
    transition: transform 1200ms ease, opacity 1200ms ease;
    transition-delay: ${props => props.landed ? 'var(--shift-speed)' : '0ms'};

    /* ${props => props.instantMode && `transition-delay: 0ms;`} */
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
    ${props =>
      props.landed &&
      `animation: pulse-text-wide infinite 5s ease;
      animation-direction: alternate-reverse;`}
    ${props => props.instantMode && `transition-delay: 0ms;`}
  }
`;
const BottomPanel = styled.div`
  /* position: absolute; */
  bottom: 0;
  width: 100vw;
  height: calc(var(--header-height) * 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.landed) ? 1 : 0};
  transition: opacity 600ms ease;
    /* z-index: 6; */
  ${props => props.entering ?
    `transition-delay: calc(var(--shift-speed))`
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
  border-left: 2rem solid rgba(255,255,255,0);
  border-right: 2rem solid rgba(255,255,255,0);
  opacity: ${props => props.landed ? 0.86 : 0};
  transition: opacity 1000ms ease;
  transition-delay: 1000ms;
  /* z-index: 20; */
  outline: 0 !important;
  ${props => !props.landed &&
    `animation-play-state: paused !important;`
  }
`;
export const DownArrow = styled(Arrow)`
  position: relative;
  border-top: 1.8rem solid var(--arrow-color);
  outline: 0 !important;
  animation: bob infinite 800ms linear alternate;
  filter: drop-shadow(0 0 1px #000000);
  overflow: visible;
  cursor: pointer;
  /* opacity: ${props => props.landed ? 1 : 0}; */
  & ::before {
    width: max-content;
    font-size: 1rem;
    height: 1rem;
    position: absolute;
    color: #eee;
    content: "${props => props.label}";
    transform: translate(-50%, -100%);
    top: -0.7rem;
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
  pointer-events: none;
  font-weight: bold;
  font-family: 'Open Sans', sans-serif;
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
  /* font-size: calc(var(--header-height) / 8); */
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
    animation-play-state: ${props => (props.showing) ? 'playing' : 'paused'}
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

let touchHandler

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
      mapLoaded: false,
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
      saveStatus: undefined,
      galleryPhotos: []
    };    
    // let scissors;
    window.addEventListener('load', event => {      
      this.setState({
        landed: true
      });
      // scissors = require(`./assets/scissors${imageExt}`);
      if (swipeToScroll) {
        window.addEventListener('wheel', event => {
          if (!event.ctrlKey && this.state.sections[1]) {          
            const sectionElement = this.state.sections[this.state.phase].ref.current;
            const sectionHeight = sectionElement.offsetHeight;
            const sectionScrollHeight = sectionElement.scrollHeight;
            const scrollDirection = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;
            const scrollPosition = sectionElement.scrollTop;                         
            const scrollable = sectionScrollHeight !== sectionHeight && (
              (scrollDirection < 0 && scrollPosition > 0) ||
              (scrollDirection > 0 && scrollPosition < (sectionScrollHeight - sectionHeight))
            );
            if (!scrollable) {
              event.preventDefault();
              if (this.state.inTransit.to === null && !(sectionScrollHeight !== sectionHeight && Date.now() - lastDefaultWheelAction < 300)) {
                let newPhase = this.state.phase + scrollDirection;
                this.changePhase(newPhase);
              }
            } else {
              lastDefaultWheelAction = Date.now();
            }
          }
        }, { passive: false });
        window.addEventListener("keydown", event => {
          if (!scrollableSections.includes(this.state.phase) && event.code === 'ArrowDown') {
            event.preventDefault();
            this.changePhase(this.state.phase + 1);
          }
          if (!scrollableSections.includes(this.state.phase) && event.code === 'ArrowUp') {
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
      touchHandler = new TouchHandler();
      let handler = touchHandler;
      handler.swipeActions.south = event => {
        let newPhase = this.state.phase - 1;
        let scrollable = scrollableSections.includes(this.state.phase);
        let atEnd = false;
        if (scrollable) {
          const sectionElement = this.state.sections[this.state.phase].ref.current;
          const sectionScrolled = sectionElement.scrollTop;
          if (sectionScrolled === 0) {
            atEnd = true;
          }
        }
        if ((!scrollable || atEnd) && !this.state.menuOn) {
          this.changePhase(newPhase);
        }
      };
      handler.swipeActions.north = () => {
        let newPhase = this.state.phase + 1;
        let scrollable = scrollableSections.includes(this.state.phase);
        let atEnd = false;
        if (scrollable) {
          const sectionElement = this.state.sections[this.state.phase].ref.current;
          const sectionScrolled = sectionElement.scrollTop;
          if (sectionScrolled >= sectionElement.scrollHeight - sectionHeight - 1) {
            atEnd = true;
          }
        }
        if ((!scrollable || atEnd) && !this.state.menuOn) {
          this.changePhase(newPhase);
        }
      };
    }
  }

  // handleSwipe = (direction) => {
  //   let okayToScroll = true;
  //   const sectionElement = this.state.sections[this.state.phase].ref.current;
  //   const sectionHeight = sectionElement.offsetHeight;
  //   const sectionScrollHeight = sectionElement.scrollHeight;
  //   const scrollable = sectionScrollHeight !== sectionHeight;
  //   if (scrollable) {
  //     const sectionScrolled = sectionElement.scrollTop;
  //     if (direction === 'south') {
  //       if (sectionScrolled !== 0) {
  //         okayToScroll = false;
  //       }
  //     } else if (direction === 'north') {
  //       if (sectionScrolled < (sectionScrollHeight - sectionHeight)) {
  //         okayToScroll = false;
  //       }
  //     }
  //   }
  //   okayToScroll = true;
  //   if (okayToScroll && !this.state.menuOn) {
  //     this.changePhase(this.state.phase - 1)
  //   } else {
  //     // this.handleHamburgerClick();
  //   }
  // }

  cleanseString = (str) => {
    if (Array.isArray(str)) {
      str = str[0]
    }
    let newStr = str.replace(/\|qq\|/g,"\"" ).replace(/`/g,"'" );
    return newStr;
  };
  getLocalJSON = async (fileName) => {
    let response = await fetch(`${fileName}.json`);
    let contentObj = {
      data: await response.json()
    };
    return contentObj;
    // return true;
  };
  fillFromDB = async (parentContent) => {
    let st = window.performance.now();

    let getType = window.GUEST_MODE ? 'guest' : (window.TEST_MODE || window.FILL_FIELDS) ? 'test' : '';
    if (window.location.href.indexOf('wagsworthgrooming.com') > -1) {
      getType = 'published';
    }
    console.log('GET TYPE', getType)
    let contentObj = parentContent || await axios({
      method: 'get',
      url: `https://cms.eggborne.com/php/get${getType}content.php`,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    });
    let content = contentObj.data;
    console.log('initially got', content)
    if (parentContent && content.content) {
      content = content.content;
    } else {
      for (let entry in content) {
        if (typeof content[entry] === 'string') {
          content[entry] = JSON.parse(content[entry]);
        }
        if (content[entry].bodyText) {
          content[entry].bodyText = JSON.parse(content[entry].bodyText);
        }
      }
    }

    let backgroundUrl = `url('${content.globalStyles.backgroundImageUrl}')`;
    document.documentElement.style.setProperty('--background-image', backgroundUrl);
    
    // for live updating

    console.log('?????? parentContent || window.STAGING_MODE || window.TEST_MODE ????', (parentContent || window.STAGING_MODE || window.TEST_MODE))

    if (parentContent || window.STAGING_MODE || window.TEST_MODE || window.FILL_FIELDS) {
      let backgroundUrl = `url('${content.globalStyles.backgroundImageUrl}')`;
      if (parentContent && content.globalStyles.backgroundImagePreviewUrl !== content.globalStyles.backgroundImageUrl) {
        backgroundUrl = `url('${content.globalStyles.backgroundImagePreviewUrl}')`;
      }
      console.error('settting basckgoerund!!')
      document.documentElement.style.setProperty('--header-color', content.globalStyles.headerColor);
      document.documentElement.style.setProperty('--background-image', backgroundUrl);
      let stretchBg = content.globalStyles.stretchBackground;
      if (!stretchBg) {
        let imageEl = new Image();
        imageEl.src = content.globalStyles.backgroundImageUrl;
        document.body.appendChild(imageEl);
        imageEl.style.margin = 0;
        let backgroundSizeValue;
        imageEl.style.visibility = 'hidden';
        imageEl.addEventListener('load', () => {
          // imageEl.style.width = previewEl.offsetWidth + 'px';
          let rect = imageEl.getBoundingClientRect();
          const imageAspectRatio = rect.width / rect.height;
          const windowAspectRatio = window.innerWidth / window.innerHeight;
          let fill;
          if (!window.IS_LANDSCAPE) {
            if (imageAspectRatio > windowAspectRatio) {
              // image is taller
              fill = 'height';
            } else {
              fill = 'width';
            }
          } else {
            if (imageAspectRatio > windowAspectRatio) {
              // image is taller
              fill = 'height';
            } else {
              fill = 'width';
            }
          }
          let actualBgWidth;
          let actualBgHeight;
          if (fill === 'width') {
            actualBgWidth = content.globalStyles.backgroundImageSize + '%';
            actualBgHeight = 'auto'
          } else {          
            actualBgWidth = 'auto'
            actualBgHeight = content.globalStyles.backgroundImageSize + '%';
          }
          content.globalStyles.backgroundImageWidth = actualBgWidth;
          content.globalStyles.backgroundImageHeight = actualBgHeight;
          document.body.removeChild(imageEl);
          // document.documentElement.style.setProperty('--background-image-size', `${content.globalStyles.backgroundImageSize}`);
          document.documentElement.style.setProperty('--background-image-width', actualBgWidth);
          document.documentElement.style.setProperty('--background-image-height', actualBgHeight);
        });
      } else {
        document.documentElement.style.setProperty('--background-image-size', `100% 100%`);
      }

      document.documentElement.style.setProperty('--background-opacity', content.globalStyles.backgroundOpacity);

      // document.querySelector('meta[name=theme-color]').setAttribute('content', content.globalStyles.headerColor);

      let oldTitle = getComputedStyle(document.documentElement).getPropertyValue('--title-font');
      let oldMain = getComputedStyle(document.documentElement).getPropertyValue('--main-font');
      let oldTitleSize = getComputedStyle(document.documentElement).getPropertyValue('--title-font-size');
      let oldMainSize = getComputedStyle(document.documentElement).getPropertyValue('--main-font-size');

      if (content.globalStyles.mainFont.fontFamily !== oldMain || content.globalStyles.titleFont.fontFamily !== oldTitle) {
        WebFont.load({
          google: {
            families: [content.globalStyles.mainFont.fontFamily, content.globalStyles.titleFont.fontFamily]
          }
        });
        document.documentElement.style.setProperty('--main-font', content.globalStyles.mainFont.fontFamily);
        document.documentElement.style.setProperty('--title-font', content.globalStyles.titleFont.fontFamily);
      }
      if (content.globalStyles.mainFont.fontSize !== oldMainSize || content.globalStyles.titleFont.fontSize !== oldTitleSize) {
        document.documentElement.style.setProperty('--main-font-size', content.globalStyles.mainFont.fontSize + 'rem');
        document.documentElement.style.setProperty('--title-font-size', content.globalStyles.titleFont.fontSize + 'rem');
      }
    }
    

    let niceNewData = content;
    let newSections = content.sections || [];
    if (parentContent) {
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
      });
    } else {
      newSections.forEach((section, i) => {
        section.ref = createRef();
        if (section.slides) {
          section.slides.forEach((slide, j) => {
            slide.lowerText && slide.lowerText.forEach((para, p) => (slide.lowerText[p] = this.cleanseString(para)));
            for (let imageType in slide.images) {
              let newImageEntry = require('./assets/' + slide.images[imageType]);
              slide.images[imageType] = newImageEntry;
            }
          });
        }
      });
    }

    let contactData = newSections.filter(sec => sec.email)[0]
    let email, phone, phoneString, emailName, emailDomain;
    email = contactData.email;
    phone = contactData.phone;
    emailName = contactData.email.split('@')[0];
    emailDomain = contactData.email.split('@')[1];
    phoneString = `(${phone.substr(0, 3)}) ${phone.substr(3, 3)}-${phone.substr(6, 4)}`;
    
    niceNewData.faqs.map((qSet, i) => {
      let newSet = {
        question: this.cleanseString(qSet.question),
        answer: qSet.answer.map(para => para = this.cleanseString(para))
      }
      niceNewData.faqs[i] = newSet;
    });
    niceNewData.requirements.map((qSet, i) => {
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
      niceNewData.requirements[i] = newSet;
    });
    newSections[0].headline = this.cleanseString(newSections[0].headline);
    let reqSection = newSections.filter(sec => sec.type === 'req')[0];
    newSections[newSections.indexOf(reqSection)].legend = this.cleanseString(reqSection.legend);

    console.log('niceNewData after cleaning', niceNewData);

    let socialUrls = niceNewData.socialUrls ||
      ['https://www.facebook.com/Wagsworth-Grooming-367796550610944',
      'https://instagram.com/wagsworths',
      'https://twitter.com/wagsworths',
      'https://pinterest.com/wagsworths'];
    if (window.GUEST_MODE || window.FILL_FIELDS) {
      socialUrls = ['','','','']
    }

    console.log('socialUrls', socialUrls)
    this.setState({
      globalStyles: content.globalStyles,
      sections: newSections,
      faqs: niceNewData.faqs,
      requirements: niceNewData.requirements,
      images: niceNewData.images,
      contactInfo: {
        email,
        phone,
        phoneString,
        emailName,
        emailDomain,
        address: contactData.address
      },
      socialUrls: socialUrls,
      saveStatus: contentObj.data.saveStatus,
    }, () => {
      if (window.FILL_FIELDS) {
        newSections = fillSection(0, [...newSections]);
        newSections = fillSection('titles', [...newSections])
        // let newFaqs = fillSection(3);
        // let newReqs = fillSection(4, [...newSections]);
        // newSections = newReqs.newSections;
        this.setState({
          sections: newSections,
          // faqs: newFaqs,
          // requirements: newReqs.newReqs
        });
      }
      if (!parentContent && !this.state.ready) {
        this.setState({ ready: true });
      }
      document.body.classList.remove('background-pending')
    });
  }

  componentWillMount = async () => {    
    // window.GUEST_MODE = window.STAGING_MODE = window.EDIT_MODE = false;

    await this.fillFromDB();
    touchHandler.setInputs(document.body);
    setTimeout(() => {
      this.setState({
        lazyLoad1: true
      });
    }, 600);
    setTimeout(() => {
      this.setState({
        lazyLoad2: true
      });
    }, 1200);
    setTimeout(() => {
      this.setState({
        lazyLoad3: true
      });
    }, 2500);

    window.addEventListener('resize', e => {
      adjustToSize();
      this.changePhase(this.state.phase, true);
    });
    
  }
  componentDidMount = async () => {    
    await checkTokenForEditMode();

    if (window.EDIT_MODE) {
      window.addEventListener('message', this.receiveMessage, false);
    } else {
      if (!window.GUEST_MODE && !window.STAGING_MODE && !window.TEST_MODE && !window.FILL_FIELDS) {
        console.error('IS LIVE')
        document.documentElement.style.setProperty('--background-image', `url('./assets/background3.jpg')`);
        document.documentElement.style.setProperty('--background-image-width', `auto`);
        document.documentElement.style.setProperty('--background-image-height', `109%`);
        document.documentElement.style.setProperty('--background-image-size', `auto 109% `);
        document.documentElement.style.setProperty('--background-opacity', `1`);
        document.body.classList.remove('background-pending');
      }
    }
  };
  receiveMessage = (event) => {
    console.warn('got event!', event)
    if (window.EDIT_MODE && event.origin.indexOf(editOrigin) > -1) {
      console.warn('fill event --------------!', event)
      this.fillFromDB(event);
    }
  }

  changePhase = (newPhase, instant) => {
    let currentTransit = { ...this.state.inTransit };
    if (newPhase >= 0 && newPhase < this.state.sections.length && currentTransit.to === null) {      
      const currentPhase = this.state.phase;      
      currentTransit.from = currentPhase;
      currentTransit.to = newPhase;
      if (window.FILL_FIELDS) {
        if ((currentPhase !== newPhase)) {
          let newMaterial = fillSection(newPhase, [...this.state.sections]);
          if (newPhase === 3) {
            this.setState({
              faqs: newMaterial
            });   
          } else if (newPhase === 4) {
            console.warn('is on 4', newMaterial)
            this.setState({
              sections: newMaterial.newSections,
              requirements: newMaterial.newReqs
            });   
          } else {
            this.setState({
              sections: newMaterial
            });
          }
        } else {
          
        }
      }
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
        }, shiftSpeed * 2);
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
    let photoSize;
    if (landscape) {
      photoSize = window.innerHeight * 0.4 + 'px';
    } else {
      photoSize = window.innerHeight * 0.4 <= window.innerWidth - (headerHeight * 2) ?
        window.innerHeight * 0.4 + 'px'
        :
        window.innerWidth - (headerHeight * 2) + 'px'
      ;
    }
    document.documentElement.style.setProperty('--image-width', photoSize);
    document.documentElement.style.setProperty('--image-height', photoSize);
    return {
      width: photoSize,
      height: photoSize
    };
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
            groomingLogo: groomingLogo
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
          headerColor={this.state.globalStyles.headerColor}
        />
        {this.state.ready && (
          <SectionScrollContainer
            id='scroll-container'
            menuOn={this.state.menuOn}
            fancyBorder={true}
            animating={!this.state.instantMode}
            phase={this.state.phase}
            moving={this.state.inTransit}
          >
            <IntroSection
              phase={this.state.phase}
              index={0}
              lastPhase={this.state.lastPhase}
              inTransit={this.state.inTransit}
              instantMode={this.state.instantMode}
              entering={this.state.inTransit.to === 0}
              leaving={this.state.inTransit.from === 0}
              ref={this.state.sections[0].ref}
              landed={this.state.landed && this.state.phase === 0}
            >
              <IntroMessage 
                landed={this.state.phase === 0 && this.state.lazyLoad2 && this.state.landed} 
                instantMode={this.state.lastPhase !== 1}
              >
                <div className='title-marquee'>{
                  this.state.sections[this.state.phase].headline
                }</div>
                <ImageCarousel
                  lazyLoaded={this.state.lazyLoad3}
                  touchHandler={touchHandler}
                  titlePhotoSize={this.titlePhotoSize()}
                  imageList={this.state.images.gallery}
                  landed={this.state.lazyLoad2 && this.state.phase === 0}
                  phase={this.state.phase}
                />
              </IntroMessage>
              <BottomPanel 
                phase={this.state.phase} 
                landed={this.state.phase === 0 && this.state.lazyLoad2} 
                entering={this.state.inTransit.to === 0} 
                leaving={this.state.inTransit.from === 0}
              >
                <DownArrow
                  label={this.state.landed ? this.state.sections[1].title : ''} 
                  landed={this.state.ready} 
                  {...{ [window.CLICK_METHOD]: () => this.changePhase(1) }}
                />
              </BottomPanel>
            </IntroSection>
            {this.state.ready &&
              totalSections &&              
              this.state.sections.map(
                (section, i) =>
                  // this.state.ready &&
                  // totalSections &&                 
                  i > 0 && (
                    // && ((Math.abs(i - this.state.lastPhase) <= 1 && Math.abs(this.state.phase - i) <= 1) || (this.state.phase === i))
                    <Suspense key={i} fallback={<></>}>
                      {
                        (window.FILL_FIELDS) ?
                          // i < totalSections - 1 && 
                          <FilledScrollPanel
                            scrollable={scrollableSections.includes(i)}
                            menuOn={this.state.menuOn}
                            key={section.title}
                            title={section.title}
                            faq={i === 3}
                            type={section.type}
                            index={i}
                            landed={this.state.phase === i}
                            mapLoaded={this.state.mapLoaded}
                            setMapLoaded={() => this.setState({ mapLoaded: true })}
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
                            instant={this.state.instantMode}
                            totalSections={totalSections}
                            lastSection={i === totalSections - 1}
                          />
                        :
                        <ScrollPanel
                          scrollable={scrollableSections.includes(i)}
                          menuOn={this.state.menuOn}
                          key={section.title}
                          title={section.title}
                          faq={i === 3}
                          type={section.type}
                          index={i}
                          landed={this.state.phase === i}
                          mapLoaded={this.state.mapLoaded}
                          setMapLoaded={() => this.setState({ mapLoaded: true })}
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
                          instant={this.state.instantMode}
                          totalSections={totalSections}
                          lastSection={i === totalSections - 1}
                        />
                      }
                    </Suspense>
                  )
              )}
          </SectionScrollContainer>
        )}
        {(!window.IS_LANDSCAPE && (this.state.phase === totalSections-1 || this.state.menuOn)) &&
          <Footer socialUrls={this.state.socialUrls} menuOn={this.state.menuOn} pulsing={true} phase={this.state.phase} />
        }
        {/* {(window.GUEST_MODE || window.EDIT_MODE || window.STAGING_MODE) &&  */}
          <>
            <EditIndicator style={{ fontFamily: 'sans-serif', color: window.EDIT_MODE ? '#aaffaa' : '#ffffaa' }}>
              {window.EDIT_MODE ? 
              <div>
                <span style={{color: 'orange'}}>{window.EDIT_MODE.toUpperCase()}</span> LIVE EDITING
              </div>
              // : !window.TEST_MODE ?
              // 'STAGING MODE'
              : <div>
                {((window.EDIT_MODE ? ' edit mode' : '') + (window.STAGING_MODE ? ' staging mode' : '') + (window.GUEST_MODE ? ' guest mode' : '') + (window.TEST_MODE ? ' test mode' : '') + (window.FILL_FIELDS ? ' fill mode' : ''))}
              </div>
          }
            </EditIndicator>
            {this.state.saveStatus === `unsaved` && (
              <EditIndicator id='edit-message' flashing={false}>
                UNSAVED
              </EditIndicator>
            )}
          </>
        {/* } */}
        {window.IS_LANDSCAPE && this.state.socialUrls && <Footer socialUrls={this.state.socialUrls} menuOn={this.state.menuOn} pulsing={true} phase={this.state.phase} />}
        {/* <Suspense fallback={<></>}> */}
          <Menu
            sections={this.state.sections}
            onNavItemClick={this.handleNavItemClick}
            onClickMenuContainer={this.handleHamburgerClick}
            phase={this.state.phase}
            showing={this.state.menuOn}
            landscape={landscape}
          />
        {/* </Suspense> */}
        {this.state.sections[0] && (
          <Hamburger dark={this.state.globalStyles.blackLogo} onHamburgerClick={this.handleHamburgerClick} showing={!landscape} landed={this.state.landed} menuOn={this.state.menuOn} />
        )}
      </MainContainer>
    );
  }
}

export default App;
