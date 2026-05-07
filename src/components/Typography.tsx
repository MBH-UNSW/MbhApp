import React from 'react';
import { Text, TextProps, TextStyle, StyleProp } from 'react-native';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'body1'
  | 'body2'
  | 'caption';

type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';

/**
 * TODO: add more color options
 * such as danger, success, warning, muted, inverse (?)
 *
 * define the colors in the 'colorClasses'
 */
type TypographyColor = 'primary' | 'secondary' | 'alert';

type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

type TypographyProps = TextProps & {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: TypographyColor;
  customColor?: string;
  align?: TypographyAlign;
  italic?: boolean;
  underline?: boolean;
  className?: string;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

const cn = (...classes: Array<string | false | null | undefined>) => {
  return classes.filter(Boolean).join(' ');
};

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'text-[40px] leading-[48px] font-bold tracking-[-0.8px]',
  h2: 'text-[32px] leading-[40px] font-bold tracking-[-0.6px]',
  h3: 'text-[28px] leading-[36px] font-semibold tracking-[-0.4px]',
  h4: 'text-[24px] leading-[32px] font-semibold tracking-[-0.2px]',
  h5: 'text-[20px] leading-[28px] font-semibold',
  body1: 'text-[16px] leading-[24px] font-normal',
  body2: 'text-[14px] leading-[20px] font-normal',
  caption: 'text-[12px] leading-[16px] font-medium tracking-[0.2px]',
};

const weightClasses: Record<TypographyWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorClasses: Record<TypographyColor, string> = {
  primary: 'text-neutral-950 dark:text-neutral-50',
  secondary: 'text-neutral-600 dark:text-neutral-400',
  alert: 'text-red-600 dark:text-red-400',
};

const alignClasses: Record<TypographyAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

export function Typography({
  variant = 'body1',
  weight,
  color = 'primary',
  customColor,
  align = 'left',
  italic = false,
  underline = false,
  className,
  style,
  children,
  ...props
}: TypographyProps) {
  return (
    <Text
      className={cn(
        variantClasses[variant],
        !customColor && colorClasses[color],
        alignClasses[align],
        weight ? weightClasses[weight] : undefined,
        italic && 'italic',
        underline && 'underline',
        className,
      )}
      style={[
        {
          includeFontPadding: false,
        },
        customColor ? { color: customColor } : null,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export const H1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" {...props} />
);

export const H2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
);

export const H3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
);

export const H4 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h4" {...props} />
);

export const H5 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h5" {...props} />
);

export const Body1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body1" {...props} />
);

export const Body2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body2" {...props} />
);

export const Caption = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="caption" {...props} />
);
