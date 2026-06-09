import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Typography } from './Typography';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
};

type PaginationButtonProps = {
    direction: 'previous' | 'next';
    disabled?: boolean;
    onPress?: () => void;
};

type PaginationIndicatorProps = {
    page: number;
    active?: boolean;
    onPress?: () => void;
};

const cn = (...classes: Array<string | false | undefined | null>) =>
    classes.filter(Boolean).join(' ');

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className,
}: PaginationProps) {
    const safeTotalPages = Math.max(totalPages, 1);
    const safeCurrentPage = Math.min(Math.max(currentPage, 1), safeTotalPages);

    const pages = Array.from(
        { length: safeTotalPages },
        (_, index) => index + 1,
    );

    const canGoPrevious = safeCurrentPage > 1;
    const canGoNext = safeCurrentPage < safeTotalPages;

    return (
        <View
            className={cn(
                'flex-row items-center justify-center gap-3',
                className,
            )}
        >
            <PaginationButton
                direction="previous"
                disabled={!canGoPrevious}
                onPress={() => onPageChange(safeCurrentPage - 1)}
            />

            {pages.map(page => (
                <PaginationIndicator
                    key={page}
                    page={page}
                    active={page === safeCurrentPage}
                    onPress={() => onPageChange(page)}
                />
            ))}

            <PaginationButton
                direction="next"
                disabled={!canGoNext}
                onPress={() => onPageChange(safeCurrentPage + 1)}
            />
        </View>
    );
}

function PaginationButton({
    direction,
    disabled,
    onPress,
}: PaginationButtonProps) {
    const Icon = direction === 'previous' ? ChevronLeft : ChevronRight;
    const isPrevious = direction === 'previous';

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={isPrevious ? 'Previous page' : 'Next page'}
            accessibilityState={{ disabled }}
        >
            {({ pressed }) => {
                const isPressed = pressed && !disabled;

                const buttonClassName = disabled
                    ? 'bg-neutral-200'
                    : isPressed
                        ? 'bg-neutral-700'
                        : 'bg-neutral-300';

                const iconColor = disabled
                    ? '#979797'
                    : isPressed
                        ? '#ffffff'
                        : '#000000';

                return (
                    <View
                        className={cn(
                            'h-9 w-9 items-center justify-center rounded-full',
                            buttonClassName,
                        )}
                    >
                        <Icon
                            size={18}
                            strokeWidth={2.5}
                            color={iconColor}
                        />
                    </View>
                );
            }}
        </Pressable>
    );
}

function PaginationIndicator({
    page,
    active,
    onPress,
}: PaginationIndicatorProps) {
    return (
        <Pressable
            onPress={onPress}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Page ${page}`}
            accessibilityState={{ selected: active }}
        >
            {({ pressed }) => (
                <View
                    className={cn(
                        'h-9 w-9 items-center justify-center rounded-full',
                        active || pressed
                            ? 'bg-neutral-700'
                            : 'bg-neutral-300',
                    )}
                >
                    <Typography
                        variant="body1"
                        weight="semibold"
                        align="center"
                        customColor={active || pressed ? '#ffffff' : '#000000'}
                        className="text-[16px] leading-[20px]"
                    >
                        {page}
                    </Typography>
                </View>
            )}
        </Pressable>
    );
}