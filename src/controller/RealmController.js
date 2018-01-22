'use_strict'

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../../ro-realm/ParentRealmController');

class RealmController extends ParentRealmController {
	constructor() {
		super();
		this.getAccount = this.getAccount.bind(this);
		this.createAccount = this.createAccount.bind(this);
		this.updateAccount = this.updateAccount.bind(this);
		this.writeObject = this.writeObject.bind(this);
	};

	// Account
	getAccount(id) {
		let account = this.realm.objects('Account').filtered('id = $0', id);
		return account;
	};
	createAccount(accountObj) {
		accountObj.id = uuidv4();
		accountObj.created = new Date();
		var account = this.writeObject('Account', accountObj, false);
		return account;
	};
	updateAccount(id, newData) {
		newData.id = id;
		var account = this.writeObject('Account', newData, true);
		return account;
	}

	// Helper
	writeObject(className, obj, update) {
		var created;
		try {
			this.realm.write(() => {
				created = this.realm.create(className, obj, update);
			});
		} catch (e) {
			console.log('Error on creation: ' + e);
			console.log(className + ' -> ' + JSON.stringify(obj));
		}
		return created;
	}
}
module.exports = RealmController;