import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  FormControl,
  FormControlLabel,
  FormGroup, FormLabel, Grid, Slider,
  Switch,
} from '@mui/material';

import Title from '../styles/Title';
import Text from '../styles/Text';
import { useData } from '../context';
import { useGame } from '../hooks';

const StyledSettings = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  
`;

const Settings = () => {
  const { data, setValues } = useData();
  const { resize } = useGame(data, setValues);

  const handleChange = (event) => {
    setValues({ [event.target.name]: event.target.value });
    resize(event.target.value);
  };

  const handleChecked = (event) => {
    setValues({ [event.target.name]: event.target.checked });
  };

  return (
    <StyledSettings>
      <Title fontSize="50px" mt="20px">Settings</Title>
      <FormControl sx={{ mt: 4 }}>
        <FormLabel sx={{ fontSize: 20 }}>
          Board size
        </FormLabel>
        <FormGroup>
          <Grid container spacing={2} alignItems="center" sx={{ height: '100%' }}>
            <Grid item xs>
              <Slider
                onChange={handleChange}
                value={data?.size || 0}
                name="size"
                aria-label="size"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={2}
                max={6}
              />
            </Grid>
            <Grid item sx={{ mb: 1 }}><Text>{data.size}</Text></Grid>
          </Grid>

        </FormGroup>
      </FormControl>
      <FormControl sx={{ mt: 2 }}>
        <FormLabel sx={{ fontSize: 20 }}>Animation</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={(
              <Switch
                checked={data.shake}
                color="default"
                name="shake"
                onChange={handleChecked}
              />
)}
            label="Shake"
          />
          <FormControlLabel
            control={(
              <Switch
                checked={data.show}
                color="default"
                name="show"
                onChange={handleChecked}
              />
)}
            label="Show"
          />
        </FormGroup>
      </FormControl>
      <FormControl sx={{ mt: 2 }}>
        <FormLabel sx={{ fontSize: 20 }}>Color theme</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={(
              <Switch
                checked={data.night}
                color="default"
                name="night"
                onChange={handleChecked}
              />
            )}
            label="Swich to Night Mode"
          />
        </FormGroup>
      </FormControl>

    </StyledSettings>
  );
};

export default Settings;
