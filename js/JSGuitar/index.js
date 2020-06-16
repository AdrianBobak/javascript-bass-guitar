import { convert } from './convert.js';

class JSGuitar {
  constructor(selector) {
    this.el = selector;
    this.frets = [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    this.isPlayed = false;
    this.currentGuitar = 'bass';
    this.changeGuitarBtn = document.querySelector('.switch');

    this.initMethods();
    this.initBindings();
  }

  switchFrets(key, bool) {
    const isActive = (fret, bool) => {
      if (this.frets[fret] !== bool) this.frets[fret] = bool;
    };

    switch (key) {
      case 'F12':
        return isActive(12, bool);
      case 'F11':
        return isActive(11, bool);
      case 'F10':
        return isActive(10, bool);
      case 'F9':
        return isActive(9, bool);
      case 'F8':
        return isActive(8, bool);
      case 'F7':
        return isActive(7, bool);
      case 'F6':
        return isActive(6, bool);
      case 'F5':
        return isActive(5, bool);
      case 'F4':
        return isActive(4, bool);
      case 'F3':
        return isActive(3, bool);
      case 'F2':
        return isActive(2, bool);
      case 'F1':
        return isActive(1, bool);
    }
  }

  playNote(note) {
    for (let i = this.frets.length - 1; i >= 0; i--) {
      if (this.frets[i]) {
        new Audio(
          `./sounds/${this.currentGuitar}/${convert(i + note)}.mp3`
        ).play();
        break;
      }
    }
  }

  switchStrings(string, bool) {
    const handleString = (bool, note) => {
      if (!bool) {
        this.isPlayed = false;
      } else if (bool && !this.isPlayed) {
        this.isPlayed = true;
        this.playNote(note);
      }
    };

    switch (string) {
      case '0':
        handleString(bool, 'E');
        break;
      case '1':
        handleString(bool, 'A');
        break;
      case '2':
        handleString(bool, 'A');
        break;
      case '4':
        handleString(bool, 'D');
        break;
      case '5':
        handleString(bool, 'D');
        break;
      case '7':
        handleString(bool, 'G');
        break;
      case '8':
        handleString(bool, 'G');
        break;
    }
  }

  initMethods() {
    this.selectFret = (e) => {
      e.preventDefault();
      this.switchFrets(e.key, true);
    };

    this.removeFret = (e) => {
      e.preventDefault();
      this.switchFrets(e.key, false);
    };

    this.selectString = (e) => {
      e.preventDefault();
      this.switchStrings(e.key, true);
    };

    this.removeString = (e) => {
      e.preventDefault();
      this.switchStrings(e.key, false);
    };

    this.changeGuitar = () => {
      console.log(this.currentGuitar);
      this.currentGuitar === 'bass'
        ? this.currentGuitar = 'guitar'
        : this.currentGuitar = 'bass';
    };
  }

  initBindings() {
    document.addEventListener('keydown', this.selectFret);
    document.addEventListener('keyup', this.removeFret);
    document.addEventListener('keydown', this.selectString);
    document.addEventListener('keyup', this.removeString);
    this.changeGuitarBtn.addEventListener('click', this.changeGuitar);
  }
}

export default JSGuitar;
