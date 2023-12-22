import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  color: string;
  children: ReactNode;
}

interface StyledIconProps {
  background: string;
}

export default function Icon({ color, children }: Props) {
  return <StyledIcon background={color}>{children}</StyledIcon>;
}

const StyledIcon = styled.div<StyledIconProps>`
  height: 3.5rem;
  width: 3.5rem;
  background: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  color: white;
  cursor: pointer;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
