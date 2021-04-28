import Debug from 'debug';

const debug = Debug('service-limechain:controllers:health');

const root = (req, res) => {
	res.json({ root: true });
};

const health = (req, res) => {
	debug('health ok');
	res.json({ status: 'ok' });
};

export default { root, health };
