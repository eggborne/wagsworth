import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
require('console-green');

const ImageCarouselContainer = styled.div`
  /* --image-width: ${props => props.titlePhotoSize.width};
  --image-height: ${props => props.titlePhotoSize.height}; */
  width: 100vw;
  height: min-content;
  color: #ddd;
  display: grid;
  grid-template-columns: var(--header-height) 1fr var(--header-height);
  align-content: center;
  opacity: ${props => (props.landed ? 1 : 0)};
  transform: ${props => (props.landed ? 'scale(1)' : 'scale(0.9)')};
  transition: transform 500ms ease, opacity 800ms ease;
  transition-delay: 200ms;

  &.loading {
    /* opacity: 0; */
  }
  max-width: calc(var(--image-width) + (var(--header-height) * 2));

  @media screen and (orientation: landscape) {
  }
`;
const ImageContainer = styled.div`
  /* max-height: 100%; */
  width: 100%;
  color: #ddd;
  display: flex;
  align-items: center;
  align-self: start;
  
  transform: translateX(calc(var(--image-width) * ${props => props.imageSelected * -1}))};
  transition: transform 500ms ease, opacity 500ms ease;
`;
const TitlePhoto = styled.div`
  width: var(--image-width);
  height: var(--image-height);
  border-radius: var(--card-radius);
  opacity: ${props => (props.selected ? 1 : 0)};
  transform: ${props => (props.selected ? 'scale(1)' : 'scale(0.85)')};
  transition: transform 300ms ease, opacity 300ms ease;
  box-shadow: 0 0 12px #101010;
  box-sizing: border-box;
  & .selected {
    opacity: 1;
  }
  @media screen and (orientation: landscape) {
  }
`;
const Arrow = styled.div`
  box-sizing: border-box;
  width: 0;
  height: 0;
  border-left: 1.5rem solid rgba(255,255,255,0);
  border-right: 1.5rem solid rgba(255,255,255,0);
  border-top: 2rem solid var(--arrow-color);
  opacity: ${props => (props.landed ? 0.25 : 0)};
  transition: opacity 1000ms ease;
  transition-delay: calc(var(--shift-speed) / 2);
  filter: drop-shadow(0 0 1px #000000);
`;
const LeftArrow = styled(Arrow)`
  transform: rotate(90deg);
`;
const RightArrow = styled(Arrow)`
  transform: rotate(-90deg);
`;
const ArrowPanel = styled.div`
  position: absolute;
  width: calc(var(--header-height) * 0.8);
  /* height: calc(var(--header-height) * 1.2); */
  height: 100%;
  border-radius: 2vmin;
  margin: calc(var(--header-height) * 0.05);
  align-self: center;
  /* transform: rotate(180deg) translateX(42vw); */
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #00000028; */
  font-family: sans-serif;
  font-size: 8vw;
  color: #ffffff55;
  pointer-events: all;
  z-index: 1;
  opacity: ${props => props.showing ? 1 : 0};
  pointer-events: ${props => props.showing ? 'all' : 'none'};
  transition: opacity 500ms ease;

  &:last-child {
    right: 0;
  }
`;

function ImageCarousel(props) {
  const [imageSelected, setImageSelected] = useState(0);
  useEffect(() => {
    // document.getElementById('title-carousel').classList.remove('loading');
  }, []);
  useEffect(() => {
    props.touchHandler.swipeActions.west = (e) => {
      let currentImage = parseInt(e.target.id.split('-')[2]);
      if (currentImage < props.imageList.length - 1) {
        setImageSelected(currentImage + 1);
      }
    }
    props.touchHandler.swipeActions.east = (e) => {
      let currentImage = parseInt(e.target.id.split('-')[2]);
      if (currentImage > 0) {
        setImageSelected(currentImage - 1)
      }
    }
  }, [props.touchHandler]);

  return (
    <ImageCarouselContainer id='title-carousel' titlePhotoSize={props.titlePhotoSize} imageSelected={imageSelected} landed={props.landed} className='loading'>
      <ArrowPanel showing={imageSelected > 0} {...{ [window.CLICK_METHOD]: () => setImageSelected(imageSelected - 1) }}>
        <LeftArrow landed={props.landed} />
      </ArrowPanel>
      <div></div>
      <ImageContainer imageSelected={imageSelected}>
        {props.imageList.map((image, i) => {
          if (i === 0 || props.lazyLoaded) {
          return (<TitlePhoto
            id={`title-photo-${i}`}
            key={i}
            style={{
              backgroundImage: `url('${image.url}')`,
              backgroundPositionX: image.crop.x,
              backgroundPositionY: image.crop.y,
              backgroundSize: 'cover'
            }}
            selected={imageSelected === i}
          />)
          }
        })}
      </ImageContainer>
      <div></div>
      <ArrowPanel showing={imageSelected < props.imageList.length - 1} {...{ [window.CLICK_METHOD]: () => setImageSelected(imageSelected + 1) }}>
        <RightArrow landed={props.landed} />
      </ArrowPanel>
    </ImageCarouselContainer>
  );
}

function areEqual(prevProps, nextProps) {
  let equal =
    prevProps.landed === nextProps.landed
    && prevProps.lazyLoaded === nextProps.lazyLoaded
  ;
  return equal;
}

export default React.memo(ImageCarousel, areEqual);
