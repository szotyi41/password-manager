import { model, Schema, Document } from 'mongoose';
import { Service } from '../interfaces/service.interface';

const serviceSchema: Schema = new Schema({
    _id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },

    favorite: {
        type: Boolean
    },
    notes: {
        type: String
    },
    icon: {
        type: String
    },
    infolder: {
        type: Array
    },
    owners: {
        type: Array
    },

    localip: {
        type: Array
    },
    globalip: {
        type: Array
    },
    host: {
        type: Array
    },
    port: {
        type: Array
    },
    bucket: {
        type: Array
    },
    command: {
        type: String
    },
    address: {
        type: Array
    },
    repository: {
        type: Array
    },
    version: {
        type: Array
    },
    key: {
        type: Array
    },
    secret: {
        type: Array
    },
    database: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    pfsense: {
        type: String
    },
    aliases: {
        type: Array
    },
    files: {
        type: Array
    }
});

const serviceModel = model<Service & Document>('Service', serviceSchema);

export default serviceModel;
