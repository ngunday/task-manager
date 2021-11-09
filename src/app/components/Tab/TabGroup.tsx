import React from 'react';
import styled from 'styled-components';
import { Tab } from './Tab';

export interface TabInfo {
  title: string;
}

interface Props {
  onChange?: (tab: TabInfo) => void;
  tabs: TabInfo[];
}

export const TabGroup: React.FC<Props> = (props: Props) => {
  const {tabs, onChange} = props;
  const [selected, setSelected] = React.useState(0);

  const handleChange = (index: number) => {
    setSelected(index);
    onChange && onChange(tabs[index]);
  }

  return (
    <Container>
      {tabs.map((tab, index) => (
        <Tab title={tab.title} index={index} key={`tab-${tab.title}-${index}`} selected={selected === index} onSelect={handleChange}/>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: ${({theme}) => theme.px.base};
`;