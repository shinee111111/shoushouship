import React, { CSSProperties, FC, RefObject } from 'react';
declare type MenuMode = 'horizontal' | 'vertical';
declare type SelectedCallback = (selectedIndex: string) => void;
export interface MenuProps {
    className?: string;
    style?: CSSProperties;
    mode?: MenuMode;
    defaultIndex?: string;
    onSelect?: SelectedCallback;
    defaultOpenSubMenu?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: SelectedCallback;
    mode?: MenuMode;
    defaultOpenSubMenu?: string[];
    componentRef?: RefObject<HTMLElement>;
}
export declare const MenuContext: React.Context<IMenuContext>;
export declare const Menu: FC<MenuProps>;
export default Menu;
