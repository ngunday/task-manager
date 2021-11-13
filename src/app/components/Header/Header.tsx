import React from 'react';
import { Box, H4, Icon } from '@openfin/ui-library';
import styled from 'styled-components';
import { _Window } from 'openfin/_v2/api/window/window';

let win: _Window | undefined;
if (typeof fin !== 'undefined') {
  win = fin.Window.getCurrentSync();
}

const maximize = async () => {
  const windowState = await win?.getState();
  if (windowState === 'maximized') {
    win?.restore();
  } else {
    win?.maximize();
  }
};

interface Props {
  title?: string;
}

export const Header: React.FC<Props> = (props: Props) => {
  const { title } = props;

  return (
    <Container alignItems="center" flexGrow={0}>
      <Heading>
        <LogoIcon icon="OpenFinIcon" /> {title}
      </Heading>
      <Controls justifyContent="space-between" gap="base">
        <MinimizeControl icon="MinusIcon" size="small" onClick={() => win?.minimize()} />
        <Control icon="SizeIcon" size="small" onClick={maximize} />
        <Control icon="Cross2Icon" size="small" onClick={() => win?.close()} />
      </Controls>
    </Container>
  );
};

const Container = styled(Box)`
  flex: 0 0 auto;
  height: ${({ theme }) => theme.px.xxxxlarge};
  margin: 0 ${({ theme }) => theme.px.xsmall};
  border-bottom: 1px solid ${({ theme }) => theme.palette.background4};
  user-select: none;
  -webkit-app-region: drag;
`;
const Heading = styled(H4)`
  display: flex;
  align-items: center;
  line-height: ${({ theme }) => theme.lineHeight.ui};
`;
const LogoIcon = styled(Icon)`
  margin: 0 ${({ theme }) => theme.px.base};
  width: ${({ theme }) => theme.px.large};
  height: ${({ theme }) => theme.px.large};
`;
const Controls = styled(Box)`
  margin-left: auto;
  margin-right: ${({ theme }) => theme.px.base};
`;
const Control = styled(Icon)`
  -webkit-app-region: no-drag;
  width: ${({ theme }) => theme.px.xlarge};
  height: ${({ theme }) => theme.px.xlarge};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.round};
  &:hover {
    background: ${({ theme }) => theme.palette.background2};
  }
  &:active {
    background: ${({ theme }) => theme.palette.background1};
  }
`;
const MinimizeControl = styled(Control)`
  align-items: flex-end;
`;
