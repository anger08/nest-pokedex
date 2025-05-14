import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    //Primera manera de insertar datos mas de 600, 1000 sin esperar el await, sino que se haga de manera simultanea:
    /*------------------------------------------------------------
    await this.pokemonModel.deleteMany(); //delete * from pokemons

    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    
    const insertPromisesArray = [];

    data.results.forEach(({ name, url }) => {
      //Aqui se esta diviendo la url, para obtener el number del id del pokemon:
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      // const pokemon = await this.pokemonModel.create({ name, no });
      insertPromisesArray.push(this.pokemonModel.create({ name, no }));
    });

    await Promise.all(insertPromisesArray);

    return 'Seed Executed';
    ---------------------------------------------------------*/

    //Segunda manera, la mas recomendable:
    await this.pokemonModel.deleteMany(); //delete * from pokemons

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      //Aqui se esta diviendo la url, para obtener el number del id del pokemon:
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      pokemonToInsert.push({ name, no }); //[{name: bulbasaur, no: 1}]
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
