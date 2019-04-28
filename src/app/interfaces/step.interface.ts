export interface IStep {
  description: string;
  command: string;
  arguments: string;
  retryCount: number;
}
