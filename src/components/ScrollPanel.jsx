
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import './ScrollPanel.css';
let headerHeight = window.innerWidth * 0.2;
let sectionHeight = window.innerHeight - headerHeight;

let swipeToScroll = true;
let shiftSpeed = 420;

let cornerPng = require('../assets/corner400full.png');

const SectionTitle = styled.header`
  opacity: ${props => props.arrived ? '1' : '0'};
  transform: ${props => props.arrived ? 'none' : 'translateY(15%)'};
  text-align: center;
  color: var(--title-color);
  font-size: ${sectionHeight / 12}px;
  display: flex;
  align-items: center;
  text-shadow: 2px 2px 2vw #33333399;
  transition: transform 800ms ease, opacity 800ms ease;
  transition-delay: calc(var(--shift-speed) / 2);
`;
const SectionHeadline = styled.div`
  opacity: ${props => props.arrived ? '0.8' : '0'};
  transform: ${props => props.arrived ? 'none' : 'scale(0.9)'};
  color: var(--title-color);
  font-size: ${sectionHeight / 18}px;
  transition: transform 800ms ease, opacity 800ms ease;
  transition-delay: calc(var(--shift-speed));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SectionBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
`;
const SectionText = styled.summary`
  opacity:  ${props => props.arrived ? '1' : '0'};
  transform: ${props => props.arrived ? 'none' : 'translateY(20%)'};
  text-align: center;
  font-family: var(--main-font);
  color: #333;
  font-size: var(--normal-font-size);
  padding-left: 15vw;
  padding-right: 15vw;
  transition: transform 800ms ease, opacity 800ms ease;
  transition-delay: calc(var(--shift-speed));
  will-change: transform, opacity;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DotDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  opacity: 0.8;
`;
const Dot = styled.div`
  height: calc(var(--footer-height) / 6);
  width: calc(var(--footer-height) / 6);
  border-radius: 50%;
  margin-left: 1vw;
  margin-right: 1vw;
  background: var(--title-color);
  ${props => props.highlighted ?
  `
  opacity: 1;
  transform: scale(1.4);
  `
  :
  `
  opacity: 0.4;
  transform: none;
  `
  };
  transition: transform 300ms, opacity 300ms;
`;
const BottomPanel = styled.div`
  opacity: ${props => (swipeToScroll && props.arrived) ? 1 : 0};
  /* bottom: 0; */
  width: 100vw;
  height: calc(var(--header-height) * 0.9);
  /* box-shadow: var(--header-shadow); */
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${swipeToScroll ? 'all' : 'none'};
  transition: opacity 600ms ease;
  z-index: 6;
`;
const Arrow = styled.div`
  ${props => !props.arrived &&
  `animation-play-state: paused !important;`
  }
  width: 0;
  height: 0;
  border-left: 8vw solid transparent;
  border-right: 8vw solid transparent;
  opacity: ${props => props.arrived ? 0.86 : 0};
  transition: opacity 1000ms ease;
  // transition-delay: calc(var(--shift-speed) / 2);
`;
const DownArrow = styled(Arrow)`
  border-top: 6vw solid var(--arrow-color);
  animation: bob infinite 800ms linear alternate;
  `;
const UpArrow = styled(DownArrow)`
  border-top: 0;
  border-bottom: 6vw solid var(--arrow-color);
  animation: bob infinite 800ms linear alternate;
`;
const FadeImage = styled.img`
  height: calc(var(--section-height) / 4.5);
  --off-transform: scale(1.3);
  opacity: ${props => props.arrived ? 1 : 0};
  transform: ${props => props.arrived ? 'none' : 'var(--off-transform)'};
  transition: opacity 800ms ease, transform 800ms ease;
  transition-delay: calc(var(--shift-speed) / 2);
  will-change: transform, opacity;
  padding: 2vh;
`;
const FramedPhoto = styled(FadeImage)`
  border-radius: 1vw;
  box-shadow: 0.2vw 0.2vw 1vw 0 black;
  opacity: ${props => (props.arrived ? 1 : 0)};
  transform: ${props => (props.arrived ? 'none' : 'translateX(2vmin)')};
`;
function ScrollPanel(props) {
  let sectionTitle = props.sections[props.index].title;
  // console.count('panel ' + sectionTitle)
  const [arrived, setArrival] = useState(false);
  const [transition, setTransition] = useState('in');
  const [slideShowing, setSlide] = useState(0);
  useEffect(() => {
      if (props.phase === props.index) {
        setTransition('in');
        setArrival(true);
        setTimeout(() => {
          setTransition(false);
        }, shiftSpeed / 2);
      }
      return () => {
        if (props.phase === props.index) {
          setTransition('out');
          setArrival(false);
          setTimeout(() => {
            setTransition(false);
          }, shiftSpeed / 2);
        }
      }
  }, [props.phase]);
  let entering = transition === 'in';
  let leaving = transition === 'out';
  let containerClass = 'scroll-panel-container';
  if (leaving) {
    containerClass += ' leaving';
  } else if (props.instantMode) {
    containerClass += ' instant'
  }
  return (
    <section className={containerClass} style={props.style} ref={props.sections[props.index].ref}>
      <div style={{opacity: props.index === props.sections.length-1 ? '0' : '0.7'}} className='corner-ornaments'>
        <img className={'corner-piece top-left'} src={cornerPng} />
        <img className={'corner-piece top-right'} src={cornerPng} />
        <img className={'corner-piece bottom-right'} src={cornerPng} />
        <img className={'corner-piece bottom-left'} src={cornerPng} />
      </div>
      <SectionTitle arrived={arrived}>{sectionTitle}</SectionTitle>
      <SectionHeadline arrived={arrived}>{props.headline}</SectionHeadline>
      <SectionBody>
        <FadeImage leaving={leaving} arrived={arrived} src={props.centerImage} />
        <SectionText arrived={arrived} leaving={leaving}>{props.bottomText}</SectionText>
      </SectionBody>
      <DotDisplay>
        {props.slides.map((slide, i) =>
          <Dot key={i} highlighted={slideShowing === i} />
        )}
      </DotDisplay>
      <BottomPanel onTouchStart={props.onClickNextPhase} arrived={arrived}>
        <DownArrow arrived={arrived} />
      </BottomPanel>
    </section>
  );
}

export default ScrollPanel;