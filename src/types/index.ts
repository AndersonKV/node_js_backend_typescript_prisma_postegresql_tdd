export type UserProps = {
  name: string;
  email: string;
  confirm_password: string;
  password: string;
  id: string;
  created_at?: string;
  updated_at?: string;
  avatar: string;
};


export enum RoleUserValidProps {
  USER = 'USER',
  COMPANY = 'COMPANY'
}

export type UserValidProps = {
  id?: number;
  name: string;
  email: string;
  confirm_password: string;
  password: string;
  token?: string;
  role: RoleUserValidProps
  avatar?: string;
};


export type UserUpdateProps = {
  id?: number;
  name: string;
  email: string;
  new_password?: string;
  password: string;
  token?: string;
  role?: RoleUserValidProps
  avatar?: string;
};

export type TypeJob = {
  id: number;
  title: string;
  name_company: string;
  id_user: number;
  remote: string;
  techs: string[] | string;
  responsibilities: string;
  requirements: string;
  types_contract: string;
  size_company: string;
  experience_level: string;
  salary: string;
  expired_days: number | string;
  benefits: string;
  created_at: string;

}
export type JobSaveProps = {
  title: string;
  name_company: string;
  id_user: number;
  remote: string;
  techs: string[];
  responsibilities: string;
  requirements: string;
  types_contract: string;
  size_company: string;
  experience_level: string;
  salary: string;
  expired_days: number | string;
  benefits: string;

};

export type TokenResponse = {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  errorCodes: string[];
};

export type SignInProps = {
  email: string;
  password: string;
};

export type SignInSuccess = {
  email: string;
  password: string;
  id: string;
  token: string
};

export type MatchingCreateProps = {
  id_job: number;
  id_user: number;
  id_author: number;
};
