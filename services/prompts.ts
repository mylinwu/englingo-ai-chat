/**
 * AI 提示词模板
 */

/** 翻译到英文的提示词 */
export const TRANSLATE_TO_ENGLISH_PROMPT = (text: string): string =>
  `Translate to natural English. Return ONLY the English text. Text: "${text}"`;

/** 语法分析提示词 */
export const ANALYZE_TEXT_PROMPT = (text: string): string =>
  `Analyze this English sentence structure. Break it down into Sentence Components (Subject, Predicate, Object, Attribute, Adverbial, Complement, Appositive). 
Return JSON with:
- zh: Full Chinese translation.
- s: Array of segments.
For each segment:
- t: The text snippet.
- ty: Component Type (sbj, pred, obj, attr, adv, cmp, oth).
- lbl: Chinese Component Name (主语, 谓语, 宾语, 定语, 状语, 补语, 同位语).
- pos: Part of Speech in Chinese (名词, 动词, 形容词...).
- zh: Segment translation.

IMPORTANT: Return ONLY valid JSON, no markdown code blocks.

Text: "${text}"`;
