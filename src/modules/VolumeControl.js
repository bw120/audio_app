const system = require('system-control')();
const { ipcMain } = require('electron');

function VolumeControl(window) {

    // Number of points the volume goes up or down per click
    // volume is a range between 0-100
    const volStep = 5;

    const volume = {
        volume: 0,
        muted: false,
        get: function(e) {
            const self = this;
            system.audio.getSystemVolume().then(function(volume) {
                self.volume = volume;
                self.respond(e);
            });
        },
        up: function(e) {
            const self = this;
            this.volume = Math.min((this.volume + volStep), 100);
            this.setVolume(e, this.volume);

        },
        down: function(e) {
            const self = this;
            this.volume = Math.max((this.volume - volStep), 0);
            this.setVolume(e, this.volume);
        },
        mute: function(e) {
            const self = this;

            system.audio.mute(!self.muted).then(function() {
              self.muted = !self.muted;
              self.respond(e);
            });
        },
        setVolume: function(e, volume) {
            const self = this;
            system.audio.setSystemVolume(volume).then(function() {
                self.respond(e);
            });
        },
        respond: function(event) {
            event && event.sender.send('volume-status', {volume: this.volume, muted: this.muted})
        }
    };

    // Set the initial value
    volume.get();

    // Listen for requests
    ipcMain.on('volume', (event, arg) => {
        (typeof volume[arg] != undefined) && volume[arg](event);
    })
}

export default VolumeControl;