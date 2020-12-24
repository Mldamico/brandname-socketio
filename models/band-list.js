const { v4: uuidv4 } = require("uuid");
const Band = require("./band");
class BandList {
  constructor() {
    this.id = uuidv4();
    this.bands = [
      new Band("Metallica"),
      new Band("Slipknot"),
      new Band("Korn")
    ];
  }

  addBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);
  }

  removeBand(id) {
    this.bands = this.bands.filter(band => band.id !== id);
  }

  getBands() {
    return this.bands;
  }

  increaseVotes(id) {
    this.bands = this.bands.map(band => {
      if (band.id === id) {
        band.votes += 1;
      }
      return band;
    });
  }
  changeName(id, name) {
    this.bands = this.bands.map(band => {
      if (band.id === id) {
        band.name = name;
      }
      return band;
    });
  }
}

module.exports = BandList;
