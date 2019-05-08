export interface IPullRequest {
  name: string;
  description: string;
  ticket: string;
  repo: string;
  author: string;
  state: string;
  created: Date;
}
