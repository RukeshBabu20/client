import { useEffect, useState } from "react";
import { userTypes } from "../types/userTypes";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { deleteData, showData } from "../services/apiServices";
import { useNavigate } from "react-router-dom";

const ShowUsers = () => {
  const [users, setUsers] = useState<userTypes[]>([
    {
      name: "Test",
      age: 12,
      present: true,
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await showData();
        setUsers(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteData(id);
      console.log("Data Deleted", result);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button href="/create" variant="contained">
        Add User
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Present</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.name}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.present}</TableCell>
                <TableCell>
                  <Button href={`/update/${user._id}`} variant="contained">
                    Update
                  </Button>
                  <Button
                    onClick={(e) => {
                      handleDelete(user._id);
                    }}
                    variant="contained"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ShowUsers;
