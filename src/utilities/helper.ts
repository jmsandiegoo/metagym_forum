import { OptionType } from "../types";

export const mapValueToOption = (value: string, options: readonly OptionType[]): OptionType | null => {
    const option = options.find((o) => o.value === value);
    return option || null;
}

export const mapValuesToOptions = (values: string[], options: readonly OptionType[]): OptionType[] => {
    const selectedOptions = options.filter((o) => values.find((v) => v === o.value));
    return selectedOptions;
}