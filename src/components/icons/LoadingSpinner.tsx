import React from 'react';
import { ActivityIndicator } from 'react-native';

type LoadingSpinnerProps = {
    color?: string;
    size?: 'small' | 'large';
};

export function LoadingSpinner({
    color = '#000000',
    size = 'small',
}: LoadingSpinnerProps) {
    return <ActivityIndicator size={size} color={color} />;
}