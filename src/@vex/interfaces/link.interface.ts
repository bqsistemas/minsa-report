export interface Link {
  label: string;
  route: string | string[];
  disabled?: boolean;
  routerLinkActiveOptions?: { exact: boolean };
}
