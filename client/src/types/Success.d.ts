export interface SuccessUser {
  id: string;
  fullName: string;
  photoURL: string;
}

export interface Success {
  id: string;
  name: string;
  description: string;
  date: Date;
  type: 'EPIC' | 'SMALL' | 'NEWS';
  users: SuccessUser[];
  project?: string;
}
