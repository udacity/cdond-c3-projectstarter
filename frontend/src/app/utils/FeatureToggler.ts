import { toggles } from '../../toggles';

export function shouldRender(name: string): boolean {
  const match = toggles.find(x => {
    return x.componentName === name;
  });
  if (!match) return true;
  const env = process.env.NODE_ENV;
  const hasMatch = match.environments.find((x: string) => {
    return x === env;
  });
  return hasMatch !== undefined;
}
