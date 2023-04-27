import "./AddVac.css";
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import Vacation from '../../../Model/Vacation';

function AddVac(): JSX.Element {
    const {
        register,handleSubmit,formState: {errors},
    } = useForm<Vacation>();
    const send = (newVacData: Vacation) => {
        console.log(newVacData);
    }
    return (
        <div className="AddVac">
            <form onSubmit={handleSubmit(send)}>
			<div className="Box"><h3>Add Vacation:</h3><hr/>
            Destination:<br/><input type="text" {...register("destination")}></input><br/>
            <hr/>
            Description:<br/><textarea {...register("description")}></textarea><br/>
            <hr/>
            Start on:<br/><input type="date" {...register("startDate")}></input>
            <hr/>
            End on:<br/><input type="date" {...register("endDate")}></input>
            <hr/>
            Price:<br/><input type="number" {...register("price")}></input>
            <hr/>
            Cover image:<br/><input type="file" {...register("vacImage")}></input><hr/>
            <Button fullWidth variant="contained" type="submit">Add Vacation</Button><br/>
            <Button variant="contained" color="error" size="small">Cancel</Button><br/>
            </div>
            </form>
        </div>
    );
}

export default AddVac;