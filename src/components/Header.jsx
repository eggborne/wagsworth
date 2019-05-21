import React from 'react';
import styled from 'styled-components/macro';
require('console-green');

const HeaderContainer = styled.header`
  position: fixed;
  padding: 0;
  width: 100%;
  height: var(--header-height);
  font-family: var(--title-font), sans-serif;
  font-size: calc(var(--header-height) / 1.5);
  color: #ddd;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 3;
  // transition: background-color var(--shift-speed) ease;
  ${props => props.showShadow ?
  `box-shadow: var(--header-shadow);
  background-color: var(--header-color);
  `
  :
  `box-shadow: 0;
  background-color: transparent;
  `
  }
`;
const PhoneNumber = styled.div`
  position: fixed;
  top: 38vw;
  right: 18vw;
  ${props => props.collapsed ?
    `background: transparent;
    border: 0.25vw solid transparent;`
    :
    `background: transparent;
    border: 0.25vw solid #ffffff22;
    border-radius: 1vw;`
  }
  white-space: pre;
  padding: 1.5vw;
  padding-left: 3vw;
  display: grid;
  grid-template-columns: 36vw calc(var(--header-height) / 2.25);
  grid-template-rows: 1fr;
  align-items: flex-end;
  font-family: var(--main-font) !important;
  font-weight: 1000;
  font-size: calc(var(--header-height) / 3.7);
  color: var(--action-color);
  opacity: ${props => (props.showing ? '1 !important' : '0')};
  transform: ${props => props.collapsed ? 'translate(3.5vw, -37.5vw) scale(0.75)' : 'none'};
  transition: transform 400ms ease, opacity 400ms ease !important;
  & a {
    color: var(--action-color);
    text-decoration: ${props => props.collapsed && 'none'};
  }
  z-index: 4;
  & i {
    font-size: calc(var(--header-height) / 2.75);
    align-self: center;
    padding: 0;
    margin: 0;
    line-height: 120%;
  }
  & > div {
    animation: pulse-text-action infinite 2400ms ease;
    animation-direction: alternate;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-left: 1.5vw;
    padding-right: 1.5vw;
  }
  & > div > img {
    width: 100%;
  }
`;
const EmailLink = styled(PhoneNumber)`
  transform: ${props => props.collapsed ? 'translate(4vw, -44.5vw) scale(0.725)' : 'none'};
  top: 52vw;
  font-size: calc(var(--header-height) / 7.2);
  transition: transform var(--shift-speed) ease, opacity var(--shift-speed) ease;
  & > div {
    animation-direction: alternate-reverse;
  }
`;
const EmailAddress = styled.div`
  // opacity: ${props => props.showing ? 1 : 0};
  // transition: opacity 400ms ease;
`;

const phoneIcon = require('../assets/icons/phoneicon.png');
const emailIcon = require('../assets/icons/emailicon.png');

function Header(props) {
  // console.count('Header');
  const showShadow = (props.phase > 1 || (props.phase === 1 && (props.lastPhase >= 2 || (props.lastPhase === 0 && !props.inTransit.to))));
  return (
    <HeaderContainer menuOn={props.menuOn} showShadow={showShadow}>
      <a href='tel:+1-303-499-711'>
        <PhoneNumber showing={props.landed} collapsed={props.collapsed}>
          <div>503-867-5309</div>
          <div><img src={phoneIcon} /></div>
        </PhoneNumber>
      </a>
      <a href='mailto:booking@wagsworthgrooming.com'>
        <EmailLink showing={props.landed} collapsed={props.collapsed}>
          <EmailAddress showing={!props.collapsed}>
            <div>booking</div>
            <div>@wagsworthgrooming.com</div>
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