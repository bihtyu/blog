class Lazy {
  constructor(name, logFn) {
    this.name = name;
    this.log = logFn;

    this.stack = [];
    this.firstStack = [];

    this.sayHi();

    setTimeout(() => {
      this.goNext();
    }, 0);
  }

  sayHi() {
    this.stack.push({ type: 'sayHi' });
    return this;
  }

  eat(food) {
    this.stack.push({ type: 'eat', val: food });
    return this;
  }

  sleep(time) {
    this.stack.push({ type: 'sleep', val: time });
    return this;
  }

  sleepFirst(time) {
    this.firstStack.push({ type: 'sleep', val: time });
    return this;
  }

  goNext() {
    const task = this.firstStack.shift() || this.stack.shift();
    if (!task) return;

    const { type, val } = task;

    switch (type) {
      case 'sayHi':
        this.log(`Hi, I'm ${this.name}.`);
        this.goNext();
        break;
      case 'eat':
        this.log(`Eat ${val}.`);
        this.goNext();
        break;
      case 'sleep':
        setTimeout(() => {
          const unit = val > 1 ? 'seconds' : 'second';
          this.log(`Wake up after ${val} ${unit}.`)
          this.goNext();
        }, val * 1000)
        break;
    }
  }
}

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */
function LazyMan(name, logFn) {
  // your code here
  return new Lazy(name, logFn);
}

// https://bigfrontend.dev/problem/create-lazyman