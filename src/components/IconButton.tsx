import { LucideProps } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariant = 'contained' | 'outlined' | 'text';
type ButtonState = 'default' | 'disabled' | 'pressed' | 'hovered';

type IconComponent = React.ComponentType<LucideProps>;

type UBHIconButtonProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  state?: ButtonState;
  icon: IconComponent;
  onPress?: () => void;
  className?: string;
};

const cn = (...classes: Array<string | false | undefined | null>) =>
  classes.filter(Boolean).join(' ');

export function UBHIconButton({
  size = 'sm',
  variant = 'contained',
  state = 'default',
  icon: Icon,
  onPress,
  className,
}: UBHIconButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isDisabled = state === 'disabled';

  const currentState: ButtonState = isDisabled
    ? 'disabled'
    : state !== 'default'
    ? state
    : isPressed
    ? 'pressed'
    : isHovered
    ? 'hovered'
    : 'default';

  const iconSize = iconSizeClasses[size];
  const iconColor = iconColorClasses[variant][currentState];

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      className={cn(
        'flex-row items-center justify-center rounded-lg border',

        sizeClasses[size],
        variantClasses[variant],
        stateClasses[variant][currentState],

        isDisabled && 'opacity-60',
        className,
      )}
    >
      <Icon size={iconSize} color={iconColor} />
    </Pressable>
  );
}

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'px-2 py-1',
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-5 py-4',
  xl: 'px-6 py-5',
};

const variantClasses: Record<ButtonVariant, string> = {
  contained: 'bg-red-600 border-red-600',
  outlined: 'bg-transparent border-red-600',
  text: 'bg-transparent border-transparent',
};

const stateClasses: Record<ButtonVariant, Record<ButtonState, string>> = {
  contained: {
    default: 'bg-red-600 border-red-600',
    pressed: 'bg-red-800 border-red-800',
    hovered: 'bg-red-700 border-red-700',
    disabled: 'bg-gray-300 border-gray-300',
  },
  outlined: {
    default: 'bg-transparent border-red-600',
    pressed: 'bg-red-100 border-red-700',
    hovered: 'bg-red-50 border-red-700',
    disabled: 'bg-transparent border-gray-300',
  },
  text: {
    default: 'bg-transparent border-transparent',
    pressed: 'bg-red-100 border-transparent',
    hovered: 'bg-red-50 border-transparent',
    disabled: 'bg-transparent border-transparent',
  },
};

const iconSizeClasses: Record<ButtonSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

const iconColorClasses: Record<ButtonVariant, Record<ButtonState, string>> = {
  contained: {
    default: '#ffffff',
    pressed: '#ffffff',
    hovered: '#ffffff',
    disabled: '#6b7280',
  },
  outlined: {
    default: '#dc2626',
    pressed: '#b91c1c',
    hovered: '#b91c1c',
    disabled: '#9ca3af',
  },
  text: {
    default: '#dc2626',
    pressed: '#b91c1c',
    hovered: '#b91c1c',
    disabled: '#9ca3af',
  },
};
