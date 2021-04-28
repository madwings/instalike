import * as config from 'config';
import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

import router from './routes';
import healthRouter from './routes/health';

import errorLib from './lib/errors';
import expressBoom from './lib/middleware/express-boom';

// logger.log('info', 'Hello simple log!');
// logger.info('Hello log with metas', { color: 'blue' });

const app = express();

// compress responses
app.use(compression());

app.use(morgan('dev', { skip: () => app.get('env') === 'test' }));

// start body-parser configuration
// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
const corsOptions = {
	origin(origin, callback) {
		if (!origin || config.app.allowed_cors_domains.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	allowedHeaders: config.app.allowed_headers,
	credentials: true,
	methods: config.app.allowed_methods
};

app.use((req, res, next) => {
	res.header('P3P', 'CP="CAO PSA OUR"');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Content-Type', 'application/json');
	next();
});

// debug('exampleMW', exampleMW());
// app.use(boom());
app.use(expressBoom);

// load routes
app.use(config.app.root, healthRouter);
app.use(config.app.root, cors(corsOptions), router);

app.use((req, res, next) => {
	res.set('Content-Type', 'application/vnd.postplanner.v2+json');
	next();
});

// catch 404 and forward to error handler
app.use(errorLib.notFound);
app.use((err, req, res, next) => {
	errorLib.handler(err, req, res, next);
});

/**
 * Exports express
 * @public
 */
module.exports = app;
export default app;
