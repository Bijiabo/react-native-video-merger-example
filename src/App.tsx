import * as React from 'react';

import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  mergeVideos,
  MergeVideoParams,
  cleanCacheDir,
} from 'react-native-video-merger';
import type { VideoMergeEvent } from 'react-native-video-merger';
import styles from './App.style';
import resources from './resources';
import type { Element } from './type';
import Share from './utils/share';
import StartButton from './components/startButton/startButton';

export default function App() {
  // state
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [result, setResult] = React.useState<VideoMergeEvent | undefined>();
  const [startActionMark, setStartActionMark] = React.useState<string>('');

  // auto display share menu when export finished
  /*
  React.useEffect(() => {
    const { progress: _progress, outputFilePath } = result || {};
  }, [result]);
  */
  // function
  const onStart = React.useCallback(() => {
    setIsRunning(true);
    setResult(undefined);
  }, [setIsRunning, setResult]);
  const onProgress = React.useCallback(
    (_progress: number) => {
      setProgress(_progress);
    },
    [setProgress]
  );
  const onResult = React.useCallback(
    (_result: VideoMergeEvent) => {
      setResult(_result);
      setIsRunning(false);

      // display file share menu when video merge finished
      const { progress: _progress, outputFilePath } = _result;
      if (_progress === 1 && outputFilePath) {
        Share("Result Video", "", outputFilePath);
      }
    },
    [setResult, setIsRunning]
  );
  const onError = React.useCallback(
    (_result: VideoMergeEvent) => {
      setResult(_result);
      setIsRunning(false);
    },
    [setResult, setIsRunning]
  );
  const onPressStartButton = React.useCallback(async () => {
    // avoid repeated calls at runtime
    if (isRunning) {
      Alert.alert('Video merger is running, please try later.');
      return;
    }
    // update running state
    onStart();
    // preapre params
    const paramsForMergeVideo: MergeVideoParams = {
      urls: [resources.testVideo, resources.testVideo],
      outputSize: { width: 1080, height: 1080 },
      backgroundColor: 'rgba(229, 192, 123, 1.00)',
    };
    try {
      const res = await mergeVideos(paramsForMergeVideo, onProgress);
      setResult(res);

      // display file share menu when video merge finished
      const { progress: _progress, outputFilePath } = res;
      if (_progress === 1 && outputFilePath) {
        Share("Result Video", "", outputFilePath);
      }
    } catch (error) {
      onError && onError(error as unknown as VideoMergeEvent);
    }
    setIsRunning(false);
  }, [isRunning, onProgress, onError, onStart]);

  // components
  let $startButton: Element = null;
  {
    const buttonText = isRunning
      ? `${(progress * 100).toFixed(2)}%`
      : '→ Start ←';
    $startButton = (
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressStartButton}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonTitle}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  let $stateForRunning: Element = null;
  {
    const containerStyle = isRunning
      ? styles.stateForRunningContainer
      : styles.stateForRunningContainerInactive;
    $stateForRunning = (
      <View style={containerStyle}>
        <Text style={styles.stateForRunningText}>
          {isRunning ? 'Running' : 'Not running'}
        </Text>
      </View>
    );
  }

  let $progress: Element = (
    <View style={styles.progressContianer}>
      <Text style={styles.progressText}>{(progress * 100).toFixed(2)}%</Text>
    </View>
  );

  let $result: Element = null;
  {
    let contentString = result
      ? JSON.stringify(result, null, '  ')
      : isRunning
      ? 'Waiting...'
      : '$ >';
    const $startActionMark = !!startActionMark && (
      <Text style={styles.resultText}>Action: {startActionMark}</Text>
    );
    $result = (
      <View style={styles.resultContainer}>
        {$startActionMark}
        <Text style={styles.resultText}>{contentString}</Text>
      </View>
    );
  }

  let $copyButton: Element = null;
  {
    const copyAction = () => {
      if (result) {
        Clipboard.setString(JSON.stringify(result, null, '  '));
        Alert.alert('Success', 'Content has been copied to your clipboard.');
        return;
      }
      Alert.alert('Error', 'There is no result, please wait merge finished.');
    };
    $copyButton = (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={copyAction}
        style={styles.copyButtonContainer}
      >
        <Text style={styles.copyButtonText}>Copy Result</Text>
      </TouchableOpacity>
    );
  }

  /**
   * buttons
   */
  const $startButtonWithDifferentOptions = (
    <>
      <StartButton
        title="Only one video"
        running={isRunning}
        onStart={onStart}
        onProgress={onProgress}
        onResult={onResult}
        onError={onResult}
        mergeParams={{
          urls: [resources.testVideo],
        }}
        markAction={setStartActionMark}
      />
      <StartButton
        title="Different 4 videos (1-2-1-2)"
        running={isRunning}
        onStart={onStart}
        onProgress={onProgress}
        onResult={onResult}
        onError={onResult}
        mergeParams={{
          urls: [
            resources.testVideo,
            resources.h2c1,
            resources.testVideo,
            resources.h2c1,
          ],
          outputSize: { width: 1080, height: 1080 },
          backgroundColor: 'rgba(229, 192, 123, 1.00)',
        }}
        markAction={setStartActionMark}
      />
      <StartButton
        title="Custom output size"
        running={isRunning}
        onStart={onStart}
        onProgress={onProgress}
        onResult={onResult}
        onError={onResult}
        mergeParams={{
          urls: [resources.testVideo, resources.testVideo],
          outputSize: { width: 800, height: 600 },
        }}
        markAction={setStartActionMark}
      />
      <StartButton
        title="Custom fill background"
        running={isRunning}
        onStart={onStart}
        onProgress={onProgress}
        onResult={onResult}
        onError={onResult}
        mergeParams={{
          urls: [resources.testVideo],
          outputSize: { width: 600, height: 600 },
          backgroundColor: 'rgba(102, 56, 240, 1.00)',
        }}
        markAction={setStartActionMark}
      />
      <StartButton
        title="Use video file size"
        running={isRunning}
        onStart={onStart}
        onProgress={onProgress}
        onResult={onResult}
        onError={onResult}
        mergeParams={{
          urls: [resources.testVideo],
        }}
        markAction={setStartActionMark}
      />
      <StartButton
        title="Clear Cache Dir"
        customPressFunction={async () => {
          await cleanCacheDir();
          Alert.alert('Success', 'Video cache dir has been cleared.');
        }}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrollViewContentContainer}>
          {$stateForRunning}
          {$progress}
          {$result}
          {$copyButton}
          {$startButtonWithDifferentOptions}
        </View>
      </ScrollView>
      {$startButton}
    </View>
  );
}
