import type { Gram as GramType } from '../types/gram';
import { supportedStateTypes } from '../constants/strings';

function gram<T>(
    defaultValue: GramType<T>['defaultValue'],
    type: GramType<T>['type'],
    stateType?: GramType<T>['stateType'],
    produce?: GramType<T>['produce'],
    actions?: GramType<T>['actions'],
    effects?: GramType<T>['effects'],
    middleware?: GramType<T>['middleware']
): GramType<T>;

function gram<T>(definition: GramType<T>): GramType<T>;

function gram<T>(...args: unknown[]): GramType<T> {
    if (args.length === 1) {
        const definition = args[0] as GramType<T>;
        return {
            defaultValue: definition.defaultValue,
            type: definition.type,
            stateType: definition.stateType ?? supportedStateTypes.stateful,
            produce: definition.produce,
            actions: definition.actions,
            effects: definition.effects,
            middleware: definition.middleware,
        };
    } else {
        const defaultValue = args[0] as GramType<T>['defaultValue'];
        const type = args[1] as GramType<T>['type'];
        const stateType = args[2] as GramType<T>['stateType'];
        const produce = args[3] as GramType<T>['produce'];
        const actions = args[4] as GramType<T>['actions'];
        const effects = args[5] as GramType<T>['effects'];
        const middleware = args[6] as GramType<T>['middleware'];
        return {
            defaultValue,
            type: type,
            stateType: stateType ?? supportedStateTypes.stateful,
            produce,
            actions,
            effects,
            middleware,
        };
    }
}

export default gram;
