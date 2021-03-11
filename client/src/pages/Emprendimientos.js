/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Emprendimiento from '../components/Emprendimiento/Emprendimiento';
import { fetchCategories } from '../actions/categoryActions';
import {
  fetchEmprendimientosByCategoryAndUser,
  filterEmprendimientosByCategory,
  deleteEmprendimiento,
} from '../actions/emprendimientoActions';
import { a11yProps, TabPanel } from '../components/common/CustomTabPanel';
import CategoryIcon from '../components/common/CategoryIcon';

const useStyles = makeStyles({
  root: {
    justifyContent: 'center',
  },
  scroller: {
    flexGrow: '0',
  },
});

const Emprendimientos = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmprendimientosByCategoryAndUser());
    dispatch(fetchCategories());
  }, [dispatch]);

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (_event, newValue) => {
    setTabValue(newValue);
  };
  const handleCategoryChange = (id) => {
    dispatch(filterEmprendimientosByCategory(id));
  };

  const selectedCategoryId = useSelector(
    (state) => state.emprendimientos.selectedCategoryId
  );
  const filteredEmprendimientosByCategory = useSelector((state) =>
    state.emprendimientos.items.filter((e) => {
      const categories = e.categories.map((c) => c.id);
      return categories.includes(selectedCategoryId);
    })
  );
  const categories = useSelector((state) => state.categories.items);

  const handleDelete = (id) => {
    dispatch(deleteEmprendimiento(id));
  };
  const handleEdit = (id) => {
    history.push({
      pathname: `editar-emprendimiento/${id}`,
      editMode: true,
    });
  };

  return (
    <div>
      {/* <div style={{ padding: '2rem' }}>
      <button
        onClick={() =>
          history.push({
            pathname: '/agregar-emprendimiento',
            editMode: false,
          })
        }
      >
        Quiero agregar mi emprendimiento
      </button>
    </div> */}
      <Paper square variant="outlined">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable auto tabs"
          classes={{ root: classes.root, scroller: classes.scroller }}
        >
          {categories.map((category, index) => (
            <Tab
              onClick={() => handleCategoryChange(category.id)}
              key={category.id}
              label={category.name}
              icon={<CategoryIcon slug={category.slug} />}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Paper>
      <TabPanel val={tabValue} index={selectedCategoryId}>
        <Grid container spacing={4}>
          {filteredEmprendimientosByCategory.map((e) => (
            <Grid key={e.id} item xs={12} sm={4} md={2}>
              <Emprendimiento
                key={e.id}
                emprendimiento={e}
                onDelete={() => handleDelete(e.id)}
                onEdit={() => handleEdit(e.id)}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </div>
  );
};

export default Emprendimientos;
