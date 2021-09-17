import React, { ButtonHTMLAttributes } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  
}
const Button: React.FC<ButtonProps> = (props:ButtonProps) => {
	let {children,...rest}=props;
	return <button {...rest}>{children}</button>;
}

export default Button;
export {ButtonProps}