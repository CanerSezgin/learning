import { Controller, Get, Post, Headers, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(public messagesService: MessagesService){}

    @Get()
    listMessages(){
        return this.messagesService.findAll()
    }

    @Post()
    createMessage(@Headers() headers: any, @Body() body: CreateMessageDto){
        console.log(headers)
        console.log(body)
        return this.messagesService.create(body.content)
    }

    @Get('/:id')
    async getMessage(@Param('id') id: string){
        const message = await this.messagesService.findOne(id)
        if(!message) throw new NotFoundException('message not found')
        return message 
    }

}
