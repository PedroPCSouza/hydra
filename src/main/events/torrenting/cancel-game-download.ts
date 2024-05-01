import { gameRepository } from "@main/repository";

import { registerEvent } from "../register-event";
import { WindowManager } from "@main/services";

import { In } from "typeorm";
import { Downloader } from "@main/services/donwloaders/downloader";
import { GameStatus } from "@globals";

const cancelGameDownload = async (
  _event: Electron.IpcMainInvokeEvent,
  gameId: number
) => {
  const game = await gameRepository.findOne({
    where: {
      id: gameId,
      status: In([
        GameStatus.Downloading,
        GameStatus.DownloadingMetadata,
        GameStatus.CheckingFiles,
        GameStatus.Paused,
        GameStatus.Seeding,
        GameStatus.Finished,
        GameStatus.Decompressing,
      ]),
    },
  });

  if (!game) return;

  await gameRepository
    .update(
      {
        id: game.id,
      },
      {
        status: GameStatus.Cancelled,
        bytesDownloaded: 0,
        progress: 0,
      }
    )
    .then((result) => {
      if (
        game.status !== GameStatus.Paused &&
        game.status !== GameStatus.Seeding
      ) {
        Downloader.cancelDownload();
        if (result.affected) WindowManager.mainWindow?.setProgressBar(-1);
      }
    });
};

registerEvent(cancelGameDownload, {
  name: "cancelGameDownload",
});
