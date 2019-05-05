export interface UserSkill {
  id?: string;
  name: string;
  level: number;
}

export interface UserArea {
  id: string;
  name: string;
  level: number;
  role: string;
}

export interface UserProject {
  id: string;
  name: string;
  level: number;
  role: string;
  responsibilities: string;
}

export interface User {
  id: string;
  fullName: string;
  photoURL: string;
  email: string;
  googleId: string;
  areas: UserArea[];
  skills: UserSkill[];
  projects: UserProject[];
  permissions: MainPermission[];
  university: any;
  year?: 1 | 2 | 3 | 4 | 5 | 6;
  createdAt: Date;
  updatedAt: Date;
}

export type MainPermission =  'OWNER' | 'ADMIN' | 'MEMBER' | 'TRAINEE' | 'HR' | 'FINANCE' | 'DATA';
