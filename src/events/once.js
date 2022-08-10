const once = (client) => {
    client.once('ready', () => {
        console.log('RAITec BOT ready!!!');
    });
};

module.exports = { once };