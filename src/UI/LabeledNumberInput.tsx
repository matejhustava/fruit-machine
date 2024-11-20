import React from "react";
import Label from "./Label";

export default function LabeledNumberInput(props: { id: string, label: string, defaultValue: any, min?: number }) {
    return (<>
        <Label htmlFor={props.id}>{props.label}</Label>
        <input
            className="mb-4"
            type="number"
            id={props.id}
            name={props.id}
            defaultValue={props.defaultValue}
            min={props.min}
        ></input>
    </>);
}