import { useRef, useEffect } from 'react';
import type { EffectCallback, DependencyList } from 'react';

const useDidMountEffect = (
    func: EffectCallback,
    deps?: DependencyList
): void => {
    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {
            func();
        } else {
            didMount.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...(deps ?? [])]);
};

export default useDidMountEffect;
