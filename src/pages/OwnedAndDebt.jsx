import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Grid,
  Typography,
  CssBaseline,
  Box,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SingleCard from '../components/OwnedAndDebt/SingleCard';
import Notification from '../components/Common/Notification';
import EmptyState from '../components/Common/EmptyState';
import { UserContext } from '../context/UserContext';
import { validatePhoneNumber } from '../utils/constant';
import axios from 'axios';
import FuzzySearch from 'fuzzy-search';
import LoadingState from '../components/Common/LoadingState';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },
  title: {
    fontWeight: 500,
  },
  mt: {
    marginTop: theme.spacing(6),
  },
  card: {
    paddingBottom: '16px !important',
  },
  arrowUp: {
    color: '#64dd17',
  },
  arrowDown: {
    color: '#e53935',
  },
}));

export default function OwnedAndDebt() {
  const classes = useStyles();
  const { loading, setLoading } = useContext(UserContext);

  // STATES
  const [addPersonModal, setAddPersonModal] = useState(false);
  const [personInfo, setPersonInfo] = useState({ name: '', phone_number: '' });
  const [searchInput, setSearchInput] = useState('');
  const [personData, setPersonData] = useState([]);
  const [searchPerson, setSearchPerson] = useState([]);

  // FUNCTIONS
  const handleChange = (e) => setPersonInfo({ ...personInfo, [e.target.name]: e.target.value });

  const getAllPersonData = () => {
    setLoading(true);
    axios
      .get(`persons/${localStorage.getItem('userId')}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('userToken'),
        },
      })
      .then((res) => {
        console.log(res);
        setPersonData(res.data.data);
        setSearchPerson(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification('Error', `${err.response.data.message}`, 'error');
        } else {
          Notification('Error', 'Something went wrong. Please check your internet connection', 'error');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllPersonData();
  }, []);

  const createPerson = (e) => {
    e.preventDefault();
    const valid_number = personInfo.phone_number.match(validatePhoneNumber);
    if (!valid_number) return Notification('Warning', 'Invalid phone number', 'warning');

    setLoading(true);
    axios
      .post(
        '/persons',
        { name: personInfo.name, phone: personInfo.phone_number, user: localStorage.getItem('userId') },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        }
      )
      .then((res) => {
        console.log(res);
        Notification('Success', 'Person info created successfully', 'success');
        getAllPersonData();
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification('Error', `${err.response.data.message}`, 'error');
        } else {
          Notification('Error', 'Something went wrong. Please check your internet connection', 'error');
        }
      })
      .finally(() => {
        setPersonInfo({ name: '', phone_number: '' });
        setLoading(false);
        setAddPersonModal(false);
      });
  };

  // SEARCH PERSON
  const personSearcher = new FuzzySearch(searchPerson, ['name', 'phone'], { sort: true });

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value) {
      const result = personSearcher.search(e.target.value);
      setPersonData([...result]);
    } else {
      setPersonData(searchPerson);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="lg" className={classes.root}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" mb={4}>
          <Typography variant="h4" color="primary" className={classes.title}>
            List of Owned / Debt
          </Typography>
        </Box>
        {/* BUTTON TO ADD NEW PERSON */}
        <Grid container spacing={2} justify="space-between">
          <Button variant="contained" color="primary" disableElevation endIcon={<AddCircleOutlineRoundedIcon />} onClick={() => setAddPersonModal(true)}>
            Add new person
          </Button>
          <TextField
            type="search"
            variant="outlined"
            size="small"
            name="searchInput"
            value={searchInput}
            onChange={(e) => handleSearch(e)}
            placeholder="Search individuals"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* IF LOADING THEN SHOW LOADING STATE. IF ARRAY RETURNS 0 THEN SHOW EMPTY STATE. IF ARRAY RETURNS ANY DATA THEN SHOW CARD */}
        <Grid container spacing={3} justify="center" className={classes.mt}>
          <Grid item xs={12}>
            {loading ? (
              <LoadingState />
            ) : personData.length !== 0 ? (
              personData.map((data) => (
                <Link to={`/owned-and-debt/${data._id}`} key={data._id}>
                  <SingleCard key={data._id} info={data} />
                </Link>
              ))
            ) : (
              <EmptyState msg="Person not found. Please create one" />
            )}
          </Grid>
        </Grid>

        {/* ADD PERSON MODAL */}
        <Dialog open={addPersonModal} onClose={() => setAddPersonModal(false)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Person</DialogTitle>
          <form onSubmit={createPerson}>
            <DialogContent>
              <DialogContentText>Here you can add person with whom you have done any kind of transactions either owned or debts.</DialogContentText>
              <TextField autoFocus variant="outlined" margin="normal" label="Person Name" name="name" value={personInfo.name} required fullWidth onChange={handleChange} />
              <TextField variant="outlined" margin="normal" label="Phone Number" name="phone_number" value={personInfo.phone_number} required fullWidth onChange={handleChange} />
              <small>* indicates required field</small>
            </DialogContent>
            <DialogActions>
              <Button size="small" onClick={() => setAddPersonModal(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" size="small" disableElevation color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} color="primary" /> : 'Create Person'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </div>
  );
}
