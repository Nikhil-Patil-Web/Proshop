import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Nikhil Patil',
        email: 'nikhil@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Anita Patil',
        email: 'anita@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
]

export default users