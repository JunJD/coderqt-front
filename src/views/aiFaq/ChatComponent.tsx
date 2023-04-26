import React from 'react';
import {
    Box,
    Button,
    Divider,
    Typography,
    useTheme,
} from '@mui/material';
import {
    ActionRequest,
    AudioActionResponse,
    ChatController,
    FileActionResponse,
    MuiChat,
} from 'chat-ui-react';
import { PlayCircleOutlined } from '@ant-design/icons';


export function ChatComponent(): React.ReactElement {
    const theme = useTheme()
    const [chatCtl] = React.useState(
        new ChatController({
            showDateTime: true,
        }),
    );

    React.useMemo(() => {
        echo(chatCtl);
    }, [chatCtl]);

    return (
        <Box sx={{
            height: '100%',
            borderRadius: '10px',
            // 卡片悬浮
            boxShadow: theme.shadows[4],
        }}    
        >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <Typography sx={{ p: 1 }}>
                    <PlayCircleOutlined />
                    <Typography variant="h5">休闲聊天</Typography>
                    </Typography>
                    <Divider />
                    <Box sx={{ flex: '1 1 0%', minHeight: 0 }}>
                        <MuiChat chatController={chatCtl} />
                    </Box>
                </Box>
            </Box>
    );
}

async function echo(chatCtl: ChatController): Promise<void> {
    await chatCtl.addMessage({
        type: 'text',
        content: `你好，我是基于GPT-3的聊天机器人，你可以问我任何问题，我会尽力回答你的问题。`,
        self: false,
        avatar: '-',
    });
    const text = await chatCtl.setActionRequest({
        type: 'text',
        placeholder: '这里输入...',
    });
    await chatCtl.addMessage({
        type: 'text',
        content: `您已输入:\n${text.value}`,
        self: false,
        avatar: '-',
    });

    await chatCtl.addMessage({
        type: 'text',
        content: `What is your gender?`,
        self: false,
        avatar: '-',
    });
    const sel = await chatCtl.setActionRequest({
        type: 'select',
        options: [
            {
                value: 'man',
                text: 'Man',
            },
            {
                value: 'woman',
                text: 'Woman',
            },
            {
                value: 'other',
                text: 'Other',
            },
        ],
    });
    await chatCtl.addMessage({
        type: 'text',
        content: `You have selected ${sel.value}.`,
        self: false,
        avatar: '-',
    });

    await chatCtl.addMessage({
        type: 'text',
        content: `What is your favorite fruit?`,
        self: false,
        avatar: '-',
    });
    const mulSel = await chatCtl.setActionRequest({
        type: 'multi-select',
        options: [
            {
                value: 'apple',
                text: 'Apple',
            },
            {
                value: 'orange',
                text: 'Orange',
            },
            {
                value: 'none',
                text: 'None',
            },
        ],
    });
    await chatCtl.addMessage({
        type: 'text',
        content: `You have selected '${mulSel.value}'.`,
        self: false,
        avatar: '-',
    });

    await chatCtl.addMessage({
        type: 'text',
        content: `What is your favorite picture?`,
        self: false,
        avatar: '-',
    });
    const file = (await chatCtl.setActionRequest({
        type: 'file',
        accept: 'image/*',
        multiple: true,
    })) as FileActionResponse;
    await chatCtl.addMessage({
        type: 'jsx',
        content: (
            <div>
                {file.files.map((f) => (
                    <img
                        key={file.files.indexOf(f)}
                        src={window.URL.createObjectURL(f)}
                        alt="File"
                        style={{ width: '100%', height: 'auto' }}
                    />
                ))}
            </div>
        ),
        self: false,
        avatar: '-',
    });

    await chatCtl.addMessage({
        type: 'text',
        content: `Please enter your voice.`,
        self: false,
        avatar: '-',
    });
    const audio = (await chatCtl
        .setActionRequest({
            type: 'audio',
        })
        .catch(() => ({
            type: 'audio',
            value: 'Voice input failed.',
            avatar: '-',
        }))) as AudioActionResponse;
    await (audio.audio
        ? chatCtl.addMessage({
              type: 'jsx',
              content: (
                  <a href={window.URL.createObjectURL(audio.audio)}>
                      Audio downlaod
                  </a>
              ),
              self: false,
              avatar: '-',
          })
        : chatCtl.addMessage({
              type: 'text',
              content: audio.value,
              self: false,
              avatar: '-',
          }));

    await chatCtl.addMessage({
        type: 'text',
        content: `Please press the button.`,
        self: false,
        avatar: '-',
    });
    const good = await chatCtl.setActionRequest({
        type: 'custom',
        Component: GoodInput,
    });
    await chatCtl.addMessage({
        type: 'text',
        content: `You have pressed the ${good.value} button.`,
        self: false,
        avatar: '-',
    });

    echo(chatCtl);
}

function GoodInput({
    chatController,
    actionRequest,
}: {
    chatController: ChatController;
    actionRequest: ActionRequest;
}) {
    const chatCtl = chatController;

    const setResponse = React.useCallback((): void => {
        const res = { type: 'custom', value: 'Good!' };
        chatCtl.setActionResponse(actionRequest, res);
    }, [actionRequest, chatCtl]);

    return (
        <div>
            <Button
                type="button"
                onClick={setResponse}
                variant="contained"
                color="primary"
            >
                Good!
            </Button>
        </div>
    );
}

export default ChatComponent;