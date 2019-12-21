const main = id => {
    const ws = connect(id);
    ws.addEventListener("message", e => {
        let obj = JSON.parse(e.data);
    });
};

const connect = id => {
    const url = `${location.origin.replace(/^http/, "ws")}?id=${id}`;
    return new WebSocket(url);
};