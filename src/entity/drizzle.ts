import { pgTable, serial, text, varchar, integer } from 'drizzle-orm/pg-core';

export const dog = pgTable('dog', {
  id: serial('id').primaryKey(),
  name: varchar('name'),
  age: integer('age'),
  breed: text('breed'),
});
