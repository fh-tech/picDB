export interface MetaDataEntry {
    type: "Exif" | "Iptc";
    metaDataEntryId: number;
    key: string;
    value: string;
}

