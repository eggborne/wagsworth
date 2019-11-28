import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { randomInt } from '../scripts/quotes.js';
require('console-green');


const HeaderContainer = styled.header`
  --logo-width: 72vmin;
  position: absolute;
  top: 0;
  padding: 1.5vmin;
  width: var(--main-width);
  min-height: var(--header-height);
  /* height: ${props => props.collapsed ? 'var(--header-height)' : 'auto'}; */
  /* height: ${props => props.ready ? 'var(--header-height)' : 'auto'}; */
  font-family: var(--main-font), sans-serif;
  font-size: calc(var(--header-height) / 1.5);
  color: #ddd;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 3;
  background-color: var(--header-color);
  transition: background-color var(--shift-speed) ease;
  ${props => props.showShadow ?
    `box-shadow: var(--header-shadow);
  background-color: var(--header-color);
  `
    :
    `box-shadow: 0;
  `
  }
  /* background-color: blue; */
  @media screen and (orientation: landscape) {
    max-height: var(--header-height);
    box-shadow: none;
  }
  /* outline: 2px solid blue; */
`;
const PhoneNumber = styled.div`
  position: absolute;
  /* right: calc(100vmin - var(--logo-width) - 2vmin); */
  top: calc(var(--header-height) * 0.15);
  right: calc(var(--hamburger-height) + var(--header-height) * 0.15);
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
  transition: transform 400ms ease, opacity 400ms ease !important;
  & a {
    color: var(--action-color);
    text-decoration: ${props => props.collapsed && 'none'};
  }
  z-index: 12;

  & :not(.collapsed) {
    transform: translateY(36vmin) scale(1.5);
  }
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
    /* background: var(--header-color); */
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
  &.black {
    filter: invert(100%);
  }
  @media screen and (orientation: landscape) {
    right: calc(var(--header-height) * 0.15);
    & :not(.collapsed) {
      transform: none;
    }
  }
`;
const EmailLink = styled(PhoneNumber)`
  top: calc(var(--header-height) * 0.55);
  font-size: calc(var(--header-height) / 8);
  transition: transform var(--shift-speed) ease, opacity var(--shift-speed) ease;
  transform-origin: top right;
  & > div {
    animation-direction: alternate-reverse;
  }
  & :not(.collapsed) {
    transform: translateY(42vmin) scale(1.5);
  }
  @media screen and (orientation: landscape) {
    right: calc(var(--header-height) * 0.15);
    & :not(.collapsed) {
      transform: none;
    }
  }
`;
const EmailAddress = styled.div`
  
`;
const LogoContainer = styled.div`
  width: var(--logo-width);
  z-index: 4;
  display: flex;
  ${props => props.pageLoaded ? 
    `transform-origin: top left;`
    :
    `transform-origin: 50% 50%;`
  }
  ${
    props => (props.showing ?
      props.pageLoaded ? 
        `transform: scale(1) translate(8vmin, calc(var(--header-height) * 0.4)); opacity: 1;`
        :
        `transform: scale(1) translate(8vmin, calc(var(--header-height) * 0.4)); opacity: 1;`
      :
      `transform: scale(1.1) translate(8vmin, calc(var(--header-height) * 0.4)); opacity: 0;`
    )
  }
  transition: transform var(--shift-speed) ease, opacity 1000ms ease;
  will-change: transform, opacity;
  &.collapsed {
    transform: scale(0.47) translate(0, 0);
  }
  &.black > * {
    filter: invert(100%);
  }
  @media screen and (orientation: landscape) {
    --logo-width: calc(var(--header-height) * 6);

    &.collapsed {
    transform: scale(0.35) translate(calc(var(--header-height) * 2), 0);
  }
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

// const TitlePhoto = styled.div`
//   position: absolute;
//   top: 50vmin;
//   background-image: url('http://wagsworthgrooming.com/titlepic.jpg');
//   background-repeat: no-repeat;
//   background-size: 100% 100%;
//   /* background-color: orange; */
//   width: 80vw;
//   height: 60vw;
//   /* height: 70vw; */
//   /* z-index: 100; */
//   outline: 4px solid red;
// `;

const phoneIcon = require('../assets/icons/phoneicon.png');
const emailIcon = require('../assets/icons/emailicon.png');

function Header(props) {
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
      props.onHamburgerClick();
    } else {
      if (props.phase > 0 || props.menuOn) {
        props.onClickSmallLogo();
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
  let logoClass = `${props.collapsed ? 'collapsed' : ''}`;
  let linkClass = `${props.collapsed ? 'collapsed' : ''}`;
  if (props.blackLogo) {
    logoClass += ' black'
    linkClass += ' black';
  }
  const showShadow = 
  !props.menuOn && 
  (props.phase > 1 || (props.phase === 1 && (props.lastPhase >= 2 || (props.lastPhase === 0 && !props.inTransit.to))));
  console.warn("SHAD", showShadow)
  return (
    <HeaderContainer collapsed={props.collapsed} menuOn={props.menuOn} showShadow={showShadow}>
      <LogoContainer
        className={logoClass}
        pageLoaded ={pageLoaded}
        onClick={handleDogClick}
        showing={props.landed}
        collapsed={props.collapsed}>
        <Dog ref={dogHeadRef}>
          <DogHead src={props.logoPieces.dogHeadLogo} showing={props.landed} collapsed={props.collapsed} />
          <Monocle id='monocle' src={props.logoPieces.monocleLogo} showing={props.landed} collapsed={props.collapsed} />
        </Dog>
        <Wagsworth src={props.logoPieces.wagsworthLogo} showing={props.landed} collapsed={props.collapsed} />
        <Grooming src={props.logoPieces.groomingLogo} showing={props.landed} collapsed={props.collapsed} />
      </LogoContainer>
      <a href={`tel:+1-${props.contactInfo.rawPhone}`}>
        <PhoneNumber showing={props.landed} className={linkClass}>
          <div>{props.contactInfo.phone}</div>
          <div><img alt='' src={phoneIcon} /></div>
        </PhoneNumber>
      </a>
      <a href={`mailto:${props.contactInfo.email}`}>
        <EmailLink showing={props.landed} className={linkClass}>
          <EmailAddress>
            {props.contactInfo.email}
          </EmailAddress>
          <div><img src={emailIcon} /></div>
        </EmailLink>
      </a>
      {/* <TitlePhoto /> */}
    </HeaderContainer>
  );
}
function areEqual(prevProps, nextProps) {
  let equal = prevProps.landed === nextProps.landed
    && prevProps.collapsed === nextProps.collapsed
    && prevProps.phase !== 0
    && nextProps.phase !== 1
    && prevProps.menuOn === nextProps.menuOn

  // console.pink('header is', equal);

  return equal;
}
// export default Header;
export default React.memo(Header, areEqual);
