import { PureComponent } from 'react';

const withFixedProps = (fixedProps) => {
  return (BaseComponent) => (
    (props) => (
      <BaseComponent {...props} {...fixedProps}/>
    )    
  );
};

export default withFixedProps;
