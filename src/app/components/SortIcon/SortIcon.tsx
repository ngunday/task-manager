import { FC } from 'react';
import { SortOrder, SortField } from '../../model/UI';
import { useSelector } from 'react-redux';
import { selectSortMode } from '../../store/slices/sorting';
import { Icon } from '@openfin/ui-library';

interface Props {
    field: SortField;
}

export const SortIcon: FC<Props> = ({ field }) => {
    const sortMode = useSelector(selectSortMode);

    if (sortMode.field === field) {
        return <Icon icon={sortMode.order === SortOrder.Descending ? 'ArrowUpIcon' : 'ArrowDownIcon'} size={'small'} />;
    }
    return <></>;
};
