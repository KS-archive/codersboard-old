export default () => new Promise((resolve) => {
  setTimeout(() => {
    resolve('Hello');
  }, 2000);
});
