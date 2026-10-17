import {
    Bell,
    CalendarDays,
    ChevronRight,
    CircleHelp,
    Droplets,
    Lock,
    LogOut,
    Mail,
    MapPin,
    MessageCircle,
    Pencil,
    Phone,
    Ruler,
    UserRound,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
    getAuth,
    signOut,
} from '@react-native-firebase/auth';

import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Dropdown } from '../components/Dropdown';
import { FormControl } from '../components/FormControl';
import { Input } from '../components/Input';
import { Pill } from '../components/Pill';
import { Toggle } from '../components/Toggle';
import {
    H1,
    H3,
    Typography,
} from '../components/Typography';
import { theme } from '../theme/theme';

type ProfileDetails = {
    fullName: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    bloodType: string;
    height: string;
    phone: string;
    email: string;
    address: string;
};

const initialProfile: ProfileDetails = {
    fullName: 'John Doe',
    birthDay: '04',
    birthMonth: '05',
    birthYear: '1988',
    bloodType: 'AB+',
    height: '172',
    phone: '+61412345678',
    email: 'johndoe123@gmail.com',
    address: '12/2, Tim Horton Road, NSW, 2203',
};

const bloodTypeOptions = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
].map(type => ({
    label: type,
    value: type,
}));

function getInitials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(part => part[0] ?? '')
        .join('')
        .toUpperCase();
}

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

function getDateOfBirth(profile: ProfileDetails) {
    const monthIndex = Number(profile.birthMonth) - 1;
    const monthName = monthNames[monthIndex] ?? profile.birthMonth;

    return `${Number(profile.birthDay)} ${monthName} ${profile.birthYear}`;
}

function isValidDateOfBirth(
    dayValue: string,
    monthValue: string,
    yearValue: string,
) {
    if (
        dayValue.length < 1 ||
        dayValue.length > 2 ||
        monthValue.length < 1 ||
        monthValue.length > 2 ||
        yearValue.length !== 4
    ) {
        return false;
    }

    const day = Number(dayValue);
    const month = Number(monthValue);
    const year = Number(yearValue);

    if (
        !Number.isInteger(day) ||
        !Number.isInteger(month) ||
        !Number.isInteger(year) ||
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31
    ) {
        return false;
    }

    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

export function ProfileScreen() {
    const [profile, setProfile] =
        useState<ProfileDetails>(initialProfile);
    const [draftProfile, setDraftProfile] =
        useState<ProfileDetails>(initialProfile);
    const [isEditing, setIsEditing] = useState(false);

    const [messageNotifications, setMessageNotifications] =
        useState(true);
    const [appointmentReminders, setAppointmentReminders] =
        useState(true);

    const startEditing = () => {
        setDraftProfile(profile);
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setDraftProfile(profile);
        setIsEditing(false);
    };

    const saveProfile = () => {
        if (!draftProfile.fullName.trim()) {
            Alert.alert(
                'Missing Details',
                'Please enter your full name.',
            );
            return;
        }

        if (!/^\d{3}$/.test(draftProfile.height)) {
            Alert.alert(
                'Invalid Height',
                'Please enter a 3-digit height in centimetres.',
            );
            return;
        }

        if (!draftProfile.email.trim()) {
            Alert.alert(
                'Missing Details',
                'Please enter your email address.',
            );
            return;
        }

        if (!draftProfile.phone.trim()) {
            Alert.alert(
                'Missing Details',
                'Please enter your phone number.',
            );
            return;
        }

        if (!draftProfile.address.trim()) {
            Alert.alert(
                'Missing Details',
                'Please enter your address.',
            );
            return;
        }

        if (
            !isValidDateOfBirth(
                draftProfile.birthDay,
                draftProfile.birthMonth,
                draftProfile.birthYear,
            )
        ) {
            Alert.alert(
                'Invalid Date',
                'Please enter a valid date of birth.',
            );
            return;
        }

        setProfile({
            ...draftProfile,
            fullName: draftProfile.fullName.trim(),
            height: draftProfile.height.trim(),
            phone: draftProfile.phone.trim(),
            email: draftProfile.email.trim(),
            address: draftProfile.address.trim(),
        });
        setIsEditing(false);
    };

    const handleSignOut = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await signOut(getAuth());
                        } catch (error) {
                            console.error(
                                'Failed to sign out:',
                                error,
                            );

                            Alert.alert(
                                'Unable to Sign Out',
                                'Please try again.',
                            );
                        }
                    },
                },
            ],
        );
    };

    return (
        <SafeAreaView
            edges={['top']}
            className="flex-1"
            style={{
                backgroundColor:
                    theme.colours.ubhNeutral[2],
            }}
        >
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 32,
                }}
            >
                <View>
                    <H1>My Profile</H1>

                    <View className="mt-1">
                        <Typography
                            variant="body2"
                            customColor={
                                theme.colours.ubhNeutral[8]
                            }
                        >
                            Your personal details and preferences
                        </Typography>
                    </View>
                </View>

                <View
                    className="mt-6 rounded-xl border bg-white p-5"
                    style={{
                        borderColor:
                            theme.colours.ubhNeutral[3],
                        shadowColor: '#000000',
                        shadowOpacity: 0.04,
                        shadowRadius: 8,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        elevation: 1,
                    }}
                >
                    <View className="flex-row items-center">
                        <Avatar
                            initials={getInitials(profile.fullName)}
                            size="lg"
                        />

                        <View className="ml-4 flex-1">
                            <H3>{profile.fullName}</H3>

                            <View className="mt-2 flex-row">
                                <Pill
                                    label="Patient"
                                    variant="outline"
                                    color={
                                        theme.colours
                                            .ubhRed[7]
                                    }
                                    textColor={
                                        theme.colours
                                            .ubhRed[7]
                                    }
                                    className="px-4 py-1"
                                    textClassName="text-[12px] font-semibold"
                                />
                            </View>

                            <View className="mt-2">
                                <Typography
                                    variant="caption"
                                    customColor={
                                        theme.colours
                                            .ubhNeutral[7]
                                    }
                                >
                                    Patient ID: PT-001
                                </Typography>
                            </View>
                        </View>
                    </View>
                </View>

                <View
                    className="mt-5 rounded-xl border bg-white p-5"
                    style={{
                        borderColor:
                            theme.colours.ubhNeutral[3],
                        shadowColor: '#000000',
                        shadowOpacity: 0.04,
                        shadowRadius: 8,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        elevation: 1,
                    }}
                >
                    {isEditing ? (
                        <>
                            <H3>Edit personal information</H3>

                            <View className="mt-1">
                                <Typography
                                    variant="body2"
                                    customColor={
                                        theme.colours
                                            .ubhNeutral[8]
                                    }
                                >
                                    Update the details shown on your profile.
                                </Typography>
                            </View>

                            <View className="mt-6 gap-5">
                                <EditableField
                                    label="Full name"
                                    icon={UserRound}
                                >
                                    <Input
                                        value={draftProfile.fullName}
                                        onChangeText={value =>
                                            setDraftProfile(previous => ({
                                                ...previous,
                                                fullName: value,
                                            }))
                                        }
                                        inputType="text"
                                        placeholder="Enter full name"
                                    />
                                </EditableField>

                                <EditableField
                                    label="Date of birth"
                                    icon={CalendarDays}
                                >
                                    <View className="flex-row items-end gap-2">
                                        <View className="w-[72px]">
                                            <Typography
                                                variant="caption"
                                                customColor={
                                                    theme.colours
                                                        .ubhNeutral[7]
                                                }
                                            >
                                                Day
                                            </Typography>

                                            <View className="mt-1">
                                                <Input
                                                    value={draftProfile.birthDay}
                                                    onChangeText={value =>
                                                        setDraftProfile(previous => ({
                                                            ...previous,
                                                            birthDay: value,
                                                        }))
                                                    }
                                                    inputType="numeric"
                                                    placeholder="DD"
                                                    maxLength={2}
                                                />
                                            </View>
                                        </View>

                                        <View className="w-[72px]">
                                            <Typography
                                                variant="caption"
                                                customColor={
                                                    theme.colours
                                                        .ubhNeutral[7]
                                                }
                                            >
                                                Month
                                            </Typography>

                                            <View className="mt-1">
                                                <Input
                                                    value={draftProfile.birthMonth}
                                                    onChangeText={value =>
                                                        setDraftProfile(previous => ({
                                                            ...previous,
                                                            birthMonth: value,
                                                        }))
                                                    }
                                                    inputType="numeric"
                                                    placeholder="MM"
                                                    maxLength={2}
                                                />
                                            </View>
                                        </View>

                                        <View className="flex-1">
                                            <Typography
                                                variant="caption"
                                                customColor={
                                                    theme.colours
                                                        .ubhNeutral[7]
                                                }
                                            >
                                                Year
                                            </Typography>

                                            <View className="mt-1">
                                                <Input
                                                    value={draftProfile.birthYear}
                                                    onChangeText={value =>
                                                        setDraftProfile(previous => ({
                                                            ...previous,
                                                            birthYear: value,
                                                        }))
                                                    }
                                                    inputType="numeric"
                                                    placeholder="YYYY"
                                                    maxLength={4}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </EditableField>

                                <EditableField
                                    label="Blood type"
                                    icon={Droplets}
                                >
                                    <Dropdown
                                        value={draftProfile.bloodType}
                                        placeholder="Select blood type"
                                        options={bloodTypeOptions}
                                        onChange={value =>
                                            setDraftProfile(previous => ({
                                                ...previous,
                                                bloodType: value,
                                            }))
                                        }
                                    />
                                </EditableField>

                                <EditableField
                                    label="Height"
                                    icon={Ruler}
                                >
                                    <View className="flex-row items-center gap-3">
                                        <View className="flex-1">
                                            <Input
                                                value={draftProfile.height}
                                                onChangeText={value =>
                                                    setDraftProfile(previous => ({
                                                        ...previous,
                                                        height: value,
                                                    }))
                                                }
                                                inputType="numeric"
                                                placeholder="172"
                                                maxLength={3}
                                            />
                                        </View>

                                        <Typography
                                            variant="body1"
                                            customColor={
                                                theme.colours
                                                    .ubhNeutral[8]
                                            }
                                        >
                                            cm
                                        </Typography>
                                    </View>
                                </EditableField>

                                <EditableField
                                    label="Phone"
                                    icon={Phone}
                                >
                                    <Input
                                        value={draftProfile.phone}
                                        onChangeText={value =>
                                            setDraftProfile(previous => ({
                                                ...previous,
                                                phone: value,
                                            }))
                                        }
                                        inputType="phone"
                                        placeholder="+61412345678"
                                    />
                                </EditableField>

                                <EditableField
                                    label="Email"
                                    icon={Mail}
                                >
                                    <Input
                                        value={draftProfile.email}
                                        onChangeText={value =>
                                            setDraftProfile(previous => ({
                                                ...previous,
                                                email: value,
                                            }))
                                        }
                                        inputType="email"
                                        placeholder="name@example.com"
                                    />
                                </EditableField>

                                <EditableField
                                    label="Address"
                                    icon={MapPin}
                                >
                                    <Input
                                        value={draftProfile.address}
                                        onChangeText={value =>
                                            setDraftProfile(previous => ({
                                                ...previous,
                                                address: value,
                                            }))
                                        }
                                        inputType="text"
                                        placeholder="Enter address"
                                    />
                                </EditableField>

                                <View className="mt-1 flex-row gap-3">
                                    <View className="flex-1">
                                        <Button
                                            title="Cancel"
                                            variant="outlined"
                                            size="md"
                                            onPress={cancelEditing}
                                        />
                                    </View>

                                    <View className="flex-1">
                                        <Button
                                            title="Save changes"
                                            variant="contained"
                                            size="md"
                                            onPress={saveProfile}
                                        />
                                    </View>
                                </View>
                            </View>
                        </>
                    ) : (
                        <>
                            <H3>Personal information</H3>

                            <View className="mt-3">
                                <ProfileDetailRow
                                    icon={UserRound}
                                    label="Full name"
                                    value={profile.fullName}
                                />
                                <ProfileDetailRow
                                    icon={CalendarDays}
                                    label="Date of birth"
                                    value={getDateOfBirth(profile)}
                                />
                                <ProfileDetailRow
                                    icon={Droplets}
                                    label="Blood type"
                                    value={profile.bloodType}
                                />
                                <ProfileDetailRow
                                    icon={Ruler}
                                    label="Height"
                                    value={`${profile.height} cm`}
                                />
                                <ProfileDetailRow
                                    icon={Phone}
                                    label="Phone"
                                    value={profile.phone}
                                />
                                <ProfileDetailRow
                                    icon={Mail}
                                    label="Email"
                                    value={profile.email}
                                />
                                <ProfileDetailRow
                                    icon={MapPin}
                                    label="Address"
                                    value={profile.address}
                                    last
                                />
                            </View>

                            <View className="mt-5">
                                <Button
                                    title="Edit personal information"
                                    variant="outlined"
                                    size="md"
                                    iconLeft={Pencil}
                                    onPress={startEditing}
                                />
                            </View>
                        </>
                    )}
                </View>

                <View
                    className="mt-5 rounded-xl border bg-white p-5"
                    style={{
                        borderColor:
                            theme.colours.ubhNeutral[3],
                        shadowColor: '#000000',
                        shadowOpacity: 0.04,
                        shadowRadius: 8,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        elevation: 1,
                    }}
                >
                    <H3>Notifications</H3>

                    <View className="mt-1">
                        <Typography
                            variant="body2"
                            customColor={
                                theme.colours.ubhNeutral[8]
                            }
                        >
                            Choose what you would like to hear about.
                        </Typography>
                    </View>

                    <View className="mt-3">
                        <PreferenceRow
                            icon={MessageCircle}
                            title="Message notifications"
                            description="Get notified when your care team replies."
                            value={messageNotifications}
                            onChange={
                                setMessageNotifications
                            }
                        />

                        <PreferenceRow
                            icon={Bell}
                            title="Appointment reminders"
                            description="Receive reminders about upcoming appointments."
                            value={appointmentReminders}
                            onChange={
                                setAppointmentReminders
                            }
                            last
                        />
                    </View>
                </View>

                <View
                    className="mt-5 rounded-xl border bg-white p-5"
                    style={{
                        borderColor:
                            theme.colours.ubhNeutral[3],
                        shadowColor: '#000000',
                        shadowOpacity: 0.04,
                        shadowRadius: 8,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        elevation: 1,
                    }}
                >
                    <H3>Account & support</H3>

                    <View className="mt-3">
                        <SettingsRow
                            icon={Lock}
                            title="Privacy & security"
                            onPress={() =>
                                Alert.alert(
                                    'Privacy & Security',
                                    'Privacy settings are disabled for now.',
                                )
                            }
                        />

                        <SettingsRow
                            icon={CircleHelp}
                            title="Help & support"
                            onPress={() =>
                                Alert.alert(
                                    'Help & Support',
                                    'For assistance, contact your care team.',
                                )
                            }
                        />

                        <SettingsRow
                            icon={LogOut}
                            title="Sign out"
                            destructive
                            last
                            onPress={handleSignOut}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

type IconComponent = React.ComponentType<{
    size?: number;
    color?: string;
}>;

function ProfileDetailRow({
    icon: Icon,
    label,
    value,
    last = false,
}: {
    icon: IconComponent;
    label: string;
    value: string;
    last?: boolean;
}) {
    return (
        <View
            className="flex-row items-center py-4"
            style={{
                borderBottomWidth: last ? 0 : 1,
                borderBottomColor:
                    theme.colours.ubhNeutral[2],
            }}
        >
            <View className="w-8 items-center">
                <Icon
                    size={24}
                    color={theme.colours.ubhRed[7]}
                />
            </View>

            <View className="ml-3 flex-1">
                <Typography
                    variant="caption"
                    customColor={
                        theme.colours.ubhNeutral[7]
                    }
                >
                    {label}
                </Typography>

                <View className="mt-0.5">
                    <Typography
                        variant="body1"
                        weight="semibold"
                        customColor={
                            theme.colours.ubhNeutral[9]
                        }
                    >
                        {value}
                    </Typography>
                </View>
            </View>
        </View>
    );
}

function EditableField({
    icon: Icon,
    label,
    children,
}: {
    icon: IconComponent;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <View className="flex-row items-start">
            <View className="w-8 items-center pt-1">
                <Icon
                    size={24}
                    color={theme.colours.ubhRed[7]}
                />
            </View>

            <View className="ml-3 flex-1">
                <FormControl label={label}>
                    {children}
                </FormControl>
            </View>
        </View>
    );
}

function PreferenceRow({
    icon: Icon,
    title,
    description,
    value,
    onChange,
    last = false,
}: {
    icon: IconComponent;
    title: string;
    description: string;
    value: boolean;
    onChange: (value: boolean) => void;
    last?: boolean;
}) {
    return (
        <View
            className="flex-row items-center py-4"
            style={{
                borderBottomWidth: last ? 0 : 1,
                borderBottomColor:
                    theme.colours.ubhNeutral[2],
            }}
        >
            <View className="w-8 items-center">
                <Icon
                    size={24}
                    color={theme.colours.ubhRed[7]}
                />
            </View>

            <View className="ml-3 mr-4 flex-1">
                <Typography
                    variant="body1"
                    weight="semibold"
                    customColor={
                        theme.colours.ubhNeutral[9]
                    }
                >
                    {title}
                </Typography>

                <View className="mt-1">
                    <Typography
                        variant="caption"
                        customColor={
                            theme.colours.ubhNeutral[7]
                        }
                    >
                        {description}
                    </Typography>
                </View>
            </View>

            <Toggle
                value={value}
                onChange={onChange}
                activeColor={
                    theme.status.success.text
                }
            />
        </View>
    );
}

function SettingsRow({
    icon: Icon,
    title,
    onPress,
    destructive = false,
    last = false,
}: {
    icon: IconComponent;
    title: string;
    onPress: () => void;
    destructive?: boolean;
    last?: boolean;
}) {
    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-center py-4"
            style={({ pressed }) => ({
                borderBottomWidth: last ? 0 : 1,
                borderBottomColor:
                    theme.colours.ubhNeutral[2],
                opacity: pressed ? 0.65 : 1,
            })}
        >
            <View className="w-8 items-center">
                <Icon
                    size={24}
                    color={
                        destructive
                            ? theme.colours.ubhRed[7]
                            : theme.colours
                                .ubhNeutral[8]
                    }
                />
            </View>

            <View className="ml-3 flex-1">
                <Typography
                    variant="body1"
                    weight="semibold"
                    customColor={
                        destructive
                            ? theme.colours.ubhRed[7]
                            : theme.colours
                                .ubhNeutral[9]
                    }
                >
                    {title}
                </Typography>
            </View>

            <ChevronRight
                size={22}
                color={theme.colours.ubhNeutral[6]}
            />
        </Pressable>
    );
}
