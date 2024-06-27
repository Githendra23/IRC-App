export const getChannels = async () => {
    const response = await fetch("http://localhost:8080/api/channel", {
        method: "GET",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
    });

    const data: { message: string, channels: string[] } = await response.json();

    return { response, data };
}

export const createChannel = async (channelName: string, userId: string) => {
    const response = await fetch("http://localhost:8080/api/channel", {
        method: "POST",
        body: JSON.stringify({ channelName, userId }),
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
    });

    const data: { message: string } = await response.json();

    return { response, data };
}