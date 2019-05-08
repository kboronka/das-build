export interface IPullRequest {
  name: string;
  description: string;
  ticket: string;
  ticketUrl: string;
  repo: string;
  author: string;
  state: string;
  created: Date;
}
