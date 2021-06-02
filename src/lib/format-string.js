import quotes from './transformations/quotes';
import dashes from './transformations/dashes';
import ellipsis from './transformations/ellipsis';

const formatString = function formatString(string) {
  if (string !== '' && !string) {
    return null;
  }

  let formattedString = string;

  // Apply rules
  formattedString = ellipsis(formattedString);
  formattedString = quotes(formattedString);
  formattedString = dashes(formattedString);

  return formattedString;
};

export default formatString;
