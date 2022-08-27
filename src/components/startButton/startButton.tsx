import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import type {
  MergeVideoParams,
  VideoMergeEvent,
} from 'react-native-video-merger';
import { mergeVideos } from 'react-native-video-merger';

export default function StartButton(props: {
  title: string;
  mergeParams?: MergeVideoParams;
  running?: boolean;
  onStart?: () => void | Promise<void>;
  onProgress?: (progress: number) => void | Promise<void>;
  onResult?: (result: VideoMergeEvent) => void | Promise<void>;
  onError?: (result: VideoMergeEvent) => void | Promise<void>;
  markAction?: (mark: string) => void | Promise<void>;
  customPressFunction?: () => void | Promise<void>;
}) {
  const {
    title,
    mergeParams,
    running,
    onStart,
    onProgress,
    onResult,
    onError,
    markAction,
    customPressFunction,
  } = props;
  const onPress = React.useCallback(async () => {
    markAction && markAction(title);

    if (customPressFunction) {
      customPressFunction();
      return;
    }

    if (!mergeParams) {
      return;
    }

    // update running state
    onStart && onStart();

    try {
      const res = await mergeVideos(mergeParams, onProgress);
      onResult && onResult(res);
    } catch (error) {
      onError && onError(error as unknown as VideoMergeEvent);
    }
  }, [
    markAction,
    onStart,
    onResult,
    onError,
    mergeParams,
    onProgress,
    title,
    customPressFunction,
  ]);

  const containerStyle = running
    ? styles.buttonContainerInactive
    : styles.buttonContainer;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={containerStyle}
    >
      <Text style={styles.buttonTitle}>Start: {title}</Text>
    </TouchableOpacity>
  );
}

const basicButtonContainerStyle = {
  backgroundColor: 'rgba(254, 160, 78, 1.00)',
  padding: 20,
  borderRadius: 12,
  marginBottom: 20,
};
const styles = StyleSheet.create({
  buttonContainer: basicButtonContainerStyle,
  buttonContainerInactive: {
    ...basicButtonContainerStyle,
    opacity: 0.5,
  },
  buttonTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
