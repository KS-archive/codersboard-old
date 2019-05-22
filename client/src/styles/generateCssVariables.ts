import flat from 'flat';

export default (theme: any) => {
  const flatObj: any = flat.flatten(theme, { delimiter: '-' });
  const root = document.documentElement;

  for (const key in flatObj) {
    root.style.setProperty(`--${key}`, flatObj[key]);
  }
};
