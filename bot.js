const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packagesToDownload = [
  { name: "@zenithui/day-picker", count: 1000 }, //[cite: 3]
  { name: "@zenithui/time-picker", count: 1000 }, //[cite: 3]
  { name: "@zenithui/toast", count: 700 }, //[cite: 3]
  { name: "@zenithui/fab", count: 1000 }, //[cite: 3]
  { name: "@zenithui/tooltip", count: 200 }, //[cite: 3]
  { name: "@zenithui/light-box", count: 600 }, //[cite: 3]
  { name: "@zenithui/utils", count: 1100 } //[cite: 3]
];

function runDownloads() {
  logToFile("================================");
  logToFile("NPM Download Bot Started");
  logToFile("================================");

  for (const item of packagesToDownload) {
    logToFile(`Starting ${item.name} : ${item.count} downloads`);

    // Using shell: true ensures the global 'nid' command is found
    const result = spawnSync('nid', [
      '-p', item.name,
      '-n', item.count.toString(),
      '-m', '300',
      '-t', '3000'
    ], { encoding: 'utf-8', shell: true });

    if (result.status === 0) {
      logToFile(`Completed ${item.name}`);
    } else {
      logToFile(`Failed ${item.name}. Error: ${result.stderr || 'Unknown'}`);
    }
  }

  logToFile("\n================================");
  logToFile("NPM Download Bot Finished");
  logToFile("================================\n");
}

// Execute if run directly
if (require.main === module) {
  runDownloads();
}

module.exports = { runDownloads };
