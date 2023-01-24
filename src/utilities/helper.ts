import { OptionType } from "../types";

export const mapValueToOption = (value: string, options: readonly OptionType[]): OptionType | null => {
    const option = options.find((o) => o.value === value);
    return option || null;
}

export const mapValuesToOptions = (values: string[], options: readonly OptionType[]): OptionType[] => {
    const selectedOptions = options.filter((o) => values.find((v) => v === o.value));
    return selectedOptions;
}

interface QueryStringObject {
    [key: string]: any;
}

export const mapQueryString = (queryObj: QueryStringObject): string => {
    // loop through each property
    let queryString = "?";
    let firstProperty = true;
    for (let property in queryObj) {
        if (Array.isArray(queryObj[property])) {
            for (let i = 0; i < queryObj[property].length; i++) {
                if (!firstProperty || i > 0) {
                    queryString += "&";
                }

                queryString += `${property}=${encodeURIComponent(queryObj[property][i])}`;
            }

            if (queryObj[property].length > 0) {
                firstProperty = false;
            }
        } else {
            if (!firstProperty && queryObj[property].length > 0) {
                queryString += "&";
            }

            if (queryObj[property].length > 0) {
                queryString += `${property}=${encodeURIComponent(queryObj[property])}`;
                firstProperty = false;
            }

        }
    }

    return queryString;
}

// RHF Validation functions
export const requiredValidate = (errorMessage: string) => {
    return (value: any) => {
        if (!value) {
            return errorMessage;
        } else if (typeof value === "string") {
            return value.trim().length > 0 || errorMessage;
        } else if (typeof value === "number") {
            return !isNaN(value) || errorMessage;
        } else if (Array.isArray(value)) {
            return value.length > 0 || errorMessage;
        } else {
            return errorMessage
        }
    }
}


export const checkNumMinValidate = (min: number, errorMessage: string) => {
    return (value: number) => (!isNaN(value) && value >= min) || errorMessage;
}

export const checkNumMaxValidate = (max: number, errorMessage: string) => {
    return (value: number) => (!isNaN(value) && value <= max) || errorMessage;
}

export const isEmailValidate = (errorMessage: string) => {
    return (value: string) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) ? true : errorMessage;
}

export const isSameStringValidate = (compareValue: string, errorMessage: string) => {
    return (value: string) => {
        return value === compareValue || errorMessage;
    }
}