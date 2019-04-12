import {MetaDataType} from './meta-data-type.enum';

export interface MetaDataEntry {
    type: MetaDataType;
    metaDataEntryId: number;
    key: string;
    value: string;
}

