import styled, { keyframes } from "styled-components";

const LogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const DashboardContainer = styled.div`
  text-align: center;
`;

export const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const Logo = styled.img`
  animation: ${LogoSpin} infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
`;


export const Link = styled.a`
  color: #61dafb;
`;
