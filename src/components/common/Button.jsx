// src/components/common/Button.jsx
import { Button as FlowbiteButton } from 'flowbite-react';

const Button = ({ children, ...props }) => {
  return (
    <FlowbiteButton {...props}>
      {children}
    </FlowbiteButton>
  );
};

export default Button;
