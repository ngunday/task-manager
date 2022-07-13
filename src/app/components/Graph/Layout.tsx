import { Box, Icon } from '@openfin/ui-library';
import { useEffect, useState, FC } from 'react';
import styled from 'styled-components';
import { Window } from '../../model/Shapes';
import { Label } from '../Label/Label';

interface Props {
    window: Window;
}

export const Layout: FC<Props> = (props: Props) => {
    const { window } = props;
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const height = 120;
        const width = 120 * (window.bounds.width / window.bounds.height);
        setSize({ width, height });
    }, [window]);

    return (
        <Container>
            <Label text={'Layout'}>
                <Icon icon={'ViewHorizontalIcon'} />
            </Label>
            <LayoutContainer
                width={size.width}
                height={size.height}
                viewBox={`0 0 ${window.bounds.width} ${window.bounds.height}`}
                xmlns={'http://www.w3.org/2000/svg'}
            >
                {window.views.map((view, i) => (
                    <View
                        x={view.bounds.left}
                        y={view.bounds.top}
                        width={view.bounds.width}
                        height={view.bounds.height}
                        key={`${view.uuid}-${view.name}-${i}`}
                    />
                ))}
            </LayoutContainer>
        </Container>
    );
};

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    min-width: 268px;
    justify-content: flex-start;
`;
const LayoutContainer = styled.svg`
    border: 1px solid ${({ theme }) => theme.palette.inputDisabled};
    margin-top: ${({ theme }) => theme.px.xsmall};
`;
const View = styled.rect`
    stroke: ${({ theme }) => theme.palette.inputDisabled};
    stroke-width: 5;
    fill: ${({ theme }) => theme.palette.background6};
    fill-opacity: 0.2;
`;
