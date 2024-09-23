const { imageUploadUtil } = require ("../Helpers/Cloudinary");
const Employee = require("../Models/Employee");

const handleImageUpload = async(req, res)=>{
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = `data:${req.file.mimetype};base64,${b64}`;
        const result = await imageUploadUtil(url);

        res.json({
            success : true,
            result,
        })
    } catch (error) {
        
        console.error("Upload Error:", error.message || error); 
        res.status(500).json({
            success: false,
            message: "Image upload failed",
            error: error.message || "Unknown error",
        });
        
    }
}
const addEmployee = async(req, res)=>{
    try {
        const {
            name,
            email,
            phone,
            designation,
            gender,
            course,
            image
        }= req.body
        const newEmployee = new Employee({
            name,
            email,
            phone,
            designation,
            gender,
            course,
            image
        })
        await newEmployee.save();
        res.json({
            success : true,
            message: "Employee added successfully",
        })
    } catch (error) {
        console.log(error);
        res.json({
        success: false,
        message: "Error occured",
      });
    }
}

//Delete Employee
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await Employee.findByIdAndDelete(id);
        res.json({
            success: true,
            message: "Employee deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: "Error occurred while deleting employee",
        });
    }
};

//Update Employee
const editEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        await Employee.findByIdAndUpdate(id, updatedData, { new: true });
        res.json({
            success: true, 
            message: "Employee updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: "Error occurred while updating employee",
        });
    }
};

//Get All Employees
const searchEmployees = async (req, res) => {
    try {
        const { query } = req.params;
        const employees = await Employee.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { phone: { $regex: query, $options: 'i' } },
            ]
        });
        res.json({
            success: true,
            data: employees,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: "Error occurred while searching employees",
        });
    }
};

//Get All Employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find(); // Fetch all employees
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees" });
    }
};




module.exports = {handleImageUpload, addEmployee, deleteEmployee, editEmployee, searchEmployees, getAllEmployees};