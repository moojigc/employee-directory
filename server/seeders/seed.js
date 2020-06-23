const { Employee } = require("../models");
const { connect, disconnect } = require("mongoose");

const employees = [
	{
		firstName: "Aoba",
		lastName: "Suzukaze",
		title: "Character Designer",
		department: "Graphics"
	},
	{
		firstName: "Kou",
		lastName: "Yagami",
		title: "Art Director",
		department: "Graphics"
	},
	{
		firstName: "Hifumi",
		lastName: "Takimoto",
		title: "Character Design Team Leader",
		department: "Graphics"
	},
	{
		firstName: "Rin",
		lastName: "Touyama",
		title: "Assistant Producer",
		department: "Production"
	},
	{
		firstName: "Umiko",
		lastName: "Ahagon",
		title: "Chief Programmer",
		department: "Programming"
	},
	{
		firstName: "Nene",
		lastName: "Sakura",
		title: "Intern Programmer",
		department: "Programming"
	},
	{
		firstName: "Hajime",
		lastName: "Shinoda",
		title: "Motion Designer",
		department: "Motion"
	},
	{
		firstName: "Tsubame",
		lastName: "Narumi",
		title: "Intern Programmer",
		department: "Programming"
	},
	{
		firstName: "Momiji",
		lastName: "Mochizuki",
		title: "Intern Character Designer",
		department: "Graphics"
	},
	{
		firstName: "Yun",
		lastName: "Iijima",
		title: "Character Designer",
		department: "Graphics"
	}
];
connect(process.env.MONGODB_URI || "mongodb://localhost/employee-directory").then((conn) => {
	if (process.env.NODE_ENV === "production") {
		Employee.insertMany(employees).then((res) => {
			disconnect();
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
