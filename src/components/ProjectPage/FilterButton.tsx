import React from 'react';
import {Button} from '@material-ui/core';

interface Props {
    onClick?: ()=>void,
    children?: React.ReactNode,
}

export function FilterButton({ onClick, children }: Props) {

  return <Button onClick={onClick} variant="contained" style={{borderRadius: 16, display:'inline-block', marginLeft:'15px'}}>{children}</Button>;
}