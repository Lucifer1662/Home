import React, { useState } from 'react';
import { Button } from '@material-ui/core';

interface Props {
    children?: React.ReactNode,
    onActive?: () => void,
    onDeactive?: () => void
}

export function FilterButton({ onActive, onDeactive, children }: Props) {
    const [active, setActive] = useState(false);
    const onClick = () => {
        if (active) {
            if (onDeactive) onDeactive()
        }
        else { 
            if (onActive) onActive() 
        }
        setActive(!active);
    };

    const color = active? 'secondary' : 'primary';

    return <Button color={color} onClick={onClick} variant="contained" style={{ borderRadius: 16, display: 'inline-block', marginLeft: '15px' }}>{children}</Button>;
}