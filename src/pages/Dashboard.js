// src/pages/Dashboard.js
import React, { useContext, useState } from "react";
import {
  Container,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  IconButton,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { UserContext } from "../context/UserContext";

function Dashboard() {
  const { users } = useContext(UserContext);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Container maxWidth="md" className="mt-5">
      <Card
        className="p-4"
        sx={{
          backgroundColor: darkMode ? "#333" : "#fff",
          color: darkMode ? "#fff" : "#000",
          boxShadow: 3,
          padding: 3,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h2>Dashboard</h2>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
            label={darkMode ? "Dark Mode" : "Light Mode"}
          />
        </Box>

            <Box sx={{ width: "100%", minWidth: "120px", overflowX: "initial" }}>
            <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: darkMode ? "#444" : "#f5f5f5" }}>
                <TableCell>Profile</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Qualification</TableCell>
                <TableCell>Address</TableCell>
            
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {user.profileImage ? (
                      <Avatar src={URL.createObjectURL(user.profileImage)} alt={user.name} />
                    ) : (
                      <Avatar sx={{ bgcolor: "gray" }}>{user.name.charAt(0)}</Avatar>
                    )}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.qualification}</TableCell>
                  <TableCell>{user.address}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Container>
  );
}

export default Dashboard;
