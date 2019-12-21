document.querySelector("#createButton").addEventListener("submit", async e => {
    let response = await fetch("/create");
    if (response.ok)
        let json = await response.json();
});

document.querySelector("#connect").addEventListener("submit", e => {
    e.preventDefault();
    main(new FormData(e.currentTarget).get("id"));
});

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