import bcrypt from "bcryptjs";

const users = [
  {
    fname: "ruturaj",
    lname: "salunkhe",
    contact: "1234567890",
    email: "ruturaj1@example.com",
    password: bcrypt.hashSync("123456", 10),
    department: "cyber security analyist",
    isAdmin: true,
    isSuperAdmin: true,
    role: "Develop",
    isActive: true,
  },
  {
    fname: "ruturaj",
    lname: "salunkhe",
    contact: "1234567890",
    email: "ruturaj2@example.com",
    password: bcrypt.hashSync("123456", 10),
    department: "cyber security analyist",
    isAdmin: true,
    isSuperAdmin: false,
    role: "Deop",
    isActive: false,
  },
  {
    fname: "ruturaj",
    lname: "salunkhe",
    contact: "1234567890",
    email: "ruturaj3@example.com",
    password: bcrypt.hashSync("123456", 10),
    department: "cyber security analyist",
    isAdmin: false,
    isSuperAdmin: false,
    role: "Deve",
    isActive: true,
  },
];

export default users;
