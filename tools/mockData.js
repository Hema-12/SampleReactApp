const records = [
  {
    id:1,
    name:"Arpitha",
    manager:"Supritha",
    //doj:"05/21/2019",
    deptId:1,
    phno:"123",
    //dob:"12/08/1996",
    salary:2000000.00,
    nationality:"Indian"
},

];

const depts = [
  { id: 1, name: "APPS" },
  { id: 2, name: "BPO" },
  { id: 3, name: "HR" },
  { id: 4, name: "Finance"}
];

const newrecord = {
    id:"",
    name:"",
    manager:"",
    //doj:"05/21/2019",
    deptId:"",
    phno:"",
    //dob:"12/08/1996",
    salary:"",
    nationality:""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newrecord,
  records,
  depts
};
