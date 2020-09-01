import React from 'react';
export declare enum AlertType {
    Success = "success",
    Default = "default",
    Danger = "danger",
    Warning = "warning"
}
interface BaseAlertProps {
    className: string;
    alertType: AlertType;
    title: string;
    content: string;
    canClose: boolean;
}
export declare type AlertProps = Partial<BaseAlertProps & React.HTMLAttributes<HTMLDivElement>>;
declare const Alert: React.FC<AlertProps>;
export default Alert;
