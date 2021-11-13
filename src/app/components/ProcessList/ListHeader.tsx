import React from 'react';
import styled from 'styled-components';
import { LapTimerIcon, StackIcon, GearIcon, IdCardIcon } from '@modulz/radix-icons';
import { setSortMode } from '../../store/slices/sorting';
import { SortField } from '../../model/Shapes';
import { useDispatch } from 'react-redux';
import { SortIcon } from '../SortIcon/SortIcon';

export const ListHeader: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <RightBar>
        <Cell>
          <GearIcon />
          <CellText> Runtime </CellText>
        </Cell>
        <CompactCell clickable={true} onClick={() => dispatch(setSortMode(SortField.CPU))}>
          <SortIcon field={SortField.CPU} />
          <LapTimerIcon />
          <CellText> CPU </CellText>
        </CompactCell>
        <Cell clickable={true} onClick={() => dispatch(setSortMode(SortField.MEMORY))}>
          <SortIcon field={SortField.MEMORY} />
          <StackIcon />
          <CellText> Memory </CellText>
        </Cell>
        <CompactCell>
          <IdCardIcon />
          <CellText> PID </CellText>
        </CompactCell>
      </RightBar>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => `${theme.px.base} ${theme.px.base} ${theme.px.xsmall} ${theme.px.base}`};
  align-items: center;
  top: 0;
  position: sticky;
  backdrop-filter: blur(15px);
  z-index: 100;
`;
const RightBar = styled.div`
  padding-right: ${({ theme }) => theme.px.small};
  margin-left: auto;
  display: flex;
  flex-direction: row;
`;
const Cell = styled.div<{ clickable?: boolean }>`
  width: 85px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
`;
const CompactCell = styled(Cell)`
  width: 65px;
`;
const CellText = styled.span`
  padding-left: ${({ theme }) => theme.px.xsmall};
`;
