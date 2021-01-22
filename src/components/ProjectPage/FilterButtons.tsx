import React from 'react';
import { FilterButton } from './FilterButton';

interface Props {
    children?: any[],
    userId?:string
}

export function FilterButtons({ children, userId }: Props) {

  return <div style={{ marginLeft:'10%', width:'100%', textAlign: 'left'}} >
     <FilterButton >C++</FilterButton>
     <FilterButton >C#</FilterButton>
     <FilterButton >Javascript</FilterButton>
  </div>
}