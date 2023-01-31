import Debug from 'debug';

const debug = Debug('service-instalike:controllers:health');

const root = (req, res) => {
	res.json({ root: true });
};

const health = (req, res) => {
	debug('health ok');
	res.json({ status: 'ok' });
};

export default { root, health };
