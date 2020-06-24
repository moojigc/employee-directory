const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		required: true
	},
	lastName: {
		type: String,
		trim: true,
		required: true
	},
	title: {
		type: String,
		trim: true,
		default: "Employee",
		required: true
	},
	department: {
		type: String,
		trim: true,
		required: true
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
		trim: true
	}
});
const Employee = model("Employee", EmployeeSchema);

module.exports = Employee;
