import React from 'react';
import styled from 'styled-components';
import { LapTimerIcon, StackIcon, GearIcon, IdCardIcon } from '@modulz/radix-icons';

export const ListHeader: React.FC = () => {
  return (
    <Container>
      <RightBar>
        <Cell> 
          <GearIcon/>
          <CellText> Runtime </CellText> 
        </Cell>
        <CompactCell> 
          <LapTimerIcon/> 
          <CellText> CPU </CellText>  
        </CompactCell>
        <Cell> 
          <StackIcon/>
          <CellText> Memory </CellText> 
        </Cell>
        <Cell> 
          <IdCardIcon/>
          <CellText> Process </CellText> 
        </Cell>
      </RightBar>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => `${theme.px.base} 0`};
  align-items: center;
  top: 0;
  position: sticky;
  backdrop-filter: blur(15px);
`;
const RightBar = styled.div`
  padding-right: ${({ theme }) => theme.px.small};
  margin-left: auto;
  display: flex;
  flex-direction: row;
`;
const Cell = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
`
const CompactCell = styled(Cell)`
  width: 60px;
`
const CellText = styled.span`
  padding-left: ${({theme}) => theme.px.xsmall};
`;
