import type { ComponentProps, FC, KeyboardEvent } from 'react';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import type { DeepPartial, FlowbiteBoolean, FlowbiteColors } from '../../';
import { useTheme } from '../../';
import { mergeDeep } from '../../helpers/merge-deep';

export interface FlowbiteToggleSwitchTheme {
  root: FlowbiteToggleSwitchRootTheme;
  toggle: FlowbiteToggleSwitchToggleTheme;
}

export interface FlowbiteToggleSwitchRootTheme {
  base: string;
  active: FlowbiteBoolean;
  label: string;
}

export interface FlowbiteToggleSwitchToggleTheme {
  base: string;
  checked: FlowbiteBoolean & {
    color: FlowbiteColors;
  };
}

export type ToggleSwitchProps = Omit<ComponentProps<'button'>, 'onChange'> & {
  checked: boolean;
  color?: keyof FlowbiteColors;
  label?: string;
  onChange: (checked: boolean) => void;
  theme?: DeepPartial<FlowbiteToggleSwitchTheme>;
};

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
  checked,
  className,
  color = 'blue',
  disabled,
  label,
  name,
  onChange,
  theme: customTheme = {},
  ...props
}) => {
  const id = useId();
  const theme = mergeDeep(useTheme().theme.toggleSwitch, customTheme);

  const toggle = (): void => onChange(!checked);

  const handleClick = (): void => {
    toggle();
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.code == 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <>
      {name && checked ? (
        <input checked={checked} hidden name={name} readOnly type="checkbox" className="sr-only" />
      ) : null}
      <button
        aria-checked={checked}
        aria-labelledby={`${id}-flowbite-toggleswitch-label`}
        disabled={disabled}
        id={`${id}-flowbite-toggleswitch`}
        onClick={handleClick}
        onKeyDown={handleOnKeyDown}
        role="switch"
        tabIndex={0}
        type="button"
        className={twMerge(theme.root.base, theme.root.active[disabled ? 'off' : 'on'], className)}
        {...props}
      >
        <div
          data-testid="flowbite-toggleswitch-toggle"
          className={twMerge(
            theme.toggle.base,
            theme.toggle.checked[checked ? 'on' : 'off'],
            checked && theme.toggle.checked.color[color],
          )}
        />
        {label?.length ? (
          <span
            data-testid="flowbite-toggleswitch-label"
            id={`${id}-flowbite-toggleswitch-label`}
            className={theme.root.label}
          >
            {label}
          </span>
        ) : null}
      </button>
    </>
  );
};

ToggleSwitch.displayName = 'ToggleSwitch';
