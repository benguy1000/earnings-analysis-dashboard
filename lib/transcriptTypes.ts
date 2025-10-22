// Transcript data types
export interface TranscriptMetadata {
  company_symbol: string;
  quarter: string;
  generated_at: string;
  total_segments: number;
  total_words: number;
  speakers: string[];
  unique_terms_count: number;
  unique_issues_count: number;
}

export interface MatchedTerm {
  term_id: string;
  term: string;
  score: number;
}

export interface NegotiableIssue {
  negotiable_issue_number: string;
  negotiable_issue_text: string;
  score: number;
}

export interface TranscriptSegment {
  segment_id: number;
  speaker: string;
  text: string;
  chunks: string[];
  topics: string[];
  word_count: number;
  key_metrics: string[];
  matched_terms: MatchedTerm[];
  negotiable_issues: NegotiableIssue[];
  business_themes: string[];
  supply_chain_concepts: string[];
}

export interface SpeakerSummary {
  speaker: string;
  segment_count: number;
  word_count: number;
}

export interface TranscriptData {
  metadata: TranscriptMetadata;
  terms_index: string[];
  negotiable_issues_index: string[];
  terms_full: MatchedTerm[];
  negotiable_issues_full: NegotiableIssue[];
  segments: TranscriptSegment[];
  speakers_summary: SpeakerSummary[];
}
