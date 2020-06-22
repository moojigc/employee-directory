const { Employee } = require("../models");
const { connect, disconnect } = require("mongoose");

const employees = [
	{
		firstName: "尚文",
		lastName: "岩谷",
		title: "盾の勇者",
		department: "Shield"
	},
	{
		firstName: "ラフタリア",
		lastName: "岩谷",
		title: "尚文の剣",
		department: "Sword"
	},
	{
		firstName: "フィーロ",
		lastName: "岩谷",
		title: "フィロリアルの女王",
		department: "Magic"
	}
];
connect("mongodb://localhost/employee-directory").then((conn) => {
	Employee.deleteMany({}).then(() => {
		Employee.insertMany(employees).then((res) => {
			console.log(res);
			disconnect();
		});
	});
});
