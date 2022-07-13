import { Box } from '@openfin/ui-library';
import { useEffect, useState, FC } from 'react';
import styled from 'styled-components';

interface Props {
    manifest: unknown;
}

export const ManifestViewer: FC<Props> = ({ manifest }) => {
    const [manifestString, setManifestString] = useState('');

    useEffect(() => {
        let manifestStr;
        try {
            manifestStr = JSON.stringify(manifest, undefined, 2);
        } catch (e) {
            manifestStr = 'Error: Unable to parse manifest.';
        }
        setManifestString(manifestStr);
    }, [manifest]);

    return (
        <Container>
            <Body>
                <Viewer>
                    <CodeArea>{manifestString}</CodeArea>
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
