import React from 'react';
import styled from 'styled-components';
import { setSortMode } from '../../store/slices/sorting';
import { SortField } from '../../model/UI';
import { useDispatch } from 'react-redux';
import { SortIcon } from '../SortIcon/SortIcon';
import { Z_INDEX_HEADER } from '../../constants';
import { Box, Icon } from '@openfin/ui-library';

export const ListHeader: React.FC = () => {
    const dispatch = useDispatch();

    const handleCPUSort = () => {
        dispatch(setSortMode(SortField.Cpu));
    };

    const handleMemorySort = () => {
        dispatch(setSortMode(SortField.Memory));
    };

    return (
        <Container>
            <RightBar>
                <Cell>
                    <Icon icon={'GearIcon'} />
                    <CellText> Runtime </CellText>
                </Cell>
                <CompactCell clickable={true} onClick={handleCPUSort}>
                    <SortIcon field={SortField.Cpu} />
                    <Icon icon={'LapTimerIcon'} />
                    <CellText> CPU </CellText>
                </CompactCell>
                <Cell clickable={true} onClick={handleMemorySort}>
                    <SortIcon field={SortField.Memory} />
                    <Icon icon={'StackIcon'} />
                    <CellText> Memory </CellText>
                </Cell>
                <CompactCell>
                    <Icon icon={'IdCardIcon'} />
                    <CellText> PID </CellText>
                </CompactCell>
            </RightBar>
        </Container>
    );
};

const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    padding: ${({ theme }) => `${theme.px.base} ${theme.px.base} ${theme.px.xsmall} ${theme.px.base}`};
    align-items: center;
    top: 0;
    position: sticky;
    backdrop-filter: blur(15px);
    z-index: ${Z_INDEX_HEADER};
`;
const RightBar = styled(Box)`
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
