import {
    ArrowLeft,
    CalendarDays,
    ChevronRight,
    HelpCircle,
    Package,
    Paperclip,
    Plus,
    Siren,
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Pill } from '../components/Pill';
import { SearchBar } from '../components/SearchBar';
import {
    H1,
    H3,
    H5,
    Typography,
} from '../components/Typography';
import { theme } from '../theme/theme';

type ScreenMode = 'inbox' | 'conversation' | 'new';
type InboxFilter = 'All' | 'Unread' | 'Resolved';

type MessageCategory =
    | 'Emergency'
    | 'Appointment Making'
    | 'Supply Restock'
    | 'General Question';

type Conversation = {
    id: string;
    name: string;
    initials: string;
    preview: string;
    category: MessageCategory;
    time: string;
    dateLabel: string;
    online: boolean;
    unread?: boolean;
    resolved?: boolean;
};

type ChatMessage = {
    id: string;
    sender: 'patient' | 'nurse';
    message: string;
    time: string;
};

const categoryColours: Record<MessageCategory, string> = {
    Emergency: '#F3483B',
    'Appointment Making': '#BA7EFF',
    'Supply Restock': '#7E9CFF',
    'General Question': '#38D5A6',
};

const categoryBackgrounds: Record<MessageCategory, string> = {
    Emergency: '#FDE8E6',
    'Appointment Making': '#F0E5FF',
    'Supply Restock': '#E5EAFF',
    'General Question': '#DDF7EF',
};

const categoryDescriptions: Record<MessageCategory, string> = {
    Emergency: 'Tell your care team about an urgent concern.',
    'Appointment Making': 'Book, change or ask about an appointment.',
    'Supply Restock': 'Request replacement dressings or other supplies.',
    'General Question': 'Ask your care team a non-urgent question.',
};

const initialConversations: Conversation[] = [
    {
        id: '1',
        name: 'Nurse Tasfia',
        initials: 'NS',
        preview: 'Yes, Wednesday at 11:30 am works for me. Thank you!',
        category: 'Appointment Making',
        time: '10:42 am',
        dateLabel: 'Today',
        online: true,
    },
    {
        id: '2',
        name: 'Nurse Tasfia',
        initials: 'NS',
        preview: 'Hello John! You should receive your dressing this afternoon :D',
        category: 'Supply Restock',
        time: 'Yesterday',
        dateLabel: 'Yesterday',
        online: true,
        unread: true,
    },
    {
        id: '3',
        name: 'Clinical Support',
        initials: 'CS',
        preview: "You're very welcome. I'll mark this conversation as resolved.",
        category: 'General Question',
        time: 'Monday',
        dateLabel: 'Monday',
        online: false,
        resolved: true,
    },
];

const initialMessagesByConversation: Record<string, ChatMessage[]> = {
    '1': [
        {
            id: '1-1',
            sender: 'patient',
            message:
                'Hi, could I please book an appointment for Tuesday at 2:00 pm?',
            time: '10:25 am',
        },
        {
            id: '1-2',
            sender: 'nurse',
            message:
                "The doctor isn't available at 2:00 pm on Tuesday but they can do Wednesday at 11:30 am instead. Would that work for you?",
            time: '10:37 am',
        },
        {
            id: '1-3',
            sender: 'patient',
            message:
                'Yes, Wednesday at 11:30 am works for me. Thank you!',
            time: '10:42 am',
        },
    ],
    '2': [
        {
            id: '2-1',
            sender: 'patient',
            message:
                'Hi, I just need a restock on dressing for my driveline',
            time: '10:55 am',
        },
        {
            id: '2-2',
            sender: 'nurse',
            message:
                'Hello John! You should receive your dressing this afternoon :D',
            time: '12:18 pm',
        },
    ],
    '3': [
        {
            id: '3-1',
            sender: 'patient',
            message:
                'Hi, is this the best place to ask general questions about my care between appointments?',
            time: '9:12 am',
        },
        {
            id: '3-2',
            sender: 'nurse',
            message:
                'Yes, you can send us a message here and someone from the team will get back to you when available.',
            time: '9:28 am',
        },
        {
            id: '3-3',
            sender: 'patient',
            message: 'Sounds good, thanks!',
            time: '9:32 am',
        },
        {
            id: '3-4',
            sender: 'nurse',
            message:
                "You're very welcome. I'll mark this conversation as resolved.",
            time: '9:36 am',
        },
    ],
};


export function MessagesScreen() {
    const [screenMode, setScreenMode] =
        useState<ScreenMode>('inbox');
    const [searchValue, setSearchValue] = useState('');
    const [filter, setFilter] =
        useState<InboxFilter>('All');
    const [conversationList, setConversationList] =
        useState<Conversation[]>(initialConversations);
    const [activeConversationId, setActiveConversationId] =
        useState('2');
    const [newCategory, setNewCategory] =
        useState<MessageCategory | null>(null);
    const [messageDraft, setMessageDraft] = useState('');
    const [messagesByConversation, setMessagesByConversation] =
        useState<Record<string, ChatMessage[]>>(
            initialMessagesByConversation,
        );

    const activeConversation =
        conversationList.find(
            conversation =>
                conversation.id === activeConversationId,
        ) ?? conversationList[0];

    const activeCategory = activeConversation.category;
    const activeMessages =
        messagesByConversation[activeConversation.id] ?? [];

    const filteredConversations = useMemo(() => {
        const query = searchValue.trim().toLowerCase();

        return conversationList.filter(conversation => {
            const matchesSearch =
                !query ||
                conversation.name
                    .toLowerCase()
                    .includes(query) ||
                conversation.preview
                    .toLowerCase()
                    .includes(query) ||
                conversation.category
                    .toLowerCase()
                    .includes(query);

            const matchesFilter =
                filter === 'All' ||
                (filter === 'Unread' &&
                    conversation.unread === true) ||
                (filter === 'Resolved' &&
                    conversation.resolved === true);

            return matchesSearch && matchesFilter;
        });
    }, [conversationList, filter, searchValue]);

    const openConversation = (
        conversation: Conversation,
    ) => {
        setActiveConversationId(conversation.id);
        setNewCategory(null);
        setMessageDraft('');
        setConversationList(previous =>
            previous.map(item =>
                item.id === conversation.id
                    ? { ...item, unread: false }
                    : item,
            ),
        );
        setScreenMode('conversation');
    };

    const startConversation = () => {
        if (!newCategory) {
            Alert.alert(
                'Choose a topic',
                'Please select what you would like help with.',
            );
            return;
        }

        const conversationId = `conversation-${Date.now()}`;
        const isNurseConversation =
            newCategory === 'Appointment Making' ||
            newCategory === 'Supply Restock';

        const newConversation: Conversation = {
            id: conversationId,
            name: isNurseConversation
                ? 'Nurse Tasfia'
                : 'Clinical Support',
            initials: isNurseConversation ? 'NS' : 'CS',
            preview: 'No messages yet',
            category: newCategory,
            time: 'Now',
            dateLabel: 'Today',
            online: true,
            unread: false,
            resolved: false,
        };

        setConversationList(previous => [
            newConversation,
            ...previous,
        ]);
        setMessagesByConversation(previous => ({
            ...previous,
            [conversationId]: [],
        }));
        setActiveConversationId(conversationId);
        setNewCategory(null);
        setMessageDraft('');
        setScreenMode('conversation');
    };

    const sendMessage = () => {
        const trimmedMessage = messageDraft.trim();

        if (!trimmedMessage) {
            return;
        }

        const sentAt = new Date().toLocaleTimeString(
            'en-AU',
            {
                hour: 'numeric',
                minute: '2-digit',
            },
        );

        const nextMessage: ChatMessage = {
            id: `${Date.now()}`,
            sender: 'patient',
            message: trimmedMessage,
            time: sentAt,
        };

        setMessagesByConversation(previous => ({
            ...previous,
            [activeConversation.id]: [
                ...(previous[activeConversation.id] ?? []),
                nextMessage,
            ],
        }));

        setConversationList(previous => {
            const updatedConversation = previous.find(
                conversation =>
                    conversation.id === activeConversation.id,
            );

            if (!updatedConversation) {
                return previous;
            }

            const nextConversation: Conversation = {
                ...updatedConversation,
                preview: trimmedMessage,
                time: sentAt,
                dateLabel: 'Today',
                unread: false,
                resolved: false,
            };

            return [
                nextConversation,
                ...previous.filter(
                    conversation =>
                        conversation.id !== activeConversation.id,
                ),
            ];
        });

        setMessageDraft('');
    };

    if (screenMode === 'conversation') {
        return (
            <SafeAreaView
                edges={['top']}
                className="flex-1"
                style={{
                    backgroundColor:
                        theme.colours.ubhNeutral[2],
                }}
            >
                <View
                    className="border-b bg-white px-4 pb-4 pt-4"
                    style={{
                        borderColor:
                            theme.colours.ubhNeutral[3],
                    }}
                >
                    <View className="flex-row items-center">
                        <Pressable
                            onPress={() =>
                                setScreenMode('inbox')
                            }
                            className="h-11 w-11 items-center justify-center"
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.55 : 1,
                                transform: [
                                    { scale: pressed ? 0.94 : 1 },
                                ],
                            })}
                            accessibilityRole="button"
                            accessibilityLabel="Back to messages"
                        >
                            <ArrowLeft
                                size={22}
                                strokeWidth={2.5}
                                color={theme.colours.ubhRed[7]}
                            />
                        </Pressable>

                        <View className="ml-1">
                            <Avatar
                                initials={
                                    activeConversation.initials
                                }
                                size="sm"
                            />
                        </View>

                        <View className="ml-3 flex-1 py-1">
                            <H5>{activeConversation.name}</H5>

                            <View className="mt-1 flex-row items-center">
                                <View
                                    className="mr-2 h-2 w-2 rounded-full"
                                    style={{
                                        backgroundColor:
                                            activeConversation.online
                                                ? theme.status
                                                    .success
                                                    .text
                                                : theme.colours
                                                    .ubhNeutral[5],
                                    }}
                                />

                                <Typography
                                    variant="caption"
                                    customColor={
                                        theme.colours
                                            .ubhNeutral[7]
                                    }
                                >
                                    {activeConversation.online
                                        ? 'Online'
                                        : 'Offline'}
                                </Typography>
                            </View>
                        </View>
                    </View>

                    <View className="mt-2 items-center">
                        <Pill
                            label={activeCategory}
                            color={
                                categoryColours[
                                activeCategory
                                ]
                            }
                            textColor="#FFFFFF"
                            className="px-5 py-1.5"
                            textClassName="text-[12px] font-semibold"
                            style={{ alignSelf: 'center' }}
                        />
                    </View>
                </View>

                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingVertical: 20,
                    }}
                >
                    <View className="mb-5 items-center">
                        <Typography
                            variant="caption"
                            customColor={
                                theme.colours.ubhNeutral[7]
                            }
                        >
                            {activeConversation.dateLabel}
                        </Typography>
                    </View>

                    {activeMessages.length === 0 ? (
                        <View
                            className="rounded-xl border bg-white p-5"
                            style={{
                                borderColor:
                                    theme.colours
                                        .ubhNeutral[3],
                            }}
                        >
                            <H5>Start your conversation</H5>

                            <View className="mt-2">
                                <Typography
                                    variant="body2"
                                    customColor={
                                        theme.colours
                                            .ubhNeutral[8]
                                    }
                                >
                                    Send your care team a message about your{' '}
                                    {activeCategory.toLowerCase()}.
                                </Typography>
                            </View>
                        </View>
                    ) : (
                        <View className="gap-4">
                            {activeMessages.map(message => (
                                <MessageBubble
                                    key={message.id}
                                    message={message}
                                />
                            ))}
                        </View>
                    )}
                </ScrollView>

                <View
                    className="border-t bg-white px-4 pb-3 pt-3"
                    style={{
                        borderColor:
                            theme.colours.ubhNeutral[3],
                    }}
                >
                    <View className="flex-row items-center gap-3">
                        <Pressable
                            onPress={() =>
                                Alert.alert(
                                    'Attachment',
                                    'Attachments are disabled in this presentation demo.',
                                )
                            }
                            className="h-14 w-14 items-center justify-center rounded-full"
                            style={({ pressed }) => ({
                                backgroundColor:
                                    theme.colours.ubhNeutral[2],
                                opacity: pressed ? 0.65 : 1,
                            })}
                        >
                            <Paperclip
                                size={24}
                                color={
                                    theme.colours.ubhNeutral[9]
                                }
                            />
                        </Pressable>

                        <View className="relative flex-1 justify-center">
                            <Input
                                value={messageDraft}
                                onChangeText={setMessageDraft}
                                placeholder="Type a message..."
                                inputType="text"
                                className="h-14 rounded-[18px] pr-14"
                                inputClassName="font-normal"
                            />

                            <Pressable
                                onPress={sendMessage}
                                disabled={!messageDraft.trim()}
                                className="absolute right-2 h-10 w-10 items-center justify-center"
                                style={{
                                    opacity: messageDraft.trim()
                                        ? 1
                                        : 0.35,
                                }}
                            >
                                <ChevronRight
                                    size={28}
                                    strokeWidth={2.25}
                                    color={
                                        messageDraft.trim()
                                            ? theme.colours.ubhRed[7]
                                            : theme.colours.ubhNeutral[6]
                                    }
                                />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    if (screenMode === 'new') {
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
                    <View className="flex-row items-center">
                        <Pressable
                            onPress={() =>
                                setScreenMode('inbox')
                            }
                            className="h-11 w-11 items-center justify-center"
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.55 : 1,
                                transform: [
                                    { scale: pressed ? 0.94 : 1 },
                                ],
                            })}
                            accessibilityRole="button"
                            accessibilityLabel="Back to messages"
                        >
                            <ArrowLeft
                                size={22}
                                strokeWidth={2.5}
                                color={theme.colours.ubhRed[7]}
                            />
                        </Pressable>

                        <View className="ml-2 flex-1">
                            <H1>New message</H1>
                        </View>
                    </View>

                    <View className="mt-2">
                        <Typography
                            variant="body2"
                            customColor={
                                theme.colours.ubhNeutral[8]
                            }
                        >
                            Choose a topic and we’ll connect you with your care team.
                        </Typography>
                    </View>

                    <View
                        className="mt-6 overflow-hidden rounded-xl border bg-white"
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
                        <View className="p-5 pb-3">
                            <H3>What can we help with?</H3>

                            <View className="mt-1">
                                <Typography
                                    variant="body2"
                                    customColor={
                                        theme.colours.ubhNeutral[8]
                                    }
                                >
                                    Select the option that best matches your message.
                                </Typography>
                            </View>
                        </View>

                        {(
                            [
                                'Emergency',
                                'Appointment Making',
                                'Supply Restock',
                                'General Question',
                            ] as MessageCategory[]
                        ).map(category => (
                            <MessageTypeRow
                                key={category}
                                category={category}
                                selected={
                                    newCategory === category
                                }
                                onPress={() =>
                                    setNewCategory(category)
                                }
                            />
                        ))}
                    </View>

                    {newCategory === 'Emergency' && (
                        <View
                            className="mt-4 rounded-xl border p-4"
                            style={{
                                borderColor: '#F3483B',
                                backgroundColor:
                                    theme.colours.ubhRed[0],
                            }}
                        >
                            <Typography
                                variant="body2"
                                customColor={
                                    theme.colours.ubhRed[9]
                                }
                            >
                                For a medical emergency, call Triple Zero (000). Messaging should not be used for emergency care.
                            </Typography>
                        </View>
                    )}

                    <View className="mt-6">
                        <Button
                            title="Continue to message"
                            variant="contained"
                            size="md"
                            state={
                                newCategory
                                    ? 'default'
                                    : 'disabled'
                            }
                            onPress={startConversation}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

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
                    <View className="flex-row items-center justify-between">
                        <H1>Messages</H1>

                        <Button
                            title="New"
                            variant="contained"
                            size="sm"
                            iconLeft={Plus}
                            onPress={() => {
                                setNewCategory(null);
                                setScreenMode('new');
                            }}
                        />
                    </View>

                    <View className="mt-1">
                        <Typography
                            variant="body2"
                            customColor={
                                theme.colours.ubhNeutral[8]
                            }
                        >
                            Stay connected with your care team
                        </Typography>
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
                    <H3>Conversations</H3>

                    <View className="mt-4">
                        <SearchBar
                            value={searchValue}
                            onChangeText={setSearchValue}
                            placeholder="Search messages"
                        />
                    </View>

                    <View className="mt-4 flex-row gap-2">
                        {(
                            [
                                'All',
                                'Unread',
                                'Resolved',
                            ] as InboxFilter[]
                        ).map(option => (
                            <Pill
                                key={option}
                                label={option}
                                variant="outline"
                                selected={filter === option}
                                color={
                                    theme.colours.ubhRed[7]
                                }
                                textColor={
                                    filter === option
                                        ? theme.colours
                                            .ubhNeutral[0]
                                        : theme.colours
                                            .ubhRed[7]
                                }
                                className="px-4 py-1.5"
                                textClassName="text-[13px] font-semibold"
                                onPress={() =>
                                    setFilter(option)
                                }
                            />
                        ))}
                    </View>

                    <View className="mt-5 gap-3">
                        {filteredConversations.length === 0 ? (
                            <View
                                className="rounded-xl border p-5"
                                style={{
                                    borderColor:
                                        theme.colours
                                            .ubhNeutral[3],
                                    backgroundColor:
                                        theme.colours
                                            .ubhCream[1],
                                }}
                            >
                                <H5>No messages found</H5>

                                <View className="mt-1">
                                    <Typography
                                        variant="body2"
                                        customColor={
                                            theme.colours
                                                .ubhNeutral[8]
                                        }
                                    >
                                        Try changing your search or filter.
                                    </Typography>
                                </View>
                            </View>
                        ) : (
                            filteredConversations.map(
                                conversation => (
                                    <ConversationRow
                                        key={conversation.id}
                                        conversation={
                                            conversation
                                        }
                                        onPress={() =>
                                            openConversation(
                                                conversation,
                                            )
                                        }
                                    />
                                ),
                            )
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function ConversationRow({
    conversation,
    onPress,
}: {
    conversation: Conversation;
    onPress: () => void;
}) {
    const categoryColour =
        categoryColours[conversation.category];

    return (
        <Pressable
            onPress={onPress}
            className="rounded-xl border-[0.25px]"
            style={({ pressed }) => ({
                borderColor:
                    theme.colours.ubhNeutral[3],
                backgroundColor:
                    theme.colours.ubhCream[1],
                opacity: pressed ? 0.72 : 1,
            })}
        >
            <View className="p-4">
                <View className="flex-row items-start">
                    <View className="pt-1">
                        <Avatar
                            initials={conversation.initials}
                            size="sm"
                        />
                    </View>

                    <View className="ml-3 flex-1">
                        <View className="flex-row items-center">
                            <H5>{conversation.name}</H5>

                            {conversation.unread && (
                                <View
                                    className="ml-2 h-2 w-2 rounded-full"
                                    style={{
                                        backgroundColor:
                                            theme.colours
                                                .ubhRed[7],
                                    }}
                                />
                            )}

                            <View className="ml-auto pl-3">
                                <Typography
                                    variant="caption"
                                    customColor={
                                        theme.colours
                                            .ubhNeutral[7]
                                    }
                                >
                                    {conversation.time}
                                </Typography>
                            </View>
                        </View>

                        <View className="mt-1">
                            <Typography
                                variant="body2"
                                customColor={
                                    theme.colours
                                        .ubhNeutral[8]
                                }
                            >
                                {conversation.preview}
                            </Typography>
                        </View>

                        <View className="mt-3 flex-row items-center">
                            <View
                                className="mr-2 h-2.5 w-2.5 rounded-full"
                                style={{
                                    backgroundColor:
                                        categoryColour,
                                }}
                            />

                            <Typography
                                variant="caption"
                                weight="semibold"
                                customColor={
                                    theme.colours
                                        .ubhNeutral[9]
                                }
                            >
                                {conversation.category}
                            </Typography>

                            <View className="ml-auto flex-row items-center">
                                <View
                                    className="mr-2 h-2 w-2 rounded-full"
                                    style={{
                                        backgroundColor:
                                            conversation.online
                                                ? theme.status
                                                    .success
                                                    .text
                                                : theme.colours
                                                    .ubhNeutral[5],
                                    }}
                                />

                                <Typography
                                    variant="caption"
                                    customColor={
                                        theme.colours
                                            .ubhNeutral[7]
                                    }
                                >
                                    {conversation.online
                                        ? 'Online'
                                        : 'Offline'}
                                </Typography>

                                <View className="ml-2">
                                    <ChevronRight
                                        size={22}
                                        color={
                                            theme.colours
                                                .ubhNeutral[6]
                                        }
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

function MessageBubble({
    message,
}: {
    message: ChatMessage;
}) {
    const isPatient = message.sender === 'patient';

    return (
        <View
            className={
                isPatient
                    ? 'items-end'
                    : 'items-start'
            }
        >
            <View
                className="max-w-[82%] rounded-xl border px-4 py-3"
                style={{
                    backgroundColor: isPatient
                        ? theme.colours.ubhRed[7]
                        : theme.colours.ubhCream[1],
                    borderColor: isPatient
                        ? theme.colours.ubhRed[7]
                        : theme.colours.ubhNeutral[3],
                }}
            >
                <Typography
                    variant="body1"
                    customColor={
                        isPatient
                            ? theme.colours.ubhNeutral[0]
                            : theme.colours.ubhNeutral[9]
                    }
                >
                    {message.message}
                </Typography>
            </View>

            <View className="mt-1 px-1">
                <Typography
                    variant="caption"
                    customColor={
                        theme.colours.ubhNeutral[7]
                    }
                >
                    {message.time}
                </Typography>
            </View>
        </View>
    );
}

function MessageTypeRow({
    category,
    selected,
    onPress,
}: {
    category: MessageCategory;
    selected: boolean;
    onPress: () => void;
}) {
    const colour = categoryColours[category];

    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-center px-5 py-4"
            style={({ pressed }) => ({
                backgroundColor: selected
                    ? categoryBackgrounds[category]
                    : '#FFFFFF',
                borderTopWidth: 1,
                borderTopColor:
                    theme.colours.ubhNeutral[2],
                opacity: pressed ? 0.72 : 1,
            })}
        >
            <View
                className="h-11 w-11 items-center justify-center rounded-full"
                style={{
                    backgroundColor:
                        categoryBackgrounds[category],
                }}
            >
                <CategoryIcon
                    category={category}
                    color={colour}
                />
            </View>

            <View className="ml-3 flex-1 pr-3">
                <Typography
                    variant="body1"
                    weight="semibold"
                    customColor={
                        theme.colours.ubhNeutral[9]
                    }
                >
                    {category}
                </Typography>

                <View className="mt-1">
                    <Typography
                        variant="caption"
                        customColor={
                            theme.colours.ubhNeutral[7]
                        }
                    >
                        {categoryDescriptions[category]}
                    </Typography>
                </View>
            </View>

            <View
                className="h-6 w-6 items-center justify-center rounded-full border-2"
                style={{
                    borderColor: selected
                        ? colour
                        : theme.colours.ubhNeutral[4],
                }}
            >
                {selected && (
                    <View
                        className="h-3 w-3 rounded-full"
                        style={{
                            backgroundColor: colour,
                        }}
                    />
                )}
            </View>
        </Pressable>
    );
}

function CategoryIcon({
    category,
    color,
}: {
    category: MessageCategory;
    color: string;
}) {
    const Icon =
        category === 'Emergency'
            ? Siren
            : category === 'Appointment Making'
                ? CalendarDays
                : category === 'Supply Restock'
                    ? Package
                    : HelpCircle;

    return <Icon size={24} color={color} />;
}
