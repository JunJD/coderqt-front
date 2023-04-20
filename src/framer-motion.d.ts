declare module 'framer-motion' {
    import * as React from 'react';
    interface MotionType<T = any> {
        div: React.FC<T>;
    }
    export const motion: MotionType;
}
