import { Icon, IconType } from '@openfin/ui-library';
import React from 'react';
import { BaseButton, BaseButtonProps } from './BaseButton';

interface Props extends BaseButtonProps {
    icon: IconType;
}

export const IconButton: React.FC<Props> = ({ icon, ...rest }) => {
    return (
        <BaseButton {...rest}>
            <Icon icon={icon} />
        </BaseButton>
    );
};
