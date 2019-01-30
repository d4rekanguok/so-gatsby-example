class BrowserOnly {
  constructor () {
    window.a = 100;
    this.name = "hi";
  }
}

export const bo = new BrowserOnly();