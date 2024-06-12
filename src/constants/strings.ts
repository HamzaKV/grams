
export const supportedTypes = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    object: 'object',
    other: 'other', // for file, buffer, node etc. types
    // granular: 'granular',
} as const;

export const supportedStateTypes = {
    stateful: 'stateful',
    stateic: 'stateic',
} as const;
