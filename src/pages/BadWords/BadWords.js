import {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";
const {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
} = require("obscenity");
const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});
if (matcher.hasMatch('fuck you')) {
	console.log('The input text contains profanities.');
}
// The input text contains profanities.
// Pass "true" as the "sorted" parameter so the matches are sorted by their position.
const matches = matcher.getAllMatches('ʃ𝐟ʃὗƈｋ ỹоứ 𝔟ⁱẗ𝙘ɦ', true);
for (const match of matches) {
	const { phraseMetadata, startIndex, endIndex } =
		englishDataset.getPayloadWithPhraseMetadata(match);
	console.log(
		`Match for word ${phraseMetadata.originalWord} found between ${startIndex} and ${endIndex}.`,
	);
}
// Match for word fuck found between 0 and 6.
// Match for word bitch found between 12 and 18.
const { TextCensor, ... } = require('obscenity');
// ...
const censor = new TextCensor();
const input = 'fuck you little bitch';
const matches = matcher.getAllMatches(input);
console.log(censor.applyTo(input, matches));
// %@$% you little **%@%