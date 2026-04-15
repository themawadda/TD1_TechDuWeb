import { Repository } from "typeorm";
import { City } from "@domain/entities/City";
import { Match } from "@domain/entities/Match";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class CityService {
  constructor(
    private cityRepository: Repository<City>,
    private matchRepository?: Repository<Match>
  ) {}

  async getCityByName(name: string): Promise<City> {
    const allCities = await this.cityRepository.find();

    const city = allCities.find(
      (city) => city.name.toLowerCase() === name.toLowerCase()
    );

    if (!city) {
      throw new NotFoundError("City not found");
    }

    return city;
  }

  async getCityMatchs(name: string): Promise<Match[]> {
    const allCities = await this.cityRepository.find();

    const city = allCities.find(
      (city) => city.name.toLowerCase() === name.toLowerCase()
    );

    if (!city) {
      throw new NotFoundError("City not found");
    }

    if (!this.matchRepository) {
      return [];
    }

    const allMatchs = await this.matchRepository.find();

    return allMatchs.filter(
      (match) => match.stadium.city.name.toLowerCase() === city.name.toLowerCase()
    );
  }
}