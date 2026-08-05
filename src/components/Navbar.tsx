import React, { type ComponentType } from 'react';
import { Pressable, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeOutline from '../assets/navbar/home_outline.svg';
import HomeSelected from '../assets/navbar/home_selected.svg';
import LogbookOutline from '../assets/navbar/logbook_outline.svg';
import LogbookSelected from '../assets/navbar/logbook_selected.svg';
import MessagesOutline from '../assets/navbar/messages_outline.svg';
import MessagesSelected from '../assets/navbar/messages_selected.svg';
import ProfileOutline from '../assets/navbar/profile_outline.svg';
import ProfileSelected from '../assets/navbar/profile_selected.svg';
import SearchOutline from '../assets/navbar/search_outline.svg';
import SearchSelected from '../assets/navbar/search_selected.svg';
import { theme } from '../theme/theme';

export type NavbarTab =
    | 'profile'
    | 'logbook'
    | 'home'
    | 'messages'
    | 'search';

type NavbarProps = {
    selectedTab: NavbarTab;
    onTabPress: (tab: NavbarTab) => void;
    className?: string;
};

type NavbarItem = {
    tab: NavbarTab;
    label: string;
    outlineIcon: ComponentType<SvgProps>;
    selectedIcon: ComponentType<SvgProps>;
};

const ICON_SIZE = 45;
const NAVBAR_HEIGHT = 50;

const navbarItems: NavbarItem[] = [
    {
        tab: 'profile',
        label: 'Profile',
        outlineIcon: ProfileOutline,
        selectedIcon: ProfileSelected,
    },
    {
        tab: 'logbook',
        label: 'Logbook',
        outlineIcon: LogbookOutline,
        selectedIcon: LogbookSelected,
    },
    {
        tab: 'home',
        label: 'Home',
        outlineIcon: HomeOutline,
        selectedIcon: HomeSelected,
    },
    {
        tab: 'messages',
        label: 'Messages',
        outlineIcon: MessagesOutline,
        selectedIcon: MessagesSelected,
    },
    {
        tab: 'search',
        label: 'Search',
        outlineIcon: SearchOutline,
        selectedIcon: SearchSelected,
    },
];

const cn = (...classes: Array<string | false | undefined | null>) =>
    classes.filter(Boolean).join(' ');

export function Navbar({
    selectedTab,
    onTabPress,
    className,
}: NavbarProps) {
    const safeAreaInsets = useSafeAreaInsets();

    return (
        <View
            className={cn(
                'w-full flex-row items-center px-4',
                className,
            )}
            style={{
                height: NAVBAR_HEIGHT + safeAreaInsets.bottom,
                backgroundColor: theme.colours.ubhRed[9],
            }}
        >
            {navbarItems.map(item => {
                const isSelected = selectedTab === item.tab;

                const Icon = isSelected
                    ? item.selectedIcon
                    : item.outlineIcon;

                return (
                    <Pressable
                        key={item.tab}
                        onPress={() => onTabPress(item.tab)}
                        hitSlop={8}
                        accessibilityRole="tab"
                        accessibilityLabel={item.label}
                        accessibilityState={{
                            selected: isSelected,
                        }}
                        className="h-full flex-1 items-center justify-center"
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.7 : 1,
                        })}
                    >
                        <Icon
                            width={ICON_SIZE}
                            height={ICON_SIZE}
                        />
                    </Pressable>
                );
            })}
        </View>
    );
}