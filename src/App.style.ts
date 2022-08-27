import { StyleSheet, Appearance } from 'react-native';
const colorScheme = Appearance.getColorScheme();
const isDarkMode = colorScheme === 'dark';

const spaceSize = 20;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  scrollViewContentContainer: {
    height: '80%',
    flexGrow: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 160,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgba(254, 160, 78, 1.00)',
    padding: 20,
    borderRadius: 12,
  },
  buttonTitle: {
    fontSize: 60,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  stateForRunningContainer: {
    backgroundColor: 'rgba(102, 56, 240, 1.00)',
    padding: 12,
    borderRadius: 12,
    marginBottom: spaceSize,
  },
  stateForRunningContainerInactive: {
    backgroundColor: 'rgba(247, 138, 224, 1.00)',
    padding: 12,
    borderRadius: 12,
    marginBottom: spaceSize,
  },
  stateForRunningText: {
    fontSize: 60,
    color: '#FFFFFF',
    textAlign: 'center',
  },

  progressContianer: {
    backgroundColor: 'rgba(2, 117, 255, 1.00)',
    padding: 12,
    borderRadius: 12,
    marginBottom: spaceSize,
  },
  progressText: {
    fontVariant: ['tabular-nums'],
    fontSize: 60,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: 'rgba(2, 117, 255, 1.00)',
    padding: 12,
    borderRadius: 12,
    marginBottom: spaceSize,
  },
  resultText: {
    fontVariant: ['tabular-nums'],
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'left',
  },
  copyButtonContainer: {
    backgroundColor: 'rgba(2, 117, 255, 1.00)',
    padding: 12,
    borderRadius: 12,
    marginBottom: spaceSize,
  },
  copyButtonText: {
    fontSize: 60,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: isDarkMode ? 'rgba(40, 44, 52, 1.00)' : '#FFFFFF',
  },
});

export default styles;
