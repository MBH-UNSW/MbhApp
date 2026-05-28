import React from 'react';
import { View } from 'react-native';

import { Typography } from './Typography';

type LoadingBarVariant = 'success' | 'warning' | 'error' | 'neutral';
type LoadingBarTextColor = 'primary' | 'secondary' | 'alert';
type LoadingBarSize = 'sm' | 'md';

type LoadingBarProps = {
    progress: number;
    variant?: LoadingBarVariant;
    size?: LoadingBarSize;
    label?: string;
    helperText?: string;
    showPercentage?: boolean;
    labelColor?: LoadingBarTextColor;
    helperTextColor?: LoadingBarTextColor;
    className?: string;
};

const cn = (...classes: Array<string | false | undefined | null>) =>
    classes.filter(Boolean).join(' ');

export function LoadingBar({
    progress,
    variant = 'success',
    size = 'md',
    label,
    helperText,
    showPercentage = false,
    labelColor = 'primary',
    helperTextColor,
    className,
}: LoadingBarProps) {
    const safeProgress = Number.isFinite(progress) ? progress : 0;
    const clampedProgress = Math.min(Math.max(safeProgress, 0), 100);

    const displayLabel = showPercentage
        ? `${label ? `${label} ` : ''}${Math.round(clampedProgress)}%`
        : label;

    const resolvedHelperTextColor: LoadingBarTextColor =
        helperTextColor ?? (variant === 'error' ? 'alert' : 'secondary');

    return (
        <View className={cn('w-full gap-2', className)}>
            {displayLabel && (
                <Typography
                    variant="body1"
                    color={labelColor}
                    align="center"
                >
                    {displayLabel}
                </Typography>
            )}

            <View
                className={cn(
                    'w-full overflow-hidden rounded-full bg-neutral-300',
                    sizeClasses[size],
                )}
                accessibilityRole="progressbar"
                accessibilityValue={{
                    min: 0,
                    max: 100,
                    now: Math.round(clampedProgress),
                }}
            >
                <View
                    className={cn(
                        'h-full rounded-full',
                        fillClasses[variant],
                    )}
                    style={{ width: `${clampedProgress}%` }}
                />
            </View>

            {helperText && (
                <Typography
                    variant="caption"
                    color={resolvedHelperTextColor}
                    align="center"
                >
                    {helperText}
                </Typography>
            )}
        </View>
    );
}

const sizeClasses: Record<LoadingBarSize, string> = {
    sm: 'h-[6px]',
    md: 'h-[18px]',
};

const fillClasses: Record<LoadingBarVariant, string> = {
    success: 'bg-green-500',
    warning: 'bg-yellow-400',
    error: 'bg-red-600',
    neutral: 'bg-neutral-500',
};