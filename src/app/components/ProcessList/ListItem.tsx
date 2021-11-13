import React from 'react';
import styled from 'styled-components';
import { ChevronDownIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@modulz/radix-icons';
import { formatMemory } from '../../utils/formatMemory';
import { Action, Pill as PillData } from '../../model/Shapes';
import { Pill } from '../Pill/Pill';
import { PulseGraph } from '../PulseGraph/PulseGraph';
import { IconButton } from '../Button/IconButton';
import { DefinitionList } from '@openfin/ui-library';

interface Props {
  name: string;
  pulseId?: string;
  icon?: JSX.Element;
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
    pulseId,
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
    details,
    actions,
  } = props;

  const [showDetails, setShowDetails] = React.useState(false);
  const [detailsMap, setDetailsMap] = React.useState<Map<string, string> | undefined>();
  const [actionList, setActionList] = React.useState<Action[]>([]);

  React.useEffect(() => {
    setDetailsMap(
      new Map<string, string>(details.length > 0 ? details.filter((detail) => detail[0] && detail[1]) : undefined)
    );
  }, [details]);

  React.useEffect(() => {
    setActionList([
      {
        active: showDetails,
        icon: <MagnifyingGlassIcon />,
        action: () => setShowDetails(!showDetails),
        tooltip: showDetails ? 'Hide Details' : 'Show Details',
      },
      ...actions,
    ]);
  }, [actions, showDetails]);

  const handleExpand = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    onExpand && onExpand();
  };

  return (
    <Container showingDetails={showDetails} onClick={handleExpand}>
      <Info indentation={indentation}>
        <Chevron>
          {onExpand && (
            <IconButton icon={expanded ? <ChevronDownIcon /> : <ChevronRightIcon />} action={onExpand} transparent />
          )}
        </Chevron>
        {icon}
        <Name>{name}</Name>
        {typePill && <TypePill {...typePill} />}
        {warning && <WarningPill {...warning} />}
        <RightBar>
          <Actions>
            {actionList.map((action, index) => (
              <IconButton
                icon={action.icon}
                tooltip={action.tooltip}
                active={action.active}
                action={action.action}
                key={`${name}-${action.active ? '' : 'in'}active-action-${index}`}
              />
            ))}
          </Actions>
          {runtime !== undefined && <Cell> {runtime} </Cell>}
          {cpuUsage !== undefined && <CompactCell> {(cpuUsage || 0.0).toFixed(1)}% </CompactCell>}
          {memUsage !== undefined && <Cell> {formatMemory(memUsage || 0.0, 1)} </Cell>}
          <CompactCell> {pid} </CompactCell>
        </RightBar>
      </Info>
      {showDetails && (
        <DetailsContainer>
          {detailsMap && (
            <DetailsListContainer>
              <Details definitions={detailsMap} indentation={indentation} />
            </DetailsListContainer>
          )}
          {pulseId && (
            <GraphContainer>
              <PulseGraph uuid={pulseId} />
            </GraphContainer>
          )}
        </DetailsContainer>
      )}
    </Container>
  );
};
const Actions = styled.div`
  display: flex;
  padding-left: ${({ theme }) => theme.px.xxxlarge};
  overflow-x: hidden;
  transition: opacity ${({ theme }) => theme.transition.base};
  width: 0;
  opacity: 0;
`;
const TypePill = styled(Pill)`
  width: ${({ theme }) => theme.px.base};
  min-width: ${({ theme }) => theme.px.base};
  transition: all ${({ theme }) => theme.transition.base};
  font-size: ${({ theme }) => theme.fontSize.small};
`;
const WarningPill = styled(Pill)`
  padding: ${({ theme }) => `${theme.px.xsmall} ${theme.px.small}`};
  background-color: ${({ theme }) => theme.palette.statusCritical};
`;
const Container = styled.div<{ showingDetails: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  transition: background-color ${({ theme }) => theme.transition.base};
  background-color: ${({ theme, showingDetails }) => (showingDetails ? theme.palette.background2 : 'transparent')};
  border-top: ${({ theme, showingDetails }) => (showingDetails ? `1px solid ${theme.palette.background5}` : 'none')};
  border-bottom: ${({ theme, showingDetails }) => (showingDetails ? `1px solid ${theme.palette.background5}` : 'none')};
  padding: ${({ theme }) => `0 ${theme.px.base}`};
  &:hover {
    background-color: ${({ theme }) => theme.palette.background3};
  }
  &:hover ${TypePill} {
    width: 85px;
    min-width: 85px;
  }
  &:hover ${Actions} {
    width: auto;
    opacity: 1;
  }
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const GraphContainer = styled.div`
  margin: ${({ theme }) => theme.px.small};
  display: flex;
  justify-content: flex-end;
`;
const DetailsListContainer = styled.div`
  flex: 1;
`;
const Details = styled(DefinitionList)<{ indentation: number }>`
  margin-left: ${({ theme, indentation }) => `${theme.unit.xxlarge * indentation}px`};
  padding-left: ${({ theme }) => theme.px.xxxlarge};
`;
const Info = styled.div<{ indentation: number }>`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => `${theme.px.base} 0`};
  margin-left: ${({ theme, indentation }) => `${theme.unit.xxlarge * indentation}px`};
  align-items: center;
  cursor: pointer;
`;
const Chevron = styled.div`
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
  width: 85px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
`;
const CompactCell = styled(Cell)`
  width: 65px;
`;
