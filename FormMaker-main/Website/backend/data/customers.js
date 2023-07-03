import bcrypt from "bcryptjs";
const customers = [
  {
    fname: "ruturaj",
    lname: "salunkhe",
    email: "ruturaj4@example.com",
    contact: "1234567890",
    department: "cyber security analyist",
    password: bcrypt.hashSync("123456", 10),
    isActive: true,
    // project: "audix",
    // cUsers: [
    //   {
    //     fname: "lavkik",
    //     lname: "lavkik",
    //     email: "dada@gmail.com",
    //     password: bcrypt.hashSync("123456", 10),
    //   },
    //   {
    //     fname: "lavkik",
    //     lname: "lavkik",
    //     email: "dada@gmail.com",
    //     password: bcrypt.hashSync("123456", 10),
    //   },
    // ],
  },
  {
    fname: "Lavkik",
    lname: "salunkhe",
    email: "ruturaj5@example.com",
    contact: "1234567890",
    department: "cyber security analyist",
    password: bcrypt.hashSync("123456", 10),
    isActive: false,
    // project: "audix",
    // cUsers: [
    //   {
    //     fname: "lavkik",
    //     lname: "lavkik",
    //     email: "da1da2@gmail.com",
    //     password: bcrypt.hashSync("123456", 10),
    //   },
    //   {
    //     fname: "lavkik",
    //     lname: "lavkik",
    //     email: "dada2@gmail.com",
    //     password: bcrypt.hashSync("123456", 10),
    //   },
    // ],
  },
  {
    fname: "Vaibhav",
    lname: "salunkhe",
    email: "ruturaj6@example.com",
    contact: "1234567890",
    department: "cyber security analyist",
    password: bcrypt.hashSync("123456", 10),
    isActive: false,
    // project: "audix",
    // cUsers: [
    //   {
    //     fname: "lavkik",
    //     lname: "lavkik",
    //     email: "dad2a@gmail.com",
    //     password: bcrypt.hashSync("123456", 10),
    //   },
    //   {
    //     fname: "lavkik",
    //     lname: "lavkik",
    //     email: "dadaa@gmail.com",
    //     password: bcrypt.hashSync("123456", 10),
    //   },
    // ],
  },
];
export default customers;
