import { formatName, getSteamAppAsset, repackerFormatter } from "@main/helpers";
import type { CatalogueCategory, CatalogueEntry, GameShop } from "@types";

import { stateManager } from "@main/state-manager";
import { searchGames, searchRepacks } from "../helpers/search-games";
import { registerEvent } from "../register-event";
import { requestSteam250 } from "@main/services";

const repacks = stateManager.getValue("repacks");

interface GetStringForLookup {
  (index: number): string;
}

const getCatalogue = async (
  _event: Electron.IpcMainInvokeEvent,
  category: CatalogueCategory
) => {
  const getStringForLookup = (index: number): string => {
    const repack = repacks[index];
    const formatter =
      repackerFormatter[repack.repacker as keyof typeof repackerFormatter];

    return formatName(formatter(repack.title));
  };

  if (!repacks.length) return [];
  const resultSize = 12;

  switch (category) {
    case "trending_7day":
    case "trending_30day":
    case "trending_90day":
      return getTrendingCatalogue(category, 
        resultSize
      );
    case "most_played":
      return getMostPlayedCatalogue(resultSize);
    default:
      return getRecentlyAddedCatalogue(
        resultSize,
        resultSize,
        getStringForLookup
      );
  }
};

const getTrendingCatalogue = async (
  category: CatalogueCategory,
  resultSize: number
): Promise<CatalogueEntry[]> => {
  const results: CatalogueEntry[] = [];
  const periodMap = {
    trending_7day: "/7day",
    trending_30day: "/30day",
    trending_90day: "/90day"
  };
  const trendingGames = await requestSteam250(periodMap[category as keyof typeof periodMap]);

  for (
    let i = 0;
    i < trendingGames.length && results.length < resultSize;
    i++
  ) {
    if (!trendingGames[i]) continue;

    const { title, objectID } = trendingGames[i];
    const repacks = searchRepacks(title);

    if (title && repacks.length) {
      const catalogueEntry = {
        objectID,
        title,
        shop: "steam" as GameShop,
        cover: getSteamAppAsset("library", objectID),
      };

      results.push({ ...catalogueEntry, repacks });
    }
  }
  return results;
};

const getMostPlayedCatalogue = async (
  resultSize: number
): Promise<CatalogueEntry[]> => {
  const results: CatalogueEntry[] = [];
  const MostPlayedGames = await requestSteam250("/most_played");
  for (
    let i = 0;
    i < MostPlayedGames.length && results.length < resultSize;
    i++
  ) {
    if (!MostPlayedGames[i]) continue;

    const { title, objectID } = MostPlayedGames[i];
    const repacks = searchRepacks(title);

    if (title && repacks.length) {
      const catalogueEntry = {
        objectID,
        title,
        shop: "steam" as GameShop,
        cover: getSteamAppAsset("library", objectID),
      };

      results.push({ ...catalogueEntry, repacks });
    }
  }
  return results;
};

const getRecentlyAddedCatalogue = async (
  resultSize: number,
  requestSize: number,
  getStringForLookup: GetStringForLookup
): Promise<CatalogueEntry[]> => {
  let lookupRequest = [];
  const results: CatalogueEntry[] = [];

  for (let i = 0; results.length < resultSize; i++) {
    const stringForLookup = getStringForLookup(i);

    if (!stringForLookup) {
      i++;
      continue;
    }

    lookupRequest.push(searchGames({ query: stringForLookup }));

    if (lookupRequest.length < requestSize) {
      continue;
    }

    const games = (await Promise.all(lookupRequest)).map((value) =>
      value.at(0)
    );

    for (const game of games) {
      const isAlreadyIncluded = results.some(
        (result) => result.objectID === game?.objectID
      );

      if (!game || !game.repacks.length || isAlreadyIncluded) {
        continue;
      }

      results.push(game);
    }
    lookupRequest = [];
  }

  return results.slice(0, resultSize);
};

registerEvent(getCatalogue, {
  name: "getCatalogue",
  memoize: true,
});