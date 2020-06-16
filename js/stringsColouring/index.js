class StringsColouring {
  constructor(selector) {
    this.el = selector;
    this.frets = this.el.querySelectorAll('.guitar__fret');
    this.strings = this.el.querySelectorAll('.guitar__row');

    this.activeFrets = [];

    this.initMethods();
    this.initBindigs();
  }

  initMethods() {
    this.handleClick = (e) => {
      switch (e.key) {
        case 'F12':
          this.handleFrets(e);
          break;
        case 'F11':
          this.handleFrets(e);
          break;
        case 'F10':
          this.handleFrets(e);
          break;
        case 'F9':
          this.handleFrets(e);
          break;
        case 'F8':
          this.handleFrets(e);
          break;
        case 'F7':
          this.handleFrets(e);
          break;
        case 'F6':
          this.handleFrets(e);
          break;
        case 'F5':
          this.handleFrets(e);
          break;
        case 'F4':
          this.handleFrets(e);
          break;
        case 'F3':
          this.handleFrets(e);
          break;
        case 'F2':
          this.handleFrets(e);
          break;
        case 'F1':
          this.handleFrets(e);
          break;
        case '0':
          this.handleString('E', e.type);
          break;
        case '1':
          this.handleString('A', e.type);
          break;
        case '2':
          this.handleString('A', e.type);
          break;
        case '4':
          this.handleString('D', e.type);
          break;
        case '5':
          this.handleString('D', e.type);
          break;
        case '7':
          this.handleString('G', e.type);
          break;
        case '8':
          this.handleString('G', e.type);
          break;
      }
    };
    this.handleFrets = (e) => {
      const fret = e.key;
      const isPushed = e.type === 'keydown';

      if (isPushed) this.pushFrets(fret);
      else this.pullFrets(fret);
    };

    this.pushFrets = (fret) => {
      this.frets.forEach((item) => {
        const cls = item.classList;
        if (cls.contains(fret) && !cls.contains('guitar__steady'))
          cls.add('guitar__steady');

        if (!this.activeFrets.includes(fret)) this.activeFrets.push(fret);
      });
    };

    this.pullFrets = (fret) => {
      this.frets.forEach((item) => {
        if (item.classList.contains(fret))
          item.classList.remove('guitar__steady');

        const index = this.activeFrets.indexOf(fret);
        if (index !== -1) this.activeFrets.splice(index, 1);
      });
    };

    this.activateFret = (e) => {
      if (!this.activeFret.includes(e.key)) {
        this.activeFret.push(e.key);
      }
    };

    this.deactivateFret = (e) => {
      if (this.activeFret.includes(e.key)) {
        this.activeFret.pop(e.key);
      }
    };

    this.findLastFret = () => {
      for (let i = 12; i > 0; i--) {
        if (this.activeFrets.indexOf(`F${i}`) !== -1) return `F${i}`;
      }
    };

    this.handleString = (string, type) => {
      if (type === 'keydown') this.pushString(string);
      else this.pullString(string);
    };

    this.pushString = (string) => {
      if (!this.activeFrets.length) {
        this.strings.forEach((item) => {
          if (item.classList.contains(`guitar--empty-${string}`))
            item.classList.add('guitar__empty');
        });
      } else {
        const lastFret = this.findLastFret();

        this.frets.forEach((item) => {
          if (
            item.classList.contains(lastFret) &&
            item.parentNode.classList.contains(`guitar--${string}`)
          )
            item.classList.add('guitar__active');
        });
      }
    };

    this.pullString = (string) => {
      this.strings.forEach((item) => {
        if (item.classList.contains(`guitar--empty-${string}`))
          item.classList.remove('guitar__empty');
      });

      this.frets.forEach((item) => {
        if (
          item.classList.contains('guitar__active') &&
          item.parentNode.classList.contains(`guitar--${string}`)
        )
          item.classList.remove('guitar__active');
      });
    };
  }
  initBindigs() {
    document.addEventListener('keydown', this.handleClick);
    document.addEventListener('keyup', this.handleClick);
  }
}

export default StringsColouring;
