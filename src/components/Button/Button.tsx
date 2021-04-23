import React from 'react';

import { ButtonWrapper } from './Button.styles';

declare interface IButtonProps {
  text: string,
  color: string,
  bgColor: string,
  onClick?:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
  | undefined,
  disabled?: boolean
}

const Button: React.FC<IButtonProps> = (props: IButtonProps) => (
  <ButtonWrapper bgColor={props.bgColor} color={props.color} disabled={props?.disabled} onClick={props.onClick}>{props.text}</ButtonWrapper>
);

export default Button;
