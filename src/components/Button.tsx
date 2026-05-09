import { LucideProps } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariant = 'contained' | 'outlined' | 'text';
type ButtonState = 'default' | 'disabled' | 'pressed' | 'hovered';

type IconComponent = React.ComponentType<LucideProps>;

type UBHButtonProps = {
  title: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  state?: ButtonState;
  iconLeft?: IconComponent;
  iconRight?: IconComponent;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
};

const cn = (...classes: Array<string | false | undefined | null>) =>
  classes.filter(Boolean).join(' ');

export function UBHButton({
  title,
  size = 'sm',
  variant = 'contained',
  state = 'default',
  iconLeft: IconLeft,
  iconRight: IconRight,
  onPress,
  className,
  textClassName,
}: UBHButtonProps) {
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
      {IconLeft && (
        <View className="mr-2">
          <IconLeft size={iconSize} color={iconColor} />
        </View>
      )}

      <Text
        className={cn(
          'font-semibold',
          textSizeClasses[size],
          textVariantClasses[variant],
          textStateClasses[variant][currentState],
          textClassName,
        )}
      >
        {title}
      </Text>

      {IconRight && (
        <View className="ml-2">
          <IconRight size={iconSize} color={iconColor} />
        </View>
      )}
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

const textSizeClasses: Record<ButtonSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const variantClasses: Record<ButtonVariant, string> = {
  contained: 'bg-red-600 border-red-600',
  outlined: 'bg-transparent border-red-600',
  text: 'bg-transparent border-transparent',
};

const textVariantClasses: Record<ButtonVariant, string> = {
  contained: 'text-white',
  outlined: 'text-red-600',
  text: 'text-red-600',
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

const textStateClasses: Record<ButtonVariant, Record<ButtonState, string>> = {
  contained: {
    default: 'text-white',
    pressed: 'text-white',
    hovered: 'text-white',
    disabled: 'text-gray-500',
  },
  outlined: {
    default: 'text-red-600',
    pressed: 'text-red-700',
    hovered: 'text-red-700',
    disabled: 'text-gray-400',
  },
  text: {
    default: 'text-red-600',
    pressed: 'text-red-700',
    hovered: 'text-red-700',
    disabled: 'text-gray-400',
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
