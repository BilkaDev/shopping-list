import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {List} from "./list.entity";
import {CreateListDto} from "./dto/create-list";
import {CreateListResponse, DeleteListResponse, EditListResponse} from "../interfaces/list/list";
import {CreateItemInListDto} from "./dto/create-item-in-list";
import {AddItemtoListResponse, UpdateItemInListResponse} from "../interfaces/list/item-in-list";
import {ProductService} from "../product/product.service";
import {ItemInList} from "./item-in-list.entity";
import {UpdateItemsListDto} from "./dto/update-items-list";

@Injectable()
export class ListService {
    constructor(
        @Inject(forwardRef(() => ProductService)) private productService: ProductService,
    ) {
    }

    async getLists(): Promise<List[]> {
        return await List.find();
    }

    async getList(id: string): Promise<List> {
        try {
            return await List.findOneOrFail({
                where: {id},
                relations: ['items']
            });
        } catch (e) {
            return;
        }
    }

    async hasList(name: string): Promise<boolean> {
        return (await this.getLists()).some(list => list.listName.toLowerCase() === name.toLowerCase());
    }

    async getItemInList(id: string) {
        try {
            return await ItemInList.findOne({where: {id}});
        } catch (e) {
            return;
        }
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
            for (const item of list.items) {
                await item.remove();
            }
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

    async addProductToList(item: CreateItemInListDto): Promise<AddItemtoListResponse> {
        const product = await this.productService.getProduct(item.itemId);
        const list = await this.getList(item.listId);
        const newItem = new ItemInList();
        newItem.product = product;
        newItem.count = item.count;
        newItem.weight = item.weight;
        await newItem.save();

        if (product && list) {
            list.items.push(newItem);
            await list.save();
            return {
                isSuccess: true,
                id: newItem.id,
            };
        } else return {
            isSuccess: false
        };
    }

    async updateItemList(id: string, newItem: UpdateItemsListDto): Promise<UpdateItemInListResponse> {
        const item = await this.getItemInList(id);
        if (item) {
            item.count = newItem.count;
            item.weight = newItem.weight;
            await item.save();
            return {
                isSuccess: true,
            };
        } else {
            return {isSuccess: false};
        }
    }

    async deleteItemInList(id: string) {
        const item = await this.getItemInList(id)
        if (item){
            await item.remove();
            return {isSuccess:true}
        }else{
            return {isSuccess:false}
        }
    }

    async clearList(id: string) {
        const list = await this.getList(id);
        if (list){
            for (const item of list.items) {
                await item.remove();
            }

            await list.save()
            return {isSuccess:true}
        }else{
            return {isSuccess:false}
        }
    }
}

