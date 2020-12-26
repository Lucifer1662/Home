import React from 'react';
import "./HomeGrid.css";
import useWindowSize from '../../useWindowSize';
interface Props {
    children?: any[],
    userId?:string
}

export default function Grid({ children, userId }: Props) {

    const size = useWindowSize();
    let scale = 2;
    let numItemsVisible = size ? Math.floor(size.width / size.height * scale) + 1 : 2;

    let itemWidget = (100 / numItemsVisible) + "%";

    return <div className="HomeGrid">
        {children ? children.map((child: any) => {
            return <div className="HomeGridElement" style={{ width: itemWidget }}>
                {child}
            </div>
        }) : []}
        
    </div>
}