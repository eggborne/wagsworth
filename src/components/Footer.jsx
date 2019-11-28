import React from 'react';
import styled from 'styled-components/macro';
require('console-green');

const FooterContainer = styled.footer`
  align-self: stretch;
  font-family: var(--main-font), sans-serif;
  width: var(--main-width);
  height: var(--footer-height);
  color: #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--header-color);
  box-shadow: var(--footer-shadow);

  z-index: 0;
  
  & a {
    color: #ddd;
  }
  & > .social-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--header-text-color);
    
    animation: pulse-text-wide infinite 2s ease;
    animation-play-state: running;
    animation-direction: alternate-reverse;
  }
  & > .social-area > div:first-child {
    padding-bottom: 2vmin;
    font-weight: bold;
    font-size: 1.25rem;
  }
  @media screen and (orientation: landscape) {
    position: fixed;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    bottom: 0;
    z-index: 4;
    box-shadow: none;

    & > div:first-child {
      flex-direction: row;
    }
    & > .social-area > div:first-child {
      padding-bottom: 0;
      padding-right: 2vmin;
    }
  }
`;
const LowerFooter = styled.div`
  left: 0;
  bottom: 0;
  font-family: var(--main-font), sans-serif;
  font-size: 0.8rem;
  /* opacity: 0.8; */
  width: 100%;
  color: #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  justify-self: flex-end;
  white-space: pre;
  z-index: 2;
  & a {
    color: #dddddd88;
  }
  @media screen and (orientation: landscape) {
    width: unset;
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
    /* padding-bottom: 0; */
    height: calc(var(--header-height) / 1.75);
    animation: wave 1200ms infinite ease;
    animation-direction: alternate;
    animation-play-state: '${props => props.showing ? 'playing' : 'paused'}'
  }
  & a > #fb {
    animation-delay: 200ms !important;
  }
  & a > #insta {
    animation-delay: 400ms !important;
  }
  & a > #twit {
    animation-delay: 600ms;
  }
  & a > #pint {
    animation-delay: 800ms;
  }
  @media screen and (orientation: landscape) {
    & img {
      height: calc(var(--footer-height) / 1.75);
      padding: 0 calc(var(--footer-height) / 5);
    }    
  }
`;

function Footer(props) {
  const facebookIcon = require(`../assets/icons/facebookicon.png`);
  const instagramIcon = require(`../assets/icons/instagramicon.png`);
  const twittericon = require(`../assets/icons/twittericon.png`);
  const pinteresticon = require(`../assets/icons/pinteresticon.png`);
  return (
    <FooterContainer>
      <div className='social-area'>
        <div>FOLLOW US</div>
        <SocialIcons>
          <a href='https://www.facebook.com/Wagsworth-Grooming-367796550610944' target='blank'>
            <img id='fb' src={facebookIcon} />
          </a>
          <a href='https://instagram.com/wagsworths' target='blank'><img id='insta' src={instagramIcon} /></a>
          <a href='https://twitter.com/wagsworths' target='blank'><img id='twit' src={twittericon} /></a>
          <a href='https://pinterest.com/wagsworths' target='blank'><img id='pint' src={pinteresticon} /></a>
        </SocialIcons>
      </div>
      <LowerFooter>
        <small>© {new Date().getFullYear()} Wagsworth Grooming  |  Website by <a href='http://mike@mikedonovan.dev'>mikedonovan.dev</a></small>
      </LowerFooter>
    </FooterContainer>
  );
}

export default React.memo(Footer);
