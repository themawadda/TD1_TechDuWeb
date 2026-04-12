import "reflect-metadata";
import { AppDataSource } from "./AppDataSource";

import { Country } from "@domain/entities/Country";
import { City } from "@domain/entities/City";
import { Stadium } from "@domain/entities/Stadium";
import { Team } from "@domain/entities/Team";
import { Match } from "@domain/entities/Match";
import { Ticket } from "@domain/entities/Ticket";

import { countries } from "@infrastructure/mock/countries";
import { cities } from "@infrastructure/mock/cities";
import { stadiums } from "@infrastructure/mock/stadiums";
import { teams } from "@infrastructure/mock/teams";
import { matchs } from "@infrastructure/mock/matchs";

async function clear(): Promise<void> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  await AppDataSource.createQueryBuilder().delete().from(Ticket).execute();
  await AppDataSource.createQueryBuilder().delete().from(Match).execute();
  await AppDataSource.createQueryBuilder().delete().from(Team).execute();
  await AppDataSource.createQueryBuilder().delete().from(Stadium).execute();
  await AppDataSource.createQueryBuilder().delete().from(City).execute();
  await AppDataSource.createQueryBuilder().delete().from(Country).execute();
}

async function seed(): Promise<void> {
  await clear();

  const countryRepository = AppDataSource.getRepository(Country);
  const cityRepository = AppDataSource.getRepository(City);
  const stadiumRepository = AppDataSource.getRepository(Stadium);
  const teamRepository = AppDataSource.getRepository(Team);
  const matchRepository = AppDataSource.getRepository(Match);

  await countryRepository.save(countries);
  await cityRepository.save(cities);
  await stadiumRepository.save(stadiums);
  await teamRepository.save(teams);
  await matchRepository.save(matchs);

  console.log("Database seeded successfully");

  await AppDataSource.destroy();
}

seed().catch(async (error) => {
  console.error("Seed error:", error);

  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});