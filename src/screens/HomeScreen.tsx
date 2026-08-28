import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { SquareActivity, BatteryWarning, Heart } from 'lucide-react-native';

import {
  Body1,
  Body2,
  Caption,
  H1,
  H2,
  H3,
  H4,
  H5,
  Typography,
} from '../components/Typography';

type HomeScreenProps = {
  userName?: string;
  batteryLevel?: number;
  onSOSLongPress?: () => void;
};

type InsightCardProps = {
  status: 'NORMAL' | 'WARNING';
  title: string;
  value: string;
  percentage?: string;
  icon: React.ReactNode;
};

type AppointmentCardProps = {
  doctor: string;
  time: string;
  onPress?: () => void;
};

const CARD_SHADOW = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.18,
  shadowRadius: 5,
  elevation: 5,
};

function SOSCard({ onLongPress }: { onLongPress?: () => void }) {
  return (
    <Pressable
      onLongPress={onLongPress}
      delayLongPress={800}
      className="flex-1 items-center justify-center rounded-2xl bg-white"
      style={[styles.topCard, CARD_SHADOW]}
      accessibilityRole="button"
      accessibilityLabel="Emergency SOS"
      accessibilityHint="Press and hold to activate SOS"
    >
      <View
        className="items-center justify-center rounded-full border"
        style={styles.sosCircle}
      >
        <H1 weight="bold" customColor="#A71D1D">
          SOS
        </H1>

        <Body2 customColor="#A71D1D">press & hold</Body2>
      </View>
    </Pressable>
  );
}

function BatteryCard({ batteryLevel }: { batteryLevel: number }) {
  return (
    <View
      className="flex-[1] rounded-2xl bg-white px-7 py-5"
      style={[styles.topCard, CARD_SHADOW]}
    >
      <Body1 weight="bold" className="mb-3">
        Battery level:
      </Body1>

      <View className="flex-row items-center justify-center">
        <View style={styles.batteryBody}>
          <H3>{batteryLevel}%</H3>
        </View>

        <View style={styles.batteryTip} />
      </View>

      <Caption align="center" className="mt-3" weight="regular">
        Updated 10 minutes ago
      </Caption>
    </View>
  );
}

function InsightCard({
  status,
  title,
  value,
  percentage,
  icon,
}: InsightCardProps) {
  const isWarning = status === 'WARNING';

  return (
    <View
      className="flex-1 overflow-hidden rounded-2xl px-2"
      style={[
        styles.insightCard,
        {
          backgroundColor: isWarning ? '#FDE9E9' : '#FFFFFF',
        },
        CARD_SHADOW,
      ]}
    >
      <View className="items-center pb-2 pt-3">
        <Body2 customColor={isWarning ? '#A71D1D' : '#111111'}>{status}</Body2>
      </View>

      <View
        style={[
          styles.insightDivider,
          {
            backgroundColor: isWarning ? '#A71D1D' : '#222222',
          },
        ]}
      />

      <View className="flex-1 px-2 pt-1 pb-3">
        <View className="flex-1 items-center justify-center">
          <Body1 align="center">{title}</Body1>
        </View>

        <View className="flex-1 items-center justify-center">{icon}</View>

        <View className="flex-1 flex-row items-center justify-center">
          <H5
            weight="bold"
            align="center"
            customColor={isWarning ? '#A71D1D' : undefined}
          >
            {value}
          </H5>

          {percentage && (
            <Typography
              variant="body1"
              weight="medium"
              customColor="#A71D1D"
              className=""
            >
              {percentage}
            </Typography>
          )}
        </View>
      </View>
    </View>
  );
}

function AppointmentCard({ doctor, time, onPress }: AppointmentCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between rounded-2xl bg-white px-5"
      style={[styles.appointmentCard, CARD_SHADOW]}
    >
      <Body1>Appointment with {doctor}</Body1>

      <Body1>{time}</Body1>
    </Pressable>
  );
}

export function HomeScreen({
  userName = 'John',
  batteryLevel = 70,
  onSOSLongPress,
}: HomeScreenProps) {
  return (
    <SafeAreaView className="flex-1" style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome */}
        <H1>Welcome, {userName}</H1>

        {/* SOS + battery */}
        <View className="mt-8 flex-row gap-4">
          <SOSCard onLongPress={onSOSLongPress} />
          <BatteryCard batteryLevel={batteryLevel} />
        </View>

        {/* Insights */}
        <View className="mt-12">
          <H4>Today’s Insights:</H4>

          <View className="mt-5 flex-row gap-4">
            <InsightCard
              status="NORMAL"
              title="Health"
              value="GOOD"
              icon={
                <SquareActivity size={45} strokeWidth={1.5} color="#090909" />
              }
            />

            <InsightCard
              status="NORMAL"
              title="Heart"
              value="GOOD"
              icon={<Heart size={45} strokeWidth={1.5} color="#090909" />}
            />

            <InsightCard
              status="WARNING"
              title={'Battery\nHealth'}
              value="65"
              percentage="%"
              icon={
                <BatteryWarning size={45} strokeWidth={1.5} color="#090909" />
              }
            />
          </View>
        </View>

        {/* Appointments */}
        <View className="mt-12">
          <H4>My Upcoming Appointments:</H4>

          <View className="mt-5 gap-4">
            <AppointmentCard
              doctor="Dr. Han"
              time="2:00 PM"
              onPress={() => {
                console.log('Appointment pressed'); // should I have this to see detail of the appoitnemnt????
              }}
            />

            <AppointmentCard
              doctor="Dr. Han"
              time="2:00 PM"
              onPress={() => {
                console.log('Appointment pressed');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F7F7F7',
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 30,

    
    paddingBottom: 100, // Give btm navbar some breathing room
  },

  topCard: {
    minHeight: 100,
  },

  sosCircle: {
    width: 120,
    height: 120,
    borderColor: '#A71D1D',
    borderWidth: 1,
  },

  batteryBody: {
    width: 95,
    height: 60,
    borderWidth: 4,
    borderColor: '#333333',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  batteryTip: {
    marginLeft: 10,
    width: 4,
    height: 18,
    borderRadius: 3,
    backgroundColor: '#333333',
  },

  insightCard: {
    minHeight: 200,
  },

  insightDivider: {
    width: '100%',
    height: 1.5,
  },

  appointmentCard: {
    minHeight: 70,
  },

  appointmentDoctor: {
    flex: 1,
    paddingRight: 16,
    fontSize: 20,
    lineHeight: 26,
  },
});
