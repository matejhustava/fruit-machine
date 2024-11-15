import React from "react";

export default function Button(
  props: {
    primary?: boolean,
    icon?: string,
    disabled?: boolean,
    type: 'button' | 'submit'
    onClick?: () => void,
    children: string | JSX.Element | JSX.Element[]
  }
) {
  let className = 'flex flex-row gap-2 items-center p-4 rounded-xl';
  if (props.disabled) {
    className +=' text-white bg-gray-300 hover:bg-gray-300 cursor-not-allowed';
  } else {
    className += ' cursor-pointer';
    className += props.primary ? ' text-white bg-purple-500 hover:bg-purple-600' : ' text-purple-500 bg-white hover:bg-purple-100';
  }
  

  return <button
    onClick={props.disabled ? undefined : props.onClick}
    className={className}
  >{props.children}</button>
}