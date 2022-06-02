import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Typography from "@material-ui/core/Typography";

import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";

const SelectPayment = ({
  open,
  setOpen,
  setCost,
  cost,
  chipInfo,
  setChipInfo,
  globalChips,
  setGlobalChips,
  globalCost,
  setGlobalCost,
  itemsCost,
}) => {
  const [item, setItem] = useState("");
  const [slider, setSlider] = useState(0);
  const label = { inputProps: { "aria-label": "ON" } };
  const [begRequired, setBegRequire] = useState(true);

  const findGlobalCost = () => {
    setGlobalCost(parseInt(globalCost + cost));
  };

  const provideChipDetails = () => {
    const newChip = {
      name: slider + " " + item + "|",
      beg: begRequired,
    };
    setChipInfo(newChip);
    const array = [...globalChips];
    array.push(newChip);
    setGlobalChips(array);
  };

  useEffect(() => {
    const calculateCost = () => {
      if (!item || slider === 0) {
        setCost(0);
      }
      var selectedItem = itemsCost[item];
      var totalCost = selectedItem * slider;
      if (begRequired && slider !== 0) {
        totalCost += 2;
      }
      setCost(totalCost);
    };

    calculateCost();
    if (isNaN(cost)) {
      setCost(0);
    }
  }, [item, slider, cost, setCost, begRequired, itemsCost]);

  return (
    <Box sx={{ width: 320, mt: 0 }} className="main main-modal">
      <Typography align="center" color="#e91e63">
        <h1 className="heading">Place Your Order</h1>
        <p>We'll use this info to pack your order Muhahahahaha</p>
      </Typography>

      <FormControl varient="filled" sx={{ m: 1, width: "90%" }}>
        <InputLabel id="demo-simple-select-label">Choose item</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item}
          label="Choose item"
          onChange={(e) => {
            setItem(e.target.value);
          }}
        >
          <MenuItem value={"pokeball"}>PokeBall</MenuItem>
          <MenuItem value={"greatBall"}>GreatBall</MenuItem>
          <MenuItem value={"superPotion"}>SuperPotion</MenuItem>
          <MenuItem value={"hyperPotion"}>HyperPotion</MenuItem>
        </Select>
      </FormControl>

      <Slider
        size="small"
        defaultValue={0}
        steps={10}
        min={0}
        max={10}
        aria-label="Small"
        valueLabelDisplay="auto"
        className="slider"
        sx={{ color: "#e91e63" }}
        onChange={(e) => {
          setSlider(e.target.value);
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", m: 0 }}>
        <p>I need a bag for that.</p>
        <Switch
          {...label}
          defaultChecked
          onChange={() => {
            setBegRequire(!begRequired);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", m: 0 }}>
        <h2>Cost: </h2>
        <h2>${cost ? cost : 0}</h2>
      </Box>
      <Grid container justify="center">
        <Button
          sx={{ backgroundColor: "#e91e63" }}
          size="large"
          type="submit"
          variant="contained"
          onClick={() => {
            setOpen(!open);
            provideChipDetails();
            findGlobalCost();
          }}
        >
          Add to cart
        </Button>
      </Grid>
    </Box>
  );
};

export default SelectPayment;

// task for tomorrow:
// Done 1 onClick add to card, i need to make a payload, and pass that payload to the parent component to list out in chips. payload = slider + item
// 2 Based upon region started pokemon images should change and the total cost on the main page will change as per the add to card button
// Done   3 chip item if added with bag will list in blue else gray
// 4 change the ui

// Done With every addition in the chipList the price should be adjusted as well.
// Done Reduce the total amount on delete
