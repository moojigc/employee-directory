const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema({
	firstName: {
		type: String,
		trim: true
	},
	lastName: {
		type: String,
		trim: true
	},
	title: {
		type: String,
		trim: true,
		default: "Employee"
	},
	department: {
		type: String,
		trim: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	manager: {
		type: Schema.Types.ObjectId
	},
	company: {
		type: String,
		required: true,
		trim: true,
		default: "Demo"
	}
});
const Employee = model("Employee", EmployeeSchema);

module.exports = Employee;
