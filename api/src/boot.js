import 'dotenv/config';
import 'regenerator-runtime/runtime';
import Debug from 'debug';
import * as config from 'config';
import displayRoutes from 'express-routemap';
import http from 'http';

import app from './app';

const debug = Debug('service-limechain:boot');
const error = Debug('service-limechain:error:boot');
const v8 = require('v8');
require('v8-compile-cache');

v8.setFlagsFromString('--no-lazy');

async function run() {
	debug('\t\tRun server: init');
	const server = http.createServer(app);
	server.on('error', (err) => {
		error(`Server error: ${err}`);
	});
	server.listen(config.app.port, () => {
		const env = process.env.NODE_ENV || 'development';
		debug(`\t\tStarted on http://${config.app.host}:${config.app.port} (${env})`);
		displayRoutes(app);
	});
}

process.on('uncaughtException', (err, origin) => {
	error(`Uncaught Exception detected: ${err} from ${origin}`);
});
process.on('unhandledRejection', (reason, p) => {
	error(`Unhandled Rejection at: Promise ${p} reason: ${reason}`);
});

run().catch(err => error(err));
