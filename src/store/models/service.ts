import { IPhisycalMachine } from './physicalmachine';

export interface IService {
    id: String;
    status?: String;
    title: String;
    type: String;
    favorite?: Boolean;
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
    pm?: IPhisycalMachine;
    aliases?: Array<String>;
    files?: Array<Object>;

    edit?: Boolean;
    opened?: Boolean;
}