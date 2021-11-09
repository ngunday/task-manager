import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  index: number;
  selected?: boolean;
  onSelect?: (index: number) => void;
}

export const Tab: React.FC<Props> = (props: Props) => {
  const {title, selected = false, index, onSelect} = props;

  const handleSelect = () => {
    onSelect && onSelect(index);
  }

  return <Container onClick={handleSelect} selected={selected}> {title} </Container>;
}

const Container = styled.div<{selected: boolean}>`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme, selected }) => selected ? theme.palette.textDefault : theme.palette.textInactive};
  background-color: ${({ theme, selected }) => selected ? theme.palette.background5 : 'transparent'};
  padding: ${({ theme }) => `${theme.px.xsmall} ${theme.px.base}`};
  border-radius: ${({ theme }) => `${theme.radius.small}`};
  transition: ${({ theme }) => `background-color ${theme.transition.base}, color ${theme.transition.base}`};
  text-transform: capitalize;
`