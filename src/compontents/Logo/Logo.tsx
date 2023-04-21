// material-ui
// assets
import Lottie from '@/compontents/lottie';
import JSONData from '@/../public/137299-code-or-terminal.json';

const Logo = () => {
    // const theme = useTheme();

    return (
        <>
            <Lottie animationData={JSONData} height={80} width={80} />
        </>
    );
};

export default Logo;
