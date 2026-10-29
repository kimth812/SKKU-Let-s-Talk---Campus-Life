export type SituationId = 'situation-a' | 'situation-b' | 'situation-c';

export interface TurnData {
  id: number;
  partner: string;
  partnerKorean?: string;
  student: string;
  korean: string;
  keyWords: string[];
}

export interface PartnerInfo {
  name: string;
  role: string;
  country: string;
  avatarType: 'emma' | 'leo' | 'sofia';
  avatarUrl?: string;
  letter: string;
}

export interface SituationData {
  id: SituationId;
  title: string;
  titleKo: string;
  placeKo: string;
  locationName: string;
  buttonLabel: string;
  partner: PartnerInfo;
  iconName: string;
  iconType: 'classroom' | 'cafe' | 'assignment';
  imageUrl: string;
  turns: TurnData[];
}

export interface TurnResult {
  turnId: number;
  targetSentence: string;
  studentSaid: string;
  isSuccess: boolean;
  skipped: boolean;
  feedbackText: string;
}

export type MicState = 'ready' | 'listening' | 'done';

export interface FeedbackResponse {
  feedback: string;
  isSuccess: boolean;
  attemptFeedbackType?: 'success' | 'success_missing_small_word' | 'recast' | 'elicitation' | 'chunking' | 'no_speech';
}
