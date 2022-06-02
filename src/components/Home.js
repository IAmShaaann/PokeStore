/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Modal from "@mui/material/Modal";
import SelectPayment from "./SelectPayment";

const Home = () => {
  const [fullname, setFullname] = useState("");
  const [codename, setCodename] = useState("");
  const [slider, setSlider] = useState(0);
  const [region, setRegion] = useState("");
  const [starterPokemon, setStarterPokemon] = useState("");
  const [chipInfo, setChipInfo] = useState("");
  const [showChipModal, setShowChipModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [cost, setCost] = useState(0);
  const [globalCost, setGlobalCost] = useState(0);
  const [pokemon, setPokemon] = useState("");
  const [globalChips, setGlobalChips] = useState([]);
  const [details, setDetails] = useState(null);
  const [mainModal, setMainModal] = useState(false);
  const chips = [];

  const itemsCost = {
    pokeball: 5,
    greatBall: 10,
    superPotion: 10,
    hyperPotion: 20,
  };

  const handleOpen = () => setOpen(true);
  const handleMainModal = () => setMainModal(true);

  const handleClose = () => setOpen(false);
  const handleCloseMainModal = () => setMainModal(false);

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = (e) => {
    console.log("item: ", e);
    const filtereChips = globalChips.filter((item) => {
      return item != e;
    });
    setGlobalChips(filtereChips);
    const [qty, item] = e.name.split(" ");
    console.log("Qty: ", qty, item);
    const reduceAmout = itemsCost[item] * qty;
    if (e.beg) {
      setGlobalCost(globalCost - reduceAmout - 2);
    } else {
      setGlobalCost(globalCost - reduceAmout);
    }
    console.log("GC", globalCost);
    if (globalCost == NaN) {
      setGlobalCost(0);
    }
  };

  const submitHandler = () => {
    const payload = {
      fullname,
      codename,
      slider,
      region,
      pokemon,
      cost,
      globalChips,
    };
    console.log("Payload", payload);
    setDetails(payload);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 460,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "30px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="main">
      <Typography align="center">
        <h1 className="heading">Fill This Form</h1>
        <p>We'll use this info to dominate the poke world. Muhahahahaha</p>
      </Typography>
      <TextField
        id="standard-basic"
        label="Full name"
        variant="standard"
        sx={{ m: 1 }}
        value={fullname}
        onChange={(e) => {
          setFullname(e.target.value);
        }}
        className="text-area"
        inputProps={{ maxLength: 20, minlength: 3 }}
      />

      <TextField
        id="standard-basic"
        label="Code name"
        variant="standard"
        sx={{ m: 1 }}
        value={codename}
        onChange={(e) => {
          setCodename(e.target.value);
        }}
        className="text-area"
        inputProps={{ maxLength: 20, minlength: 3 }}
      />
      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
        className="slider"
        onChange={(e) => {
          setSlider(e.target.value);
        }}
      />
      <p>How far is your nearest pokemon center ? (in KMs) </p>
      {/* Select Dropdown */}
      <FormControl varient="filled" sx={{ m: 1, width: 400 }}>
        <InputLabel id="demo-simple-select-label">
          What's your starting region ?
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={region}
          label="What's your starting region ?"
          onChange={(e) => {
            setRegion(e.target.value);
          }}
        >
          <MenuItem value={"Kanto"}>Kanto</MenuItem>
          <MenuItem value={"Jhoto"}>Jhoto</MenuItem>
          <MenuItem value={"Hoenn"}>Hoenn</MenuItem>
        </Select>
      </FormControl>
      <p>Choose your starter pokemon.</p>
      <FormControl sx={{ display: "flex" }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          row
          name="radio-buttons-group"
          onChange={(e) => {
            setStarterPokemon(e.target.value);
          }}
          sx={{ display: "flex", width: "150%" }}
        >
          {region == "Kanto" ? (
            <>
              {/* <div className="leftSide">
                <label className="labelExpanded">
                  <input type="radio" name="targetGroup">
                    <div className="radio-btns">
                      <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png" />
                    </div>
                  </input>
                </label>
              </div>
 */}
              <FormControlLabel
                className="input"
                value="Bulbasaur"
                control={<Radio name="input" />}
                onClick={(e) => {
                  setPokemon(e.target.defaultValue);
                }}
                label={
                  <img
                    src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png"
                    className={"poke-1"}
                  />
                }
              />
              <FormControlLabel
                value="Charmeleon"
                control={<Radio />}
                onClick={(e) => {
                  setPokemon(e.target.defaultValue);
                }}
                label={
                  <img
                    className={"poke-2"}
                    src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png"
                  />
                }
              />
              <FormControlLabel
                value="Squirtle"
                control={<Radio />}
                onClick={(e) => {
                  setPokemon(e.target.defaultValue);
                }}
                label={
                  <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png" />
                }
              />
            </>
          ) : region == "Jhoto" ? (
            <>
              <FormControlLabel
                value="Chikorita"
                control={<Radio />}
                onClick={(e) => {
                  setPokemon(e.target.defaultValue);
                }}
                label={
                  <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/152.png" />
                }
              />
              <FormControlLabel
                value="totodile"
                control={<Radio />}
                onClick={(e) => {
                  setPokemon(e.target.defaultValue);
                }}
                label={
                  <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/158.png" />
                }
              />
              <FormControlLabel
                value="Cyndaquil"
                control={<Radio />}
                onClick={(e) => {
                  setPokemon(e.target.defaultValue);
                }}
                label={
                  <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/155.png" />
                }
              />
            </>
          ) : (
            <>
              <FormControlLabel
                className="input"
                value="Treeko"
                control={<Radio />}
                onClick={(e) => {
                  setPokemon(e.target.defaultValue);
                }}
                label={
                  <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/238.png" />
                }
              />
              <FormControlLabel
                value="Torchik"
                control={<Radio />}
                onClick={(e) => {
                  setPokemon(e.target.defaultValue);
                }}
                label={
                  <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/239.png" />
                }
              />
              <FormControlLabel
                value="Mudkip"
                control={<Radio />}
                onClick={(e) => {
                  setPokemon(e.target.defaultValue);
                }}
                label={
                  <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/089.png" />
                }
              />
            </>
          )}
        </RadioGroup>
      </FormControl>
      <div>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <p>What do you want to pick? </p>
          <Fab
            size="small"
            sx={{ backgroundColor: "#e91e63" }}
            aria-label="add"
          >
            <AddIcon
              sx={{ color: "#fff" }}
              color="#fff"
              onClick={() => {
                handleOpen();
              }}
            />
          </Fab>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <SelectPayment
                open={open}
                setOpen={setOpen}
                cost={cost}
                setCost={setCost}
                chipInfo={chipInfo}
                setChipInfo={setChipInfo}
                globalChips={globalChips}
                setGlobalChips={setGlobalChips}
                globalCost={globalCost}
                setGlobalCost={setGlobalCost}
                itemsCost={itemsCost}
              />
            </Box>
          </Modal>
        </Box>
        {globalChips.map((chip) => {
          return (
            <Chip
              label={chip.name}
              onClick={handleClick}
              color={chip.beg ? "primary" : "default"}
              onDelete={() => {
                handleDelete(chip);
              }}
              sx={{ m: 1 }}
            />
          );
        })}
      </div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Total Cost</h3>
        <h3>${globalCost}</h3>
      </Box>
      <Grid container justify="center">
        <Button
          sx={{ backgroundColor: "#e91e63" }}
          size="large"
          type="submit"
          variant="contained"
          onClick={() => {
            submitHandler();
            handleMainModal();
            // setShowModal(true);
          }}
        >
          Start my journey
        </Button>
        <Modal
          open={mainModal}
          onClose={handleCloseMainModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <h1>Name : {details?.fullname}</h1>
              <h1>Codename : {details?.codename}</h1>
              <h1>Nearest Pokemon : {details?.slider} KMs</h1>
              <h1>Region : {details?.region}</h1>
              <h1>Pokemon : {details?.pokemon}</h1>
              <h1>
                Chips :{" "}
                {details?.globalChips?.map((chip) => {
                  <br />;
                  return chip.name;
                })}
              </h1>
            </div>
          </Box>
        </Modal>
      </Grid>
    </div>
  );
};

export default Home;
