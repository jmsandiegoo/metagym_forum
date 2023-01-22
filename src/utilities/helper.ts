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