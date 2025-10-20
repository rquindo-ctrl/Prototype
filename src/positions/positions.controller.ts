/**
 * Positions Controller
 * 
 * This controller handles all HTTP requests related to position management.
 * It provides RESTful endpoints for CRUD operations on positions.
 * 
 * Endpoints:
 * - GET    /positions      : Retrieve all positions
 * - GET    /positions/:id  : Retrieve a specific position by ID
 * - POST   /positions      : Create a new position
 * - PUT    /positions/:id  : Update an existing position
 * - DELETE /positions/:id  : Delete a position
 * 
 * Customizations/Modifications:
 * - Added console.log statements for debugging and monitoring endpoint calls
 * - Using async/await for update and delete operations to ensure proper execution
 * - Returns success messages for update and delete operations
 * - Converts string ID parameters to numbers using unary plus operator (+id)
 * 
 */


import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  findAll() {
    console.log('GET /positions triggered');
    return this.positionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(`GET /positions/${id} triggered`);
    return this.positionsService.findOne(+id);
  }

  @Post()
  create(@Body() positionData: any) {
    console.log('POST /positions triggered', positionData);
    return this.positionsService.create(positionData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: any) {
    console.log(`PUT /positions/${id} triggered`, updateData);
    await this.positionsService.update(+id, updateData);
    return { message: 'Position updated successfully' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log(`DELETE /positions/${id} triggered`);
    await this.positionsService.remove(+id);
    return { message: 'Position deleted successfully' };
  }
} 