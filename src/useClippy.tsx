import { useState } from 'react';

type InputValue = string | null;
type ClipFn = (value: string) => Promise<void | Error>;

export function useClipinator(): [InputValue, ClipFn] {
    const [value, setValue] = useState<InputValue>(null);

    const clip = (value: string) =>
        !navigator?.clipboard
            ? Promise.reject({ reason: { cause: "Clipboard may not be supported." } })
            : navigator
                .clipboard
                .writeText(value)
                .then(() => 
                {   
                    setTimeout(()=>setValue(value),2000)
                    
                })
                .catch((err) => ({ cause: err } as Error));

    return [value, clip];
}

export function useSetClipinator(): [ClipFn] {
    const [_, setValue] = useState<InputValue>(null);

    const clip = (value: string) =>
        !navigator?.clipboard
            ? Promise.reject({ reason: { cause: "Clipboard may not be supported." } })
            : navigator
                .clipboard
                .writeText(value)
                .then(() => setValue(value))
                .catch((err) => ({ cause: err } as Error));

    return [clip]
}


