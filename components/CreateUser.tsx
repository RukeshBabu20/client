import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { userTypes } from "../types/userTypes";
import { postData } from "../services/apiServices";
import { useNavigate } from "react-router-dom";
import { years } from "../stores/userStores";

const CreateUser = () => {
  const [userData, setUserData] = useState<userTypes>({
    name: "",
    age: 0,
    present: false,
  });

  const navigate = useNavigate();

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData((previousState) => {
      return { ...previousState, [name]: value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await postData(userData);
      console.log("Data Created.", result);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="name"
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Age"
              name="age"
              onChange={handleChange}
            >
              {years.map((year) => (
                <MenuItem value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Present</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              name="present"
              label="Present"
              onChange={handleChange}
            >
              <MenuItem value={"true"}>Yes</MenuItem>
              <MenuItem value={"false"}>No</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
};
export default CreateUser;
