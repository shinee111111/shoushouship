import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/input';
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /** 自定义筛选逻辑 */
    fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 选中项回调 */
    onSelect?: (item: DataSourceType) => void;
    /** 筛选列表渲染模板 */
    renderOption?: (item: DataSourceType) => ReactElement;
}
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
