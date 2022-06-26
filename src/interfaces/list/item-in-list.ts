import {List} from "../../list/list.entity";

export interface ItemInListInterface {
    id: string;
    itemId: string;
    count: number;
    weight: number;
    lists: List[];
}