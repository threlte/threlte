import { fileURLToPath } from 'node:url';
import { setupGlobal } from 'sv/testing';

const TEST_DIR = fileURLToPath(new URL('../../.test-output/', import.meta.url));

export default setupGlobal({
	TEST_DIR,
	pre: async () => {
		// global setup (e.g. spin up docker containers)
	},
	post: async () => {
		// tear down... (e.g. cleanup docker containers)
	}
});
