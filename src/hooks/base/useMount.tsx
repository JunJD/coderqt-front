import { useEffect, useRef } from "react";

// This is a custom hook that runs a function only on the initial mount of a component
const useMount: <T extends () => any>(fn: T, deps: any[]) => void = (fn, deps) => {
    const mountRef = useRef(false);
    useEffect(() => {
        if (!mountRef.current) {
            const cleanupFn = fn();
            if (cleanupFn && typeof cleanupFn === 'function') {
                return cleanupFn;
            }
            mountRef.current = true;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps]);
}

export default useMount;
