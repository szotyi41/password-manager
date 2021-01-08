export interface Service {
  _id: String;
  status: String;
  title: String;
  type: String;

  favorite_users: Array<String>;
  notes?: String;
  icon?: String;
  infolder?: Array<String>;
  owners?: Array<String>;

  localip?: Array<String>;
  globalip?: Array<String>;
  host?: Array<String>;
  port?: Array<String>;
  bucket?: Array<String>;
  command?: String;
  address?: Array<String>;
  repository?: Array<String>;
  version?: Array<String>;
  key?: Array<String>;
  secret?: Array<String>;
  database?: String;
  username?: String;
  password?: String;
  pfsense?: String;
  aliases?: Array<String>;
  files?: Array<Object>;

  edit?: Boolean;
  opened?: Boolean;
}
