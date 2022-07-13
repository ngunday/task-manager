import { FC, useState, useEffect } from 'react';
import { Box, Icon } from '@openfin/ui-library';
import styled from 'styled-components';
import { _Window } from 'openfin/_v2/api/window/window';
import { HeaderButton } from '../Button/HeaderButton';

interface Props {
    title?: string;
}

export const Header: FC<Props> = ({ title }) => {
    const [window, setWindow] = useState<_Window | undefined>(undefined);

    useEffect(() => {
        if (typeof fin !== 'undefined') {
            setWindow(fin.Window.getCurrentSync());
        }
    }, []);

    const handleMinMax = async () => {
        if (window) {
            const windowState = await window.getState();
            if (windowState === 'maximized') {
                window.restore();
            } else {
                window.maximize();
            }
        }
    };

    return (
        <Container>
            <Heading>
                <OpenFinLogo icon={'OpenFinIcon'} size={'base'} />
                {title}
            </Heading>
            <Buttons>
                <MinimizeButton onClick={() => window?.minimize()}>
                    <Icon icon={'MinusIcon'} />
                </MinimizeButton>
                <HeaderButton onClick={handleMinMax}>
                    <Icon icon={'SizeIcon'} />
                </HeaderButton>
                <HeaderButton onClick={() => window?.close()}>
                    <Icon icon={'Cross2Icon'} />
                </HeaderButton>
            </Buttons>
        </Container>
    );
};

const Container = styled(Box)`
    display: flex;
    align-items: center;
    height: ${({ theme }) => theme.px.xxxxlarge};
    margin: 0 ${({ theme }) => theme.px.xsmall};
    border-bottom: 1px solid ${({ theme }) => theme.palette.background4};
    user-select: none;
    -webkit-app-region: drag;
`;
const Heading = styled.h4`
    display: flex;
    align-items: center;
    line-height: ${({ theme }) => theme.lineHeight.ui};
`;
const OpenFinLogo = styled(Icon)`
    margin: ${({ theme }) => `0 ${theme.px.small} 0 ${theme.px.base}`};
`;
const Buttons = styled(Box)`
    display: flex;
    margin-left: auto;
    margin-right: ${({ theme }) => theme.px.base};
    gap: ${({ theme }) => theme.px.base};
    -webkit-app-region: none;
`;
const MinimizeButton = styled(HeaderButton)`
    align-items: flex-end;
`;
