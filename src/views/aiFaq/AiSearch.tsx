import MainCard from '@/compontents/MainCard';
import { SearchOutlined } from '@ant-design/icons';
import {
    Box,
    FormControl,
    InputAdornment,
    OutlinedInput,
    Typography,
    useTheme,
} from '@mui/material';

const AiSearch = () => {
    const theme = useTheme();
    return (
        <>
            <MainCard
                sx={{
                    boxShadow: theme.shadows[1],
                }}
            >
                {/* 文本 */}
                <Typography
                    variant="h4"
                    sx={{
                        color: 'text.primary',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        pt: {
                            xs: 2,
                            md: 4,
                        },
                    }}
                >
                    人工智能问答
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: 'text.succondary',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        p: {
                            xs: 1,
                            md: 3,
                        },
                    }}
                >
                    或者选择一个类别来快速找到您需要的帮助
                </Typography>
                {/* 搜索框 */}
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pb: {
                            xs: 2,
                            md: 4,
                        },
                        px: {
                            xs: 2,
                            md: 4,
                        },
                    }}
                >
                    {/* FormControl是一个包裹输入框的容器，可以设置输入框的宽度,提交表单时，会将输入框的值提交到后台 */}
                    <FormControl
                        fullWidth
                        onBlur={() => {
                            console.log('onBlur');
                        }}
                        sx={{
                            '& input': {
                                width: {
                                    xs: '100%',
                                    md: '500px',
                                },
                                height: {
                                    xs: '30px',
                                    md: '40px',
                                },
                                borderRadius: '5px',
                                fontSize: {
                                    xxs: '10px',
                                    xs: '12px',
                                    md: '14px',
                                    lg: '16px',
                                },
                            },
                        }}
                    >
                        {/* OutlinedInput是一个输入框组件，可以设置输入框的大小，前后缀，提示文字，输入框的值等 */}
                        <OutlinedInput
                            size="small"
                            // startAdornment是输入框前缀，endAdornment是输入框后缀
                            startAdornment={
                                // InputAdornment是一个输入框前后缀的容器，可以设置前后缀的位置
                                <InputAdornment position="start">
                                    <SearchOutlined />
                                </InputAdornment>
                            }
                            // aria-describedby是一个属性，值为一个id，用于描述输入框的作用
                            aria-describedby="header-search-text"
                            // inputProps是一个属性，值为一个对象，用于设置输入框的属性
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            placeholder="搜索你的问题"
                        />
                    </FormControl>
                </Box>
            </MainCard>
        </>
    );
};

export default AiSearch;
