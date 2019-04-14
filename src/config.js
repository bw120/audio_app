module.exports = {
    development: {
        browserWindowSettings: {
            width: 800,
            height: 480,
            frame: false,
            devTools: true
        }
    },
    production: {
        browserWindowSettings: {
            frame: false,
            kiosk: true,
            devTools: false
        }
    }
};