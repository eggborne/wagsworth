import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { randomInt } from '../scripts/quotes.js';
require('console-green');


const HeaderContainer = styled.header`
  --logo-width: 72vmin;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  width: var(--main-width);
  height: var(--header-height);
  min-height: var(--header-height);
  font-family: var(--main-font);
  color: #ddd;
  display: flex;
  /* flex-direction: column; */
  /* justify-content: flex-start; */  
  align-items: center;
  z-index: 2;
  background-color: ${props => (props.phase === 0) ? 'transparent' : '#101010'};
  background-color: ${props => (props.phase === 0) ? 'transparent' : props.headerColor};
  transition: background-color calc(var(--shift-speed) / 2) ease;
  ${props =>
    props.showShadow
      ? `box-shadow: var(--header-shadow);`
      : `box-shadow: 0;`
    }
  @media screen and (orientation: landscape) {
    max-height: var(--header-height);
    box-shadow: none;
  }
`;
const PhoneNumber = styled.div`
  transform: translateX(calc(var(--header-height) * -0.75));
  position: absolute;
  top: 0;
  right: calc(var(--hamburger-height) + var(--header-height) * 0.25);
  display: flex;
  align-items: center;
  height: var(--header-height);
  font-weight: bold;
  color: var(--action-color);
  opacity: ${props => (props.showing ? '1 !important' : '0')};
  transform-origin: top right;
  transition: transform var(--shift-speed) ease, opacity var(--shift-speed) ease;
  text-shadow: 1px 1px 1px #00000099, -1px 1px 1px #00000099, 1px -1px 1px #00000099, -1px -1px 1px #00000099;
  pointer-events: none;
  width: auto;

  /* ${() => window.FILL_FIELDS && 'display: none;'} */

  
  & a {
    color: var(--action-color);
  }

  & :not(.collapsed) {
    transform: translateY(calc(var(--header-height) * 2.35));
  }
  & > .header-icon {
    pointer-events: all !important;
  }
  & > div:first-child {
    padding-right: 0.5rem;
  }
  &:not(.collapsed) > div:first-child {
    pointer-events: all !important;
    min-width: 60vw;
    width: max-content;
    white-space: pre;
    word-wrap: nowrap;
    text-align: right;
  }
  &.collapsed > div:first-child {
    opacity: 0;
    transition: opacity 200ms ease;
  }
  & > .header-icon {
    height: 60%;
  }
  &.black {
    filter: invert(100%);
  }
  @media screen and (orientation: landscape) {
    right: calc(var(--header-height) * 0.85);
    font-size: 1rem;
    /* font-size: calc(var(--header-height) / 4.5); */
    transform: none !important;
    &:not(.collapsed) {
      /* font-size: 1rem; */
    }
    &.collapsed > div:first-child {
      opacity: 1;
      pointer-events: all;
    }
  }
`;
const EmailLink = styled(PhoneNumber)`
  transform: none;
  transform-origin: top right;
  transition: transform var(--shift-speed) ease, opacity var(--shift-speed) ease;
  font-size: calc(var(--header-height) / 4.5);

  & > .header-icon {
    /* height: 80%; */
  }

  & :not(.collapsed) {
    transform: translate(0, calc(var(--header-height) * 3.2));
  }
  @media screen and (orientation: landscape) {
    right: calc(var(--header-height) * 0.15);
    & :not(.collapsed) {
      transform: translateY(calc(var(--header-height) / 1.5));
    }
    & > div:first-child {
      display: none;
    }
  
    &.collapsed > div:first-child {
      opacity: 0;
      pointer-events: none;
    }
  }
`;
const LogoContainer = styled.div`
  width: var(--logo-width);
  margin-left: calc(var(--header-height) * 0.1);
  ${props => (props.pageLoaded ? `transform-origin: top left;` : `transform-origin: 50% 50%;`)}
  ${props =>
    props.showing
      ? props.pageLoaded
        ? `transform: scale(1) translateX(8vmin); opacity: ${props => (props.blackLogo ? '1' : 'var(--off-white-opacity')};`
        : `transform: scale(1) translateX(8vmin); opacity: ${props => (props.blackLogo ? '1' : 'var(--off-white-opacity')};`
      : `transform: scale(1.1) translateX(8vmin); opacity: 0;`}
  transition: transform var(--shift-speed) ease, opacity 1000ms ease;
  /* will-change: transform, opacity; */
  &.collapsed {
    transform: translate(0, calc(var(--header-height) * -0.4)) scale(0.47);
  }
  &:not(.black) > * {
    opacity: var(--off-white-opacity);
  }
  &.black > * {
    filter: var(--off-black-filter);
  }
  @media screen and (orientation: landscape) {
    --logo-width: calc(var(--header-height) * 5);
    --logo-width: calc(var(--main-width) * 0.5);

    &.collapsed {
      transform: translate(calc(var(--header-height) / 1.2), calc(var(--header-height) * -0.365 + 0.5vh)) scale(0.35);
    }
  }
`;
const MainLogo = styled.img`
  position: absolute;
  max-width: var(--logo-width);
  transition: transform 600ms ease, opacity 620ms ease;
`;
const Wagsworth = styled(MainLogo)`
  /* z-index: 3; */
`;
const Grooming = styled(MainLogo)`
  ${props =>
    props.showing
      ? `opacity: 1; 
    transform: none;`
      : `opacity: 0 !important;
     transform: translateX(4%);`}
  transition: transform 600ms ease, opacity 600ms ease;
  transition-delay: 900ms !important;
  /* z-index: 6; */
`;
const Dog = styled.div`
  animation: wag 90ms infinite;
  animation-direction: alternate;
  animation-fill-mode: both;
  animation-play-state: paused;
  ${props => window.GUEST_MODE && 'display: none;'}
`;
const DogHead = styled(MainLogo)`
  ${props => (props.showing ?
    `opacity: 1; transform: 'none';`
    :
    `opacity: 0; transform: translate(0.7vw, 0.8vw);`
  )}
  transition-delay: 1100ms;
  /* z-index: 0; */
`;
const Monocle = styled(MainLogo)`
  animation-name: raise-monocle;
  animation-duration: 1200ms;
  animation-delay: 2000ms;
  animation-fill-mode: forwards;
  transform-origin: 70% 60%;
  transform: translateY(6%) rotate(12deg);
  opacity: 0;
`;

const phoneIcon = require('../assets/icons/phoneicon.png');
const emailIcon = require('../assets/icons/emailicon.png');

function Header(props) {
  const [dogHeadRef, setDogHeadRef] = useState(React.createRef());
  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        setPageLoaded(true);
      })
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
  let logoClass = `${props.collapsed ? 'collapsed' : ''}`;
  let linkClass = `${props.collapsed ? 'collapsed' : ''}`;
  if (props.blackLogo) {
    logoClass += ' black'
    linkClass += ' black';
  }
  const showShadow = 
  !props.menuOn && 
  (props.phase > 1 || (props.phase === 1 && (props.lastPhase >= 2 || (props.lastPhase === 0 && !props.inTransit.to))));
  return (
    <HeaderContainer headerColor={props.headerColor} phase={props.phase} collapsed={props.collapsed} menuOn={props.menuOn} showShadow={showShadow}>
      <LogoContainer className={logoClass} pageLoaded={pageLoaded} onClick={handleDogClick} blackLogo={props.blackLogo} showing={props.landed} collapsed={props.collapsed}>
        <Dog ref={dogHeadRef}>
          <DogHead src={props.logoPieces.dogHeadLogo} showing={props.landed} collapsed={props.collapsed} />
          <Monocle id='monocle' src={props.logoPieces.monocleLogo} showing={props.landed} collapsed={props.collapsed} />
        </Dog>
        <Wagsworth src={props.logoPieces.wagsworthLogo} showing={props.landed} collapsed={props.collapsed} />
        <Grooming src={props.logoPieces.groomingLogo} showing={props.landed} collapsed={props.collapsed} />
      </LogoContainer>
      <a href={`tel:+1-${props.contactInfo.phone}`}>
        <PhoneNumber showing={props.landed} className={linkClass}>
          <div>{props.contactInfo.phoneString}</div>
          <img className='header-icon' alt='' src={phoneIcon} />
        </PhoneNumber>
      </a>
      <a href={`mailto:${props.contactInfo.email}`}>
        <EmailLink showing={props.landed} className={linkClass}>
          <div>{props.contactInfo.email}</div>
          <img className='header-icon' alt='' src={emailIcon} />
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
    // && prevProps.contactInfo === nextProps.contactInfo

  return equal;
}
// export default Header;
export default React.memo(Header, areEqual);
