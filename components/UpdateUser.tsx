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
import { userTypes } from "../types/userTypes";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showDataId, updateData } from "../services/apiServices";
import { years } from "../stores/userStores";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState<userTypes>({
    name: "",
    age: 0,
    present: false,
  });

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const result = await showDataId(id);
        setUsers(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(id);
  }, [id]);

  // console.log(users);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setUsers((previousState) => {
      return { ...previousState, [name]: value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await updateData(id, users);
      console.log("Data Updated", result);
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
            defaultValue={users.name}
            variant="outlined"
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={users.age}
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
              defaultValue={users.present}
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
export default UpdateUser;
