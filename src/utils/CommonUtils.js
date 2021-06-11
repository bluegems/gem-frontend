import { useQuery } from '@apollo/client';

function monthIndexToString(monthIndex) {
  const indexToMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return indexToMonth[monthIndex];
}

export function dateToString(date) {
  return `${date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  })} ${date.getDate()} ${monthIndexToString(date.getMonth())} ${date.getFullYear()}`;
}

export function getImgurLink(imageId, imgurSize) {
  return !!imageId ? `https://i.imgur.com/${imageId}${imgurSize}.jpg` : 'fake-image-url';
}

export function isValidImageFile(file) {
  const fileExtension = file.name.split('.').pop();
  const allowedExtensions = ['jpeg', 'jpg', 'png'];
  return allowedExtensions.includes(fileExtension);
}

export function isValidSize(file, size) {
  const fileSize = file.size / 1024 / 1024; // in MiB
  return fileSize <= size;
}

export async function catchErrorOnMutation(mutation, input) {
  try {
    await mutation({ variables: input });
  } catch (err) {
    console.log(err);
  }
}

export function catchErrorOnQuery(queryGQL, input) {
  try {
    return useQuery(queryGQL, { variables: input });
  } catch (err) {
    console.log(err);
    return { error: err };
  }
}
