// src/components/icons/ErrorIcon.tsx

import React from 'react';
import { Text, View } from 'react-native';

type ErrorIconProps = {
    size?: number;
    backgroundColor?: string;
    color?: string;
};

export function ErrorIcon({
    size = 22,
    backgroundColor = '#941F1F',
    color = '#ffffff',
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