import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import "./ScrollPanel.css";

let swipeToScroll = true;
let shiftSpeed = 420;

const borderUrl = "https://wagsworthgrooming.com/fancybordersmall.png";

const SectionContainer = styled.section`
  --section-header-height: calc(var(--header-height) * 1.25); 
  --section-footer-height: calc(var(--header-height) * 1.25); 
  box-sizing: content-box;
  position: relative;
  width: 100%;  
  /* height: var(--section-height); */
  min-height: var(--section-height);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 
    var(--section-header-height)
    auto 
    var(--section-footer-height)
  ;
  grid-template-columns: var(--header-height) 1fr var(--header-height);
  justify-items: center;
  align-items: center;
  font-size: var(--main-font-size);
  color: #ddd;
  font-family: var(--title-font);
  /* background: linear-gradient(rgba(0,0,0,0.2), rgba(255,255,255,0),  rgba(255,255,255,0),  rgba(255,255,255,0), rgba(0,0,0,0.2)); */
  /* outline: 2px solid blue; */
  /* transform: scale(0.98);   */

  overflow: hidden;

  &:last-of-type {
    min-height: unset;
    height: calc(var(--section-height) - var(--footer-height));
  }
  & * {
    pointer-events: none;
  }
  & > div {
    grid-column-start: 0;
    grid-column-end: span 3;
  }  

  &::before {
    box-sizing: border-box;
    position: absolute;
    top: calc(var(--paper-margin) / 2);
    width: calc(100% - var(--paper-margin));
    height: calc(100% - var(--paper-margin));
    content: '';
    border-style: solid;
    border-width: var(--section-header-height);
    border-color: white;
    border-image-source: url(${borderUrl});
    border-image-slice: 50%;
    border-image-width: calc(var(--header-height) * 1.5);
    opacity: 0.8;
    z-index: 1;
    pointer-events: none;
  }
  /* &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: calc(var(--header-height) * 0.65);
    bottom: calc(var(--header-height) * 1.25);
    background-image: linear-gradient(rgba(255,255,255,0), ${props =>
      props.style.backgroundColor});
    z-index: 0;
    display: ${props => (props.fadeEdges ? "initial" : "none")};
    background-image: linear-gradient(rgba(255,255,255,0), brown);
  } */
`;
const FadeEdge = styled.div`
  position: absolute;
  width: calc(100% - (var(--header-height) * 1));
  height: calc(var(--header-height) * 0.5);
  top: calc(var(--section-header-height) - 2px);
  background-image: linear-gradient(
    to bottom,
    ${props => props.bgColor} 10%,
    60%,
    ${props => props.bgColor}00 100%
  );
  z-index: 2;

  &.lower {
    top: calc(100% - (var(--section-footer-height) - 2px));
    transform: translateY(-100%) rotate(180deg);
  }

  @media screen and (orientation: landscape) {
    display: none;
  }
`;
const ServiceCard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content 1fr;
  padding: calc(var(--section-height) / 18);
  padding-top: calc(var(--section-height) / 24);
  grid-row-gap: calc(var(--section-height) / 24);
  border-radius: 0.2rem;
  box-shadow: 0 0.2rem 0.5em #00000066, 0 0px 0 1px #00000066;

  & > .card-top {
    grid-column-end: span 2;
    justify-self: stretch;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  & > .card-top > .card-headline {
    padding: 0;
    margin: 0;
    display: unset;
    width: auto;
  }

  & .card-body {
    justify-self: stretch;
  }

  & .card-top img {
    height: calc(var(--section-height) / 10);
    width: calc(var(--section-height) / 10);
    /* justify-self: start; */
  }

  & > summary {
    grid-column-end: span 2;
  }

  @media screen and (orientation: landscape) {
    height: calc(var(--section-height) / 2);
    min-height: calc(var(--section-height) / 2);
    max-width: calc(var(--section-height) / 2);
  }
`;
const SectionTitle = styled.header`
  grid-column-start: 0;
  grid-column-end: span 3;
  opacity: ${props => (props.arrived ? "1" : "0")};
  /* transform: ${props => (props.arrived ? "none" : "translateY(15%)")}; */
  transform: ${props => (props.arrived ? "none" : "scale(1.2)")};
  text-align: center;
  /* color: var(--title-text-color); */
  font-size: var(--title-font-size);
  align-self: stretch;
  justify-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-shadow: 2px 2px 2vw #33333399;
  transition: transform 800ms ease, opacity 800ms ease;
  transition-delay: calc(var(--shift-speed) / 2);

  /* outline: 1px solid blue; */

  /* & :after {
    position: absolute;
    content: '';
    width: 100%;
    height: calc(var(--header-height) * 0.65);
    bottom: calc(var(--header-height) * 1.25);
    background-image: linear-gradient(rgba(255,255,255,0), ${props =>
      props.style.backgroundColor});
    z-index: 0;
    /* background-image: linear-gradient(rgba(255,255,255,0), brown); */
  } */
`;
const SectionHeadline = styled.div`
  font-family: var(--main-font);
  opacity: ${props => (props.arrived ? "0.8" : "0")};
  transform: ${props => (props.arrived ? "none" : "scale(0.9)")};
  /* color: var(--title-text-color); */
  font-size: calc(var(--main-font-size) / 1.25);
  transition: transform 800ms ease, opacity 800ms ease;
  transition-delay: calc(var(--shift-speed));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80%;
  @media screen and (orientation: landscape) {
    font-size: var(--main-font-size);
    width: 50%;
  }
`;
const CardHeadline = styled(SectionHeadline)`
  font-family: var(--title-font);
  font-size: 2rem !important;

  @media screen and (orientation: landscape) {
  }
`;
const BodyScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-self: start; */
  /* align-items: stretch; */
  /* justify-content: flex-end; */
  /* width: 100%; */
  height: calc(
    var(--section-height) - var(--section-header-height) -
      var(--section-footer-height)
  );
  transition: transform 400ms ease;
  pointer-events: all;
  overflow-y: auto;

  @media screen and (orientation: landscape) {
    flex-direction: row;
    padding: 2% 4%;
  }
`;
const SectionBody = styled.div`
  /* position: relative; */
  padding: 5% 12%;
  font-size: calc(var(--main-font-size) * 1.1);
  &.services {
    /* padding: 10% 12%; */
    padding-top: calc(var(--section-height) / 18);
  }
  &.services:last-of-type {
    /* padding: 10% 12%; */
    padding-bottom: calc(var(--section-height) / 24);
  }
  & > .service-label {
    font-size: 1.8rem;
    width: 100%;
    text-align: center;
    text-shadow: 2px 2px 2vw #33333399;
    padding-bottom: calc(var(--header-height) / 4);
  }

  & > .service-note {
    font-size: 1rem;
    padding: calc(var(--header-height) / 4);
    border-radius: calc(var(--header-height) / 4);
    font-family: var(--main-font);
    width: 100%;
    margin-top: calc(var(--header-height) / 2);
    background-color: #584f4f8a;
    color: white;
    text-shadow: 1px 1px 1px #000000aa;
    box-shadow: 0 0.2rem 0.5em #00000066, 0 0px 0 1px #00000066;
  }

  @media screen and (orientation: landscape) {
    padding: 2vh 4vw;
  }
`;
const TextBody = styled.div`
  /* padding: 4vh 12vw; */
  padding: 5% 12%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  font-size: calc(var(--main-font-size) * 1.1);
  & > * {
    margin-top: 0;
  }
`;
const SectionText = styled.summary`
  font-family: var(--main-font);
  opacity: ${props => (props.arrived ? "1" : "0")};
  transform: ${props =>
    props.arrived ? "none" : "translateY(calc(var(--section-height) / 36))"};
  transition: transform 600ms ease, opacity 600ms ease;
  transition-delay: calc(var(--shift-speed));
  will-change: transform, opacity;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > p {
    margin-top: 0;
  }
`;
const ServiceTable = styled(ServiceCard)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  background-color: none;
  box-shadow: none;
  font-size: 1.5rem;
  
  & > div {
    display: flex;
    justify-content: space-between;
    padding: var(--main-padding);
  }
  & >div > div:last-child {
    font-family: var(--main-font);
  }
`;
const DotDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--header-height);
  opacity: 0.8;
`;
const Dot = styled.div`
  height: calc(var(--header-height) / 5);
  width: calc(var(--header-height) / 5);
  border-radius: 50%;
  margin: 0 calc(var(--header-height) / 20);
  background: #333;
  ${props =>
    props.highlighted
      ? `
  opacity: 1;
  transform: scale(1.4);
  `
      : `
  opacity: 0.4;
  transform: none;
  `};
  transition: transform 300ms, opacity 300ms;
`;
const BottomPanel = styled.div`
  opacity: ${props => (swipeToScroll && props.arrived ? 1 : 0)};
  width: 100%;
  height: var(--section-header-height);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${swipeToScroll ? "all" : "none"};
  transition: opacity 600ms ease;
  z-index: 6;
`;
const Arrow = styled.div`
  ${props => !props.arrived && `animation-play-state: paused !important;`}
  width: 0;
  height: 0;
  border-left: 2.5rem solid rgba(255,255,255,0);
  border-right: 2.5rem solid rgba(255,255,255,0);
  opacity: ${props => (props.arrived ? 0.86 : 0)};
  transition: opacity 1000ms ease;
  transition-delay: calc(var(--shift-speed) / 2);
  filter: drop-shadow(0 0 2px #00000099);
`;
const DownArrow = styled(Arrow)`
  position: relative;
  border-top: 2.2rem solid var(--arrow-color);
  animation: bob infinite 800ms linear alternate;
  & ::before {
    width: max-content;
    font-size: 1rem;
    height: 1rem;
    position: absolute;
    content: '${props => props.nextSectionTitle}';
    transform: translate(-50%, -100%);
    top: -1rem;
    left: 50%;
  }
`;
const LeftArrowPanel = styled.div`
  position: absolute;
  width: calc(var(--header-height) / 2.5);
  height: 20vw;
  transform: rotate(180deg) translateX(42vw);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000028;
  border-radius: 1.5vw;
  font-family: sans-serif;
  font-size: 8vw;
  color: white;
  pointer-events: all;
`;
const RightArrowPanel = styled(LeftArrowPanel)`
  transform: rotate(180deg) translateX(-42vw);
`;
const FadeImage = styled.img`
  --off-transform: scale(1.3);
  opacity: ${props => (props.arrived ? 1 : 0)};
  transform: ${props => (props.arrived ? "none" : "var(--off-transform)")};
  transition: opacity 800ms ease, transform 800ms ease;
  transition-delay: calc(var(--shift-speed) / 2);
  will-change: transform, opacity;
  filter: drop-shadow(3px 3px 3px #00000055);
`;
const QuestionSet = styled.div`
  position: relative;
  font-family: var(--main-font);
  width: 100%;
  flex-grow: 0;
  opacity: ${props => (props.arrived ? "1" : "0")};
  transform: ${props =>
    props.arrived ? "none" : "translateY(calc(var(--paper-height) / 24))"};
  transition: transform 800ms ease, opacity 800ms ease;
  transition-delay: calc(var(--shift-speed) / 2);
  justify-self: flex-start;

  & :last-of-type {
    margin-bottom: 4vh;
  }

  & > .question {
    font-size: 1.05em;
    font-weight: bolder;
  }
  & > .answer {
    margin: 1vh;
  }
  & > div {
    justify-self: flex-start;
  }
`;
function ScrollPanel(props) {
  const [arrived, setArrival] = useState(false);
  const [transition, setTransition] = useState("in");
  const [slideShowing, setSlide] = useState(0);
  let sectionTitle = props.title;
  // console.count('panel ' + sectionTitle + ' slideShowing ' + slideShowing)
  useEffect(() => {
    if (props.phase === props.index) {
      setTransition("in");
      setArrival(true);
      props.sectionData.ref.current.scrollTo({
        top: 0
      });
      setTimeout(() => {
        setTransition(false);
      }, shiftSpeed / 2);
    }
    return () => {
      if (props.phase === props.index) {
        setTransition("out");
        setArrival(false);
        setTimeout(() => {
          setTransition(false);
        }, shiftSpeed / 2);
      }
    };
  }, [props.phase, props.index]);
  let leaving = transition === "out";
  let containerClass = "scroll-panel-container";
  if (leaving) {
    containerClass += " leaving";
  } else if (Math.abs(props.lastPhase - props.phase) > 1) {
    containerClass += " instant";
  }
  console.log("panel", props.index, "run");
  console.log(props.nextSectionTitle);
  let fadeEdges =
    sectionTitle === "Services" ||
    sectionTitle === "FAQs" ||
    sectionTitle === "About Me";
  return (
    <SectionContainer
      fadeEdges={fadeEdges}
      style={props.style}
      className={containerClass}
    >
      <SectionTitle arrived={arrived}>
        {sectionTitle}
        <SectionHeadline arrived={arrived}>
          {props.sectionData.headline}
        </SectionHeadline>
      </SectionTitle>
      {fadeEdges && (
        <FadeEdge slides={props.slides} bgColor={props.style.backgroundColor} />
      )}
      {fadeEdges && (
        <FadeEdge
          slides={props.slides}
          className={"lower"}
          bgColor={props.style.backgroundColor}
        />
      )}
      <BodyScrollContainer
        sectionData={props.sectionData}
        ref={props.sectionData.ref}
        // style={{ transform: `translateX(${slideShowing * -window.innerWidth}px)` }}
        slides={props.slides}
      >
        {props.slides.map((slide, i) =>
          props.faq ? (
            <TextBody showing={true} key={"body" + i}>
              {props.faqs
                .filter((faq, f) => faq.question && faq.answer)
                .map((pair, p) => (
                  <QuestionSet arrived={arrived} key={(i + 1) * p}>
                    <div className="question">{pair.question}</div>
                    <div className="answer">
                      {pair.answer.map((paragraph, r) => (
                        <p key={r}>{paragraph}</p>
                      ))}
                    </div>
                  </QuestionSet>
                ))}
            </TextBody>
          ) : props.sectionData.title === "Services" ? (
            <SectionBody className={"services"} showing={true} key={i}>              
               <ServiceCard style={{ backgroundColor: slide.bgColor }}>
                <div className='card-top'>
                  {slide.images.center && (
                    <FadeImage arrived={arrived} src={slide.images.center} />
                  )}
                  {slide.headline && (
                    <CardHeadline className="card-headline" arrived={arrived}>
                      {slide.headline}
                    </CardHeadline>
                  )}
                </div>
                <SectionText className='card-body' arrived={arrived}>
                  {slide.lowerText.map((paragraph, r) => (
                    <p key={r}>{paragraph}</p>
                  ))}
                </SectionText>
              </ServiceCard>        
            </SectionBody>
          ) : (
            <SectionBody showing={true} key={i}>
              {slide.headline && (
                <SectionHeadline arrived={arrived}>
                  {slide.headline}
                </SectionHeadline>
              )}
              {slide.images && (
                <FadeImage arrived={arrived} src={slide.images.center} />
              )}
              <SectionText arrived={arrived}>
                {slide.lowerText.map((paragraph, r) => (
                  <p key={r}>{paragraph}</p>
                ))}
              </SectionText>
            </SectionBody>
          )
        )}
        {props.sectionData.title === 'Services' &&
        <SectionBody className='services' showing={true}>
          <div className='service-label'>
            A La Carte
          </div>
          <ServiceTable>
            {props.sectionData.pricedServices.map(service => 
              <div key={service.name}>  
                <div>{service.name}</div>
                <div>{service.price}</div>
              </div>
            )}
          </ServiceTable>
          <div className='service-note'>
            <span style={{ fontWeight: 'bold' }}>Note: </span>{props.sectionData.note}
          </div>
        </SectionBody>
        }
      </BodyScrollContainer>
      {props.slides.length > 4 && window.innerWidth < window.innerHeight && (
        <>
          <DotDisplay>
            {props.slides.map((slide, i) => (
              <Dot key={i} highlighted={slideShowing === i} />
            ))}
          </DotDisplay>
          {slideShowing > 0 && (
            <LeftArrowPanel
              onPointerDown={() => {
                if (slideShowing > 0) {
                  setSlide(slideShowing - 1);
                }
              }}
            >
              {">"}
            </LeftArrowPanel>
          )}
          {slideShowing < props.slides.length - 1 && (
            <RightArrowPanel
              onPointerDown={() => {
                if (slideShowing < props.slides.length - 1) {
                  setSlide(slideShowing + 1);
                }
              }}
            >
              {"<"}
            </RightArrowPanel>
          )}
        </>
      )}
      {window.innerWidth < window.innerHeight && (
        <BottomPanel arrived={arrived} {...{ [window.CLICK_METHOD]: props.onClickNextPhase }}>
          {props.nextSectionTitle && (
            <DownArrow
              nextSectionTitle={props.nextSectionTitle}
              arrived={arrived}
            />
          )}
        </BottomPanel>
      )}
    </SectionContainer>
  );
}
export default React.memo(ScrollPanel);
// export default ScrollPanel;
