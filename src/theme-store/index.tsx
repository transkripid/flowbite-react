import type { CustomFlowbiteTheme, FlowbiteTheme } from '../components/Flowbite';
import { cloneDeep } from '../helpers/clone-deep';
import { mergeDeep } from '../helpers/merge-deep';
import type { ThemeMode } from '../hooks/use-theme-mode';
// import { theme as defaultTheme } from '../theme';

interface ThemeStore {
  mode?: ThemeMode;
  theme: FlowbiteTheme;
}

const store: ThemeStore = {
  theme: cloneDeep({} as FlowbiteTheme),
};

export function setThemeMode(mode?: ThemeMode) {
  store.mode = mode;
}

export function getThemeMode(): ThemeMode | undefined {
  return store.mode;
}

export function setTheme(theme?: CustomFlowbiteTheme) {
  if (theme) store.theme = mergeDeep({} as FlowbiteTheme, theme);
}

export function getTheme(): FlowbiteTheme {
  return cloneDeep(store.theme);
}
