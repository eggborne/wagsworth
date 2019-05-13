import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

const MenuContainer = styled.header`
  padding: 0;
  position: fixed;
  width: 100%;
  height: calc(${window.innerHeight}px - var(--header-height));
  top: var(--header-height);
  font-family: var(--title-font), sans-serif;
  color: #ddd;
  background-color: var(--header-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 8vmin;
  padding-right: 8vmin;
  z-index: 3;
  opacity: ${props => (props.showing ? 0.98 : 0)};
  pointer-events: ${props => (props.showing ? 'all' : 'none')};
  transform: ${props => (props.showing ? 'scalex(1)' : 'scaleX(1.1)')};
  transition: opacity 310ms ease, transform 310ms ease;
`;
const NavItem = styled.nav`
  background-color: #44444411;
  border: 0.075rem solid #444;
  border-radius: var(--hamburger-radius);
  border-color: ${props => (props.selected ? '#444' : 'transparent')};
  font-size: calc(var(--header-height) / 1.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60vw;
  margin: 2vh;
  padding: 2vh;
`;

function Menu(props) {
  console.pink('running Menu', props.phase)
  return (
    <MenuContainer showing={props.showing} phase={props.phase}>
      <NavItem onClick={() => props.onNavItemClick(1)} selected={props.phase === 1}>Chickens</NavItem>
      <NavItem onClick={() => props.onNavItemClick(2)} selected={props.phase === 2}>Poochie</NavItem>
      <NavItem onClick={() => props.onNavItemClick(3)} selected={props.phase === 3}>Other Chickens</NavItem>
      <NavItem onClick={() => props.onNavItemClick(4)} selected={props.phase === 4}>Tomatoes</NavItem>
    </MenuContainer>
  )
}

export default Menu;