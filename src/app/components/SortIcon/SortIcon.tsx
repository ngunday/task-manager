import React from 'react';
import styled from 'styled-components';
import { ArrowDownIcon, ArrowUpIcon } from '@modulz/radix-icons';
import { SortOrder, SortField } from '../../model/UI';
import { useSelector } from 'react-redux';
import { selectSortMode } from '../../store/slices/sorting';

interface Props {
  field: SortField;
}

export const SortIcon: React.FC<Props> = (props: Props) => {
  const { field } = props;
  const sortMode = useSelector(selectSortMode);

  if (sortMode.field === field) {
    return sortMode.order === SortOrder.Descending ? <Descending /> : <Ascending />;
  }
  return <></>;
};

// 12px is too large and 8px is too small. Can't use theme here.
const Descending = styled(ArrowUpIcon)`
  width: 10px;
`;
const Ascending = styled(ArrowDownIcon)`
  width: 10px;
`;
