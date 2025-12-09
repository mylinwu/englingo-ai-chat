export enum GrammarType {
  SUBJECT = 'sbj',      // 主语
  PREDICATE = 'pred',   // 谓语
  OBJECT = 'obj',       // 宾语
  ATTRIBUTE = 'attr',   // 定语
  ADVERBIAL = 'adv',    // 状语
  COMPLEMENT = 'cmp',   // 补语
  OTHER = 'oth',        // 其他
}

export interface AnalysisSegment {
  t: string; // text
  ty: GrammarType; // type (Sentence Component)
  lbl: string; // label (Chinese), e.g., "主语"
  pos?: string; // partOfSpeech (Chinese), e.g., "名词"
  zh?: string; // chinese translation of this segment
}

export interface AnalysisData {
  zh: string; // chineseTranslation
  s: AnalysisSegment[]; // segments
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  type?: 'chat' | 'divider';
  text: string;
  analysis?: AnalysisData; 
  isTyping?: boolean;
}

export interface ChatConfig {
  systemInstruction: string;
  apiKey: string;
}