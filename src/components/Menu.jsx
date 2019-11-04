import React from 'react';
import styled from 'styled-components/macro';
import Footer from './Footer';
require('console-green');

const MenuContainer = styled.header`
  --menu-height: calc(${window.innerHeight}px - var(--header-height));
  --menu-footer-height: calc(var(--header-height) * 1.25);
  /* --nav-item-height: calc((var(--menu-height) - var(--menu-footer-height) - 18vh) / ${props => props.sections.length}); */
  --nav-item-height: calc(var(--menu-height) / 12);
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
  grid-template-rows: 1fr var(--footer-height);
  justify-items: center;
  pointer-events: ${props => (props.showing ? 'all' : 'none')};
  opacity: ${props => props.showing ? 1 : 0};
  transition: opacity 300ms ease, transform 420ms ease;
  z-index: 5;
`;
const NavGroup = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoneButton = styled.nav`
  border-radius: 2vw;
  font-size: calc(var(--nav-item-height) / 2.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--nav-item-height) * 2.25);
  height: var(--nav-item-height);
  transform: translateX(-10%);
  margin: 1vh;
  transform: ${props => props.showing ? 'translateX(0)' : 'translateX(-10%)'};
  transition: transform 420ms ease, opacity 420ms ease;
  margin: calc(var(--nav-item-height) / 2.4);
  /* filter: drop-shadow(0px 0px 3px #00000055); */

  & :nth-of-type(2n) {
    transform: ${props => props.showing ? 'translateX(0)' : 'translateX(10%)'};
  }
`;
const BoneKnob = styled.div`{
  position: absolute;
  width: calc(var(--nav-item-height) / 1.2);
  height: calc(var(--nav-item-height) / 1.2);
  border-radius: 50%;
  background: inherit;
  z-index: -1;
  pointer-events: none;

  &:first-of-type {
    top: -25%;
    left: -10%;
  }
  &:nth-of-type(2) {
    bottom: -25%;
    left: -10%;
  }
  &:nth-of-type(3) {
    bottom: -25%;
    right: -10%;
  }
  &:nth-of-type(4) {
    top: -25%;
    right: -10%;
  }
}
`;

function Menu(props) {
  console.log('Menu', props.showing, props.sections);
  const handleNavItemClick = (event) => {
    props.onNavItemClick(parseInt(event.target.id));
  }
  return (
    <MenuContainer sections={props.sections} showing={props.showing} phase={props.phase}>
      <NavGroup>
        {props.sections.map((section, i) =>
          <BoneButton style={{ backgroundColor: section.style.backgroundColor, color: section.style.color }} id={i+1} showing={props.showing} key={section.title} 
          {...{ [window.CLICK_METHOD]: handleNavItemClick }}
          // onPointerDown={handleNavItemClick} 
          selected={props.phase === i+1}>
            {section.title}
            <BoneKnob />
            <BoneKnob />
            <BoneKnob />
            <BoneKnob />
          </BoneButton>
        )}
      </NavGroup>
      <Footer showing={props.showing}/>
    </MenuContainer>
  )
}
function areEqual(prevProps, nextProps) {
  let equal = prevProps.showing === nextProps.showing
    && (prevProps.sections === nextProps.sections);
  return equal;
}
// export default Menu;
export default React.memo(Menu, areEqual);
