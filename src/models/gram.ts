import type { Gram as GramType } from '../types/gram';
import { supportedStateTypes } from '../constants/strings';

const gram = <T>(
    defaultValue: GramType<T>['defaultValue'],
    type: GramType<T>['type'],
    stateType?: GramType<T>['stateType'],
    produce?: GramType<T>['produce'],
    actions?: GramType<T>['actions'],
    effects?: GramType<T>['effects'],
    middleware?: GramType<T>['middleware']
): GramType<T> => ({
        defaultValue,
        type: type,
        stateType: stateType ?? supportedStateTypes.stateful,
        produce,
        actions,
        effects,
        middleware,
    });

export default gram;
