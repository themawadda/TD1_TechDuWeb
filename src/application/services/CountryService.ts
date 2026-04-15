import { Repository } from "typeorm";
import { Country } from "@domain/entities/Country";
import { City } from "@domain/entities/City";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class CountryService {
  constructor(
    private countryRepository: Repository<Country>,
    private cityRepository?: Repository<City>
  ) {}

  async getCountryByCode(code: string): Promise<Country> {
    const country = await this.countryRepository.findOne({
      where: { code },
    });

    if (!country) {
      throw new NotFoundError("Country not found");
    }

    return country;
  }

  async getCountryCities(code: string): Promise<City[]> {
    const country = await this.countryRepository.findOne({
      where: { code },
    });

    if (!country) {
      throw new NotFoundError("Country not found");
    }

    if (!this.cityRepository) {
      return [];
    }

    const cities = await this.cityRepository.find({
      where: {
        country: { code },
      },
    });

    return cities;
  }
}