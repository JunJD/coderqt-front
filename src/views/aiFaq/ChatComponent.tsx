import React, { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import {
    Box,
    // Button,
    Divider,
    Typography,
    useTheme,
} from '@mui/material';
import {
    // ActionRequest,
    // AudioActionResponse,
    ChatController,
    // FileActionResponse,
    MuiChat,
} from 'chat-ui-react';
import { useRecoilState } from 'recoil';
import { gptStore, messageItem } from '@/store/gpt';
import { chatGPTRequest } from '@/service';
// import useMount from '@/hooks/base/useMount';
import OptionsItem, { OptionsItemType } from './config/optionsItem';

interface ChatComponentProps {
    selectedItem: OptionsItemType;
}

export function ChatComponent(props: ChatComponentProps): React.ReactElement {
    const { selectedItem } = props;
    const theme = useTheme();

    const [gptChat, setGptChat] = useRecoilState(gptStore);

    const activeKey = useMemo(() => selectedItem.key, [selectedItem.key]);

    const istranslate = useMemo(
        () => activeKey === 'translateChat',
        [activeKey],
    );

    const activeMessage = useMemo(() => {
        return Object.keys(gptChat).includes(activeKey)
            ? gptChat[activeKey as keyof typeof gptChat]
            : [];
    }, [activeKey, gptChat]);

    const [chatCtl] = React.useState(
        new ChatController({
            showDateTime: true,
        }),
    );

    const gptquery = async (messages: messageItem[]) => {
        const res = await chatGPTRequest.post({
            url: '/v1/chat/completions',
            data: {
                messages,
            },
        });

        if (res?.id) {
            return res.choices[0].message;
        } else {
            return {
                role: 'assistant',
                content: '请求错误',
            };
        }
    };

    useEffect(() => {
        chatCtl.setMessages(
            activeMessage
                .filter((item) => item.role !== 'system')
                .map((item) => ({
                    type: 'text',
                    content: item.content,
                    self: item.role === 'user',
                })),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeMessage]);

    React.useEffect(() => {
        echo(chatCtl, activeMessage, istranslate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatCtl, activeMessage, istranslate]);

    const echo = useCallback(
        async (
            chatCtl: ChatController,
            activeMessage: messageItem[] = [],
            istranslate = false,
        ) => {
            let language: any;
            if (istranslate) {
                const options = [
                    {
                        value: 'yw',
                        text: '英文',
                    },
                    {
                        value: 'ey',
                        text: '俄语',
                    },
                    {
                        value: 'alb',
                        text: '阿拉伯语',
                    },
                ]
                language = await chatCtl.setActionRequest({
                    type: 'select',
                    options,
                })
                chatCtl.addMessage({
                    type: 'text',
                    content: `已选择${language.value},请开始输入:`,
                    self: false,
                    createdAt: new Date(),
                });
            }

            await chatCtl.setActionRequest(
                { type: 'text', always: true },
                async (res) => {
                    await chatCtl.addMessage({
                        type: 'text',
                        content: '正在思考中...',
                        self: false,
                        createdAt: new Date(),
                    });
                    const len = chatCtl.getMessages().length - 1;
                    try {
                        
                        res.value = language
                        ? `将下面的话翻译成${language.value}:/n${res.value}`
                        : res.value;
                        
                        const message = await gptquery([
                            ...activeMessage,
                            { role: 'user', content: res.value },
                        ]);

                        await chatCtl.updateMessage(len, {
                            type: 'text',
                            content: `${message.content}`,
                            self: false,
                            updatedAt: new Date(),
                        });

                        setGptChat((prevValue) => {
                            const newmessage = [{ role: 'user', content: res.value }]
                            // 按换行符分割
                            const newmessageArr = message.content.split('/n')
                            // 按换行符分割后的数组
                            const newmessageArrList = newmessageArr.map((item: string) => {
                                return {
                                    role: 'assistant',
                                    content: item,
                                }
                            })
                            newmessage.push(...newmessageArrList)
                            return {
                                ...prevValue,
                                [activeKey]: [
                                    ...prevValue[activeKey as keyof typeof gptChat],
                                    ...newmessage,
                                ],
                            };
                        });
                    } catch (error) {
                        await chatCtl.updateMessage(len, {
                            type: 'text',
                            content: '请求错误',
                            self: false,
                            updatedAt: new Date(),
                        });

                        setGptChat((prevValue) => {
                            return {
                                ...prevValue,
                                [activeKey]: [
                                    ...prevValue[activeKey as keyof typeof gptChat],
                                    { role: 'system', content: '请求错误' },
                                ],
                            };
                        });
                    }
                },
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [activeKey],
    );

    return (
        <Box
            component="div"
            sx={{
                height: '100%',
                borderRadius: '10px',
                // 卡片悬浮
                boxShadow: theme.shadows[4],
            }}
        >
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Box sx={{ p: 1 }}>
                    <Typography
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            color: theme.palette.secondary.main,
                        }}
                    >
                        {selectedItem.icon ?? OptionsItem[0].icon}
                        {selectedItem.text ?? OptionsItem[0].text}
                    </Typography>
                </Box>
                <Divider />
                <Box
                    component="div"
                    sx={{
                        flex: '1 1 0%',
                        '&>.MuiBox-root>.MuiBox-root': {
                            padding: '0.5rem',
                            maxHeight: theme.spacing(50),

                            overflow: 'auto',
                            '&::-webkit-scrollbar': {
                                width: 6,
                                height: 6,
                                backgroundColor: 'transparent',
                                '-webkit-transition': 'all .5s ease-in-out',
                                transition: 'all .5s ease-in-out',
                            },
                            '&:hover::-webkit-scrollbar-thumb': {
                                borderRadius: 4,
                                // 浅色
                                backgroundColor: theme.palette.action.hover,
                            },
                            '&::-webkit-scrollbar-track': {
                                borderRadius: 4,
                                backgroundColor: 'transparent',
                            },
                        },
                    }}
                >
                    <MuiChat chatController={chatCtl} />
                </Box>
            </Box>
        </Box>
    );
}

export default ChatComponent;

// async function echo(chatCtl: ChatController): Promise<void> {
// await chatCtl.addMessage({
//     type: 'text',
//     content: `你好，我是基于GPT-3的聊天机器人，你可以问我任何问题，我会尽力回答你的问题。`,
//     self: false,
//     avatar: '-',
// });
// const text = await chatCtl.setActionRequest({
//     type: 'text',
//     placeholder: '这里输入...',
// });

// await chatCtl.addMessage({
//     type: 'text',
//     content: `您已输入:\n${text.value}`,
//     self: false,
//     avatar: '-',
// });

// await chatCtl.addMessage({
//     type: 'text',
//     content: `What is your gender?`,
//     self: false,
//     avatar: '-',
// });
// const sel = await chatCtl.setActionRequest({
//     type: 'select',
//     options: [
//         {
//             value: 'man',
//             text: 'Man',
//         },
//         {
//             value: 'woman',
//             text: 'Woman',
//         },
//         {
//             value: 'other',
//             text: 'Other',
//         },
//     ],
// });
// await chatCtl.addMessage({
//     type: 'text',
//     content: `You have selected ${sel.value}.`,
//     self: false,
//     avatar: '-',
// });

// await chatCtl.addMessage({
//     type: 'text',
//     content: `What is your favorite fruit?`,
//     self: false,
//     avatar: '-',
// });
// const mulSel = await chatCtl.setActionRequest({
//     type: 'multi-select',
//     options: [
//         {
//             value: 'apple',
//             text: 'Apple',
//         },
//         {
//             value: 'orange',
//             text: 'Orange',
//         },
//         {
//             value: 'none',
//             text: 'None',
//         },
//     ],
// });
// await chatCtl.addMessage({
//     type: 'text',
//     content: `You have selected '${mulSel.value}'.`,
//     self: false,
//     avatar: '-',
// });

// await chatCtl.addMessage({
//     type: 'text',
//     content: `What is your favorite picture?`,
//     self: false,
//     avatar: '-',
// });
// const file = (await chatCtl.setActionRequest({
//     type: 'file',
//     accept: 'image/*',
//     multiple: true,
// })) as FileActionResponse;
// await chatCtl.addMessage({
//     type: 'jsx',
//     content: (
//         <div>
//             {file.files.map((f) => (
//                 <img
//                     key={file.files.indexOf(f)}
//                     src={window.URL.createObjectURL(f)}
//                     alt="File"
//                     style={{ width: '100%', height: 'auto' }}
//                 />
//             ))}
//         </div>
//     ),
//     self: false,
//     avatar: '-',
// });

// await chatCtl.addMessage({
//     type: 'text',
//     content: `Please enter your voice.`,
//     self: false,
//     avatar: '-',
// });
// const audio = (await chatCtl
//     .setActionRequest({
//         type: 'audio',
//     })
//     .catch(() => ({
//         type: 'audio',
//         value: 'Voice input failed.',
//         avatar: '-',
//     }))) as AudioActionResponse;
// await (audio.audio
//     ? chatCtl.addMessage({
//           type: 'jsx',
//           content: (
//               <a href={window.URL.createObjectURL(audio.audio)}>
//                   Audio downlaod
//               </a>
//           ),
//           self: false,
//           avatar: '-',
//       })
//     : chatCtl.addMessage({
//           type: 'text',
//           content: audio.value,
//           self: false,
//           avatar: '-',
//       }));

// await chatCtl.addMessage({
//     type: 'text',
//     content: `Please press the button.`,
//     self: false,
//     avatar: '-',
// });
// const good = await chatCtl.setActionRequest({
//     type: 'custom',
//     Component: GoodInput,
// });
// await chatCtl.addMessage({
//     type: 'text',
//     content: `You have pressed the ${good.value} button.`,
//     self: false,
//     avatar: '-',
// });

// echo(chatCtl);
// }

// function GoodInput({
//     chatController,
//     actionRequest,
// }: {
//     chatController: ChatController;
//     actionRequest: ActionRequest;
// }) {
//     const chatCtl = chatController;

//     const setResponse = React.useCallback((): void => {
//         const res = { type: 'custom', value: 'Good!' };
//         chatCtl.setActionResponse(actionRequest, res);
//     }, [actionRequest, chatCtl]);

//     return (
//         <div>
//             <Button
//                 type="button"
//                 onClick={setResponse}
//                 variant="contained"
//                 color="primary"
//             >
//                 Good!
//             </Button>
//         </div>
//     );
// }
