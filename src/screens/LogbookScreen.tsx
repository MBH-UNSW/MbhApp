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
    Body2,
    H1,
    H3,
    H5,
} from '../components/Typography';

const detailSteps = [
    'weight',
    'bloodPressure',
    'other',
] as const;

type DetailStep = (typeof detailSteps)[number];

function getCurrentDate() {
    return new Date().toLocaleDateString('en-AU', {
        day: '2-digit',
        month: '2-digit',
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

    const currentStep: DetailStep =
        detailSteps[stepIndex];

    const handlePrevious = () => {
        if (stepIndex > 0) {
            setStepIndex(previous => previous - 1);
        }
    };

    const handleNext = () => {
        if (stepIndex < detailSteps.length - 1) {
            setStepIndex(previous => previous + 1);
            return;
        }

        setIsComplete(true);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            Alert.alert(
                'No file selected',
                'Please select a file first.',
            );
            return;
        }

        Alert.alert(
            'Upload',
            `Ready to upload ${selectedFile.name}`,
        );
    };

    return (
        <SafeAreaView
            edges={['top']}
            className="flex-1 bg-white"
        >
            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 32,
                }}
            >
                <H1>My Logbook</H1>

                <View className="mt-8">
                    <View className="flex-row items-center justify-between px-1">
                        <H3>Your Details:</H3>

                        <Body1>
                            {getCurrentDate()}
                        </Body1>
                    </View>

                    <View className="mt-4 rounded-xl bg-white px-5 py-6 shadow-md">
                        {isComplete ? (
                            <CompletedDetails />
                        ) : (
                            <>
                                <DetailsStep
                                    step={currentStep}
                                    weight={weight}
                                    onWeightChange={setWeight}
                                    systolic={systolic}
                                    onSystolicChange={setSystolic}
                                    diastolic={diastolic}
                                    onDiastolicChange={
                                        setDiastolic
                                    }
                                    otherValue={otherValue}
                                    onOtherValueChange={
                                        setOtherValue
                                    }
                                />

                                <View className="mt-5 flex-row justify-center gap-5">
                                    <View className="w-[100px]">
                                        <Button
                                            title="Previous"
                                            variant="outlined"
                                            size="sm"
                                            onPress={
                                                handlePrevious
                                            }
                                        />
                                    </View>

                                    <View className="w-[100px]">
                                        <Button
                                            title={
                                                stepIndex ===
                                                detailSteps.length -
                                                    1
                                                    ? 'Submit'
                                                    : 'Next'
                                            }
                                            variant="contained"
                                            size="sm"
                                            onPress={handleNext}
                                        />
                                    </View>
                                </View>
                            </>
                        )}
                    </View>
                </View>

                <View className="mt-7">
                    <H3>Upload Files</H3>

                    <View className="mt-2">
                        <Body2>
                            .pdf, .jpeg, .jpg, .png are supported
                        </Body2>
                    </View>

                    <View className="mt-5">
                        <FileUpload
                            mode="file"
                            status={
                                selectedFile
                                    ? 'success'
                                    : 'empty'
                            }
                            fileName={selectedFile?.name}
                            onFileSelected={setSelectedFile}
                            onClear={() =>
                                setSelectedFile(null)
                            }
                        />
                    </View>

                    <View className="mt-5 w-[110px] self-end">
                        <Button
                            title="Upload"
                            variant="contained"
                            size="sm"
                            onPress={handleUpload}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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
            <View className="flex-row items-center justify-center gap-4">
                <H3>Weight</H3>

                <View className="w-[95px]">
                    <Input
                        value={weight}
                        onChangeText={onWeightChange}
                        inputType="numeric"
                    />
                </View>

                <H3>kg</H3>
            </View>
        );
    }

    if (step === 'bloodPressure') {
        return (
            <View>
                <H3>Blood Pressure:</H3>

                <View className="mt-4 gap-3">
                    <View className="flex-row items-center justify-center gap-4">
                        <H5>Systolic</H5>

                        <View className="w-[95px]">
                            <Input
                                value={systolic}
                                onChangeText={
                                    onSystolicChange
                                }
                                inputType="numeric"
                            />
                        </View>

                        <Body1>mmHg</Body1>
                    </View>

                    <View className="flex-row items-center justify-center gap-4">
                        <H5>Diastolic</H5>

                        <View className="w-[95px]">
                            <Input
                                value={diastolic}
                                onChangeText={
                                    onDiastolicChange
                                }
                                inputType="numeric"
                            />
                        </View>

                        <Body1>mmHg</Body1>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-row items-center justify-center gap-4">
            <H3>Placeholder</H3>

            <View className="w-[95px]">
                <Input
                    value={otherValue}
                    onChangeText={onOtherValueChange}
                    inputType="numeric"
                />
            </View>

            <Body1>units</Body1>
        </View>
    );
}

function CompletedDetails() {
    return (
        <View className="items-center py-2">
            <H3>You are all done! 🥳</H3>

            <View className="mt-4">
                <Body1>
                    Your details have been recorded.
                </Body1>
            </View>
        </View>
    );
}