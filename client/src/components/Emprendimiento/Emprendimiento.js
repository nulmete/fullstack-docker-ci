/* eslint-disable react/prop-types */
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Update';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Emprendimiento = ({ emprendimiento, onDelete, onEdit }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia
        className={classes.media}
        // image="https://source.unsplash.com/random/200x200"
        image={emprendimiento.imageURL}
        title="Emprendimiento"
      />
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={emprendimiento.name}
        subheader={emprendimiento.user.name}
      />
      <CardContent>
        {emprendimiento.categories.map((category) => (
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            key={category.id}
          >
            {category.name}
          </Typography>
        ))}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* TODO: only show if user === currentUser */}
        <IconButton aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit" onClick={onEdit}>
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Emprendimiento;
