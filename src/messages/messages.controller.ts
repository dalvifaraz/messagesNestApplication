import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Injectable()
@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  async listMessages() {
    return await this.messagesService.findAll();
  }

  @Post()
  async createMessage(@Body() body: CreateMessageDto) {
    return await this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException('Message Not Found with this id.');
    }

    return message;
  }
}
