import EventEmitter2 from "eventemitter2";

export enum Events {
    DATABASE_CONNECT = "database.connect",
    DATABASE_INITIATED = "database.initiated",
    DATABSE_TABLES_INITIATED = "database.tables.initiated",
    DATABASE_TABLE_CREATE = "database.table.create",

    DATABASE_USERS_CREATE = "database.users.create",
    DATABASE_USERS_UPDATE = "database.users.update",
}

const emitter = new EventEmitter2({});

export default emitter;
