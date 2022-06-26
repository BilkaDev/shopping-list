import {Injectable} from '@nestjs/common';
import {List} from "./list.entity";
import {CreateListDto} from "./dto/create-list";
import {CreateListResponse, DeleteListResponse, EditListResponse} from "../interfaces/list/list";

@Injectable()
export class ListService {
    async getLists(): Promise<List[]> {
        return await List.find();
    }

    async getList(id: string): Promise<List> {
        return await List.findOneOrFail({
            where: {id},
            relations: ['items']
        });
    }

    async hasList(name: string): Promise<boolean> {
        return (await this.getLists()).some(list => list.listName.toLowerCase() === name.toLowerCase());
    }


    async createList(list: CreateListDto): Promise<CreateListResponse> {
        const newList = new List();
        const checkName = await this.hasList(list.listName);
        if (!checkName) {
            newList.listName = list.listName;
            await newList.save();
            return {
                isSuccess: true,
                id: newList.id,
            };
        } else return {isSuccess: false};
    }

    async deleteList(id: string): Promise<DeleteListResponse> {
        const list = await this.getList(id);
        if (list) {
            await list.remove();
            return {
                isSuccess: true,
            };
        } else return {
            isSuccess: false,
        };
    }

    async editList(id: string, list: CreateListDto): Promise<EditListResponse> {
        const {listName} = list;
        const check = await this.hasList(listName);
        if (!check) {
            const {affected} = await List.update(id, {
                listName,
            });
            if (affected) {
                return {isSuccess: true};
            }
        }
        return {
            isSuccess: false,
        };
    }
}