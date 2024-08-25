import dotenv from 'dotenv';

import bot from 'configs/bot';
import { router } from 'routes';
import store from 'store';
import initStore from 'store/utils';

dotenv.config();

(async () => {
  await initStore(store);

  router(bot);
})();

// eslint-disable-next-line no-console
console.log('\n HyperLoop Bot is running... \n');
