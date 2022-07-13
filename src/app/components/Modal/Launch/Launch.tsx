import { Box, Button, TextInput } from '@openfin/ui-library';
import { FC, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { dismissModal } from '../../../store/slices/modal';
import { urlToName } from '../../../utils/url';
import { IconButton } from '../../Button/IconButton';

export const Launch: FC = () => {
    const dispatch = useDispatch();
    const [launchFromManifest, setLaunchFromManifest] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleLaunch = async () => {
        if (inputRef.current) {
            const url = inputRef.current.value;
            try {
                if (launchFromManifest) {
                    fin.Application.startFromManifest(url);
                } else {
                    const name = urlToName(url);
                    fin.Application.start({
                        uuid: name,
                        name,
                        url,
                        mainWindowOptions: {
                            defaultHeight: 500,
                            defaultWidth: 420,
                            defaultTop: 120,
                            defaultLeft: 120,
                            saveWindowState: false,
                            autoShow: true,
                        },
                    });
                }
            } catch (e) {
                console.error(`Could not start application at ${url} (${e})`);
            } finally {
                dispatch(dismissModal());
            }
        }
    };

    return (
        <Container>
            {launchFromManifest ? 'Manifest URL' : 'Site URL'}
            <Body>
                <Input
                    ref={inputRef}
                    autoFocus
                    placeholder={
                        launchFromManifest ? 'https://my.application.com/app.json' : 'http://my.application.com/'
                    }
                />
                <Switch>
                    <IconButton
                        action={() => setLaunchFromManifest(true)}
                        tooltip={'Launch application from manifest'}
                        active={launchFromManifest}
                        large
                        icon={'FileTextIcon'}
                    />
                    <IconButton
                        action={() => setLaunchFromManifest(false)}
                        tooltip={'Launch application from site url'}
                        active={!launchFromManifest}
                        icon={'Link1Icon'}
                        large
                    />
                </Switch>
            </Body>
            <Buttons>
                <Button onClick={handleLaunch}>Launch</Button>
                <Button kind={'secondary'} onClick={() => dispatch(dismissModal())}>
                    Cancel
                </Button>
            </Buttons>
        </Container>
    );
};

const Input = styled(TextInput)`
    min-width: 300px;
`;
const Container = styled(Box)`
    display: flex;
    flex-direction: column;
`;
const Body = styled(Box)`
    display: flex;
    margin: ${({ theme }) => `${theme.px.base} 0`};
`;
const Buttons = styled(Box)`
    display: flex;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.px.small};
`;
const Switch = styled(Box)`
    display: flex;
    gap: ${({ theme }) => theme.px.small};
    margin-left: ${({ theme }) => theme.px.small};
`;
