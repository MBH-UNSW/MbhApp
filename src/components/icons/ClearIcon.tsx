import { X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

export type ClearIconVariant = 'subtle' | 'neutral' | 'primary';

type ClearIconProps = {
    variant?: ClearIconVariant;
    onPress?: () => void;
};

const cn = (...classes: Array<string | false | undefined | null>) =>
    classes.filter(Boolean).join(' ');

export function ClearIcon({ variant = 'subtle', onPress }: ClearIconProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Pressable
            onPress={onPress}
            onHoverIn={() => setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Clear"
        >
            {({ pressed }) => {
                const currentVariant: ClearIconVariant = pressed
                    ? 'primary'
                    : isHovered
                        ? 'neutral'
                        : variant;

                return (
                    <View
                        className={cn(
                            'h-[22px] w-[22px] items-center justify-center rounded-full',
                            clearIconClasses[currentVariant],
                        )}
                    >
                        <X
                            size={16}
                            strokeWidth={3.5}
                            color={clearIconColors[currentVariant]}
                        />
                    </View>
                );
            }}
        </Pressable>
    );
}

const clearIconClasses: Record<ClearIconVariant, string> = {
    subtle: 'bg-neutral-400',
    neutral: 'bg-neutral-400',
    primary: 'bg-blue-600',
};

const clearIconColors: Record<ClearIconVariant, string> = {
    subtle: '#ffffff',
    neutral: '#000000',
    primary: '#ffffff',
};