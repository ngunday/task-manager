import React from 'react';
import { SortOrder, SortField } from '../../model/UI';
import { useSelector } from 'react-redux';
import { selectSortMode } from '../../store/slices/sorting';
import { Icon } from '@openfin/ui-library';

interface Props {
    field: SortField;
}

export const SortIcon: React.FC<Props> = (props: Props) => {
    const { field } = props;
    const sortMode = useSelector(selectSortMode);

    if (sortMode.field === field) {
        return <Icon icon={sortMode.order === SortOrder.Descending ? 'ArrowUpIcon' : 'ArrowDownIcon'} size={'small'} />;
    }
    return <></>;
};
