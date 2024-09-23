import { useState, useEffect } from "react";
import axios from "axios";
import { addEmployee, editEmployee } from "@/Store/Admin-Slice";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  designation: "",
  gender: "",
  course: [],
  image: null,
};

const EmployeeForm = ({ setShowForm, employee, onEmployeeAdded}) => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "course") {
      const newCourses = formData.course.includes(value)
        ? formData.course.filter((item) => item !== value)
        : [...formData.course, value];
      setFormData({ ...formData, course: newCourses });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = new FormData();
      data.append("my_file", file);
      data.append("upload_preset", "your_upload_preset");

      try {
        setLoading(true);
        const response = await axios.post("http://localhost:3001/api/admin/upload-image", data);
        if (response.data.success) {
          setFormData({ ...formData, image: response.data.result.url });
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (employee) {
        setFormData({
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            designation: employee.designation,
            gender: employee.gender,
            course: employee.course, 
            image: employee.image
        });
    }
}, [employee]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee) {
      dispatch(editEmployee({ id: employee._id, data: formData })).then((data) => {
          if (data?.payload?.success) {
              toast({ title: "Employee updated successfully!" });
              onEmployeeAdded();
              setShowForm(false);
          } else {
              toast({
                  title: "Error updating employee",
                  status: "error",
                  variant: "destructive",
              });
          }
      });
  }else{
    dispatch(addEmployee(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Employee added successfully!" });
        onEmployeeAdded();
        setFormData(initialForm);
        setShowForm(false); 
      } else {
        toast({
          title: "Number or Email already exists",
          status: "error",
          variant: "destructive",
        });
      }
    });
  };

  }


  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Employee Form</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter employee name"
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter employee email"
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          placeholder="Enter employee phone"
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Designation</label>
        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
          required
        >
          <option value="">Select designation</option>
          <option value="Designer">Sales</option>
          <option value="Manager">Manager</option>
          <option value="HR">HR</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Gender</label>
        <div className="flex items-center mb-2">
          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              className="mr-1"
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              className="mr-1"
              required
            />
            Female
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Course</label>
        <div className="flex flex-wrap">
          {["MCA", "BCA", "BSC"].map((course) => (
            <label key={course} className="mr-4">
              <input
                type="checkbox"
                name="course"
                value={course}
                checked={formData.course.includes(course)}
                onChange={handleChange}
                className="mr-1"
              />
              {course}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Image</label>
        <input
          type="file"
          accept="image/jpeg"
          onChange={handleImageUpload}
          className="border border-gray-300 p-2 w-full rounded"
        />
        {loading && <p>Uploading image...</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-gray-600 text-white p-2 rounded"
      >
        {employee ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
