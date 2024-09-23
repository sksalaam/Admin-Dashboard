import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import axios from "axios";


const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            value={value}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            required
            className="mb-3"
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select          
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : "null"}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            value={value}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            rows={getControlItem.rows}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;

      // case "radio":
      //   element = (
      //     <div className="flex flex-col  ">
      //       {getControlItem.options.map((option) => (
      //         <label key={option.id} className="flex items-center">
      //           <input
      //             type="radio"                  
      //             name={getControlItem.name}
      //             value={option.id}
      //             checked={value === option.id}
      //             onChange={(e) =>
      //               setFormData({
      //                 ...formData,
      //                 [getControlItem.name]: e.target.value,
      //               })
      //             }
      //           />
      //           {option.label}
      //         </label>
      //       ))}
      //     </div>
      //   );
      //   break;

      // case "checkbox":
      //   element = (
      //     <div className="flex gap-3 mb-2">
      //       {getControlItem.options.map((option) => (
      //         <label key={option.id} className="flex items-center">
      //           <input
      //             type="checkbox"
      //             name={getControlItem.name}
      //             value={option.id}
      //             checked={value.includes(option.id)}
      //             onChange={(e) => {
      //               setFormData({
      //                 ...formData,
      //                 [getControlItem.name]: e.target.value,
      //               });
      //             }}
      //           />
      //           {option.label}
      //         </label>
      //       ))}
      //     </div>
      //   );
      //   break;
      
      // case "file":
        element = (
          <input
            type="file"
            name={getControlItem.name}
            accept="image/jpeg" 
            onChange={async(e) => {
              const file = e.target.files[0];
              if (file) {               
                const data = new FormData();
                data.append("my_file", file);
                data.append("upload_preset", "your_upload_preset"); 
      
                try {
                  const response = await axios.post("http://localhost:3001/api/admin/upload-image", data)
                  console.log("response....", response)
                  if (response?.data?.sucess) {                    
                    setFormData({
                      ...formData,  
                      [getControlItem.name]: response.data.result.url,  
                    });
                  }
                } catch (error) {
                  console.error("Error uploading image: ", error);
                }
              }
            }}
          />
        );
        break;

      default:
        element = (
          <Input
            value={value}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="felx flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5 " key={controlItem.name}>
            <Label className="mb-1 mt-2">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button className="mt-3 w-full bg-gray-600" type="submit">
        {buttonText}
      </Button>
    </form>
  );
};

export default CommonForm;
