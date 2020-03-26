import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

const MenuContainer = styled.div`
  --menu-height: calc(var(--view-height) - var(--header-height) - var(--footer-height));
  --nav-item-height: calc(var(--menu-height) / 9.75);
  position: fixed;
  top: var(--header-height);
  padding: 0;
  width: 100%;
  height: var(--menu-height);
  max-height: var(--menu-height);
  font-family: var(--title-font), sans-serif;
  color: #ddd;
  pointer-events: ${props => (props.showing ? 'all' : 'none')};
  opacity: ${props => props.showing ? 1 : 0};
  transition: opacity 300ms ease !important;
  z-index: 2;
  will-change: opacity;
  
  & footer {
    box-shadow: none;
  }
  
  @media screen and (orientation: landscape) {
    
  }
  `;
const NavGroup = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: calc(var(--nav-item-height) / 4) 0;

  @media screen and (orientation: landscape) {
    /* flex-direction: row; */
  }
`;

const BoneButton = styled.nav`
  border-radius: 2vw;
  font-size: ${props => (props.long ? 'calc(var(--nav-item-height) / 3)' : 'calc(var(--nav-item-height) / 2.5)')};
  line-height: calc(var(--nav-item-height) / 2.5);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: var(--nav-item-height);
  width: calc(var(--nav-item-height) * 2.25);
  transform: translateX(-10%);
  transform: ${props => (props.showing ? 'translateX(0)' : 'translateX(-10%)')};
  transition: transform 420ms ease, opacity 420ms ease;
  margin: calc(var(--nav-item-height) / 4);
  cursor: pointer;
  /* filter: ${props => (props.showing ? `drop-shadow(0px 0px 0.25em #00000ff)` : `none`)}; */
  filter: var(--menu-button-shadow);
  &:nth-of-type(2n) {
    transform: ${props => (props.showing ? 'translateX(0)' : 'translateX(10%)')};
  }

  @media screen and (orientation: landscape) {
    /* --nav-item-height: calc(var(--main-width) / 18);
    transform: ${props => (props.showing ? 'translateY(0)' : 'translateY(-20%)')};
    &:nth-of-type(2n) {
      transform: ${props => (props.showing ? 'translateY(0)' : 'translateY(20%)')};
    } */
    ${props =>
      props.showing &&
      `&:hover, &:visited {
      filter: drop-shadow(0px 0px 0.2em #ffff00ff);
      color: #aaaa00 !important;
    }`};
  }
`;
const BoneKnob = styled.div`
  position: absolute;
  width: calc(var(--nav-item-height) / 1.2);
  height: calc(var(--nav-item-height) / 1.2);
  border-radius: 50%;
  background: inherit;
  z-index: -1;
  pointer-events: none;

  &:first-of-type { top: -25%; left: -10%; }
  &:nth-of-type(2) { bottom: -25%; left: -10%; }
  &:nth-of-type(3) { bottom: -25%; right: -10%; }
  &:nth-of-type(4) { top: -25%; right: -10%; }
`;

function Menu(props) {
  console.log('now the menu got props', props.sections.length && props.sections)
  const handleNavItemClick = (event) => {
    props.onNavItemClick(parseInt(event.target.id));
  }
  return (
    <MenuContainer sections={props.sections} showing={props.showing} phase={props.phase}>
      <NavGroup>
        {props.sections.filter((sec, s) => s > 0).map((section, i) =>
          <BoneButton style={{ backgroundColor: section.style.backgroundColor, color: section.style.color }} id={i+1} showing={props.showing} key={section.title} 
          {...{ [window.CLICK_METHOD]: handleNavItemClick }}
          selected={props.phase === i + 1}
          long={section.title.length > 11}>
            {section.title}
            <BoneKnob />
            <BoneKnob />
            <BoneKnob />
            <BoneKnob />
          </BoneButton>
        )}
      </NavGroup>
    </MenuContainer>
  )
}
function areEqual(prevProps, nextProps) {
  let equal = prevProps.showing === nextProps.showing
    && (prevProps.sections.length === nextProps.sections.length)
  ;
  return equal;
}
// export default Menu;
export default React.memo(Menu, areEqual);
