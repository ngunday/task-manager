import { Box } from '@openfin/ui-library';
import * as React from 'react';
import styled from 'styled-components';

interface Props {
    manifest: any;
}

export const ManifestViewer: React.FC<Props> = (props) => {
    const { manifest } = props;
    return (
        <Container>
            <Body>
                <Viewer>
                    <CodeArea>{JSON.stringify(manifest, undefined, 2)}</CodeArea>
                </Viewer>
            </Body>
        </Container>
    );
};

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.palette.background1};
    border-radius: ${({ theme }) => theme.px.small};
`;
const Body = styled(Box)`
    display: flex;
    margin: ${({ theme }) => `${theme.px.base} 0`};
`;
const Viewer = styled(Box)`
    overflow: hidden auto;
    width: 600px;
    height: 220px;
`;
const CodeArea = styled.pre`
    user-select: text;
    white-space: pre-wrap;
    padding: 16px;
`;
