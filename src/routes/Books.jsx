import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxios from '../services/useAxios';
import Button from '../components/button';
import {
  Box,
  Card,
  CardActions,
  CardMedia,

  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField,
} from '@mui/material';



function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // TODO: Replace axios with useAxios hook
  const { data, get } = useAxios('http://localhost:3000'); //  A function from the useAxios hook to manually trigger a GET request to the API.

  useEffect(() => {
    if (books.length === 0) {
      getBooks(); // Once the component Bookks gets loaded, check if the books state is empty (books.length === 0). If its empty, call the getBooks function which fetches the books.
    }
  }, []);
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/${id}`);
  };


  useEffect(() => {
    // Here filtering of books based on the search term
    const lowerCasedSearchTerm = searchTerm.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.name.toLowerCase().includes(lowerCasedSearchTerm) ||
        book.author.toLowerCase().includes(lowerCasedSearchTerm)
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  async function getBooks() {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data);
      setFilteredBooks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  // here i am Updating State with data
  useEffect(() => {
    if (data) {
      setBooks(data);
      setIsLoading(false); // Sets isLoading to false, telling us that the data has been loaded.
    }
  }, [data]);
  // React runs this effect whenever data changes.


  // here i am Updating State with data
  useEffect(() => {
    if (data) {
      setBooks(data);
      setIsLoading(false); // Sets isLoading to false, telling us that the data has been loaded.
    }
  }, [data]);
  // React runs this effect whenever data changes.

  // TODO: Implement search functionality

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <div>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search books by name or author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {filteredBooks.map((book) => (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                }}
                key={book.name}
              >
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                />


                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: 'space-between',
                    mt: 'auto',
                    pl: 2,
                  }}
                >
                  <Rating
                    name="read-only"
                    value={book.stars}
                    readOnly
                    size="small"
                  />
                  <Button size="small">Learn More</Button>
                </CardActions>

                <button onClick={() => handleNavigate(books.id)}>See more</button>

              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
