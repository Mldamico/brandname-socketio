const BandList = require("./band-list");
class Sockets {
  constructor(io) {
    this.io = io;

    this.bandList = new BandList();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", socket => {
      // Escuchar evento: mensaje-to-server
      console.log("Cliente Conectado");
      socket.emit("current-bands", this.bandList.getBands());
      socket.on("votar-band", id => {
        this.bandList.increaseVotes(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("borrar-band", id => {
        this.bandList.removeBand(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
