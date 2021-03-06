import React from 'react';
import styled from 'styled-components/macro';

const HamburgerContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  padding: 0;
  right: 0;
  width: var(--hamburger-height);
  height: var(--hamburger-height);
  justify-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  transform: ${props => (props.landed ? 'none' : 'translateY(-10%)')};
  opacity: ${props => (props.landed ? '1' : '0')};
  transition: transform 420ms ease, opacity 420ms ease;
  transition-delay: 300ms;
  padding: calc(var(--header-height) * 0.175);
  margin: calc(var(--header-height) * 0.075);
  margin-top: calc(var(--header-height) * 0.03);
  cursor: pointer;
  z-index: 2;

  &.dark::after {
    filter: invert(100%);
  }
  &.dark div {
    background-color: var(--off-black);
  }
  &::after {
    position: absolute;
    content: 'MENU';
    color: #ddd;
    font-size: calc(var(--header-height) / 6);
    transform: translateX(-50%);
    left: 50%;
    bottom: calc(var(--header-height) / -12);
  }
  @media screen and (orientation: landscape) {
    right: unset;
    left: calc((100vw - var(--main-width)) / 2);
    /* margin: 0; */
    /* width: var(--header-height);
      padding-left: 1rem;
      padding-right: 1rem; */
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
  return (
      <HamburgerContainer className={props.dark && 'dark'} {...{ [window.CLICK_METHOD]: props.onHamburgerClick }} showing={!props.landscape} landed={props.landed}>
        <>
          <HamBarTop dark={props.dark} menuOn={props.menuOn} ></HamBarTop>
          <HamBarMid dark={props.dark} menuOn={props.menuOn} ></HamBarMid>
          <HamBarBot dark={props.dark} menuOn={props.menuOn} ></HamBarBot>
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
