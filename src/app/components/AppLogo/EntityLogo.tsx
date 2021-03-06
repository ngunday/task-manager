import { FC } from 'react';
import styled from 'styled-components';
import { Icon, IconSizeType, FontSize } from '@openfin/ui-library';
import { generateHslColor } from '../../utils/generateHslColor';
import { useLoaded } from '../../hooks/useLoaded';
import { LoadState } from '../../model/UI';

interface Props {
    src: string;
    alt: string;
    size?: IconSizeType;
    tooltip?: boolean;
}

export const EntityLogo: FC<Props> = ({ src, alt, tooltip, size }) => {
    const imageState = useLoaded(src);
    const initials = alt?.substring(0, 1);
    const hasImg = !!src;
    const hasImgNotFailing = hasImg && imageState !== LoadState.Error;
    const title = !hasImgNotFailing && tooltip ? alt : undefined;
    const backgroundColor = !hasImgNotFailing ? generateHslColor(alt) : 'transparent';

    return (
        <LogoIcon src={src} size={size} backgroundColor={backgroundColor} title={title}>
            {!hasImgNotFailing && initials}
        </LogoIcon>
    );
};

const LogoIcon = styled(Icon)<Omit<Props, 'alt'> & { backgroundColor: string }>`
    flex-shrink: 0;
    user-select: none;
    border-radius: ${({ theme }) => theme.radius.small};
    background-image: url(${({ src }) => src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: ${({ backgroundColor }) => backgroundColor};
    margin-right: ${({ theme }) => theme.px.small};
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    font-size: ${({ size }) => FontSize[size as keyof typeof FontSize]};
    place-content: center;
    place-items: center;
`;
