import { useState } from 'react';

export function useFormInput( ): [object, string] {
    const [value, setValue] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        console.log(e.target.value);
    }

    const inputProps: object = {
        value: value,
        onChange: handleChange
    };

    return [inputProps, value];
}
