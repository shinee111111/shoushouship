import React from 'react';
import { render } from '@testing-library/react';
import Alert, { AlertProps, AlertType } from './alert';

const alertProps: AlertProps = {
  alertType: AlertType.Danger,
  title: 'hello',
  content: 'world'
}

describe('alert component test', () => {

  it('alert should show in the document', () => {
    const wrapper = render(<Alert />);
    const element = wrapper.container;
    expect(element).toBeInTheDocument();
  })

  it('alert should render correct component based on different props', () => {
    const wrapper = render(<Alert data-testid="alert" {...alertProps}/>);
    const elementContainer = wrapper.getByTestId('alert');
    const elementTitle = wrapper.queryByText(alertProps.title as string);
    const elementContent = wrapper.queryByText(alertProps.content as string);
    expect(elementContainer).toHaveClass('alert alert-danger');
    expect(elementTitle).toBeTruthy();
    expect(elementContent).toBeTruthy();
  })

  // it('alert should be closed when the right close icon have been clicked', () => {
  // })

})