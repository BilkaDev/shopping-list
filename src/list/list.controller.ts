import {Body, Controller, Delete, Get, Inject, Param, Patch, Post} from '@nestjs/common';
import {ListService} from "./list.service";
import {
    CreateListResponse,
    DeleteListResponse,
    EditListResponse,
    GetListResponse,
    GetListsResponse
} from "../interfaces/list/list";
import {CreateListDto} from "./dto/create-list";
import {CreateItemInListDto} from "./dto/create-item-in-list";
import {AddItemtoListResponse} from "../interfaces/list/item-in-list";

@Controller('list')
export class ListController {
    constructor(
        @Inject(ListService) private listService: ListService,
    ) {
    }

    @Get('/')
    getLists(): Promise<GetListsResponse> {
        return this.listService.getLists();
    }

    @Get('/:id')
    getList(
        @Param('id') id: string
    ): Promise<GetListResponse> {
        return this.listService.getList(id);
    }

    @Post('/')
    createList(
        @Body() list: CreateListDto,
    ): Promise<CreateListResponse> {
        return this.listService.createList(list);
    }
    @Post('/product')
    addProductToList(
        @Body() newProduct: CreateItemInListDto,
    ): Promise<AddItemtoListResponse> {
        return this.listService.addProductToList(newProduct);
    }

    @Patch('/:id')
    editList(
        @Param('id') id: string,
        @Body() list: CreateListDto,
    ): Promise<EditListResponse> {
        return this.listService.editList(id, list);
    }

    @Delete('/:id')
    deleteList(
        @Param('id') id: string,
    ): Promise<DeleteListResponse> {
        return this.listService.deleteList(id);
    }
}
