import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

const HeaderContainer = styled.header`
  padding: 0;
  position: fixed;
  width: 100%;
  height: var(--header-height);
  font-family: var(--title-font), sans-serif;
  font-size: calc(var(--header-height) / 1.5);
  color: #ddd;
  background-color: var(--header-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5vmin;
  padding-right: 2vmin;
  z-index: 3;
`;
const Title = styled.title`
  display: flex;
  transition: color 1000ms ease;
`;
const TitlePiece = styled.div`
  transition: transform 420ms ease, opacity 420ms ease;
  will-change: transform, opacity;
  white-space: pre;
  transform: ${props => (props.landed ? 'none' : 'translateX(30%)')};
  opacity: ${props => (props.landed ? '1' : '0')};

  &:last-of-type {
    transition-delay: 300ms;
  }
`;
const PhoneNumber = styled.div`
  font-family: var(--main-font) !important;
  font-size: calc(var(--header-height) / 3);
  color: red;
  // height: 100%;  
`;
const NavBar = styled.div`
  font-family: var(--main-font);
  width: 100%;
  height: 11.5vmin;
  height: calc(var(--header-height) - 0.5rem);
  justify-self: center;
  display: ${props => props.showing ? 'grid' : 'none'};
  grid-template-columns: 0.2fr 0.2fr 0.2fr 0.2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0.5vw;
  justify-content: end;
  transform: ${props => props.landed ? 'none' : 'translateY(-10%)'};
  opacity: ${props => props.landed ? '1' : '0'};
  transition: transform 420ms ease, opacity 420ms ease;
  transition-delay: 800ms;
  will-change: transform, opacity;    
  `;
const Hamburger = styled.div`
  position: fixed;
  top: 1.5vmin;
  right: 2vmin;
  font-family: var(--main-font);
  width: calc(var(--header-height) - 3vw);
  height: calc(var(--header-height) - 3vw);
  justify-self: center;
  display: ${props => props.showing ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-around;
  transform: ${props => props.landed ? 'none' : 'translateY(-10%)'};
  opacity: ${props => props.landed ? '1' : '0'};
  transition: transform 420ms ease, opacity 420ms ease;
  transition-delay: 800ms;
  will-change: transform, opacity;
  padding: calc(var(--header-height) / 7);
`;
const HamBar = styled.div`
  background-color: #666;
  border-radius: 12%;
  height: calc(var(--header-height) / 12);
`;
const NavItem = styled.nav`
  border: 0.075rem solid #444;
  border-radius: var(--hamburger-radius);
  font-size: calc(var(--header-height) / 3);
  padding-left: 15%;
  padding-right: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Header(props) {
  console.green('running Header')
  return (
    <HeaderContainer>
      <Title>
        <TitlePiece landed={props.landed}>Wagsworth  </TitlePiece>
        <TitlePiece landed={props.landed}>Grooming</TitlePiece>
      </Title>
      <Hamburger showing={!props.landscape} landed={props.landed}>
        <HamBar></HamBar>
        <HamBar></HamBar>
        <HamBar></HamBar>
      </Hamburger>
      <NavBar showing={props.landscape} landed={props.landed}>
        {props.landscape && <PhoneNumber><a href='tel:+1-303-499-711'>503-867-5309  <i className="fa fa-phone"></i></a></PhoneNumber>}
        <NavItem>Tomatoes</NavItem>
        <NavItem>Onions</NavItem>
        <NavItem>Vegetables</NavItem>
      </NavBar>
    </HeaderContainer>
  )
}

export default Header;



