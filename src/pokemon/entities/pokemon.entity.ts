import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  //id: string mongo me lo da
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

// Exportar schema cuando se inicia la bd le dice estas son las definiciones, reglas, columnas...
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
