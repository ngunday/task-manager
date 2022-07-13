import { Box, Icon } from '@openfin/ui-library';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Z_INDEX_MENU } from '../../constants';
import { Modals } from '../../model/UI';
import { selectApplications } from '../../store/slices/applications';
import { showModal } from '../../store/slices/modal';
import { Label } from '../Label/Label';

export const ActionMenu: React.FC = () => {
    const dispatch = useDispatch();
    const applications = useSelector(selectApplications);

    const handleCloseAll = () => {
        applications
            .filter((app) => app.uuid !== fin.me.uuid)
            .forEach((app) => {
                const application = fin.Application.wrapSync({ uuid: app.uuid });
                try {
                    application.quit();
                } catch {
                    console.warn(`Unable to quit Application ${app.uuid}`);
                }
            });
    };

    return (
        <Container>
            <MenuButton text={'Actions'}>
                <Icon icon={'HamburgerMenuIcon'} />
            </MenuButton>
            <MenuBoundry>
                <Menu>
                    <MenuItem onClick={() => dispatch(showModal({ type: Modals.Launch, title: 'Launch Application' }))}>
                        <Icon icon={'RocketIcon'} />
                        <MenuItemName> Launch Application </MenuItemName>
                    </MenuItem>
                    <MenuItem onClick={() => fin.Application.getCurrentSync().quit()}>
                        <Icon icon={'TrashIcon'} />
                        <MenuItemName> Close All Applications </MenuItemName>
                    </MenuItem>
                    <MenuItem onClick={handleCloseAll}>
                        <Icon icon={'ExitIcon'} />
                        <MenuItemName> Quit Process Manager </MenuItemName>
                    </MenuItem>
                </Menu>
            </MenuBoundry>
        </Container>
    );
};

const MenuButton = styled(Label)`
    cursor: pointer;
`;
const MenuBoundry = styled(Box)`
    position: absolute;
    display: flex;
    visibility: hidden;
    height: 0;
    transition: height ${({ theme }) => theme.transition.base};
    cursor: pointer;
    z-index: ${Z_INDEX_MENU};
    left: ${({ theme }) => `-${theme.px.small}`};
    top: 6px;
`;
const Menu = styled(Box)`
    background-color: ${({ theme }) => theme.palette.background3};
    border: 1px solid ${({ theme }) => theme.palette.background5};
    border-radius: ${({ theme }) => theme.px.small};
    box-shadow: ${({ theme }) => `rgb(0 0 0 / 25%) 0px ${theme.px.xsmall} ${theme.px.xsmall}`};
    margin-top: ${({ theme }) => theme.px.xxlarge};
    overflow: hidden;
    flex: 1;
    flex-direction: column;
`;
const MenuItem = styled(Box)`
    width: 175px;
    padding: ${({ theme }) => theme.px.small};
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color ${({ theme }) => theme.transition.base};
    &:hover {
        background-color: ${({ theme }) => theme.palette.brandPrimaryHover};
    }
    &:active {
        background-color: ${({ theme }) => theme.palette.brandPrimaryActive};
    }
`;
const MenuItemName = styled.span`
    margin-left: ${({ theme }) => theme.px.xsmall};
`;
const Container = styled(Box)`
    position: relative;
    display: flex;
    &:hover ${MenuBoundry} {
        visibility: visible;
        height: 128px;
    }
`;
