// third-party
import { motion } from 'framer-motion';
import { FC } from 'react';
interface AnimateButtonProps {
    children: React.ReactNode;
    type?:
        | 'rotate'
        | 'slide'
        | 'scale'
        | 'shadow'
        | 'rotateX'
        | 'rotateY'
        | 'rotateZ';
}

const AnimateButton: FC<AnimateButtonProps> = ({
    children,
    type = 'scale',
}) => {
    switch (type) {
        case 'rotate':
            return (
                <motion.div
                    whileHover={{ rotate: 360 }}
                    whileTap={{ rotate: 180 }}
                >
                    {children}
                </motion.div>
            );
        case 'slide':
            return (
                <motion.div whileHover={{ x: 10 }} whileTap={{ x: -10 }}>
                    {children}
                </motion.div>
            );
        case 'scale':
            return (
                <motion.div
                    whileHover={{ scale: 1.0 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {children}
                </motion.div>
            );
        case 'shadow':
            return (
                <motion.div
                    whileHover={{ boxShadow: '0 0 8px rgba(0, 0, 0, 0.26)' }}
                    whileTap={{ boxShadow: '0 0 8px rgba(0, 0, 0, 0.26)' }}
                >
                    {children}
                </motion.div>
            );
        case 'rotateX':
            return (
                <motion.div
                    whileHover={{ rotateX: 360 }}
                    whileTap={{ rotateX: 180 }}
                >
                    {children}
                </motion.div>
            );
        case 'rotateY':
            return (
                <motion.div
                    whileHover={{ rotateY: 360 }}
                    whileTap={{ rotateY: 180 }}
                >
                    {children}
                </motion.div>
            );
        case 'rotateZ':
            return (
                <motion.div
                    whileHover={{ rotateZ: 360 }}
                    whileTap={{ rotateZ: 180 }}
                >
                    {children}
                </motion.div>
            );
        default:
            return (
                <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
                    {children}
                </motion.div>
            );
    }
};

export default AnimateButton;
