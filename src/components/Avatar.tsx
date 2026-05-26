import React from 'react';
import { View } from 'react-native';

import { Typography } from './Typography';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

type AvatarProps = {
    initials: string;
    size?: AvatarSize;
    className?: string;
};

const cn = (...classes: Array<string | false | undefined | null>) =>
    classes.filter(Boolean).join(' ');

export function Avatar({
    initials,
    size = 'md',
    className,
}: AvatarProps) {
    const displayInitials = initials.trim().slice(0, 2).toUpperCase() || '?';

    return (
        <View
            className={cn(
                'items-center justify-center rounded-full bg-neutral-200',
                sizeClasses[size],
                className,
            )}
            accessibilityRole="image"
            accessibilityLabel={`${displayInitials} avatar`}
        >
            <Typography
                variant="body1"
                weight="semibold"
                align="center"
                customColor="#000000"
                className={textClasses[size]}
            >
                {displayInitials}
            </Typography>
        </View>
    );
}

const sizeClasses: Record<AvatarSize, string> = {
    sm: 'h-10 w-10',
    md: 'h-14 w-14',
    lg: 'h-20 w-20',
    xl: 'h-28 w-28',
};

const textClasses: Record<AvatarSize, string> = {
    sm: 'text-[14px] leading-[18px]',
    md: 'text-[20px] leading-[24px]',
    lg: 'text-[28px] leading-[34px]',
    xl: 'text-[40px] leading-[46px]',
};