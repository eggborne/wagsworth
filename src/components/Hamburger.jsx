import React from 'react';
import styled from 'styled-components/macro';
require('console-green');

const HamburgerContainer = styled.div`
  position: absolute;
  /* background: blue; */
  z-index: 12;
  padding: 0;
  /* padding-top: calc(var(--hamburger-height) * 0.175); */
  right: 0;
  width: var(--hamburger-height);
  height: var(--hamburger-height);
  justify-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  transform: ${props => props.landed ? 'none' : 'translateY(-10%)'};
  opacity: ${props => props.landed ? '1' : '0'};
  transition: transform 420ms ease, opacity 420ms ease;
  transition-delay: 900ms;
  padding: calc(var(--header-height) * 0.175);
  margin: calc(var(--header-height) * 0.075);
  margin-top: calc(var(--header-height) * 0.03);
  z-index: 6;

  &::after {
    position: absolute;
    content: 'MENU';
    color: #ddd;
    font-size: calc(var(--header-height) / 6);
    transform: translateX(-50%);
    left: 50%;
    bottom: calc(var(--header-height) / -12);
  }
`;
// const ScissorArm = styled.img`
//   position: absolute;
//   align-self: center;
//   transform-origin: 50% 50%;
//   width: 100%;
//   height: 100%;
//   transform: ${props => props.menuOn ? 'rotate(42deg)' : 'rotate(-87deg)'};
//   transition: transform 310ms ease;

//   &: nth-of-type(2) {
//     transform: ${props => props.menuOn ? 'rotate(-42deg)' : 'rotate(-93deg)'};
//   }
// `;
const HamBar = styled.div`
  background-color: var(--off-white);
  border-radius: 12%;
  height: calc(var(--header-height) / 18);
  transition: transform 310ms ease;
  // will-change: transform;
`;
const HamBarTop = styled(HamBar)`
  border: none;
  transform: ${props => props.menuOn ? 'translateX(15%)' : 'none'};
`;
const HamBarMid = styled(HamBar)`
  border: none;
  transform: ${props => props.menuOn ? 'translateX(-12%)' : 'none'};
  `;
const HamBarBot = styled(HamBar)`
  border: none;
  transform: ${props => props.menuOn ? 'translateX(15%)' : 'none'};
`;

function Hamburger(props) {
  // console.count('Hamburger');
  return (
      <HamburgerContainer {...{ [window.CLICK_METHOD]: props.onHamburgerClick }} showing={!props.landscape} landed={props.landed}>
        <>
          <HamBarTop menuOn={props.menuOn} ></HamBarTop>
          <HamBarMid menuOn={props.menuOn} ></HamBarMid>
          <HamBarBot menuOn={props.menuOn} ></HamBarBot>
        </>
        {/* {props.menuOn ?
          <>
            <ScissorArm menuOn={props.menuOn} src={scissor} />
            <ScissorArm menuOn={props.menuOn} src={scissor2} />
          </>
          :
          <>
            <HamBar></HamBar>
            <HamBar></HamBar>
            <HamBar></HamBar>
          </>
        } */}
      </HamburgerContainer>
  )
}
function areEqual(prevProps, nextProps) {
  let equal = prevProps.landed === nextProps.landed
    && prevProps.menuOn === nextProps.menuOn
    // && prevProps.phase === nextProps.phase
    // && !(prevProps.inTransit.from === 0 && prevProps.inTransit.to === 1);
  return equal;
}
// export default Hamburger;
export default React.memo(Hamburger, areEqual);
