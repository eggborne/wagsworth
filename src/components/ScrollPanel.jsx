import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components/macro";
import "./ScrollPanel.css";

let swipeToScroll = true;
let shiftSpeed = 420;

const borderUrl = "https://wagsworthgrooming.com/fancybordersmall.png";

// const googleMapHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2801.544366522556!2d-122.7430284839197!3d45.39836124585416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549572e65fe21c41%3A0x419967e7f5602b9c!2sThe%20Scooby%20Shack!5e0!3m2!1sen!2sus!4v1573525146909!5m2!1sen!2sus" frameborder="0" style="border:0;" allowfullscreen="" ></iframe>`

// const phoneIcon = require('../assets/icons/phoneicon.png');
// const emailIcon = require('../assets/icons/emailicon.png');

const SectionContainer = styled.section`
  box-sizing: content-box;
  width: 100%;
  position: relative;
  height: var(--section-height);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 
    var(--section-header-height)
    auto 
    var(--section-footer-height)
  ;
  /* grid-template-columns: var(--header-height) 1fr var(--header-height); */
  justify-items: center;
  align-items: center;
  font-size: var(--main-font-size);
  color: #ddd;
  font-family: var(--title-font);

  overflow: hidden;

  &:last-of-type {
    height: calc(var(--section-height) - var(--footer-height));
  }
  & * {
    pointer-events: none;
  }
  & > div {
    grid-column-start: 0;
    grid-column-end: span 3;
  }

  /* & .service-icon {
    ${props => props.style.iconColor !== '#000000' && props.style.iconFilters}
  } */

  &::before {
    box-sizing: border-box;
    position: absolute;
    top: calc(var(--paper-margin) / 2);
    width: calc(var(--main-width) - var(--paper-margin));
    height: calc(100% - var(--paper-margin));
    content: '';
    border-style: solid;
    border-width: var(--section-header-height);
    border-color: white;
    border-image-source: url(${borderUrl});
    border-image-slice: 50%;
    border-image-width: calc(var(--header-height) * 1.5);
    z-index: 2;
    pointer-events: none;
    ${props => props.style.fancyBorderFilters}
  }
  @media screen and (orientation: landscape) {

    &:last-of-type {
      height: var(--section-height);      
      grid-template-rows: 
        var(--section-header-height)
        auto 
        calc(var(--footer-height) * 1.5);
      ;
    }
    &::before {
      height: calc(100% - var(--paper-margin) - var(--footer-height));
    }

  }
`;
const FadeEdge = styled.div`
  position: absolute;
  width: calc(var(--main-width) - (var(--header-height) * 1.25));
  height: calc(var(--header-height) * 0.5);
  top: calc(var(--section-header-height) - 2px);
  background-image: linear-gradient(
    to bottom,
    ${props => props.bgColor} 10%,
    60%,
    ${props => props.bgColor}00 100%
  );
  z-index: 12;

  /* display: none; */

  &.lower {
    transform: translateY(-100%) rotate(180deg);
    top: calc(100% - (var(--section-footer-height) - 2px));
  }

  @media screen and (orientation: landscape) {
    /* width: calc(var(--main-width) - (var(--header-height) * 3)); */
    &.lower {
      top: calc(100% - (var(--section-footer-height) - 2px));
      /* transform: translateY(0) rotate(180deg); */
      /* top: unset; */
      /* bottom: 0; */
    }
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
  font-size: ${props => props.long ? 'calc(var(--title-font-size) / 1.15)' : 'var(--title-font-size)'};
  ${props => props.long&& 'padding-top: 0.5rem;'}
  align-self: stretch;
  justify-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* text-shadow: 2px 2px 2vw #33333399; */
  transition: transform 800ms ease, opacity 800ms ease;
  transition-delay: calc(var(--shift-speed) / 2);
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
    /* font-size: var(--main-font-size); */
    /* width: 50%; */
  }
`;
const CardHeadline = styled(SectionHeadline)`
  font-family: var(--title-font);
  font-size: calc(var(--title-font-size) * 0.8);

  @media screen and (orientation: landscape) {
  }
`;
const SectionBody = styled.div`
  padding: calc(var(--section-height) / 16) calc(var(--main-width) * 0.125);
  width: var(--main-width);
  /* font-size: calc(var(--main-font-size) * 1.1); */
  &.services {
    /* padding: 10% 12%; */    
    padding-top: calc(var(--section-height) / 24);

  }
  &.services:last-of-type {
    /* padding: 10% 12%; */
    padding-bottom: calc(var(--section-height) / 24);
  }
  & > .service-label {
    font-size: calc(var(--title-font-size) * 0.75);
    width: 100%;
    text-align: center;
    /* text-shadow: 2px 2px 2vw #33333399; */
    padding-bottom: calc(var(--header-height) / 4);
  }

  & > .service-note {
    font-size: var(--main-font-size);
    padding: 1rem;
    border-radius: var(--card-radius);
    font-family: var(--main-font);
    width: 100%;
    margin-top: calc(var(--header-height) / 2);
    background-color: #ffffff07;
    color: black;
  }
  
  @media screen and (orientation: landscape) {
    /* padding: calc(var(--section-height) / 16) calc((100vw - var(--main-width)) / 1.25); */
    &.services {
      /* width: 100%; */
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
const BodyScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(
    var(--section-height) - var(--section-header-height) - var(--section-footer-height)
  );
  pointer-events: all;
  overflow-y: auto;   

  &.fade-edges::after {
    display: none;
    position: absolute;
    content: '';
    width: var(--main-width);
    height: calc(
      var(--section-height) - var(--section-header-height) - var(--section-footer-height) + 2px
    );
    box-shadow: 
      inset 0 calc(var(--section-header-height) / 4) calc(var(--section-header-height) / 4) 0 ${props => props.bgColor},
      inset 0 calc(var(--section-header-height) / -4) calc(var(--section-header-height) / 4) 0 ${props => props.bgColor}
    ;]
    z-index: 1;
    /* border-top: calc(var(--section-header-height) / 12) solid ${props => props.bgColor}; */
    /* border-bottom: calc(var(--section-header-height) / 12) solid ${props => props.bgColor}; */
    outline: 4px solid ${props => props.bgColor};
  }

  @media screen and (orientation: landscape) {
    align-items: center;
    max-width: 100%;
  }
`;
const ServiceCard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content 1fr;
  padding: calc(var(--main-width) / 10);
  grid-row-gap: calc(var(--section-height) / 24);
  border-radius: var(--card-radius);
  /* box-shadow: 0 0.1rem 0em #00000066, 0 0px 0 1px #00000066; */
  border: 1px solid #00000030;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  & > .card-top {
    grid-column-end: span 2;
    justify-self: stretch;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
  }

  & > .card-top > div:first-of-type {
    margin-right: calc(var(--section-height) / 24);
  }
  
  & > .card-top > .card-headline {
    flex-grow: 1;
    margin: 0;
    display: unset;
    line-height: 100%;
    text-align: center;
  }

  & .card-body {
    justify-self: stretch;
    padding: 0 !important;
  }

  & .card-top img {
    height: calc(var(--section-height) / 10);
    width: calc(var(--section-height) / 10);
    ${props => props.iconFilters}
  }

  & > summary {
    grid-column-end: span 2;
  }

  @media screen and (orientation: landscape) {
    width: calc(var(--main-width) / 2);
    padding: calc(var(--section-height) / 20);
    align-self: center;
    justify-self: center;
  }
`;
const TextBody = styled.div`
  padding: calc(var(--section-height) / 16) calc(var(--main-width) * 0.125);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--main-width);
  font-size: calc(var(--main-font-size) * 1.1);
  & > * {
    margin-top: 0;
  }
  
  @media screen and (orientation: landscape) {
    /* padding: calc(var(--section-height) / 16) calc(var(--main-width) * 0.15); */
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
  @media screen and (orientation: landscape) {
    /* padding-left: calc(var(--main-width) / 12);
    padding-right: calc(var(--main-width) / 12); */
  }
`;
const ServiceTable = styled(ServiceCard)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  box-shadow: none;
  font-size: 1.25rem;
  font-family: var(--main-font);
  line-height: 1.5;  
  
  & > div {
    display: flex;
    justify-content: space-between;
    padding: var(--main-padding);
    font-weight: bold;
  }
  & >div > div:last-child {

  }
`;

const ContactTable = styled.div`
  /* position: relative; */
  font-family: var(--main-font);
  font-weight: bold;
  display: flex;
  flex-direction: column;
  width: 70vmin;
  height: calc(var(--section-height) - var(--section-header-height)  - var(--section-footer-height) - var(--footer-height));
  pointer-events: all;

  & * {
    pointer-events: all;    
  }
  & > .contact-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1vh;
    border-radius: var(--card-radius);
    width: 100%;
  }
  & .contact-value {
    text-align: right;
  }
  & .address {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    margin-top: 0.5vh;
  }
  & .phone-number {
    font-size: 1.5rem;
  }
  & .google-map {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    border-radius: var(--card-radius);
    margin-top: 1vh;
    border: 1px solid #000000aa;
    border-radius: var(--card-radius) !important;
  }
  & .google-map > iframe {
    /* width: 100%; */
    height: 100%;
    /* box-shadow: 0 0 2px #000000aa; */
    border-radius: var(--card-radius) !important;
    /* height: calc(var(--paper-height) / 2);     */
  }
  @media screen and (orientation: landscape) {
    width: calc(var(--main-width) / 1.5);
    height: 100%;

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
  width: width: var(--main-width);
  height: var(--section-footer-height);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${swipeToScroll ? "all" : "none"};
  transition: opacity 600ms ease;
  z-index: 6;

  @media screen and (orientation: landscape) {
    margin-bottom: calc(var(--footer-height) * 1.25);
  }
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
  filter: drop-shadow(0 0 1px #000000);
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
    color: white;
    text-shadow:
      1px 1px 1px #00000099,
      -1px 1px 1px #00000099,
      1px -1px 1px #00000099,
      -1px -1px 1px #00000099
    ;       
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
  /* filter: drop-shadow(3px 3px 3px #00000055); */
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
    margin-bottom: 2vh;

  & :last-of-type {
    /* margin-bottom: 4vh; */
  }

  & > .question {
    padding: 0.5rem 0.75rem;
    border-radius: var(--card-radius);
    font-size: 1.05em;
    font-weight: bold;
    border: 1px solid ${props => props.textColor}77;
  }
  & > .answer {
    margin: 1vh;
  }
  & > div {
    justify-self: flex-start;
  }
`;
const RequirementSet = styled(QuestionSet)`
  & > .question {
    font-size: 1.25em;
    border: none;
    text-align: center;
  }
`

function ScrollPanel(props) {
  const [arrived, setArrival] = useState(false);
  const [transition, setTransition] = useState("in");
  const [slideShowing, setSlide] = useState(0);
  const mapRef = useRef();
  let sectionTitle = props.title;
  // console.count('panel ' + sectionTitle + ' slideShowing ' + slideShowing)
  // useEffect(() => {
  //   if (props.sectionData.title === 'Contact') {
  //     console.warn('Contact useEffect fired.', mapRef)
  //     mapRef.current.innerHTML = googleMapHTML;
  //   }
  // }, [])
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
  }, [props.phase, props.index, props.sectionData.ref]);
  let leaving = transition === "out";
  let containerClass = "scroll-panel-container";
  if (leaving) {
    containerClass += " leaving";
  }
  if (props.instant) {
    containerClass += " instant";
  }
  // } else if (Math.abs(props.lastPhase - props.phase) > 1) {
  //   containerClass += " instant";
  // }
  let fadeEdges = 
  props.sectionData.pricedServices ||
  props.sectionData.type === "faq" ||
  props.sectionData.type === "req" ||
  sectionTitle === "About Me";

  console.warn('panel', props.index)
    
  return (
    <SectionContainer
      title={props.sectionData.title}
      fadeEdges={fadeEdges}
      style={props.style}
      className={containerClass}
    >
      <SectionTitle arrived={arrived} long={sectionTitle.length > 11}>
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
        bgColor={props.style.backgroundColor}
        className={fadeEdges ? 'fade-edges' : ''}
      >
        {props.slides && props.slides.map((slide, i) =>
          props.sectionData.type === 'faq' ? (
            <TextBody showing={true} key={"body" + i}>
              {props.faqs
                .filter((faq, f) => faq.question && faq.answer)
                .map((pair, p) => (
                  <QuestionSet bgColor={props.sectionData.style.backgroundColor} textColor={props.sectionData.style.color} arrived={arrived} key={(i + 1) * p}>
                    <div className="question">{pair.question}</div>
                    <div className="answer">
                      {pair.answer.map((paragraph, r) => (
                        <p key={r}>{paragraph}</p>
                      ))}
                    </div>
                  </QuestionSet>
                ))}
            </TextBody>
          ) : props.sectionData.type === 'req' ? (
            <TextBody showing={true} key={"body" + i}>
              {props.requirements
                .filter((req, f) => req.headline && req.bodyText)
                .map((pair, p) => (
                  <RequirementSet bgColor={props.sectionData.style.backgroundColor} textColor={props.sectionData.style.color} arrived={arrived} key={(i + 1) * p}>
                    <div className="question">{pair.headline}</div>
                    <div className="answer">
                      {pair.bodyText.map((paragraph, r) => (
                        typeof paragraph === 'string' ? 
                        <p key={'req'+ r}>{paragraph}</p>
                        :
                        <p key={'req'+ r}>
                          <span style={{fontWeight: 'bold', display: 'block', textAlign: 'center', padding: '0.5rem'}}>
                            {paragraph.subheadline}
                          </span>
                          {paragraph.subtext}
                        </p>
                      ))}
                    </div>
                  </RequirementSet>
                ))}
            </TextBody>
          ) : props.sectionData.pricedServices ? (
            <SectionBody className={"services"} showing={true} key={i}>              
               <ServiceCard iconFilters={props.style.iconFilters} style={{ backgroundColor: slide.bgColor }}>
                <div className='card-top'>
                  {slide.images.center && (
                    <div>
                      <FadeImage className='service-icon' arrived={arrived} src={slide.images.center} />                  
                    </div>
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
          ) : (props.index === props.totalSections - 1) ? (
            <ContactTable key={i}>
              <div className='contact-row'>
              <div className='contact-label'>
                Phone:
              </div>              
              <div className='contact-value phone-number'>
                <a href={`tel:+1-${props.contactInfo.rawPhone}`}>
                  {props.contactInfo.phone}
                </a>
              </div>
              </div>
              
              <div className='contact-row'>
              <div className='contact-label'>
                Email:
              </div>
              <div className='contact-value'>
              <a href={`mailto:${props.contactInfo.email}`}>
                {props.contactInfo.emailName}@<br />{props.contactInfo.emailDomain}
              </a>
              </div>
              </div>

              <div className='contact-row address'>
                {props.contactInfo.address.map((line, i) =>
                  <div key={i}>{line}</div>                
                )}
              </div>
              <div ref={mapRef} className='google-map'>
                MAP GO HERE
              </div>
            </ContactTable>
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
        {props.sectionData.pricedServices &&
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
          <div style={{ color: props.sectionData.style.color }} className='service-note'>
            <span style={{ fontWeight: 'bold' }}>Note: </span>{props.sectionData.note}
          </div>
        </SectionBody>
        }
      </BodyScrollContainer>
      {props.slides.length > 4 && window.innerWidth < window.innerHeight && (
        <>
          <DotDisplay>
            {props.slides && props.slides.map((slide, i) => (
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
      <BottomPanel arrived={arrived} {...{ [window.CLICK_METHOD]: props.onClickNextPhase }}>
        {props.nextSectionTitle && (
          <DownArrow
            nextSectionTitle={props.nextSectionTitle}
            arrived={arrived}
          />
        )}
      </BottomPanel>
    </SectionContainer>
  );
}

function areEqual(prevProps, nextProps) {
  let index = nextProps.index;
  let equal = 
    (nextProps.phase !== index && prevProps.phase !== index);
  return equal;
}
export default React.memo(ScrollPanel, areEqual);
// export default ScrollPanel;
