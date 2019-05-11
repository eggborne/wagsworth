import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import logo from './assets/poochie.png';
import './App.css';

let landscape = window.innerWidth > window.innerHeight;

const Header = styled.header`
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  font-family: var(--title-font), sans-serif;
  font-size: calc(var(--header-height) / 1.5);
  color: #ddd;
  background-color: var(--header-color);
  display: grid;
  grid-template-columns: auto 15vmin;
  align-items: center;
  padding-left: 1.5vmin;
  z-index: 3;
  box-shadow: 0 0.1vmin 2vmin #222;
`;
const Title = styled.title`
  display: flex;
`;
const TitlePiece = styled.div`
  transition: transform 420ms ease, opacity 420ms ease;
  will-change: transform, opacity;
  white-space: pre;
  transform: ${props => props.landed ? 'none' : 'translateX(30%)'};
  opacity: ${props => props.landed ? '1' : '0'};

  &:last-of-type {
    transition-delay: 300ms;
  }
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
  //margin-right: 1vw;
  justify-content: end;
  transform: ${props => props.landed ? 'none' : 'translateY(-10%)'};
  opacity: ${props => props.landed ? '1' : '0'};
  transition: transform 420ms ease, opacity 420ms ease;
  transition-delay: 800ms;
  will-change: transform, opacity;    
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
const SocialIcons = styled.div`
  position: fixed;
  right: 0;
  bottom: 2vh;
  background-color: #282c34aa;
  border: 0.25vmin solid var(--header-color);
  border-right: 0;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  font-size: 10vmin;
  font-size: calc(var(--header-height) / 1.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--header-height) / 6);
  transform: ${props => props.landed ? 'none' : 'translateX(100%)'};
  transition: transform 210ms ease;
  transition-delay: 1200ms;
  will-change: transform;
`;
const Hamburger = styled.div`
  font-family: var(--main-font);
  /* border: 0.5vmin solid #666; */
  width: calc(var(--header-height) - 3vw);
  height: calc(var(--header-height) - 3vw);
  justify-self: center;
  /* border-radius: var(--hamburger-radius); */
  display: ${props => props.showing ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-evenly;
  transform: ${props => props.landed ? 'none' : 'translateY(-10%)'};
  opacity: ${props => props.landed ? '1' : '0'};
  transition: transform 420ms ease, opacity 420ms ease;
  transition-delay: 800ms;
  will-change: transform, opacity;
  padding: 5% 15% 5% 15%;
`;
const HamBar = styled.div`
  background-color: #666;
  border-radius: 12%;
  height: 8%;
`;
const Footer = styled.footer`
  background-color: var(--header-color);
  width: 100%;
  height: 35vmin;
  color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vmin;
  box-shadow: 0 0.1vmin 2vmin #222;
`;

function App() {
  const [settled, setMount] = useState(false);
  console.log('App func running')
  let navType = 'hamburger';
  if (landscape) {
    navType = 'nav-bar';
  }
  useEffect(() => {
    setMount(true);
    console.log('App useEffect fired!');
    // [...document.getElementsByClassName('title-piece')].map((titlePiece, i) => {
    //   titlePiece.classList.remove('hidden');
    // });
    // setTimeout(() => {
    //   document.getElementById('social-icons').classList.remove('hidden');
    // }, 1200);
  });  
  return (
    <div className='App'>
      <Header>
        <Title>
          <TitlePiece landed={settled}>Wagsworth  </TitlePiece>
          <TitlePiece landed={settled}>Grooming</TitlePiece>
        </Title>
        {/* <div>503-867-5309</div> */}
        <Hamburger showing={!landscape} landed={settled}>
          <HamBar className='ham-bar' id='ham-bar-0'></HamBar>
          <HamBar className='ham-bar' id='ham-bar-1'></HamBar>
          <HamBar className='ham-bar' id='ham-bar-2'></HamBar>
        </Hamburger>
        <NavBar showing={landscape} landed={settled}>
          <NavItem>Tomatoes</NavItem>
          <NavItem>Onions</NavItem>
          <NavItem>Vegetables</NavItem>
          {/* <NavItem>Contact</NavItem> */}
        </NavBar>
      </Header>
      <div className='App-body'>
        <img className='title-photo' src={logo} />
        <div className='pulsing-text'>DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS DOGS</div>
        <div className='pulsing-text'>When I was a little girl, Grover Cleveland was president.</div>
      </div>
      <SocialIcons landed={settled}>
        <a href='https://twitter.com/WagsworthPDX' target='blank'><i className="fab fa-twitter"></i></a>
        <a href='https://twitter.com/WagsworthPDX' target='blank'><i className="fab fa-instagram"></i></a>
      </SocialIcons>
      <Footer>FOOT</Footer>
    </div>
  );
}

export default App;
