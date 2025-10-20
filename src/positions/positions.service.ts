/**
 * Positions Service
 * 
 * This service contains the business logic and data management for position operations.
 * It acts as the data layer, handling CRUD operations for position records.
 * 
 * Data Structure:
 * - Uses an in-memory array to store position data (not persisted to database)
 * - Position interface defines the structure with position_id, code, name, timestamps
 * - Includes both numeric ID (position_id) and string ID for flexibility
 * 
 * Customizations/Modifications:
 * - In-memory storage using array instead of database persistence
 * - Auto-incrementing position_id based on array length
 * - Automatic timestamp management (created_at, updated_at) using ISO format
 * - Returns Partial<Position> types to control which fields are exposed in responses
 * - POST response includes only essential fields (id, code, name, position_id)
 * - String 'id' field mirrors position_id for API consistency
 * - Update method automatically sets updated_at timestamp
 * - All methods return sanitized data structures (excluding internal fields if needed)
 */


import { Injectable } from '@nestjs/common';

export interface Position {
  position_id: number;
  position_code: string;
  position_name: string;
  id: string;               // short string version of position_id
  created_at: string;       // ISO timestamp
  updated_at: string;       // ISO timestamp
}

@Injectable()
export class PositionsService {
  private positions: Position[] = [];

  // GET all positions
  findAll(): Partial<Position>[] {
    return this.positions.map((pos) => ({
      position_id: pos.position_id,
      position_code: pos.position_code,
      position_name: pos.position_name,
      id: pos.id,
      created_at: pos.created_at,
      updated_at: pos.updated_at
    }));
  }

  // GET one position by ID
  findOne(position_id: number): Partial<Position> | undefined {
    const pos = this.positions.find((p) => p.position_id === position_id);
    if (!pos) return undefined;

    return {
      position_id: pos.position_id,
      position_code: pos.position_code,
      position_name: pos.position_name,
      id: pos.id,
      created_at: pos.created_at,
      updated_at: pos.updated_at
    };
  }

  // POST new position
  create(data: Omit<Position, 'position_id' | 'id' | 'created_at' | 'updated_at'>): Partial<Position> {
    const newId = this.positions.length > 0
      ? this.positions[this.positions.length - 1].position_id + 1
      : 1;

    const now = new Date().toISOString();

    const newPosition: Position = {
      position_id: newId,
      position_code: data.position_code,
      position_name: data.position_name,
      id: newId.toString(), // short string like "9"
      created_at: now,
      updated_at: now
    };

    this.positions.push(newPosition);

    // POST response format
    return {
      position_id: newPosition.position_id,
      position_code: newPosition.position_code,
      position_name: newPosition.position_name,
      id: newPosition.id
    };
  }

  // PUT/PATCH update position
  update(position_id: number, updateData: Partial<Position>): Partial<Position> | null {
    const index = this.positions.findIndex((pos) => pos.position_id === position_id);
    if (index === -1) return null;

    this.positions[index] = {
      ...this.positions[index],
      ...updateData,
      updated_at: new Date().toISOString()
    };

    const updated = this.positions[index];
    return {
      position_id: updated.position_id,
      position_code: updated.position_code,
      position_name: updated.position_name,
      id: updated.id,
      created_at: updated.created_at,
      updated_at: updated.updated_at
    };
  }

  // DELETE position
  remove(position_id: number): Partial<Position> | null {
    const index = this.positions.findIndex((pos) => pos.position_id === position_id);
    if (index === -1) return null;

    const removed = this.positions.splice(index, 1)[0];
    return {
      position_id: removed.position_id,
      position_code: removed.position_code,
      position_name: removed.position_name,
      id: removed.id,
      created_at: removed.created_at,
      updated_at: removed.updated_at
    };
  }

  // Optional: reset all positions
  reset(): void {
    this.positions = [];
  }
}