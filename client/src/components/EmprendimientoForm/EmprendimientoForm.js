/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useForm from '../../utils/useForm';
import {
  addEmprendimiento,
  editEmprendimiento,
} from '../../actions/emprendimientoActions';
import './EmprendimientoForm.css';

function EmprendimientoForm({ match }) {
  const headerTitle = match.params.id
    ? 'Editar emprendimiento'
    : 'Agregar emprendimiento';

  const [categories, setCategories] = useState([]);

  const [values, handleChange] = useForm({
    name: '',
    location: '',
    categoryId: null,
  });

  const fetchCategories = async () => {
    const fetchedCategories = await axios.get('/categories');
    setCategories(fetchedCategories.data);
  };

  const fetchEmprendimiento = async () => {
    const fetchedEmprendimiento = await axios.get(
      `/emprendimiento/${match.params.id}`
    );
    values.name = fetchedEmprendimiento.data.emprendimiento.name;
    values.location = fetchedEmprendimiento.data.emprendimiento.location;
    values.categoryId = fetchedEmprendimiento.data.emprendimiento.categoryId;
  };

  useEffect(() => {
    if (match.params.id) {
      fetchEmprendimiento();
    }
    fetchCategories();
  }, []);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (match.params.id) {
      dispatch(editEmprendimiento({ ...values, id: match.params.id }));
    } else {
      dispatch(addEmprendimiento(values));
    }
  };

  return (
    <Grid container spacing={0} direction="column" alignItems="center">
      <Box mb={6}>
        <Typography variant="h4">{headerTitle}</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <TextField
            variant="outlined"
            type="text"
            label="Nombre"
            name="name"
            onChange={handleChange}
            value={values.name}
          />
        </div>
        <div className="form-field">
          <TextField
            variant="outlined"
            type="text"
            label="Ubicación"
            name="location"
            onChange={handleChange}
            value={values.location}
          />
        </div>
        <div className="form-field">
          <InputLabel id="select-category">Categoría</InputLabel>
          <Select
            labelId="select-category"
            id="category"
            name="categoryId"
            value={values.categoryId || ''}
            onChange={handleChange}
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="form-field">
          <Button variant="contained" color="primary" type="submit">
            submit
          </Button>
        </div>
      </form>
    </Grid>
  );
}

export default EmprendimientoForm;
