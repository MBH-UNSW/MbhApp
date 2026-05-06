import React from 'react';
import { ActivityIndicator, View } from 'react-native';

type LoadingSpinnerProps = {
    colour?: string;
};

export default function LoadingSpinner({
    colour = '#6B7280',
}: LoadingSpinnerProps) {
    return (
        <View
            className="h-6 w-6 items-center justify-center"
            accessibilityRole="progressbar"
            accessibilityLabel="Loading"
        >
            <ActivityIndicator size="small" color={colour} />
        </View>
    );
}