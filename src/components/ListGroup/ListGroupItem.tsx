import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
import type { FlowbiteBoolean } from '../Flowbite';

export interface FlowbiteListGroupItemTheme {
  base: string;
  link: {
    base: string;
    active: FlowbiteBoolean;
    href: FlowbiteBoolean;
    icon: string;
  };
}

export interface ListGroupItemProps extends PropsWithChildren {
  active?: boolean;
  disabled?: boolean;
  href?: string;
  icon?: FC<ComponentProps<'svg'>>;
  onClick?: () => void;
  theme?: DeepPartial<FlowbiteListGroupItemTheme>;
}

export const ListGroupItem: FC<ListGroupItemProps & ComponentProps<'a'> & ComponentProps<'button'>> = ({
  active: isActive,
  children,
  className,
  href,
  icon: Icon,
  onClick,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(getTheme().listGroup.item, customTheme);

  const isLink = typeof href !== 'undefined';
  const Component = isLink ? 'a' : 'button';

  return (
    <li className={twMerge(theme.base, className)}>
      <Component
        href={href}
        onClick={onClick}
        type={isLink ? undefined : 'button'}
        className={twMerge(
          theme.link.active[isActive ? 'on' : 'off'],
          theme.link.base,
          theme.link.href[isLink ? 'on' : 'off'],
        )}
        {...props}
      >
        {Icon && <Icon aria-hidden data-testid="flowbite-list-group-item-icon" className={theme.link.icon} />}
        {children}
      </Component>
    </li>
  );
};
