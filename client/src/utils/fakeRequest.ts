export default (time: number) => new Promise((resolve) => {
  setTimeout(() => {
    resolve('Hello');
  }, time);
});
