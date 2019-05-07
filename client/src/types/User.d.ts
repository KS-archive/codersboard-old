export type Permission = 'OWNER' | 'ADMIN' | 'MEMBER' | 'GUEST';
export type MainPermission =  'OWNER' | 'ADMIN' | 'MEMBER' | 'TRAINEE' | 'HR' | 'FINANCE' | 'DATA';
export type Institution = 'NONE' | 'UE_ORGANIZATION' | 'PWR_ORGANIZATION' | 'ASSOCIATION';
export type Access = 'FONT_AWESOME' | 'FREEPIK' | 'UDEMY_WEB_DEV' | 'UDEMY_MARKETING' | 'UDEMY_DATA_SCIENCE' | 'UDEMY_UX';

export interface UserSkill {
  id?: string;
  skill: {
    id: string;
    name: string;
    icon: string;
  }
  level: number;
}

export interface UserArea {
  id: string;
  area: {
    id: string;
    name: string;
    icon: string;
    areaURL: string;
  }
  role: string;
  responsibilities: string;
  permissions: Permission[];
}

export interface UserProject {
  id: string;
  project: {
    id: string;
    name: string;
    image: string;
    projectURL: string;
  }
  role: string;
  responsibilities: string;
  permissions: Permission[];
}

export interface User {
  id: string;
  fullName: string;
  profileURL: string;
  image: string;
  email: string;
  companyEmail?: string;
  phone?: string;
  role: string;
  areas?: UserArea[];
  skills?: UserSkill[];
  projects?: UserProject[];
  permissions: MainPermission[];
  university?: {
    id: string;
    name: string;
    image: string;
  };
  universityDepartment?: string;
  fieldOfStudy?: string;
  year?: number;
  indexNumber?: number;
  institution: Institution[];
  slackId?: string;
  accesses?: Access[];
  ownerOf?: string[];
  adminOf?: string[];
  memberOf?: string[];
  guestOf?: string[];
  special?: string[];
  createdAt: Date;
  updatedAt: Date;
}

