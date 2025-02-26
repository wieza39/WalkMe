
import React, {useState} from "react";


export default function Input({ value, setter }) {

    return (
            <input
                className="input"
                type="text"
                placeholder="Lokalizacja"
                value={value}
                onChange={e => setter(e.target.value)}/>
    )
}