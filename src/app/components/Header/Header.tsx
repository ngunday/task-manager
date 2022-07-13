import React from 'react';
import { Icon } from '@openfin/ui-library';
import styled from 'styled-components';
import { _Window } from 'openfin/_v2/api/window/window';
import { Cross2Icon, MinusIcon, SizeIcon } from '@modulz/radix-icons';
import { HeaderButton } from '../Button/HeaderButton';

interface Props {
    title?: string;
}

export const Header: React.FC<Props> = (props: Props) => {
    const { title } = props;
    const [window, setWindow] = React.useState<_Window | undefined>(undefined);

    React.useEffect(() => {
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
                <LogoIcon icon="OpenFinIcon" />
                {title}
            </Heading>
            <Buttons>
                <MinimizeButton onClick={() => window?.minimize()}>
                    <MinusIcon />
                </MinimizeButton>
                <HeaderButton onClick={handleMinMax}>
                    <SizeIcon />
                </HeaderButton>
                <HeaderButton onClick={() => window?.close()}>
                    <Cross2Icon />
                </HeaderButton>
            </Buttons>
        </Container>
    );
};

const Container = styled.div`
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
const LogoIcon = styled(Icon)`
    margin: 0 ${({ theme }) => theme.px.base};
    width: ${({ theme }) => theme.px.large};
    height: ${({ theme }) => theme.px.large};
`;
const Buttons = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: ${({ theme }) => theme.px.base};
    gap: ${({ theme }) => theme.px.base};
    -webkit-app-region: none;
`;
const MinimizeButton = styled(HeaderButton)`
    align-items: flex-end;
`;
