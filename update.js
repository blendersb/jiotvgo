import fs from 'fs/promises';

const TARGET_URL = "http://jiotvgo.sparkbl.dpdns.org/channels?type=m3uraw";
const OUTPUT_FILE = "playlist.m3u";

async function fetchAndUpdatePlaylist() {
  console.log(`[${new Date().toISOString()}] Fetching M3U playlist...`);

  try {
    const response = await fetch(TARGET_URL, {
      headers: {
        "Accept": "*/*",
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const playlistData = await response.text();

    if (!playlistData.includes("#EXTM3U")) {
      throw new Error("Invalid playlist content received.");
    }

    await fs.writeFile(OUTPUT_FILE, playlistData, "utf-8");
    console.log(`[✓] Successfully updated ${OUTPUT_FILE}`);
  } catch (error) {
    console.error(`[✗] Failed to update playlist:`, error.message);
    process.exit(1);
  }
}

fetchAndUpdatePlaylist();
