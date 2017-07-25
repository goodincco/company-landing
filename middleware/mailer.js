var mailer = require("nodemailer");

var mailerMiddleware = function (req, res, next) {
	
	if (!req.body.text || !req.body.email || !/^.+@.+\.[^\.]+$/.test(req.body.email)) {
		 res.sendStatus(400);
	}
	
	var smtpTransport = mailer.createTransport("SMTP", {
		service: "Mailgun",
		auth: {
			user: "TODO",
			pass: "TODO"
		}
	});

	var mail = {
		from: `${req.body.name || 'Anonymous'} <${req.body.email}>`,
		to: "TODO",
		subject: req.body.subject || 'No subject',
		text: req.body.text
	};

	smtpTransport.sendMail(mail, function(error, response) {
		smtpTransport.close();
		if (error) {
			console.log(error);
			res.sendStatus(500);
		}		
		else res.sendStatus(200);
	});
	
	smtpTransport.close();
};

module.exports = mailerMiddleware;
