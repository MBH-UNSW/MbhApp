import React from 'react';
import { Text, View } from 'react-native';

export default function ErrorIcon() {
    return (
        <View
            className="h-6 w-6 items-center justify-center rounded-full bg-red-700"
            accessibilityRole="image"
            accessibilityLabel="Error"
        >
            <Text
                className="text-base font-extrabold text-white"
                style={{
                    lineHeight: 20,
                    transform: [{ translateY: -1 }],
                }}
            >
                !
            </Text>
        </View>
    );
}