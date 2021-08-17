import {
  Role,
  Scope,
} from '@/constants';

const roles = [
  {
    code: Role.Admin,
    name: 'Admin',
    scope: Scope.System,
  },
  {
    code: Role.Developer,
    name: 'Developer',
    scope: Scope.System,
  },
  {
    code: Role.Guest,
    name: 'Guest',
    scope: Scope.System,
  },
  {
    code: Role.ProjectOwner,
    name: 'Owner',
    scope: Scope.Project,
  },
  {
    code: Role.ProjectMaintainer,
    name: 'Maintainer',
    scope: Scope.Project,
  },
  {
    code: Role.ProjectGuest,
    name: 'Guest',
    scope: Scope.Project,
  },
];

export default roles;
