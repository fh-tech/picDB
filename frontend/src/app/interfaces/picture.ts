import {Photographer} from './photographer';
import {MetaData} from './metadata';

export interface Picture {
    pictureId: number;
    name: string;
    filePath: string;
    photographer: Photographer;
    metadata: MetaData;
}
