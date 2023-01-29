const WebBroadcastChannel = (
    channelId: string,
    onMessage: (event: MessageEvent<unknown>) => void
): {
    send: (message: unknown) => void;
    close: () => void;
} => {
    const channel = new BroadcastChannel(channelId);

    channel.onmessage = (event) => {
        onMessage(event);
    };

    const send = (message: unknown) => {
        channel.postMessage(message);
    };

    const close = () => channel.close();

    return {
        send,
        close,
    };
};

export default WebBroadcastChannel;
