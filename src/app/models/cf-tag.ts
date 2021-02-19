export interface CfTag {
  tag: string;
  name: string;
  multiple?: boolean;
  'cf-label'?: string;
  children?: Array<CfTag>;
  'cf-questions': string;
  'cf-input-placeholder': string;
  value?: string;
  type?: string;
}
