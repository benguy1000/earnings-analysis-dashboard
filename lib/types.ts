export interface Evidence {
  statement: string;
  speaker: string;
  speaker_role: string;
  chunk_ids: string[];
  metrics?: string[];
}

export interface Opportunity {
  opportunity_id: string;
  title: string;
  category: string;
  description: string;
  evidence: Evidence[];
  urgency: 'High' | 'Medium' | 'Low';
  estimated_impact: string;
  recommended_approach: string;
}

export interface SummaryTableRow {
  opportunity_area: string;
  primary_contact: string;
  chunk_ids: string[];
  urgency: string;
}

export interface OpportunityData {
  company_symbol: string;
  quarter: string;
  analysis_date: string;
  analysis_timestamp: string;
  model: string;
  source_chunks: number;
  executive_summary: string;
  opportunities: Opportunity[];
  summary_table: SummaryTableRow[];
}