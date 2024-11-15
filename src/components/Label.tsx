import React from "react";

export default function Button(
  props: {
    htmlFor?: string,
    children: string | JSX.Element | JSX.Element[]
  }
) {
  return (
    <label htmlFor={props.htmlFor} className="text-purple-500 pb-2">{props.children}</label>
  );
}