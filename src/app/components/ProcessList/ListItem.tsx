import React from 'react';
import styled from 'styled-components';
import { AppLogo } from '../AppLogo/AppLogo';
import { ChevronDownIcon, ChevronRightIcon, FileTextIcon } from '@modulz/radix-icons';
import { formatMemory } from '../../utils/formatMemory';
import { Action, Pill as PillData } from '../../model/Shapes';
import { Pill } from '../Pill/Pill';
import { ActionBar } from '../ActionBar/ActionBar';

interface Props {
  name: string;
  icon?: string;
  cpuUsage?: number;
  memUsage?: number;
  pid?: number;
  runtime?: string;
  expanded?: boolean;
  indentation?: number;
  onExpand?: () => void;
  typePill?: PillData;
  warning?: PillData;
  actions: Action[];
  details: [string, string][];
}

export const ListItem: React.FC<Props> = (props: Props) => {
  const {
    name,
    icon,
    cpuUsage,
    memUsage,
    runtime,
    pid,
    indentation = 0,
    expanded = false,
    onExpand,
    typePill,
    warning,
    actions} = props;

  return (
    <Container>
      <Info>
        {indentation > 0 && Array.from(Array(indentation).keys()).map((i) => <Indentation key={`${name}-ind-${i}`}/>)}
        <Chevron onClick={onExpand}>
          {onExpand ? (expanded ? <ChevronDownIcon /> : <ChevronRightIcon />) : <></>}
        </Chevron>
        {icon !== undefined && <AppLogo src={icon || ''} size="xlarge" alt={name} />}
        <Name>{name}</Name>
        {typePill && <>
          <TypePill {...typePill}/>
        </>}
        {warning && <>
          <WarningPill {...warning}/>
        </>}
        <RightBar>
          <Actions actions={actions}/>
          {runtime !== undefined && <Cell> {runtime} </Cell>}
          {cpuUsage !== undefined && <CompactCell> {(cpuUsage||0.0).toFixed(1)}% </CompactCell>}
          {memUsage !== undefined && <Cell> {formatMemory(memUsage||0.0, 1)} </Cell>}
          <Cell> {pid} </Cell>
        </RightBar>
      </Info>
    </Container>
  );
}
const Actions = styled(ActionBar)`
  transition: opacity ${({theme}) => theme.transition.base};
  width: 0;
  opacity: 0;
`;
const TypePill = styled(Pill)`
  /* width: ${({theme}) => theme.px.base};
  min-width: ${({theme}) => theme.px.base}; */
  width: 0;
  min-width: 0;
  transition: all ${({theme}) => theme.transition.base};
  font-size: ${({theme}) => theme.fontSize.small};
`
const WarningPill = styled(Pill)`
  padding: ${({theme}) => `${theme.px.xsmall} ${theme.px.small}`};
  background-color: ${({theme}) => theme.palette.statusCritical};
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  transition: background-color ${({theme}) => theme.transition.base};
  &:hover {
    background-color: ${({theme}) => theme.palette.background2};
  };
  &:hover ${TypePill} {
    width: 85px;
    min-width: 85px;
  };
  &:hover ${Actions} {
    width: auto;
    opacity: 1;
  };
`
const Info = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => `${theme.px.base} 0`};
  align-items: center;
  cursor: pointer;
`;
const Indentation = styled.div`
  width: ${({ theme }) => theme.px.large};
  height: ${({ theme }) => theme.px.large};
  min-width: ${({ theme }) => theme.px.large};
`;
const Chevron = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.px.xsmall};
  width: ${({ theme }) => theme.px.xxlarge};
  height: ${({ theme }) => theme.px.xxlarge};
  min-width: ${({ theme }) => theme.px.xxlarge};
`;
const Name = styled.span`
  margin-right: ${({ theme }) => theme.px.base};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
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
