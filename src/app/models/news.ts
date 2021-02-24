import { NewsUser } from './news-user';

export interface News {
  NewsID: number;
  Source: string;
  Updated: string;
  TimeAgo: string;
  Title: string;
  Content: string;
  Url: string;
  TermsOfUse: string;
  Author: string;
  Categories: string;
  PlayerID: number;
  TeamID: number;
  Team: string;
  PlayerID2: number;
  TeamID2: number;
  Team2: number;
  OriginalSource: string;
  OriginalSourceUrl: string;
  user?: NewsUser;
}
