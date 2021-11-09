import React from 'react';
import styled from 'styled-components';
import { AppLogo } from '../AppLogo/AppLogo';
import { ChevronDownIcon, ChevronRightIcon, FileTextIcon } from '@modulz/radix-icons';
import { formatMemory } from '../../utils/formatMemory';
import { Action, Pill as PillData } from '../../model/Shapes';
import { Pill } from '../Pill/Pill';
import { ActionBar } from '../ActionBar/ActionBar';
import { DefinitionList } from '@openfin/ui-library';

interface Props {
  name: string;
  icon?: string | PillData;
  cpuUsage?: number;
  memUsage?: number;
  pid?: number;
  runtime?: string;
  expanded?: boolean;
  indentation?: number;
  onExpand?: () => void;
  indicator?: PillData;
  warning?: PillData;
  actions: Action[];
  details: [string, string][];
}

export const ListItem: React.FC<Props> = (props: Props) => {
  const {
    name,
    icon = '',
    cpuUsage,
    memUsage,
    runtime,
    pid,
    indentation = 0,
    expanded = false,
    onExpand,
    details,
    indicator,
    warning,
    actions} = props;
  const [focused, setFocused] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);

  React.useEffect(() => {
    if (focused && details.length > 0) {
      const id = setTimeout(() => setShowDetails(true), 1000);
      return () => clearTimeout(id)
    } else {
      setShowDetails(false);
    }
  }, [focused]);

  return (
    <Container onMouseEnter={()=>{setFocused(true)}} onMouseLeave={() => {setFocused(false)}}>
      <Info>
        {indentation > 0 && Array.from(Array(indentation).keys()).map((i) => <Indentation key={`${name}-ind-${i}`}/>)}
        <Chevron onClick={onExpand}>
          {onExpand ? (expanded ? <ChevronDownIcon /> : <ChevronRightIcon />) : <></>}
        </Chevron>
        {typeof icon === 'string' ?
          <AppLogo src={icon || ''} size="xlarge" alt={name} /> : 
          <Pill {...icon} fixed/>
        }
        <Name>{name}</Name>
        {indicator && <>
          <Pill {...indicator} fixed/>
        </>}
        {warning && <>
          <Pill {...warning} warning/>
        </>}
        <RightBar>
          {focused && <ActionBar actions={actions}/>}
          <Cell> {runtime} </Cell>
          <CompactCell> {(cpuUsage||0.0).toFixed(1)}% </CompactCell>
          <Cell> {formatMemory(memUsage||0.0, 1)} </Cell>
          <Cell> {pid} </Cell>
        </RightBar>
      </Info>
      {/* {showDetails && <Details>
        <DetailsBanner> <DetailsIcon/> Details </DetailsBanner>
        <DefinitionList definitions={new Map(details)}/>
      </Details>} */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  transition: background-color ${({theme}) => theme.transition.base};
  &:hover {
    background-color: ${({theme}) => theme.palette.background2};
  }
`
const Details = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize.small};
  line-height: ${({ theme }) => theme.px.base};
  padding: ${({ theme }) => `0 ${theme.px.xxlarge}`};
`
const DetailsBanner = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => ` ${theme.px.xsmall} ${theme.px.base}`};
`
const DetailsIcon = styled(FileTextIcon)`
  width: ${({ theme }) => theme.px.base};
  height: ${({ theme }) => theme.px.base};
  margin-right: ${({ theme }) => theme.px.xsmall};
`;
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
