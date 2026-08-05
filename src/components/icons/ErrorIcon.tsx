// src/components/icons/ErrorIcon.tsx

import React from 'react';
import { Text, View } from 'react-native';
import { theme } from '../../theme/theme';

type ErrorIconProps = {
    size?: number;
    backgroundColor?: string;
    color?: string;
};

export function ErrorIcon({
    size = 22,
    backgroundColor = theme.status.error.shadow,
    color = theme.colours.ubhNeutral[0],
}: ErrorIconProps) {
    return (
        <View
            className="items-center justify-center rounded-full"
            accessibilityRole="image"
            accessibilityLabel="Error"
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor,
            }}
        >
            <Text
                className="font-extrabold"
                style={{
                    color,
                    fontSize: size * 0.7,
                    lineHeight: size,
                    includeFontPadding: false,
                    textAlign: 'center',
                }}
            >
                !
            </Text>
        </View>
    );
}