export let counter = 0;

export function add (num = 1) {
  counter += num;
  return counter;
}

export const object = {
  counter: 0,
  add (num = 1) {
    this.counter += num;
    return this.counter;
  }
}
