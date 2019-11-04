import React from 'react';
import styled from 'styled-components/macro';
require('console-green');

const FooterContainer = styled.footer`
  align-self: stretch;
  font-family: var(--main-font), sans-serif;
  width: 100%;
  height: var(--footer-height);
  color: #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  & a {
    color: #ddd;
  }
  & > div:first-child {
    color: var(--header-text-color);
    font-size: 0.9rem;
    font-weight: bold;
    animation: pulse-text-wide infinite 2s ease;
    animation-play-state: running;
    animation-direction: alternate-reverse;
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
`;

const SocialIcons = styled.div`
  font-size: calc(var(--header-height) / 2.2);
  display: flex;
  align-items: center;
  & a > img {
    padding: 2vmin;
    padding-bottom: 0;
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
`;

function Footer(props) {
  const facebookIcon = require(`../assets/icons/facebookicon.png`);
  const instagramIcon = require(`../assets/icons/instagramicon.png`);
  const twittericon = require(`../assets/icons/twittericon.png`);
  const pinteresticon = require(`../assets/icons/pinteresticon.png`);
  return (
    <FooterContainer>
      <div>FOLLOW US</div>
      <SocialIcons>
        <a href='https://www.facebook.com/Wagsworth-Grooming-367796550610944' target='blank'><img id='fb' src={facebookIcon} /></a>
        <a href='https://instagram.com/wagsworths' target='blank'><img id='insta' src={instagramIcon} /></a>
        <a href='https://twitter.com/wagsworths' target='blank'><img id='twit' src={twittericon} /></a>
        <a href='https://pinterest.com/wagsworths' target='blank'><img id='pint' src={pinteresticon} /></a>
      </SocialIcons>
      <LowerFooter>
          <small>© {new Date().getFullYear()} Wagsworth Grooming  |  Website by <a href='http://mike@mikedonovan.dev'>mikedonovan.dev</a></small>
      </LowerFooter>
    </FooterContainer>
  );
}

export default React.memo(Footer);
