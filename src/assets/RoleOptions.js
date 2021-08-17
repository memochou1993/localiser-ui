import {
  Role,
  Scope,
} from '@/constants';

const roles = [
  {
    code: Role.Admin,
    label: 'Admin',
    scope: Scope.System,
  },
  {
    code: Role.Developer,
    label: 'Developer',
    scope: Scope.System,
  },
  {
    code: Role.Guest,
    label: 'Guest',
    scope: Scope.System,
  },
  {
    code: Role.ProjectOwner,
    label: 'Owner',
    scope: Scope.Project,
  },
  {
    code: Role.ProjectMaintainer,
    label: 'Maintainer',
    scope: Scope.Project,
  },
  {
    code: Role.ProjectGuest,
    label: 'Guest',
    scope: Scope.Project,
  },
];

export default roles;
