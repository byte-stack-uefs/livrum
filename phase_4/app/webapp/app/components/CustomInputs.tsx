import React from "react";
import { IMaskInput } from "react-imask";
interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export const accountInput = React.forwardRef<HTMLInputElement, CustomProps>(function accountInput(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="########-#"
            definitions={{
                "#": /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

export const agencyInput = React.forwardRef<HTMLInputElement, CustomProps>(function agencyInput(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="####-#"
            definitions={{
                "#": /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

export const operationInput = React.forwardRef<HTMLInputElement, CustomProps>(function operationInput(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="###"
            definitions={{
                "#": /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

export const cpfInput = React.forwardRef<HTMLInputElement, CustomProps>(function cpfInput(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="###.###.###-##"
            definitions={{
                "#": /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

export const cellphoneInput = React.forwardRef<HTMLInputElement, CustomProps>(function cellphoneInput(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="(##) 9####-####"
            definitions={{
                "#": /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});


export const priceInput = React.forwardRef<HTMLInputElement, CustomProps>(function priceInput(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask='R$ num'
            blocks={{
                num: {
                    mask: Number,
                    thousandsSeparator: '.',
                    radix: ',',
                    scale: 2,
                    padFractionalZeros: true
                }
            }}
            inputRef={ref}
            onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

export const numberInput = React.forwardRef<HTMLInputElement, CustomProps>(function numberInput(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="############"
            definitions={{
                "#": /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});