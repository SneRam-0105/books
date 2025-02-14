import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Stack, Typography } from '@mui/material';
import { bookGenres } from '../genres';
import useAxios from '../services/useAxios';

function AddBook() {
  const { alert, post } = useAxios('http://localhost:3000');
  const [rateValue, setRateValue] = useState(3);
  const [book, setBook] = useState({
    author: '',
    name: '',
    genres: [],
    completed: false,
    start: null,
    end: null,
    stars: null,
  });

  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === 'string' ? value.split(',') : value,
    });
  };

  // const rateChangeHandler = (event) => {
  //   const { value } = event.target;
  //   setBook({
  //     ...book,
  //     stars: value,
  //   });
  // };

  const addBookHandler = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox' && name === 'completed') {
      setBook({ ...book, [name]: checked });
    } else {
      setBook({ ...book, [name]: value });
    }
  };


  // const validateForm = () => {



  //   if (!book.name && !book.author && !book.img && !book.completed && !book.genres && !book.stars && !book.stars) {
  //     return false;
  //   }

  //   else {
  //     return true;

  //   }

  // }
  const submitHandler = (e) => {
    e.preventDefault();
    e.target.reset();




    post("books", book)
      .then((response) => {

        // Refresh the book list by invoking the callback with new data
        // BookList((prevList) => [...prevList, book]);
        // Reset form fields
        setBook({
          author: '',
          name: '',
          genres: [],
          completed: false,
          start: null,
          end: null,
          stars: null,
        });
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  }


  return (
    <form onChange={addBookHandler} onSubmit={submitHandler}>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{ my: 2, mx: 'auto', width: '25%' }}
      >
        {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}
        <Typography variant="h4" component="h2" sx={{ my: 10 }}>
          Add a book
        </Typography>
        <TextField
          name="name"
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={book.name}
        />
        <TextField
          name="author"
          id="outlined-basic"
          label="Author"
          variant="outlined"
          value={book.author}
        />
        <TextField
          name="img"
          id="outlined-basic"
          label="Image (url)"
          variant="outlined"
          value={book.img}
        />
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={book.genres}
          name="genres"
          onChange={genreChangeHandler}
          input={<OutlinedInput label="Genre" />}
        >
          {bookGenres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          name="completed"
          control={<Checkbox checked={book.completed} />}
          label="Completed"
        />

        <DateField name="start" label="Started" />
        <DateField name="end" label="Finished" disabled={!book.completed} />
        <Stack spacing={1}>
          {/* We are using this typography snippet here to display the current rating first */}
          <Typography variant="subtitle1">
            {rateValue !== null ? `Rating: ${rateValue}` : 'No rating selected'}
          </Typography>
          <Rating
            name="stars"
            value={rateValue}
            size="large"
            onChange={(event, newValue) => {
              setRateValue(newValue); // Updates the rateValue state
              setBook({ ...book, stars: newValue });
            }}
            onChangeActive={(event, newHover) => {
              if (newHover !== -1) {
                setRateValue(newHover); // Updates rating dynamically on mouseover
              }
            }}
          />
        </Stack>

        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
