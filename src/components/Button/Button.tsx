import React from 'react';

import { ButtonWrapper } from './Button.styles';

declare interface IButtonProps {
  text: string,
  color: string,
  bgColor: string,
  onClick?:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
}

const Button: React.FC<IButtonProps> = (props: IButtonProps) => (
  <ButtonWrapper bgColor={props.bgColor} color={props.color}>{props.text}</ButtonWrapper>
);

export default Button;
