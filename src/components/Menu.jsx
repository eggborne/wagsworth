import React from 'react';
import styled from 'styled-components/macro';
require('console-green');

const MenuContainer = styled.header`
  --menu-height: calc(${window.innerHeight}px - var(--header-height));
  --menu-footer-height: calc(var(--header-height) * 1.25);
  --nav-item-height: calc((var(--menu-height) - var(--menu-footer-height) - 18vh) / ${props => props.sections.length});
  background-color: var(--header-color);
  padding: 0;
  position: fixed;
  width: 100%;
  height: var(--menu-height);
  max-height: var(--menu-height);
  top: var(--header-height);
  font-family: var(--title-font), sans-serif;
  color: #ddd;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr var(--menu-footer-height);
  justify-items: center;
  pointer-events: ${props => (props.showing ? 'all' : 'none')};
  opacity: ${props => props.showing ? 1 : 0};
  transition: opacity 310ms ease, transform 420ms ease;
  z-index: 5;
`;
const NavGroup = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-height: 62vh;
  `;
const NavItem = styled.nav`
  border-radius: 2vw;
  font-size: calc(var(--nav-item-height) / 2);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60vw;

  flex-basis: var(--nav-item-height);
  transform: translateX(-10%);
  margin: 1vh;
  transform: ${props => props.showing ? 'translateX(0)' : 'translateX(-10%)'};
  transition: transform 420ms ease, opacity 420ms ease;
  ${props => (props.selected ?
    `
  background-color: var(--selected-button-color);
  background-image: var(--selected-button-gradient);
  box-shadow: none;

  `
  :
  `
  background-color: var(--button-color);
  background-image: var(--button-gradient);
  box-shadow: var(--button-shadow);
  `
  )}
  & :nth-child(even) {
    transform: ${props => props.showing ? 'translateX(0)' : 'translateX(10%)'};
  }
  `;

  const MenuFooter = styled.footer`
  align-self: stretch;
  font-family: var(--main-font), sans-serif;
  width: 100%;
  // height: var(--menu-footer-height);
  color: #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  white-space: pre;
  // background: lightgreen;
  & a {
    color: #ddd;
  }
`;
const SocialIcons = styled.div`
  // background: green;
  font-size: calc(var(--header-height) / 2.2);
  display: flex;
  align-items: center;
  & > a > img {
    padding: 2vmin;
    padding-bottom: 0;
    height: calc(var(--header-height) / 1.75);
    animation:wave 1200ms infinite ease;
    // animation-direction: alternate;
    animation-play-state: ${props => props.showing ? 'playing' : 'paused'}
  }
  & > a > #fb {
    animation-delay: 200ms !important;
  }
  & > a > #insta {
    animation-delay: 400ms !important;
  }
  & > a > #twit {
    animation-delay: 600ms;
  }
  & > a > #pint {
    animation-delay: 800ms;
  }
`;

const facebookIcon = require(`../assets/icons/facebookicon.png`);
const instagramIcon = require(`../assets/icons/instagramicon.png`);
const twittericon = require(`../assets/icons/twittericon.png`);
const pinteresticon = require(`../assets/icons/pinteresticon.png`);
function Menu(props) {
  // console.count('Menu');
  const handleNavItemClick = (event) => {
    props.onNavItemClick(parseInt(event.target.id));
  }
  return (
    <MenuContainer sections={props.sections} showing={props.showing} phase={props.phase}>
      <NavGroup>
        {props.sections.map((section, i) =>
          <NavItem id={i+1} showing={props.showing} key={section.title} onTouchStart={handleNavItemClick} selected={props.phase === i+1}>{section.title}</NavItem>
        )}
      </NavGroup>
      <MenuFooter>
        <SocialIcons showing={props.showing}>
            <a href='https://www.facebook.com/Wagsworth-Grooming-367796550610944' target='blank'><img id='fb' src={facebookIcon} /></a>
            <a href='https://instagram.com/wagsworths' target='blank'><img id='insta' src={instagramIcon} /></a>
            <a href='https://twitter.com/wagsworths' target='blank'><img id='twit' src={twittericon} /></a>
            <a href='https://pinterest.com/wagsworths' target='blank'><img id='pint' src={pinteresticon} /></a>
        </SocialIcons>
      </MenuFooter>
    </MenuContainer>
  )
}
function areEqual(prevProps, nextProps) {
  let equal = prevProps.showing === nextProps.showing
    // && (prevProps.phase === nextProps.phase);
  return equal;
}
// export default Menu;
export default React.memo(Menu, areEqual);