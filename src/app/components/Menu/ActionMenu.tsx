import { ExitIcon, HamburgerMenuIcon, TrashIcon } from '@modulz/radix-icons';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectApplications } from '../../store/slices/applications';
import { Label } from '../Label/Label';

export const ActionMenu: React.FC = () => {
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

  const handleQuit = () => {
    fin.Application.getCurrentSync().quit();
  };

  return (
    <Container>
      <Label icon={<HamburgerMenuIcon />} text={'Actions'} />
      <MenuBoundry>
        <Menu>
          <MenuItem onClick={handleCloseAll}>
            <TrashIcon />
            <MenuItemName> Close All Applications </MenuItemName>
          </MenuItem>
          <MenuItem onClick={handleQuit}>
            <ExitIcon />
            <MenuItemName> Quit Process Manager </MenuItemName>
          </MenuItem>
        </Menu>
      </MenuBoundry>
    </Container>
  );
};

const MenuBoundry = styled.div`
  position: absolute;
  display: flex;
  visibility: hidden;
  height: 0;
  transition: height ${({ theme }) => theme.transition.base};
  z-index: 200;
  left: ${({ theme }) => `-${theme.px.small}`};
  // No suitable value for this in the theme
  top: 6px;
`;
const Menu = styled.div`
  background-color: ${({ theme }) => theme.palette.background3};
  border: 1px solid ${({ theme }) => theme.palette.background5};
  border-radius: ${({ theme }) => theme.px.small};
  box-shadow: ${({ theme }) => `rgb(0 0 0 / 25%) 0px ${theme.px.xsmall} ${theme.px.xsmall}`};
  margin-top: ${({ theme }) => theme.px.xxlarge};
  overflow: hidden;
  flex: 1;
`;
const MenuItem = styled.div`
  width: 175px;
  padding: ${({ theme }) => theme.px.small};
  display: flex;
  align-items: center;
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
const Container = styled.div`
  position: relative;
  display: flex;
  &:hover ${MenuBoundry} {
    visibility: visible;
    height: 94px;
  }
`;
