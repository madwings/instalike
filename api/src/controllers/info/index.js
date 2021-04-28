import * as config from 'config';

const info = async (req, res) => {
	res.json({
		status: 'ok',
		version: config.version
	});
};

export default { info };
