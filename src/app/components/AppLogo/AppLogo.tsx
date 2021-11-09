import * as React from 'react';
import styled from 'styled-components';
import { Icon, IconSizeType, FontSize } from '@openfin/ui-library';
import { generateHslColor } from '../../utils/generateHslColor';
import { useLoaded } from '../../hooks/useLoaded';
import { LoadState } from '../../model/Shapes';

interface Props {
  src: string;
  alt: string;
  size?: IconSizeType;
  tooltip?: boolean;
}

export const AppLogo: React.FC<Props> = (props: Props) => {
  const {
    src,
    alt,
    tooltip,
    size
  } = props;
  const imageState = useLoaded(src);
  const initials = alt?.substr(0, 1);
  const hasImg = !!src;
  const hasImgNotFailing = hasImg && imageState !== LoadState.ERROR;
  const title = !hasImgNotFailing && tooltip ? alt : undefined;
  const backgroundColor = !hasImgNotFailing ? generateHslColor(alt) : 'transparent';

  return (
    <LogoIcon
      src={src}
      size={size}
      backgroundColor={backgroundColor}
      title={title}
    >
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

