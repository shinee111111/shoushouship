import React from 'react';
import classNames from 'classnames';

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning',
}

interface BaseAlertProps {
  className: string,
  alertType: AlertType;
  title: string;
  content: string;
  canClose: boolean;
}

export type AlertProps = Partial<BaseAlertProps & React.HTMLAttributes<HTMLDivElement>>

const Alert: React.FC<AlertProps> = (props) => {

  const {
    className,
    title,
    content,
    alertType,
    canClose,
    ...resetProps
  } = props;

  const classesMap = {
    container: classNames('alert', className, {
      [`alert-${alertType}`]: alertType
    }),
    title: classNames('alert-title', {
      [`alert-title--${alertType}`]: alertType
    }),
    content: classNames('alert-content', {
      [`alert-content--${alertType}`]: alertType
    }),
    closeBtn: classNames('alert-closeBtn', {
      [`alert-closeBtn--${alertType}`]: alertType
    }),
  }

  return (
    <div
      className={classesMap.container}
      {...resetProps}
    >
      {title &&
        <p
          className={classesMap.title}
        >{title}</p>
      }

      <p
        className={classesMap.content}
      >{content}</p>

      {canClose &&
        <div className={
          classesMap.closeBtn
        }>Close</div>
      }

    </div>
  );
};

Alert.defaultProps = {
  content: 'this is a tip',
  alertType: AlertType.Default,
  canClose: false
}

export default Alert;