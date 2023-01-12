exports.successApiResponse = function (res, status, msg, data1) {

	var data = {
		status: status,
		message: msg,
		data: data1
	};

	return res.status(200).send(data);
};

