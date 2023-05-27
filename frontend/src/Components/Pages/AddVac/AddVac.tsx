import "./AddVac.css";
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Vacation from '../../../Model/Vacation';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";

function AddVac(): JSX.Element {

  const navigate = useNavigate();
  const [vacationImage, setVacationImage] = useState<File | undefined>();

  const addNewVacation = (newVacData: Vacation) => {
    axios
      .post(`http://localhost:8080/api/v1/vacations/AddVac`, newVacData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
    navigate("/");
  };

  const uploadImage = async (image: File | undefined) => {
    if (!image) {
      throw new Error("No image selected");
    }
    const form = new FormData();
    form.append("vacImage", image);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/vacations/uploadImage",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data; // Return the response from the server
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  

  const whenSubmit = async (data: any) => {
    try {
      const newVacData: Vacation = {
        id: data.id,
        destination: data.destination,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        price: data.price,
        vacImage: data.vacImage.name, // Assuming vacImage is not an array
      };
      const imageResponse = await uploadImage(data.vacImage);
      console.log(imageResponse); // Access the response from the image upload if needed
      addNewVacation(newVacData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event: any) => {
    const myfile = event.target.files && event.target.files[0];
    if (myfile) {
      setVacationImage(myfile);
      console.log(vacationImage);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Vacation>();

  return (
    <div className="AddVac">
      <form onSubmit={handleSubmit(whenSubmit)} encType="multipart/form-data">
        <div className="Box">
          <h3>Add Vacation:</h3>
          <br />
          <TextField
            fullWidth
            id="outlined-multiline-flexible"
            label="Destination"
            multiline
            maxRows={4}
            {...register("destination", { required: true })}
          />
          <br />
          <hr />
          <TextField
            fullWidth
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={9}
            {...register("description", { required: true })}
          />
          <br />
          <hr />
          <label>Start Date:</label>
          <input type="date" placeholder="Start on:" {...register("startDate", { required: true })} />
          <hr />
          <label>End Date:</label>
          <input type="date" placeholder="End on:" {...register("endDate", { required: true })} />
          <hr />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
              {...register("price", { required: true })}
            />
          </FormControl>
          <br />
          <h4>Choose Vacation Image</h4>
          <br />
          <TextField fullWidth type="file" name="vacImage" {...register("vacImage", { required: true })} onChange={handleChange} />
          <hr />
          <Button variant="contained" type="submit">
            Add Vacation
          </Button>
          <hr />
          <Button variant="contained" color="error" size="small">
            Cancel
          </Button>
          <br />
        </div>
      </form>
    </div>
  );
}

export default AddVac;
