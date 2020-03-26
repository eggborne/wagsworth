import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components/macro";
import AccordianSet from './AccordianSet.jsx';
import {DownArrow} from '../App.js';
import { randomInt, getQuote } from '../scripts/quotes.js';

// import "./FilledScrollPanel.css";

let swipeToScroll = true;
let shiftSpeed = 420;

// const borderUrl = require("../assets/borders/fancyborder512.png");
const borderUrl = require("../assets/borders/pawprintborder.png");

// const googleMapHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2801.544366522556!2d-122.7430284839197!3d45.39836124585416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549572e65fe21c41%3A0x419967e7f5602b9c!2sThe%20Scooby%20Shack!5e0!3m2!1sen!2sus!4v1573525146909!5m2!1sen!2sus" frameborder="0" style="border:0;" allowfullscreen></iframe>`
let googleMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178936.0853006728!2d-122.86713118207858!3d45.51256804064862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549572e65fe21c41%3A0x419967e7f5602b9c!2sThe%20Scooby%20Shack!5e0!3m2!1sen!2sus!4v1575891664169!5m2!1sen!2sus`;
// let googleMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2802.439953545423!2d-122.76585714857394!3d45.380295278997565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549572844a2c2c13%3A0x63ed1a9386f69e73!2s19300%20SW%20Boones%20Ferry%20Rd%2C%20Tualatin%2C%20OR%2097062!5e0!3m2!1sen!2sus!4v1585256962847!5m2!1sen!2sus`;

if (window.FILL_FIELDS) {
  googleMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d826.2231081929783!2d-118.401788270736!3d34.072271609666956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc06fc44af25%3A0xfe38f831b8cb930a!2s9390%20N%20Santa%20Monica%20Blvd%2C%20Beverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1577345192150!5m2!1sen!2sus`;
}
const FilledSectionContainer = styled.section`  
  box-sizing: content-box;
  width: 100%;
  position: relative;
  height: var(--section-height);
    max-height: calc(var(--view-height) - var(--header-height));

  display: grid;  
  grid-template-columns: 1fr;
  grid-template-rows: 
    auto
    1fr 
    auto
  ;
  /* grid-template-columns: var(--header-height) 1fr var(--header-height); */
  justify-items: center;
  align-items: center;
  font-size: var(--main-font-size);
  color: #ddd;
  font-family: var(--main-font);
  pointer-events: none;
  box-shadow: 0 0 2px solid black !important;
  /* opacity: 0; */
  /* overflow: hidden; */
  
  .scroll-panel-container.leaving * {
    transition-duration: 0ms !important;
    /* opacity: 1 !important; */
    /* transform: none !important; */
  }
  .scroll-panel-container.instant * {
    /* transition-delay: 0ms !important; */
  }
  &.leaving * {
    /* transition-duration: 0ms !important; */
    /* opacity: 1 !important; */
    /* transform: none !important; */
  }

  &.instant *:not(.cascader) {
    transition-delay: 0ms !important;
  }
  
  &:last-of-type {
    & * {
      pointer-events: ${props => (props.arrived ? 'all' : 'none')};
    }
    &::before {
      display: none;
    }
  }
  /* &:last-of-type:not(.landed) {
    opacity: 0.1 !important;
  } */
  & * {
    pointer-events: none;
    box-sizing: border-box;
  }
  & > div {
    grid-column-start: 0;
    grid-column-end: span 3;
    visibility: ${props => (!props.landed ? 'hidden' : 'visible')};
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
    background-repeat: unset !important;
    border-style: solid;
    border-width: var(--actual-border-width);
    border-color: white;
    border-image-source: url(${borderUrl});
    border-image-slice: 50%;
    border-image-width: var(--actual-border-width);
    z-index: 2;
    pointer-events: none;
    /* will-change: transform; */
    ${props => props.style.fancyBorderFilters};
  }
  
  @media screen and (orientation: landscape) {

    /* &:last-of-type {
      height: var(--section-height);      
      grid-template-rows: 
        var(--section-header-height)
        auto 
        calc(var(--footer-height) * 1.5);
      ;
    } */
    &::before {
      height: calc(100% - var(--paper-margin) - var(--footer-height));
    }

  }
`;
const SectionTitle = styled.header`
  grid-column-start: 0;
  grid-column-end: span 3;
  opacity: ${props => (props.arrived ? '1' : '0')};
  /* transform: ${props => (props.arrived ? 'none' : 'translateY(15%)')}; */
  transform: ${props => (props.arrived ? 'none' : 'scale(1.2)')};
  text-align: center;
  /* color: var(--title-text-color); */
  font-family: var(--title-font);
  /* font-size: var(--title-font-size); */
  /* font-size: ${props => props.long ? 'calc(var(--title-font-size) / 1.25)' : 'var(--title-font-size)'}; */
  font-size: ${props => parseInt(props.strLength) < 14 ? 'var(--title-font-size)' : `calc(var(--title-font-size) * 0.75)`};
  padding-top: ${props => parseInt(props.strLength) < 14 ? '0' : 'calc(var(--paper-margin) * 2) !important'};
  /* font-size: var(--title-font-size); */
  align-self: stretch;
  justify-self: stretch;
  display: flex;
  /* visibility: ${props => (props.landed ? 'visible' : 'hidden')}; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-shadow: 2px 2px 1vw #15151577;
  padding-top: calc(var(--paper-margin) / 2);
  overflow: visible;
  z-index: 12;
  /* ${props => props.long && 
    `padding-top: calc(var(--paper-margin)); 
    font-size: calc(var(--title-font-size) / 1.25);`
  } */
  transition: transform 800ms ease, opacity 800ms ease;
  transition-delay: calc(var(--shift-speed) / 2);
  height: var(--section-header-height);

  /* ${props => props.last && 'visibility: hidden; height: 0 !important;'} */
  ${props => props.last && 'display: none;'}

  @media screen and (orientation: landscape) {    
    font-size: var(--title-font-size);
  }
`;
const SectionHeadline = styled.div`
  top: calc(var(--header-height));
  font-family: var(--title-font);
  opacity: ${props => (props.arrived ? "1" : "0")};
  transform: ${props => (props.arrived ? "none" : "scale(0.9)")};
  font-size: calc(var(--title-font-size) * 0.6);
  transition: transform 800ms ease, opacity 800ms ease;
  transition-delay: calc(var(--shift-speed) / 1.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  text-align: center;
  width: max-content;
  height: calc(var(--header-height) * 1.25);
  @media screen and (orientation: landscape) {
    /* font-size: var(--main-font-size); */
    /* width: 50%; */
  }
`;
const CardHeadline = styled(SectionHeadline)`
  height: unset;
  font-family: var(--title-font);
  font-size: calc(var(--title-font-size) * 0.8);
`;
const SectionBody = styled.div`
  /* padding: calc(var(--section-height) / 16) calc(var(--main-width) * 0.115); */
  width: var(--main-width);
  &.services {
    padding: calc(var(--portrait-border-width) / 3) calc(var(--portrait-border-width) / 2);
  }
  &.services:last-of-type {
    /* padding-bottom: calc(var(--section-height) / 24); */
    /* padding-bottom: 0; */
  }
  & > .service-label {
    font-size: calc(var(--title-font-size) * 0.75);
    width: 100%;
    text-align: center;
    padding-bottom: calc(var(--header-height) / 4);
  }

  & > .service-note {
    font-size: var(--main-font-size);
    font-size: calc(var(--main-font-size) / 1.05);
    font-style: italic;
    /* box-shadow: 1px 4px 16px 1px rgba(0, 0, 0, 0.12), 4px -3px 4px -2px rgba(0, 0, 0, 0.15); */
    box-shadow: var(--small-box-shadow);
    padding: 1rem;
    border-radius: var(--card-radius);
    font-family: var(--main-font);
    /* width: 100%; */
    margin-top: calc(var(--header-height) / 2);
    background-color: #ffffff12;
    color: #101010;
  }

  @media screen and (orientation: landscape) {
    &.services {
      padding: calc(var(--landscape-border-width) / 3) calc(var(--landscape-border-width) / 1.5);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    & > .service-note {
      width: calc(var(--main-width) / 1.5);
    }
  }
`;
const BodyScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props =>
    props.last
      ? `calc(
      var(--section-height) - var(--footer-height)
    )`
      : `calc(
      var(--section-height) - var(--section-header-height) - var(--section-footer-height)
    )`};
  overflow-y: scroll;
  /* will-change: transform; */
  pointer-events: all !important;

  &.fade-edges::after {
    position: absolute;
    content: '';
    width: var(--main-width);
    height: calc(
      var(--section-height) - var(--section-header-height) - var(--section-footer-height) + 4px
    );
    transform: translateY(-2px);
    box-shadow: 
      inset 0 calc(var(--section-header-height) / 4) calc(var(--section-header-height) / 4) 0 ${props => props.bgColor},
      inset 0 calc(var(--section-header-height) / -4) calc(var(--section-header-height) / 4) 0 ${props => props.bgColor}
    ;
    z-index: 1;
    pointer-events: none;
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
  border: 1px solid #00000230;
  box-shadow: var(--med-box-shadow);
  
  & > .card-top {
    grid-column-end: span 2;
    justify-self: stretch;
    display: flex;
    align-items: center;
  }
  
  & > .card-top > div:first-of-type {
    /* margin-right: calc(var(--section-height) / 24); */
  }
  
  & > .card-top > .card-headline {
    flex-grow: 1;
    margin: 0;
    display: unset;
    line-height: 100%;
    line-height: calc(var(--main-font-size) * 1.75);
    padding-left: 1rem;
  }

  & .card-body {
    justify-self: stretch;
    padding: 0 !important;
  }
  & .card-body p {
    align-self: stretch;
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
    width: calc(var(--main-width) / 1.5);
    padding: calc(var(--section-height) / 20);
    align-self: center;
    justify-self: center;
  }
`;
const TextBody = styled.div`
  /* padding: calc(var(--section-height) / 24) calc(var(--main-width) * 0.125); */
  /* padding: calc(var(--section-height) / 24) calc(var(--main-width) * 0.1); */
  padding: calc(var(--portrait-border-width) / 3) calc(var(--portrait-border-width) / 2);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--main-width);
  font-size: calc(var(--main-font-size) * 1.1);

  &.faq-text-body {
    padding-top: 0;
  }
  & p {
    align-self: stretch;
  }
  &.requirements-text-body {
    
  }
  & > .requirements-note {
    font-size: calc(var(--main-font-size) / 1.05);
    font-style: italic;
    /* box-shadow: 1px 4px 16px 1px rgba(0,0,0,0.12), 4px -3px 4px -2px rgba(0,0,0,0.15); */
    box-shadow: var(--small-box-shadow);
    background-color: #ffffff12;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: var(--card-radius);
    font-family: var(--main-font);
    width: 100%;
    color: #101010;
    opacity: 0;
    transform: scale(0.95);
    transition: transform 600ms ease, opacity 600ms ease;
    transition-delay: calc(var(--shift-speed));
    /* will-change: transform, opacity; */
  }
  & .requirements-note.arrived {
    transform: none;
    opacity: 1;
  }

  @media screen and (orientation: landscape) {
    padding: calc(var(--landscape-border-width) / 2) calc(var(--landscape-border-width) / 1.5);

    & .requirements-note {
      min-width: unset;
      width: calc(var(--main-width) / 1.5);
    }
  }
`;
const SectionText = styled.summary`
  font-family: var(--main-font);
  opacity: ${props => (props.arrived ? "1" : "0")};
  transform: ${props =>
    props.arrived ? "none" : "translateY(calc(var(--section-height) / 36))"};
  transition: transform 600ms ease, opacity 600ms ease;
  transition-delay: calc(var(--shift-speed));
  /* will-change: transform, opacity; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
    align-items: center;
    justify-content: space-between;
    padding: var(--main-padding);
    font-weight: bold;
  }
  & >div > div:last-child {

  }
`;

const ContactTable = styled.div`
  position: relative;
  font-family: var(--main-font);
  font-weight: bold;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr 1fr;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  justify-items: center;
  width: 100%;
  height: 100%;
  pointer-events: all;
  /* margin-top: calc(var(--section-height) / 20); */
  padding-top: calc(var(--section-height) / 20);
  
  & * {
    pointer-events: all;
  }
  & a {
    color: #008;
  }
  & address {
    font-style: normal;
  }
  & > .contact-row {
    position: relative;
    padding: 0.5rem 0.75rem;
    border-radius: var(--card-radius);
    width: calc(var(--header-height) * 4);
    min-width: calc(var(--header-height) * 4);
    border: 1px solid ${props => props.textColor + '55'};
    z-index: 2;
  }
  & .contact-label {
    position: absolute;
    top: -0.75rem;
    left: 0.5rem;
    z-index: 1;
    background-color: ${props => props.bgColor};
  }
  & .contact-value {
    text-align: right;
    line-height: 1.25;
  }
  & .address {
    padding: 0;
    border: 0;
    box-shadow: none;
    width: auto;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  & .phone-number {
    font-size: 1.5rem;
  }
  & #user-map {
    position: relative;
    width: var(--main-width);
    width: 100vw;
    height: 100vw;
    background: var(--header-color);
    background: black;
    ${props => props.mapLoaded && `display: ${props.landed ? 'block' : 'none'};`};
    transition: opacity 300ms ease;
    transition-delay: var(--shift-speed);
    background-color: #101010;
  }
  & #map-loading-message {
    position: absolute;
    width: inherit;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
  }
  & #map-loading-message > span {
    animation-name: wave;
    animation-duration: 1000ms;
    animation-play-state: running;
    animation-iteration-count: infinite;
  }
  & #google-map-frame {
    width: 100%;
    min-height: 100%;
    border: 0;
    box-shadow: 0 0 12px #00000077;
    border-radius: 1rem;
    transform: scale(0.95);
    transition: opacity 600ms ease, transform 600ms ease;
  }
  & #google-map-frame.loading {
    opacity: 0;
    transform: scale(0.85);
  }
  @media screen and (orientation: landscape) {
    padding: calc(var(--section-height) / 20);
    width: var(--main-width);
    height: 100%;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto 1fr;
      max-height: 100%;


    & > .contact-row {
      grid-column-start: 1;
      min-width: 15rem !important;
      max-width: 15rem !important;
    }
    & #user-map {
      width: 100%;
      /* max-width: 100%; */
      grid-column-start: 2;
      grid-row-start: 1;
      grid-row-end: span 3;
      height: unset;
      justify-self: stretch;

      /* width: var(--main-width); */

    }
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
  pointer-events: ${swipeToScroll ? 'all' : 'none'};
  transition: opacity 600ms ease;
  z-index: 6;
  font-family: var(--title-font);

  /* ${props => props.last && 'visibility: hidden; height: 0 !important;'} */
  ${props => props.last && 'display: none'}

  @media screen and (orientation: landscape) {
    padding-bottom: var(--footer-height);
  }
`;
const PanelDownArrow = styled(DownArrow)`
  & ::before {
    content: "${props => props.nextSectionTitle}";
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
  transition-delay: calc(var(--shift-speed));
  /* will-change: transform, opacity; */
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
  transition-delay: calc(var(--shift-speed));
  justify-self: flex-start;
    margin-bottom: 2vh;

  & :last-of-type {
    /* margin-bottom: 4vh; */
  }

  & > .question {
    padding: 0.5rem 0.75rem;
    border-radius: var(--card-radius);
    /* font-size: 1.05em; */
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
    font-size: 1.15em;
    border: none;
    text-align: center;
  }
`;

const LoadingIcon = styled.div`
  width: var(--footer-height);
  height: var(--footer-height);
  border-radius: 50%;
  background: #101010;

`;


function FilledScrollPanel(props) {
  const [displayData, setDisplayData] = useState(props.sectionData);
  const [arrived, setArrival] = useState(false);
  const [debuted, setDebuted] = useState(false);
  const [transition, setTransition] = useState("in");
  const [slideShowing, setSlide] = useState(0);
  const [atEnd, setAtEnd] = useState('top');
  const replenishFiller = () => {
    let newDisplayData = { ...props.sectionData };
    // newDisplayData.title = getQuote({
    //   minWords: 0,
    //   maxWords: 3,
    //   // noEndPeriod: true
    // });
    for (let category in newDisplayData) {
      // console.log('cat is', category);
      // console.log(category, 'value is', newDisplayData[category]);
      // console.warn('----------------------------')
    }
    // console.log('new is', newDisplayData)
    setDisplayData(newDisplayData);
  }
  useEffect(() => {
    if (props.sectionData) {
      // replenishFiller();    
    }
  }, [props.sectionData, arrived]);
  useEffect(() => {
    if (props.landed) {
      if (!props.mapLoaded && props.lastSection) {
        requestAnimationFrame(() => {
          document.querySelector('#google-map-frame').addEventListener('load', e => {
            e.target.classList.remove('loading');
            let loadMessage = document.querySelector('#map-loading-message');
            loadMessage.parentElement.removeChild(loadMessage);
            props.setMapLoaded();
          });
        });
      }
      
      props.sectionData.ref.current.scrollTo({
        top: 0
      });
      setTransition('in');
      setArrival(true);
      if (!debuted) {
        setDebuted(true);
      }
      setTimeout(() => {
        setTransition(false);
      }, shiftSpeed / 2);
    }
    
    return () => {
      if (props.landed) {
        setTransition('out');
        setArrival(false);
        setTimeout(() => {
          setTransition(false);
        }, shiftSpeed / 2);
      }
    };
  }, [props.landed]);
  let leaving = transition === "out";
  let containerClass = "scroll-panel-container";
  if (leaving) {
    containerClass += " leaving";
  }
  if (props.instant || Math.abs(props.lastPhase - props.phase) > 1) {
    containerClass += " instant";  
  }
  // let fadeEdges = props.sectionData.pricedServices || props.sectionData.type === 'faq' || props.sectionData.type === 'req' || displayData.title === 'About Me';
  let fadeEdges = !props.lastSection;
  const sectionDisplayData = displayData;
  // console.log('filled scroll panel', props.index, 'has displaysata', displayData)
  return (
    <FilledSectionContainer scrollable={props.scrollable} arrived={arrived} landed={props.landed} title={sectionDisplayData.title} fadeEdges={fadeEdges} style={props.style} className={containerClass}>
      <SectionTitle strLength={sectionDisplayData.title.length} arrived={arrived} landed={props.landed} last={props.lastSection} long={sectionDisplayData.title.length > 11}>
        {sectionDisplayData.title}
      </SectionTitle>
      <BodyScrollContainer
        id={`section-${props.index}`}
        sectionData={sectionDisplayData}
        ref={sectionDisplayData.ref}
        // style={{ transform: `translateX(${slideShowing * -window.innerWidth}px)` }}
        slides={props.slides}
        bgColor={props.style.backgroundColor}
        className={fadeEdges ? 'fade-edges' : ''}
        last={props.lastSection}
        >
        {/* {(props.landed || (props.lastSection && debuted)) && */}
        {true &&
          sectionDisplayData.slides &&
          sectionDisplayData.slides.map((slide, i) =>
          sectionDisplayData.type === 'faq' ? (
            <TextBody className='faq-text-body' key={'body' + i}>
            {props.faqs && <SectionHeadline arrived={arrived}>Frequently Asked Questions</SectionHeadline>}
            <AccordianSet sectionRef={sectionDisplayData.ref} instant={props.instant} inView={props.landed && !props.menuOn} type='faqs' items={props.faqs} />
            </TextBody>
            ) : sectionDisplayData.type === 'req' ? (
              <TextBody className='requirements-text-body' key={'body' + i}>
                  <div style={{ color: props.sectionData.style.color }} className={arrived ? 'requirements-note arrived' : 'requirements-note'}>{sectionDisplayData.legend}</div>
                {props.requirements
                  .filter((req, f) => req.headline && req.bodyText)
                  .map((pair, p) => (
                    <RequirementSet bgColor={sectionDisplayData.style.backgroundColor} textColor={sectionDisplayData.style.color} arrived={arrived} key={(i + 1) * p}>
                      <div className='question'>{pair.headline}</div>
                      <div className='answer'>
                        {pair.bodyText.map((paragraph, r) =>
                          typeof paragraph === 'string' ? (
                            <p key={'req' + r}>{paragraph}</p>
                          ) : (
                            <p key={'req' + r}>
                              <span style={{ fontWeight: 'bold', display: 'block', textAlign: 'center', padding: '0.5rem' }}>{paragraph.subheadline}</span>
                              {paragraph.subtext}
                            </p>
                          )
                        )}
                      </div>
                    </RequirementSet>
                  ))}
              </TextBody>
            ) : sectionDisplayData.pricedServices ? (
              <SectionBody className={'services'} key={i}>
                <ServiceCard iconFilters={props.style.iconFilters} style={{ backgroundColor: slide.bgColor }}>
                  <div className='card-top'>
                    {slide.images.center && (
                      <div>
                        <FadeImage className='service-icon' arrived={arrived} src={slide.images.center} />
                      </div>
                    )}
                    {slide.headline && (
                      <CardHeadline className='card-headline' arrived={arrived}>
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
            ) : props.lastSection ? (
              <ContactTable landed={props.landed} mapLoaded={props.mapLoaded} id='contact-table' key={i} bgColor={props.style.backgroundColor} textColor={props.style.color}>
                {props.landed && (
                  <>
                    <div className='contact-row'>
                      <div className='contact-label'>Phone:</div>
                      <div className='contact-value phone-number'>
                        <a href={`tel:+1-${props.contactInfo.phone}`}>{props.contactInfo.phoneString}</a>
                      </div>
                    </div>
                    <div className='contact-row'>
                      <div className='contact-label'>Email:</div>
                      <div className='contact-value'>
                        <a href={`mailto:${props.contactInfo.email}`}>
                          {props.contactInfo.emailName}@<br />
                          {props.contactInfo.emailDomain}
                        </a>
                      </div>
                    </div>
                    <address className='contact-row address'>
                      {props.contactInfo.address.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </address>
                  </>
                )}
                <div id='user-map'>
                  <div id='map-loading-message'>
                    <span>LOADING MAP...</span>
                  </div>
                  <iframe id='google-map-frame' className='loading' title='google-map' src={debuted ? googleMapUrl : ''}></iframe>
                </div>
              </ContactTable>
            ) : (
              <TextBody key={i}>
                <SectionText key={i} arrived={arrived}>
                  {slide.lowerText.map((paragraph, r) => (
                    <p key={r}>{paragraph}</p>
                  ))}
                </SectionText>
              </TextBody>
            )
          )}
        {sectionDisplayData.pricedServices && (
          <SectionBody className='services'>
            <div className='service-label'>A La Carte</div>
            <ServiceTable>
              {sectionDisplayData.pricedServices.map(service => (
                <div key={service.name}>
                  <div>{service.name}</div>
                  <div>{service.price}</div>
                </div>
              ))}
            </ServiceTable>
            <div style={{ color: sectionDisplayData.style.color }} className='service-note'>
              <span style={{ fontWeight: 'bold' }}>Note: </span>
              {sectionDisplayData.note}
            </div>
          </SectionBody>
        )}
      </BodyScrollContainer>
      {props.landed && (
        <BottomPanel arrived={arrived} {...{ [window.CLICK_METHOD]: props.onClickNextPhase }} last={props.lastSection}>
          {props.nextSectionTitle && <PanelDownArrow landed={props.landed} nextSectionTitle={props.nextSectionTitle} arrived={arrived} />}
        </BottomPanel>
      )}
    </FilledSectionContainer>
  );
}

function areEqual(prevProps, nextProps) {
  let index = nextProps.index;
  let equal =
    nextProps.phase !== index
    && prevProps.phase !== index
    && prevProps.sectionData === nextProps.sectionData
    // && prevProps.nextSectionTitle === nextProps.nextSectionTitle
    // && prevProps.landed === nextProps.landed
    // && prevProps.instant === nextProps.instant
  ;
  return equal;
}
export default React.memo(FilledScrollPanel, areEqual);
// export default FilledScrollPanel;
