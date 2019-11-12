import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { randomInt } from '../scripts/quotes.js';
require('console-green');


const HeaderContainer = styled.header`
  --logo-width: 72vmin;
  position: absolute;
  padding: 2vmin;
  width: 100%;
  min-height: var(--header-height);
  /* height: ${props => props.collapsed ? 'var(--header-height)' : 'auto'}; */
  height: ${props => true ? 'var(--header-height)' : 'auto'};
  font-family: var(--main-font), sans-serif;
  font-size: calc(var(--header-height) / 1.5);
  color: #ddd;
  display: flex;
  flex-direction: column;
  z-index: 3;
  /* transition: background-color var(--shift-speed) ease; */
  ${props => props.showShadow ?
    `box-shadow: var(--header-shadow);
  background-color: var(--header-color);
  `
    :
    `box-shadow: 0;
  background-color: rgba(255,255,255,0);
  `
  }
  @media screen and (orientation: landscape) {
    max-height: var(--header-height);
    /* background-color: var(--header-color) !important; */
  }
  /* outline: 2px solid blue; */
`;
const PhoneNumber = styled.div`
  position: absolute;
  /* right: calc(100vmin - var(--logo-width) - 2vmin); */
  top: calc(var(--header-height) * 0.15);
  right: calc(var(--hamburger-height) + var(--header-height) * 0.15);
  ${props => props.collapsed ?
    `
    // border: 0.25vw solid rgba(255,255,255,0);
    `
    :
    `
    // border: 0.25vw solid #ffffff22;
    // border-radius: 1vw;
    `
  }
  /* border-right: 0; */
  /* white-space: pre; */
  /* padding: 1.5vmin; */
  padding: 0;
  display: grid;
  grid-template-columns: 1fr calc(var(--header-height) / 2.5);
  grid-template-rows: 1fr;
  font-family: var(--main-font) !important;
  font-weight: 1000;
  font-size: calc(var(--header-height) / 5);
  color: var(--action-color);
  opacity: ${props => (props.showing ? '1 !important' : '0')};
  transform-origin: top right;
  transform: ${props => props.collapsed ? 'none' : 'translateY(36vmin) scale(1.5) '};
  transition: transform 400ms ease, opacity 400ms ease !important;
  & a {
    color: var(--action-color);
    text-decoration: ${props => props.collapsed && 'none'};
  }
  z-index: 4;
  & i {
    /* font-size: calc(var(--header-height) / 2.75);
    align-self: center;
    padding: 0;
    margin: 0; */
    /* line-height: 120%; */
  }
  & > div {
    animation: pulse-text-action infinite 2400ms ease;
    animation-direction: alternate;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  & > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-left: 1.5vmin;
    padding-right: 1vmin;
  }
  & > div > img {
    width: 90%;
  }
`;
const EmailLink = styled(PhoneNumber)`
  top: calc(var(--header-height) * 0.55);
  transform: ${props => props.collapsed ? 'none' : 'translateY(42vmin) scale(1.5)'};
  font-size: calc(var(--header-height) / 8);
  transition: transform var(--shift-speed) ease, opacity var(--shift-speed) ease;
  transform-origin: top right;
  & > div {
    animation-direction: alternate-reverse;
  }
`;
const EmailAddress = styled.div`
  
`;
const LogoContainer = styled.div`
  background-color: var(--header-color);
  position: fixed;
  width: var(--logo-width);
  z-index: 4;
  /* transform: translate(10vmin, calc(var(--header-height) * 0.4)); */  
  display: flex;

  ${props => props.pageLoaded ? 
    `transform-origin: top left;`
    :
    `transform-origin: 50% 50%;`
  }

  ${props => props.collapsed ?
    'transform: scale(0.47) translate(0, 0);'
    :
    props => (props.showing ?
      props.pageLoaded ? 
        `transform: scale(1) translate(8vmin, calc(var(--header-height) * 0.4)); opacity: 0.99;`
        :
        `transform: scale(1) translate(8vmin, calc(var(--header-height) * 0.4)); opacity: 0.99;`
      :
      `transform: scale(1.1) translate(8vmin, calc(var(--header-height) * 0.4)); opacity: 0;`
    )
  }
  transition: transform var(--shift-speed) ease, opacity 1000ms ease;
  will-change: transform, opacity;
  @media screen and (orientation: landscape) {
    --logo-width: calc(var(--header-height) * 4);
;  }
`;
const MainLogo = styled.img`
  position: absolute;
  width: var(--logo-width);
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

const phoneIcon = require('../assets/icons/phoneicon.png');
const emailIcon = require('../assets/icons/emailicon.png');

function Header(props) {
  // const dogHeadRef = React.createRef();
  const [dogHeadRef, setDogHeadRef] = useState(React.createRef());
  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
      console.log('setLoaded!')
    }, 600)
  }, []);
  const handleDogClick = () => {
    if (props.menuOn) {
      // this.handleHamburgerClick();
      props.onHamburgerClick();
    } else {
      if (props.phase > 0 || props.menuOn) {
        props.onClickLogo();
      } else {
        // pet the dog
        dogHeadRef.current.style.animationPlayState = 'running';
        setTimeout(() => {
          dogHeadRef.current.style.animationPlayState = 'paused';
        }, 180 * randomInt(1, 3));
      }
    }
  }
  // console.count('Header');
  const showShadow = (props.phase > 1 || (props.phase === 1 && (props.lastPhase >= 2 || (props.lastPhase === 0 && !props.inTransit.to))));
  return (
    <HeaderContainer collapsed={props.collapsed} menuOn={props.menuOn} showShadow={showShadow}>
      <LogoContainer
        pageLoaded ={pageLoaded}
        onClick={handleDogClick}
        showing={props.landed}
        collapsed={props.collapsed}>
        <Dog ref={dogHeadRef}>
          <DogHead src={props.logoPieces.dogHeadLogo} showing={props.landed} collapsed={props.collapsed} />
          <Monocle src={props.logoPieces.monocleLogo} showing={props.landed} collapsed={props.collapsed} />
        </Dog>
        <Wagsworth src={props.logoPieces.wagsworthLogo} showing={props.landed} collapsed={props.collapsed} />
        <Grooming src={props.logoPieces.groomingLogo} showing={props.landed} collapsed={props.collapsed} />
      </LogoContainer>
      <a href='tel:+1-971-284-0998'>
        <PhoneNumber showing={props.landed} collapsed={props.collapsed}>
          <div>(971) 284-0998</div>
          <div><img alt='' src={phoneIcon} /></div>
        </PhoneNumber>
      </a>
      <a href='mailto:booking@wagsworthgrooming.com'>
        <EmailLink showing={props.landed} collapsed={props.collapsed}>
          <EmailAddress>
            booking@wagsworthgrooming.com
          </EmailAddress>
          <div><img src={emailIcon} /></div>
        </EmailLink>
      </a>

    </HeaderContainer>
  );
}
function areEqual(prevProps, nextProps) {
  let equal = prevProps.landed === nextProps.landed
    && prevProps.collapsed === nextProps.collapsed
    && prevProps.phase !== 0
    && nextProps.phase !== 1

  // console.pink('header is', equal);

  return equal;
}
// export default Header;
export default React.memo(Header, areEqual);
