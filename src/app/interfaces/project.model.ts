import { IStep } from './step.interface';

export interface IProject {
  id: string;
  name: string;
  trunkUrl: string;
  steps: [IStep];
}
