const { Employee } = require("../models");
const { connect, disconnect } = require("mongoose");

const employees = [
	{
		firstName: "Aoba",
		lastName: "Suzukaze",
		title: "Character Designer",
		department: "Graphics",
		company: "Eagle Jump"
	},
	{
		firstName: "Kou",
		lastName: "Yagami",
		title: "Art Director",
		department: "Graphics",
		company: "Eagle Jump"
	},
	{
		firstName: "Hifumi",
		lastName: "Takimoto",
		title: "Character Design Team Leader",
		department: "Graphics",
		company: "Eagle Jump"
	},
	{
		firstName: "Rin",
		lastName: "Touyama",
		title: "Assistant Producer",
		department: "Production",
		company: "Eagle Jump"
	},
	{
		firstName: "Umiko",
		lastName: "Ahagon",
		title: "Chief Programmer",
		department: "Programming",
		company: "Eagle Jump"
	},
	{
		firstName: "Nene",
		lastName: "Sakura",
		title: "Intern Programmer",
		department: "Programming",
		company: "Eagle Jump"
	},
	{
		firstName: "Hajime",
		lastName: "Shinoda",
		title: "Motion Designer",
		department: "Motion",
		company: "Eagle Jump"
	},
	{
		firstName: "Tsubame",
		lastName: "Narumi",
		title: "Intern Programmer",
		department: "Programming",
		company: "Eagle Jump"
	},
	{
		firstName: "Momiji",
		lastName: "Mochizuki",
		title: "Intern Character Designer",
		department: "Graphics",
		company: "Eagle Jump"
	},
	{
		firstName: "Yun",
		lastName: "Iijima",
		title: "Character Designer",
		department: "Graphics",
		company: "Eagle Jump"
	}
];
connect(process.env.MONGODB_URI || "mongodb://localhost/employee-directory").then((conn) => {
	if (process.env.NODE_ENV === "production") {
		Employee.deleteMany({ company: "Eagle Jump" }).then(() => {
			Employee.insertMany(employees).then((res) => {
				console.log(res);
				disconnect();
			});
		});
	} else {
		Employee.deleteMany({}).then(() => {
			Employee.insertMany(employees).then((res) => {
				console.log(res);
				disconnect();
			});
		});
	}
});
