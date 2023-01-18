import { propDenote } from '../constants/strings';

export const splitKey = (accKey: string): string[] =>
    accKey.split(/:+(?:prop):+/g).filter((k) => !!k);

export const mergeKey = (key: string, ...props: string[]) =>
    props && props.length > 0 ? key + propDenote + props.join(propDenote) : key;
