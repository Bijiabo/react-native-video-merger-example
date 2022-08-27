import Share, { ShareOptions } from 'react-native-share';

/**
 * Open the system sharing menu
 * @param title
 * @param message
 * @param url
 */
export const share = async (
  title: string,
  message: string,
  url: string | string[]
) => {
  const options: ShareOptions = {
    title,
    message: message || 'Save and share',
    saveToFiles: false,
    type: 'url',
  };
  if (Array.isArray(url)) {
    options.urls = url;
  } else {
    options.url = url;
  }
  try {
    await Share.open(options);
  } catch (error: any) {}
};

export default share;
