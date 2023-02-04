import ytdl from "ytdl-core";
import fs from "fs";

import * as state from "./state";

export async function robot() {
  const content = state.load();

  const { urls, urlsDownloaded } = content;

  await downloadAllVideo();

  // urlsFiltered.forEach(async url => {
  //   const { uri } = url;

  //   await makeDownloadVideoFromUrl(uri);

  //   content.urlsDownloaded.push(uri);
  // });

  async function downloadAllVideo() {
    const urlsFiltered = urls.filter(({ type, uri }) => {
      if (type === "YouTube" && !urlsDownloaded.includes(uri)) {
        return true;
      }

      return false;
    });

    if (urlsFiltered.length === 0) {
      return;
    }

    const { uri } = urlsFiltered[0];

    content.urlsDownloaded.push(uri);

    await makeDownloadVideoFromUrl(uri);

    state.save(content);

    await downloadAllVideo();
  }

  // const url = "https://www.youtube.com/shorts/dvbR3rB_FGs";

  async function makeDownloadVideoFromUrl(url: string) {
    const id = ytdl.getURLVideoID(url);

    return new Promise<void>((resolve, reject) => {
      console.log(`Downloading video from ${url}`);
      ytdl(url)
        .pipe(fs.createWriteStream(`./src/content/youtube/${id}.mp4`))
        .on("error", reject)
        .on("finish", () => {
          console.log(`Download Completed!`);
          resolve();
        });
    });
  }
}
