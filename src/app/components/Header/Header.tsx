import { FC, PropsWithChildren, useContext } from 'react';
import { Box, Icon, IconType } from '@openfin/ui-library';
import styled from 'styled-components';
import { HeaderButton } from '../Button/HeaderButton';
import { WindowContext } from '../../utils/window';

interface Props {
    title?: string;
    icon?: IconType;
}

export const Header: FC<PropsWithChildren<Props>> = ({ title, icon, children }) => {
    const window = useContext(WindowContext);

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
                <Logo icon={icon ? icon : 'OpenFinIcon'} size={'base'} />
                {title}
            </Heading>
            <Content>
                {children}
                <MinimizeButton title="Minimize" onClick={() => window?.minimize()}>
                    <Icon icon={'MinusIcon'} />
                </MinimizeButton>
                <HeaderButton title="Maximize/Restore" onClick={handleMinMax}>
                    <Icon icon={'SizeIcon'} />
                </HeaderButton>
                <HeaderButton title="Close" onClick={() => window?.close()}>
                    <Icon icon={'Cross2Icon'} />
                </HeaderButton>
            </Content>
        </Container>
    );
};

const Container = styled(Box)`
    display: flex;
    align-items: center;
    height: ${({ theme }) => `${theme.unit.xxxlarge + theme.unit.small}px`};
    margin: 0 ${({ theme }) => theme.px.xsmall};
    user-select: none;
    -webkit-app-region: drag;
`;
const Heading = styled.h4`
    display: flex;
    align-items: center;
    line-height: ${({ theme }) => theme.lineHeight.ui};
`;
const Logo = styled(Icon)`
    margin: ${({ theme }) => `0 ${theme.px.small} 0 ${theme.px.base}`};
`;
const Content = styled(Box)`
    display: flex;
    margin-left: auto;
    margin-right: ${({ theme }) => theme.px.base};
    -webkit-app-region: none;
`;
const MinimizeButton = styled(HeaderButton)`
    align-items: flex-end;
`;
