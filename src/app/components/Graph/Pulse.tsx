import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectAppPulse } from '../../store/slices/pulse';
import { PULSE_HISTORY_LENGTH } from '../../constants';
import { Label } from '../Label/Label';
import { TimerIcon } from '@modulz/radix-icons';

interface Props {
  uuid: string;
}

export const Pulse: React.FC<Props> = (props: Props) => {
  const { uuid } = props;
  const pulse = useSelector(selectAppPulse(uuid));

  return (
    <Container>
      <Label icon={<TimerIcon />} text={'Performance'} />
      <GraphContainer>
        <InnerContainer>
          <Graph xmlns={'http://www.w3.org/2000/svg'}>
            <Grids>
              <Grid id={'innerGrid'} width={12} height={12} patternUnits={'userSpaceOnUse'}>
                <GridLines d={'M 12 0 L 0 0 0 12'} />
              </Grid>
              <Grid id={'outerGrid'} width={60} height={60} patternUnits={'userSpaceOnUse'}>
                <InnerGrid />
                <OuterLines d={'M 60 0 L 0 0 0 60'} />
              </Grid>
            </Grids>
            <OuterGrid />
            <Data
              points={pulse
                .map((usage, i) => {
                  const x = (PULSE_HISTORY_LENGTH - pulse.length + i) * 4 + 2;
                  const y = Math.max(100 - usage, 0) * 1.2;
                  return `${x}, ${y}`;
                })
                .join(',')}
            />
          </Graph>
          <TimeLegend>
            <LegendPoint>60s</LegendPoint>
            <LegendPoint>30s</LegendPoint>
            <LegendPoint>now</LegendPoint>
          </TimeLegend>
        </InnerContainer>
        <UsageLegend>
          <LegendPoint>100%</LegendPoint>
          <LegendPoint>50%</LegendPoint>
          <LegendPoint>0%</LegendPoint>
        </UsageLegend>
      </GraphContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${({ theme }) => theme.px.xsmall};
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const UsageLegend = styled.div`
  height: 126px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 2px;
`;
const TimeLegend = styled.div`
  width: 241px;
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
`;
const LegendPoint = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
`;
const Graph = styled.svg`
  width: 241px;
  height: 121px;
`;
const Grids = styled.defs``;
const Grid = styled.pattern``;
const GridLines = styled.path`
  stroke: gray;
  fill: none;
  stroke-width: 0.5;
`;
const OuterLines = styled(GridLines)`
  stroke-width: 1;
`;
const InnerGrid = styled.rect`
  fill: url('#innerGrid');
  width: 60px;
  height: 60px;
`;
const OuterGrid = styled.rect`
  width: 100%;
  height: 100%;
  fill: url('#outerGrid');
`;
const Data = styled.polyline`
  fill: none;
  stroke: ${({ theme }) => theme.palette.statusSuccess};
`;
