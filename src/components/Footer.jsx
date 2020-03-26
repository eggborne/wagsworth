import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { generator } from '../scripts/quotes.js';

const facebookIcon = require(`../assets/icons/facebookicon.png`);
const instagramIcon = require(`../assets/icons/instagramicon.png`);
const twittericon = require(`../assets/icons/twittericon.png`);
const pinteresticon = require(`../assets/icons/pinteresticon.png`);

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  align-self: stretch;
  font-family: var(--main-font), sans-serif;
  width: var(--main-width);
  max-height: var(--footer-height);
  min-height: var(--footer-height);
  color: #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${props => ((props.phase > 0 && !props.menuOn) ? 'var(--header-color)' : 'transparent')};
  box-shadow: ${props => ((props.phase > 0 && !props.menuOn) ? 'var(--header-color)' : 'transparent')};
  transform: ${props => props.showing ? 'none' : 'translateY(100%)'};
  transition: transform var(--shift-speed) ease, background-color calc(var(--shift-speed) / 2) ease;
  /* padding: 0 calc(var(--footer-height) / 4); */
  z-index: 2;

  & a {
    color: #ddd;
  }

  & > .follow-label {
    font-weight: bold;
    font-family: sans-serif;
    font-size: 1rem;
    animation: pulse-text-wide infinite 2s ease;
  }
  @media screen and (orientation: landscape) {
    position: fixed;
    flex-direction: row;
    justify-content: flex-start;
    bottom: 0;
    padding: 0 calc(var(--footer-height) / 4);
    box-shadow: none;

    & > .follow-label {
      padding-right: calc(var(--footer-height) / 6);
    }
  }
`;
const LowerFooter = styled.div`
  left: 0;
  bottom: 0;
  font-family: var(--main-font), sans-serif;
  font-size: 0.8rem;
  color: #ddd;
  white-space: pre;
  & a {
    color: #dddddd88;
  }
  @media screen and (orientation: landscape) {
    flex-grow: 1;
    text-align: right;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  & a {
    display: flex;
    align-items: center;
  }
  & img {
    padding: 0 2vmin;
    height: calc(var(--footer-height) / 3);
    animation: wave 1200ms infinite ease;
    animation-direction: alternate;
    animation-play-state: ${props => props.pulsing ? 'running' : 'paused'}
  }
  & a > #fb {
    animation-delay: 200ms;
  }
  & a > #insta {
    animation-delay: 400ms;
  }
  & a > #twit {
    animation-delay: 600ms;
  }
  & a > #pint {
    animation-delay: 800ms;
  }
  @media screen and (orientation: landscape) {
    & img {
      height: calc(var(--footer-height) / 2);
      padding: 0 calc(var(--footer-height) / 8);
    }    
  }
`;

function Footer(props) {
  const [showing, setShowing] = useState(false);
  useEffect(() => {
    setShowing(true);
    return () => setShowing(false);
  });
  let attribution = `© ${new Date().getFullYear()} Wagsworth Grooming`;
  if (window.FILL_FIELDS) {
    attribution = `${generator.lines.length} lines in database`
  }
  console.log('Footer props is', props)
  return (
    <FooterContainer showing={showing} phase={props.phase} menuOn={props.menuOn}>
      <span className='follow-label'>FOLLOW US</span>
      {true && <SocialIcons pulsing={showing}>
        <a href={props.socialUrls[0]} target='blank'><img alt='' id='fb' src={facebookIcon} /> </a>
        <a href={props.socialUrls[1]} target='blank'><img alt='' id='insta' src={instagramIcon} /></a>
        <a href={props.socialUrls[2]} target='blank'><img alt='' id='twit' src={twittericon} /></a>
        <a href={props.socialUrls[3]} target='blank'><img alt='' id='pint' src={pinteresticon} /></a>
      </SocialIcons>}
      <LowerFooter>
        <small>{attribution}  |  Website by <a href='https://mikedonovan.dev'>mikedonovan.dev</a></small>
      </LowerFooter>
    </FooterContainer>
  );
}

const areEqual = (prevProps, nextProps) => {
  let equal = prevProps.menuOn === nextProps.menuOn && (prevProps.phase === nextProps.phase ||
    (prevProps.phase !== 0 && prevProps.phase !== 4 && nextProps.phase !== 0 && nextProps.phase !== 4))
    ;
  return equal;
}
export default React.memo(Footer, areEqual);
// export default Footer;
