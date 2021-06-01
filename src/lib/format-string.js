import quotes from './rules/quotes';
import dashes from './rules/dashes';
import ellipsis from './rules/ellipsis';

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
