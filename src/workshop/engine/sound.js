// sound.js: one shared, lazily created AudioContext. Browsers only allow audio after a user gesture,
// so ctx() is only ever called from click/pointer handlers.
export const Snd = {
  ac: null,
  ctx() {
    try {
      this.ac = this.ac || new (window.AudioContext || window.webkitAudioContext)();
      if (this.ac.state === "suspended") this.ac.resume();
      return this.ac;
    } catch (e) { return null; }
  }
};
