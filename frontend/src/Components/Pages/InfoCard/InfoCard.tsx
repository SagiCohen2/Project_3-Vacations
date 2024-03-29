import "./InfoCard.css";
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { prettyStartDate, prettyEndDate } from '../../Layout/Main/Main';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import notify from "../../Utils/Notyf";
import { useDispatch } from "react-redux";

interface VacationProps{
    vacKey:number;
    vacDestination:string;
    vacDescription:string;
    vacStartDate:string;
    vacEndDate:string;
    vacPrice:number;
    vacImage:string;
}
interface UserProps{
    userKey:number;
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function InfoCard(props:VacationProps & UserProps): JSX.Element {

    const [isChecked, setIsChecked] = useState(false);
    // const dispatch = useDispatch();
  
    const handleCheckboxChange = (event:any) => {
      setIsChecked(event.target.checked);
      // Call function to add/remove from MySQL database table
      if (event.target.checked) {
          addToFavorites();
        } else {
          removeFromFavorites();
        }
    };
  
    // ADD vacation to FAVORITES list
    const addToFavorites = () => {
      const requestData = {
        userKey: props.userKey,
        vacKey: props.vacKey,  
      };
      axios
      .post('http://localhost:8080/api/v1/likes/addLike', requestData)
      .then(response => {
        notify.success("Vacation add to favorites list");
      })
      .catch(error => {
        notify.error("Error adding vacation to favorites");
      })
    }

    // DELETE vacation from FAVORITES list
    const removeFromFavorites = () => {
      axios
      .delete('http://localhost:8080/api/v1/likes/deleteLike')
      .then(response => {
        notify.success("Vacation deleted from favorites list");
      })
      .catch(error => {
        notify.error("Error deleting vacation from favorites list");
      })
    }
  
    return (
        <div className="InfoCard">
			<Card variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
      {props.vacDestination}
      </Typography>
      <Typography level="body2">
            {props.vacDescription}<br/></Typography>
            <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} color="error"
        size="medium" checked={isChecked} onChange={handleCheckboxChange}
        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
        />
      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <img
          src={props.vacImage}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level="body3">{prettyStartDate(props.vacStartDate)}  Till  
            {prettyEndDate(props.vacEndDate)}<br/></Typography>
          <Typography fontSize="lg" fontWeight="lg">
            ${props.vacPrice}
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Add
        </Button>
      </Box>
    </Card>
        </div>
    );
}

export default InfoCard;
