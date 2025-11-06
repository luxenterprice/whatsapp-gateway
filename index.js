const venom = require('venom-bot');

venom
  .create({
    session: 'session',
    multidevice: true,
    useChrome: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Adjust if needed
    browserArgs: ['--no-sandbox'],
    headless: false,  // first run, see the QR
    qrLogSkip: false,
    autoClose: 0
  })
  .then((client) => start(client))
  .catch((err) => console.log('Error creating client:', err));

function start(client) {
  console.log('✅ Venom Bot connected!');
  client.onMessage((msg) => console.log(msg));
  client.onStateChange((state) => {
    console.log('🔄 State changed:', state);
    if (state === 'CONFLICT' || state === 'UNPAIRED' || state === 'UNLAUNCHED') {
      console.log('⚠️ Reconnecting...');
      client.forceRefocus();
    }
  });
}
