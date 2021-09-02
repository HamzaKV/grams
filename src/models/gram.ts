import { Gram as GramType } from '../types/gram';

const gram = <T>(
    defaultValue: GramType<T>['defaultValue'],
    actions?: GramType<T>['actions'],
    produce?: GramType<T>['produce'],
    effects?: GramType<T>['effects'],
    type?: GramType<T>['type'],
    stateType?: GramType<T>['stateType'],
    proxy?: GramType<T>['proxy']
): GramType<T> => ({
        defaultValue,
        actions,
        produce,
        effects,
        type: type ?? typeof defaultValue,
        stateType: stateType ?? 'state',
        proxy,
    });

export default gram;
