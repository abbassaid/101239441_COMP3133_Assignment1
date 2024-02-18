const User = require("./models/UserModel");
const Employee = require("./models/EmployeeModel");

const resolvers = {
    Query: {
        login: async (_, args) => {
            const { email, password } = args;
            if (!email || !password) {
                return 'Please input both email and password';
            }
            const user = await User.findOne({ email });
            if (!user || user.password !== password) {
                return 'Wrong email or password, please try again';
            }
            return 'Successful login...';
        },
        getAllEmployees: async () => {
            try {
                return await Employee.find();
            } catch (error) {
                throw new Error("Could not get all employees");
            }
        },
        searchEmployeeById: async (_, { id }) => {
            try {
                const employee = await Employee.findById(id);
                if (!employee) {
                    throw new Error("No employee with that specified id");
                }
                return employee;
            } catch (error) {
                throw new Error("No employee with that specified id");
            }
        },
    },
    Mutation: {
        signup: async (_, { username, email, password }) => {
            const existingUser = await User.findOne({
                $or: [{ username }, { email }]
            });
            if (existingUser) {
                throw new Error("A user already has the username or email associated to their account");
            }
            const user = new User({ username, email, password });
            await user.save();
            return user;
        },
        addEmployee: async (_, { employee }) => {
            const { email } = employee;
            const existingEmployee = await Employee.findOne({ email });
            if (existingEmployee) {
                throw new Error("An employee already has the email associated to their account");
            }
            return await Employee.create(employee);
        },
        updateEmployeeById: async (_, { id, employee }) => {
            const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, { new: true });
            if (!updatedEmployee) {
                throw new Error("No employee found with the provided ID");
            }
            return updatedEmployee;
        },
        deleteEmployeeById: async (_, { id }) => {
            const deletedEmployee = await Employee.findByIdAndDelete(id);
            if (!deletedEmployee) {
                throw new Error("No employee found with the provided ID");
            }
            return "Employee Deleted";
        },
    }
};

module.exports = resolvers;
