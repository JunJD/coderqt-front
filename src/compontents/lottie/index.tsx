import React, { FC } from 'react';
import Lottie, {
    LottieOptions,
    // useLottie /*useLottieInteractivity*/,
} from 'lottie-react'; // 接受json格式文件 转成动画

interface ILottie {
    animationData: LottieOptions['animationData'];
    height?: number;
    width?: number;
}

// Define the Lottie component
const LottieComponent: FC<ILottie> = ({
    animationData,
    height,
    width,
    ...otherOptions
}) => {
    const defaultOptions = {
        // 循环播放
        loop: true,
        // 自动播放
        autoplay: true,

        animationData: animationData, // Replace with your animation data
        // renderer: 'svg',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    return (
        <div
            style={{
                display: 'flex',
                width: `${width}px`,
                height: `${height}px`,
            }}
        >
            <Lottie {...defaultOptions} {...otherOptions} />
        </div>
    );
};

export default LottieComponent;
