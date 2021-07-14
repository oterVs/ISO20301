import React, { useEffect, useState } from "react";

import axios from "axios";

import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import PreguntaUsuario from "./pages/PreguntaUsuario";
import { Button, Grid } from "@material-ui/core";

import Cookies from "universal-cookie";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const cookies = new Cookies();

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    background: "#2193b0",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    background: "#2193b0",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const User = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [cowocer, setCowoker] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    const obtenerPreguntas = async () => {
      let usuario = cookies.get("usuario");
     
      const res = await axios.get(
        `https://sgcn-app.herokuapp.com/seguridad/preguntasCoworker/${usuario}`
      );
      setPreguntas(res.data);
      console.log(res);
    };

    obtenerPreguntas();
 
  }, []);

  const salir = () => {
    window.location.href = "./";
  };

  

  const enviar = async () => {
    respuestas();
    let usuario = cookies.get("usuario");
    console.log(cowocer);
    const res = await axios.post(
      `https://sgcn-app.herokuapp.com/seguridad/actualizarPreguntas/${usuario}`,
      cowocer
    );

    console.log(res);
    setOpen(true);
    setCowoker([]);
  };

  const respuestas = () => {
    preguntas.forEach((el) => {
      let v = {
        idCoworkerPregunta: el.idCoworkerPregunta,
        calificacion: el.calificacion,
        pregunta: {
          idPregunta: el.pregunta.idPregunta,
        },
      };
      cowocer.push(v);
    });
  };

  const handleAnswer = (id, calif) => {
   
    preguntas.forEach((el) => {
      if (id === el.idCoworkerPregunta) {
        el.calificacion = parseInt(calif, 10);
      }
    });
    setPreguntas(preguntas);
 
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: "#2193b0" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {cookies.get("usuario")}
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button style={{ color: "#fff" }} onClick={salir}>
              {" "}
              Salir{" "}
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Grid container style={{ padding: "1cm" }}>
        <Grid item xs={12}>
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Por favor responda las siquientes preguntas
          </h3>
        </Grid>
        <Grid container xs={3}>
          <Grid item xs={8}>
            <h5>Escala</h5>
            <p>Desconozco</p>
            <p>Totalmente en Desacuerdo</p>
            <p>Desacuerdo</p>
            <p>De acuerdo</p>
            <p>Totalmente de Acuerdo</p>
          </Grid>
          
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <h5>Puntaje</h5>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
          </Grid>

          {/* <Escala></Escala> */}
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={8}>
          {preguntas.map((el) => (
            <PreguntaUsuario
              id={el.idCoworkerPregunta}
              calif={el.calificacion}
              handleAnswer={handleAnswer}
              key={el.pregunta.idPregunta}
              num={el.pregunta.idPregunta}
              Pregunta={el.pregunta.pregunta}
            ></PreguntaUsuario>
          ))}
        </Grid>
        <Grid item xs={11}></Grid>
        <Grid item xs={1}>
          <Button
            onClick={enviar}
            style={{
              background: "#2193b0",
              color: "#fff",
              marginRight: "50px",
            }}
            variant="contained"
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Formulario enviado!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default User;
