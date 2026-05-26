import {
    errorCodes,
    isErrorWithCode,
    pick,
} from '@react-native-documents/picker';
import { launchCamera } from 'react-native-image-picker';
import { Camera, Check, File, Upload } from 'lucide-react-native';
import React from 'react';
import { Alert, Pressable, View } from 'react-native';

import { ClearIcon, type ClearIconVariant } from './icons/ClearIcon';
import { ErrorIcon } from './icons/ErrorIcon';
import { LoadingBar } from './LoadingBar';
import { Typography } from './Typography';

type FileUploadMode = 'file' | 'camera';
type FileUploadStatus = 'empty' | 'uploading' | 'success' | 'error';

export type SelectedUploadFile = {
    uri?: string;
    name?: string;
    type?: string;
    size?: number;
};

type FileUploadProps = {
    mode?: FileUploadMode;
    status?: FileUploadStatus;
    fileName?: string;
    progress?: number;
    showFileIcon?: boolean;
    showClearButton?: boolean;
    clearIconVariant?: ClearIconVariant;
    onFileSelected?: (file: SelectedUploadFile) => void;
    onPress?: () => void;
    onClear?: () => void;
    className?: string;
};

const cn = (...classes: Array<string | false | undefined | null>) =>
    classes.filter(Boolean).join(' ');

export function FileUpload({
    mode = 'file',
    status = 'empty',
    fileName,
    progress,
    showFileIcon = true,
    showClearButton = true,
    clearIconVariant = 'subtle',
    onFileSelected,
    onPress,
    onClear,
    className,
}: FileUploadProps) {
    const isEmpty = status === 'empty';
    const isUploading = status === 'uploading';
    const isSuccess = status === 'success';
    const isError = status === 'error';

    const displayFileName = fileName ?? 'Selected file';

    const handlePress = async () => {
        onPress?.();

        if (mode === 'camera') {
            await openCamera();
            return;
        }

        await openFilePicker();
    };

    const openFilePicker = async () => {
        try {
            const [file] = await pick({
                allowMultiSelection: false,
                mode: 'import',
            });

            onFileSelected?.({
                uri: file.uri,
                name: file.name ?? undefined,
                type: file.type ?? undefined,
                size: file.size ?? undefined,
            });
        } catch (error) {
            if (
                isErrorWithCode(error) &&
                error.code === errorCodes.OPERATION_CANCELED
            ) {
                return;
            }

            Alert.alert('File upload error', 'Unable to select a file.');
        }
    };

    const openCamera = async () => {
        const result = await launchCamera({
            mediaType: 'photo',
        });

        if (result.didCancel) {
            return;
        }

        if (result.errorCode) {
            Alert.alert(
                'Camera error',
                result.errorMessage ?? 'Unable to open camera (cus its unavailable in xcode simulator).',
            );
            return;
        }

        const asset = result.assets?.[0];

        if (!asset) {
            return;
        }

        onFileSelected?.({
            uri: asset.uri,
            name: asset.fileName,
            type: asset.type,
            size: asset.fileSize,
        });
    };

    return (
        <Pressable
            onPress={handlePress}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabels[status]}
            className={cn(
                'min-h-[64px] w-full flex-row items-center rounded-[8px] border px-4 py-3',
                statusClasses[status],
                className,
            )}
        >
            {isEmpty && <EmptyUploadContent mode={mode} />}

            {isUploading && (
                <>
                    {showFileIcon && (
                        <View className="mr-3">
                            <File size={24} color="#393939" strokeWidth={2} />
                        </View>
                    )}

                    <View className="flex-1">
                        <Typography variant="body2" weight="semibold">
                            {displayFileName}
                        </Typography>

                        <LoadingBar
                            progress={progress ?? 0}
                            variant="success"
                            size="sm"
                            className="mt-2"
                        />
                    </View>

                    {showClearButton && (
                        <View className="ml-3">
                            <ClearIcon
                                variant={clearIconVariant}
                                onPress={onClear}
                            />
                        </View>
                    )}
                </>
            )}

            {isSuccess && (
                <>
                    <View className="mr-3">
                        <Check size={24} color="#2e7d32" strokeWidth={3} />
                    </View>

                    <View className="flex-1">
                        <Typography variant="body1" weight="semibold">
                            Upload complete
                        </Typography>

                        <Typography variant="caption" weight="semibold" color="secondary">
                            {displayFileName}
                        </Typography>
                    </View>
                </>
            )}

            {isError && (
                <>
                    <View className="mr-3">
                        <ErrorIcon size={24} />
                    </View>

                    <View className="flex-1">
                        <Typography variant="body1" weight="semibold">
                            Upload failed
                        </Typography>

                        <Typography variant="caption" weight="semibold" color="secondary">
                            Try again
                        </Typography>
                    </View>
                </>
            )}
        </Pressable>
    );
}

type EmptyUploadContentProps = {
    mode: FileUploadMode;
};

function EmptyUploadContent({ mode }: EmptyUploadContentProps) {
    const Icon = mode === 'camera' ? Camera : Upload;
    const copy = emptyUploadCopy[mode];

    return (
        <>
            <View className="mr-3">
                <Icon size={24} color="#393939" strokeWidth={2} />
            </View>

            <View className="flex-1">
                <Typography variant="body1" weight="semibold">
                    {copy.title}
                </Typography>

                <Typography variant="caption" weight="semibold" color="secondary">
                    {copy.subtitle}
                </Typography>
            </View>
        </>
    );
}

const statusClasses: Record<FileUploadStatus, string> = {
    empty: 'border-neutral-400 bg-white',
    uploading: 'border-neutral-400 bg-white',
    success: 'border-green-600 bg-green-50',
    error: 'border-red-600 bg-red-50',
};

const emptyUploadCopy: Record<
    FileUploadMode,
    {
        title: string;
        subtitle: string;
    }
> = {
    file: {
        title: 'Click to browse files',
        subtitle: 'Upload from your device',
    },
    camera: {
        title: 'Take a photo',
        subtitle: 'Upload using camera',
    },
};

const accessibilityLabels: Record<FileUploadStatus, string> = {
    empty: 'File upload',
    uploading: 'File uploading',
    success: 'Upload complete',
    error: 'Upload failed',
};