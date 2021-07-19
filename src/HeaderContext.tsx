
import React, { createContext, ReactNode, useState, useContext, useReducer } from "react";

class HeaderState {
    public isOpen: boolean = false;

    constructor(headerState?: HeaderState) {
        for (let key in headerState) {
            //@ts-ignore
            this[key] = headerState[key];
        }
    }
}

class HeaderActionsReducer {
    static open(prev: HeaderState) {
        return { ...prev, isOpen: true }
    }

    static close(prev: HeaderState) {
        return { ...prev, isOpen: false }
    }
}

class HeaderActions extends HeaderState {
    private setState?: React.Dispatch<React.SetStateAction<HeaderState>>;
    constructor(useStateResult? : [HeaderState, React.Dispatch<React.SetStateAction<HeaderState>>] ) {
        const [headerAction, setState] = useStateResult || [new HeaderState(), undefined];
        super(headerAction);
        this.setState = setState;
    }

    open1(prev: HeaderState) {
        return { ...prev, isOpen: true };
    }

    open() { if(this.setState) this.setState(HeaderActionsReducer.open);}

    close() {if(this.setState) this.setState(HeaderActionsReducer.close);}
}

export const HeaderContext = createContext(new HeaderActions());

export function HeaderContextProvider(props: { children: ReactNode, value?: HeaderState }) {
    return <HeaderContext.Provider {...props} value={new HeaderActions(useState(props.value || new HeaderState()))} />
}

export const useHeaderContext = () => useContext(HeaderContext);




