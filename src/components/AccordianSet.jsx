import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const AccordianContainer = styled.div`
  --base-transition-delay: ${props => (props.instant ? '0ms' : 'calc(var(--shift-speed) / 2)')};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
  /* z-index: 2; */
`;
const AccordianMember = styled.div`
  font-family: var(--main-font);
  padding: 1rem;
  padding-bottom: ${props => (props.open ? 0 : '1rem')};
  /* min-height: calc(var(--main-font-size) * 4); */
  height: auto;
  width: 100%;
  box-sizing: content-box;
  border-radius: var(--card-radius);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #00000030;
  box-shadow: var(--med-box-shadow);
  background-color: #ffffff12;
  /* transition: transform 400ms ease, opacity 400ms ease; */
  & * {
    pointer-events: none;
  }

  & > .member-title {
    font-size: var(--main-font-size);
    pointer-events: all;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    align-items: center;
  }
  & > .member-title > .title-text {
    padding-right: 0.5rem;
  }
  & .accordian-toggle-button {
    width: calc(var(--main-font-size) * 2);
    min-width: calc(var(--main-font-size) * 2);
    height: calc(var(--main-font-size) * 2);
    display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;
    transform-origin: center;
    transform: ${props => (props.open ? `rotate(180deg)` : `none`)};
    transition: transform 180ms ease;
    font-weight: bold;
    /* background: #00000022;
    border-radius: 50%; */
  }
  & > .member-contents {
    padding: 0.25rem;
    ${props => props.open ? 
    `
      transition: transform 300ms ease, opacity 300ms ease;
      height: initial;
      opacity: 1;
      transform: none;
      `
      : 
      `
      height: 0;
      opacity: 0;
      transform: translateY(-1rem);
    `}
  }
  & > .member-contents:not(.opened) {
    display: none;
  }
  & > .member-contents.opened {
    display: block;
  }
`;

const CascadeContainer = styled('div')` 

  &.animated {
    transform: ${props => (props.arrived ? 'none' : 'translateX(8%)')};
    opacity: ${props => (props.arrived ? '1' : '0')};
    transition: transform 500ms ease, opacity 500ms ease;
  }
`;

function AccordianSet(props) {
  const [membersOpen, setMembersOpen] = useState([]);
  const [clickable, setClickable] = useState(false);
  const [arrived, setArrived] = useState(false);

  const toggleMemberOpen = (e, memberId) => {  
    let contentsEl = e.target.nextSibling;
    if (!membersOpen.includes(memberId)) {
      requestAnimationFrame(() => {
        contentsEl.classList.add('opened');
        setTimeout(() => {
          let newMembers = [...membersOpen];
          newMembers.push(memberId);
          setMembersOpen(newMembers);
        }, 1);
      })
    } else {
      let newMembers = membersOpen.filter(memb => memb !== memberId);
      setMembersOpen(newMembers);
      setTimeout(() => {
        contentsEl.classList.remove('opened');
      }, 1);
    }
    
  };

  useEffect(() => {
    if (props.inView) {
      props.sectionRef.current.scrollTo({
        top: 0
      });
      requestAnimationFrame(() => {
        setTimeout(() => {
          setClickable(true);
        }, 500);
        setArrived(true);
        setClickable(false);
        setMembersOpen([]);
      });      
    } else {
      setArrived(false);
    }
    return () => setArrived(false);
  }, [props.inView, props.sectionRef]);

  const itemList = useCallback(() => {
    let list = [];
    props.items.forEach((item, i) => {
      list[i] = {};
      list[i].title = Object.values(item)[0];
      list[i].contents = Object.values(item)[1];
    });
    return list;
  }, [props.items])

  return (
    <AccordianContainer instant={props.instant}>
      {membersOpen &&
        itemList().map((item, i) => (
          <CascadeContainer
            className={`cascader${i < 8 && ' animated'}`}
            // instant={props.instant}
            key={i}
            arrived={arrived}
            style={{
              transitionDelay: `calc(var(--base-transition-delay) + ${i * 100}ms)`
              // transitionDelay: '2000ms !important'
            }}
          >
            <AccordianMember id={`${props.type}-accordian-${i}`} open={membersOpen.length && membersOpen.includes(item.title)}>
              <div className='member-title' id={`${props.type}-accordian-${i}-title`} onClick={clickable ? e => toggleMemberOpen(e, item.title) : () => null}>
                <div className='title-text'>{item.title}</div>
                <div className='accordian-toggle-button' id={`${props.type}-accordian-toggle-button-${i}`}>
                  V
                </div>
              </div>
              {true && (
                <div id={`member-${i}-contents`} className='member-contents'>
                  {arrived && item.contents.map((para, p) => <p key={`${props.type}-accordian-${i}-${p}`}>{para}</p>)}
                </div>
              )}
            </AccordianMember>
          </CascadeContainer>
        ))}
    </AccordianContainer>
  );
}

export default AccordianSet;
