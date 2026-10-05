import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
import {
    FileUpload,
    type SelectedUploadFile,
} from '../components/FileUpload';
import { Input } from '../components/Input';
import {
    Body1,
    H1,
    H3,
    H5,
    Typography,
} from '../components/Typography';
import { theme } from '../theme/theme';

const detailSteps = [
    'weight',
    'bloodPressure',
    'other',
] as const;

type DetailStep = (typeof detailSteps)[number];

function getCurrentDate() {
    return new Date().toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

export function LogbookScreen() {
    const [stepIndex, setStepIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const [weight, setWeight] = useState('');
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [otherValue, setOtherValue] = useState('');

    const [selectedFile, setSelectedFile] =
        useState<SelectedUploadFile | null>(null);

    const [cameraFile, setCameraFile] =
        useState<SelectedUploadFile | null>(null);

    const currentStep: DetailStep =
        detailSteps[stepIndex];

    const validateCurrentStep = () => {
        if (currentStep === 'weight') {
            if (!weight.trim()) {
                Alert.alert(
                    'Missing Details',
                    'Please enter your weight.',
                );
                return false;
            }

            if (!/^\d{2,3}$/.test(weight)) {
                Alert.alert(
                    'Invalid Weight',
                    'Please enter a 2–3 digit number for your weight.',
                );
                return false;
            }
        }

        if (currentStep === 'bloodPressure') {
            if (
                !systolic.trim() ||
                !diastolic.trim()
            ) {
                Alert.alert(
                    'Missing Details',
                    'Please enter both your systolic and diastolic blood pressure.',
                );
                return false;
            }

            if (
                !/^\d+$/.test(systolic) ||
                !/^\d+$/.test(diastolic)
            ) {
                Alert.alert(
                    'Invalid Blood Pressure',
                    'Please enter numbers only for your blood pressure.',
                );
                return false;
            }
        }

        if (currentStep === 'other') {
            if (!otherValue.trim()) {
                Alert.alert(
                    'Missing Details',
                    'Please enter your INR.',
                );
                return false;
            }

            if (
                !/^\d+(\.\d+)?$/.test(otherValue)
            ) {
                Alert.alert(
                    'Invalid INR',
                    'Please enter a valid number for your INR.',
                );
                return false;
            }
        }

        return true;
    };

    const handlePrevious = () => {
        if (stepIndex > 0) {
            setStepIndex(previous => previous - 1);
        }
    };

    const handleNext = () => {
        if (!validateCurrentStep()) {
            return;
        }

        if (stepIndex < detailSteps.length - 1) {
            setStepIndex(previous => previous + 1);
            return;
        }

        setIsComplete(true);
    };

    const handleUpload = () => {
        const file = selectedFile ?? cameraFile;

        if (!file) {
            Alert.alert(
                'No file selected',
                'Please choose a file or take a photo first.',
            );
            return;
        }

        Alert.alert(
            'Upload',
            `Ready to upload ${file.name}`,
        );
    };

    return (
        <SafeAreaView
            edges={['top']}
            className="flex-1"
            style={{
                backgroundColor:
                    theme.colours.ubhNeutral[1],
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
                {/* Header */}
                <View>
                    <H1>My Logbook</H1>

                    <View className="mt-1">
                        <Typography
                            variant="body2"
                            customColor={
                                theme.colours.ubhNeutral[8]
                            }
                        >
                            Record today's health information
                        </Typography>
                    </View>
                </View>

                {/* Details */}
                <View className="mt-7">
                    <View className="mb-3 flex-row items-baseline justify-between">
                        <H3>Your Details</H3>

                        <Typography
                            variant="body2"
                            customColor={
                                theme.colours.ubhRed[8]
                            }
                        >
                            {getCurrentDate()}
                        </Typography>
                    </View>

                    <View
                        className="overflow-hidden rounded-2xl border bg-white"
                        style={{
                            borderColor:
                                theme.colours.ubhNeutral[3],
                        }}
                    >
                        {/* Red accent */}
                        <View
                            className="h-1 w-full"
                            style={{
                                backgroundColor:
                                    theme.colours.ubhRed[8],
                            }}
                        />

                        <View className="px-5 pb-5 pt-4">
                            {!isComplete && (
                                <StepIndicator
                                    currentStep={stepIndex}
                                />
                            )}

                            <View className="mt-6">
                                {isComplete ? (
                                    <CompletedDetails />
                                ) : (
                                    <DetailsStep
                                        step={currentStep}
                                        weight={weight}
                                        onWeightChange={
                                            setWeight
                                        }
                                        systolic={systolic}
                                        onSystolicChange={
                                            setSystolic
                                        }
                                        diastolic={diastolic}
                                        onDiastolicChange={
                                            setDiastolic
                                        }
                                        otherValue={
                                            otherValue
                                        }
                                        onOtherValueChange={
                                            setOtherValue
                                        }
                                    />
                                )}
                            </View>

                            {!isComplete && (
                                <View className="mt-7 flex-row gap-3">
                                    {stepIndex > 0 && (
                                        <View className="flex-1">
                                            <Button
                                                title="Previous"
                                                variant="outlined"
                                                size="md"
                                                onPress={
                                                    handlePrevious
                                                }
                                            />
                                        </View>
                                    )}

                                    <View className="flex-1">
                                        <Button
                                            title={
                                                stepIndex ===
                                                detailSteps.length -
                                                    1
                                                    ? 'Submit'
                                                    : 'Next'
                                            }
                                            variant="contained"
                                            size="md"
                                            onPress={
                                                handleNext
                                            }
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* Upload */}
                <View className="mt-7">
                    <H3>Upload Files</H3>

                    <View className="mt-1">
                        <Typography
                            variant="body2"
                            customColor={
                                theme.colours.ubhNeutral[8]
                            }
                        >
                            Add a document or take a photo
                        </Typography>
                    </View>

                    <View
                        className="mt-3 rounded-2xl border bg-white p-4"
                        style={{
                            borderColor:
                                theme.colours.ubhNeutral[3],
                        }}
                    >
                        <View className="gap-3">
                            <FileUpload
                                mode="file"
                                status={
                                    selectedFile
                                        ? 'success'
                                        : 'empty'
                                }
                                fileName={
                                    selectedFile?.name
                                }
                                onFileSelected={file => {
                                    setSelectedFile(file);
                                    setCameraFile(null);
                                }}
                                onClear={() =>
                                    setSelectedFile(null)
                                }
                            />

                            <FileUpload
                                mode="camera"
                                status={
                                    cameraFile
                                        ? 'success'
                                        : 'empty'
                                }
                                fileName={
                                    cameraFile?.name
                                }
                                onFileSelected={file => {
                                    setCameraFile(file);
                                    setSelectedFile(null);
                                }}
                                onClear={() =>
                                    setCameraFile(null)
                                }
                            />
                        </View>

                        <View className="mt-3">
                            <Typography
                                variant="caption"
                                customColor={
                                    theme.colours
                                        .ubhNeutral[8]
                                }
                            >
                                Supported formats: PDF, JPEG,
                                JPG and PNG
                            </Typography>
                        </View>

                        <View className="mt-5 w-full">
                            <Button
                                title="Upload"
                                variant="contained"
                                size="md"
                                onPress={handleUpload}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function StepIndicator({
    currentStep,
}: {
    currentStep: number;
}) {
    return (
        <View>
            <View className="flex-row items-center justify-between">
                <Typography
                    variant="body2"
                    customColor={
                        theme.colours.ubhNeutral[8]
                    }
                >
                    Daily health details
                </Typography>

                <Typography
                    variant="body2"
                    customColor={
                        theme.colours.ubhRed[8]
                    }
                >
                    {currentStep + 1} of{' '}
                    {detailSteps.length}
                </Typography>
            </View>

            <View className="mt-3 flex-row gap-2">
                {detailSteps.map((step, index) => (
                    <View
                        key={step}
                        className="h-[5px] flex-1 rounded-full"
                        style={{
                            backgroundColor:
                                index <= currentStep
                                    ? theme.colours
                                          .ubhRed[8]
                                    : theme.colours
                                          .ubhNeutral[3],
                        }}
                    />
                ))}
            </View>
        </View>
    );
}

type DetailsStepProps = {
    step: DetailStep;

    weight: string;
    onWeightChange: (value: string) => void;

    systolic: string;
    onSystolicChange: (value: string) => void;

    diastolic: string;
    onDiastolicChange: (value: string) => void;

    otherValue: string;
    onOtherValueChange: (value: string) => void;
};

function DetailsStep({
    step,
    weight,
    onWeightChange,
    systolic,
    onSystolicChange,
    diastolic,
    onDiastolicChange,
    otherValue,
    onOtherValueChange,
}: DetailsStepProps) {
    if (step === 'weight') {
        return (
            <View>
                <H3>Weight</H3>

                <View className="mt-4 flex-row items-center gap-3">
                    <View className="flex-1">
                        <Input
                            value={weight}
                            onChangeText={onWeightChange}
                            inputType="numeric"
                            placeholder="Enter weight"
                            maxLength={3}
                        />
                    </View>

                    <View className="w-[45px]">
                        <Body1>kg</Body1>
                    </View>
                </View>
            </View>
        );
    }

    if (step === 'bloodPressure') {
        return (
            <View>
                <H3>Blood Pressure</H3>

                <View className="mt-5 gap-5">
                    <View>
                        <H5>Systolic</H5>

                        <View className="mt-2 flex-row items-center gap-3">
                            <View className="flex-1">
                                <Input
                                    value={systolic}
                                    onChangeText={
                                        onSystolicChange
                                    }
                                    inputType="numeric"
                                    placeholder="120"
                                />
                            </View>

                            <View className="w-[55px]">
                                <Body1>mmHg</Body1>
                            </View>
                        </View>
                    </View>

                    <View>
                        <H5>Diastolic</H5>

                        <View className="mt-2 flex-row items-center gap-3">
                            <View className="flex-1">
                                <Input
                                    value={diastolic}
                                    onChangeText={
                                        onDiastolicChange
                                    }
                                    inputType="numeric"
                                    placeholder="80"
                                />
                            </View>

                            <View className="w-[55px]">
                                <Body1>mmHg</Body1>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View>
            <H3>INR</H3>

            <View className="mt-4">
                <Input
                    value={otherValue}
                    onChangeText={onOtherValueChange}
                    inputType="numeric"
                    inputMode="decimal"
                    placeholder="Enter INR"
                />
            </View>
        </View>
    );
}

function CompletedDetails() {
    return (
        <View className="items-center py-5">
            <View
                className="mb-4 h-14 w-14 items-center justify-center rounded-full"
                style={{
                    backgroundColor:
                        theme.status.success
                            .backgroundSecondary,
                }}
            >
                <Typography
                    variant="h3"
                    customColor={
                        theme.status.success.text
                    }
                >
                    ✓
                </Typography>
            </View>

            <H3>You're all done!</H3>

            <View className="mt-2">
                <Typography
                    variant="body2"
                    customColor={
                        theme.colours.ubhNeutral[8]
                    }
                >
                    Your health details have been recorded.
                </Typography>
            </View>
        </View>
    );
}