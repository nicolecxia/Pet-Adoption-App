import { useState, useEffect } from "react";
import { Pressable, Switch, View, Text, Platform } from "react-native";
import styles from "./styles";
import * as Notifications from 'expo-notifications';

export default function SchduleReminder() {
    const [reminder, setReminder] = useState(false);
    const [schedule, setSchedule] = useState([]);

    const handleReminderPress = async () => {
        if (!reminder) {
            const schedule = await scheduleReminder();
            if (schedule) {
                setReminder(true);
                setSchedule(await getSchedule());
            }
        } else {
            const cancelled = await cancelReminder();
            if (cancelled) {
                setReminder(false);
                setSchedule(await getSchedule());
            }

        }
    }

    useEffect(() => {
        (async () => {
            const previouslyScheduled = await getSchedule();
            setSchedule(previouslyScheduled);

            if (previouslyScheduled.find((item) => item.type === 'reminder')) {
                setReminder(true);
            }

        })();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications:</Text>
            <Text style={styles.description}>
                Send me a reminder to review the new posts:
            </Text>

            {/* Option */}
            <View style={styles.options.container}>
                <Switch value={reminder} onValueChange={handleReminderPress} />
                <Pressable onPress={handleReminderPress}>
                    <Text style={styles.options.label}>
                        Set Daily Reminder
                    </Text>
                </Pressable>
            </View>

            {/* Logs */}
            <View style={styles.logs.container}>
                <Text style={styles.logs.title}>
                    Schedule Notification: {schedule.length}
                </Text>
                {schedule.map((item, index) => (
                    <Text key={index} style={styles.logs.text}>
                        {item.type}: {item.id}
                    </Text>
                ))}
            </View>
        </View>
    )
}


async function scheduleReminder() {
    console.log("Schedule for", Platform.OS);

    try {
        // Check for permission
        const permissions = await Notifications.getPermissionsAsync();
        console.log('- Permission:', permissions);

        if (!permissions.granted) {
            //Send permission request
            const request = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                }
            });

            console.log('- Request:', request);
            if (!request.granted) {
                return false;
            }
        }

        //Schedule a notification
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Post Reminder',
                body: 'Have you reviewed the new adoption posts already?',
                // subtitle: 'Do not forget!',
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                badge: 1,
                data: {
                    type: 'reminder'
                }
            },
            trigger: {
                // hour: 8,
                // minute: 0,
                seconds: 5,
                repeats: true
            }
        });

        console.log("Schedule id:", id);
        if (!id) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
}

async function cancelReminder() {
    console.log("Cancel for", Platform.OS);
    let cancelled = false;

    const schedule = await getSchedule();

    for (const item of schedule) {
        if (item.type === 'reminder') {
            await Notifications.cancelScheduledNotificationAsync(item.id);
            cancelled = true;
        }
    }

    return cancelled;
}

async function getSchedule() {
    const scheduleNotifications = await Notifications.getAllScheduledNotificationsAsync();

    const schedule = [];
    scheduleNotifications.forEach((scheduleNotification) => {
        schedule.push({
            id: scheduleNotification.identifier,
            type: scheduleNotification.content.data.type
        });
    });

    return schedule;
}