module.exports = {
    host: "127.0.0.1",
    port: 3030, // change with development port
    mongoUrl: `mongodb://${ process.env.MONGO_USER }:${
        process.env.MONGO_PASS
    }@ds237620.mlab.com:37620/magicamp`,
};
