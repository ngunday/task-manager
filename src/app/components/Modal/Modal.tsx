import { Cross2Icon } from '@modulz/radix-icons';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { HeaderButton } from '../Button/HeaderButton';
import { Z_INDEX_MENU } from '../../constants';
import { Modals, Modal as ModalData } from '../../model/UI';
import { dismissModal } from '../../store/slices/modal';
import { Launch } from './Launch/Launch';

interface Props {
  modal: ModalData;
}

export const Modal: React.FC<Props> = (props: Props) => {
  const { modal } = props;
  const dispatch = useDispatch();

  const renderModal = () => {
    switch (modal.type) {
      case Modals.Launch:
        return <Launch />;
    }
  };

  return (
    <Container>
      <ModalWindow>
        <Header>
          {modal.title}
          <CloseButton onClick={() => dispatch(dismissModal())}>
            <Cross2Icon />
          </CloseButton>
        </Header>
        <Body>{renderModal()}</Body>
      </ModalWindow>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  height: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: ${Z_INDEX_MENU};
  @keyframes blur {
    0% {
      backdrop-filter: blur(5px) opacity(0);
      opacity: 0;
    }
    100% {
      backdrop-filter: blur(5px) opacity(1);
      opacity: 1;
    }
  }
  animation: blur 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;
const ModalWindow = styled.div`
  background-color: ${({ theme }) => theme.palette.background2};
  border: 1px solid ${({ theme }) => theme.palette.background5};
  box-shadow: ${({ theme }) => `rgb(0 0 0 / 25%) 0px ${theme.px.xsmall} ${theme.px.xsmall}`};
  border-radius: ${({ theme }) => theme.radius.base};
  margin-top: 60px;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: fadeIn ${({ theme }) => theme.transition.base} forwards;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.px.base};
  border-bottom: 1px solid ${({ theme }) => theme.palette.background4};
  padding: ${({ theme }) => theme.px.base};
`;
const Body = styled.div`
  padding: ${({ theme }) => theme.px.base};
`;
const CloseButton = styled(HeaderButton)`
  margin-left: auto;
`;
