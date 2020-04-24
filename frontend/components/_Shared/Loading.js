import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  display: inline-block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;

  div {
    position: absolute;
    background: #000;
    opacity: 1;
    border-radius: 50%;
    animation: loading 1.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  div:nth-child(2) {
    animation-delay: -.7s;
  }
  
  @keyframes loading {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}

`;

export default function Loading() {
  return (
    <Container>
      <div></div>
      <div></div>
    </Container>
  );
}
