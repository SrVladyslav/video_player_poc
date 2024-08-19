import { Input, InputProps } from "@/components/ui/input";
import React from "react";

interface InputWithLabelProps extends Omit<InputProps, 'onChange'> {
    label: string;
    isFullWidth?: boolean;
    endContent?: React.ReactNode;
    onChange: (value: string) => void;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
    label,
    endContent,
    isFullWidth,
    onChange,
    ...inputProps
}) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className={`grid items-center gap-1.5 w-full ${isFullWidth ? 'max-w-full' : 'max-w-full sm:max-w-xs'}`}>
            <label htmlFor={inputProps.id} className="relative pl-1.5 flex flex-row gap-2 items-center text-normal font-semibold">{label}{endContent}</label>
            <Input
                id={inputProps.id}
                placeholder={inputProps.placeholder}
                onChange={handleChange} // Use the handler here
                {...inputProps} // Pass all other input props
                className="focus-visible:outline-none focus-visible:ring-customFocusRing focus-visible:ring-offset-2 focus-visible:outline-customFocusOutline"
            />
        </div>
    );
};

export default InputWithLabel;
