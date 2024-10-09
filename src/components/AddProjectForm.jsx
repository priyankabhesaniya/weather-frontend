
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  Select,
  Dialog,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { projectTypes, statusOptions } from "../pages/admin-const/constants";
import { createProject, getOneProject, updateProject } from "../api/Project";
import { useSelector } from "react-redux";
import moment from "moment";
import { getManagersPair } from "../api/Manager";
import { getEmployeePair } from "../api/Employe";

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Project name is required")
    .min(2, "Project name must be at least 2 characters"),
  about: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  start_date: Yup.date().required("Start date is required"),
  deadline_date: Yup.date().required("End date is required"),
  // .min(Yup.ref('startDate'), 'End date must be after start date'),
  // projectType: Yup.string().required('Project type is required'),
  status: Yup.string().required("Status is required"),
});

const AddProjectForm = ({
  open,
  mode,
  setOpen,
  projectId,
  setProjectId=()=>{},
  fetchProjects=()=>{},
}) => {
  const authSelector = useSelector(
    (state) => state.projectpulse.authUserReducer
  );

  
  const [managers, setManager] = useState([]);
  const [employees, setEmployee] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      about: "",
      start_date: null,
      deadline_date: null,
      status: "",
      created_by: "",
      manager: "",
      employe: [],
      task: [],
    },
  });

  const getAllEmployee = async () => {
    try {
      const res = await getEmployeePair(authSelector?.access_token);
      console.log("User created successfully:", res);
      if (res?.length > 0) {
        const updatedManager = res?.map((item) => ({
          id: item?.id,
          name: item?.name,
        }));
        setEmployee(updatedManager);
      } else {
        setEmployee([]);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };
  const getAllManagers = async () => {
    try {
      const res = await getManagersPair(authSelector?.access_token);
      console.log("User created successfully:", res);
      if (res?.length > 0) {
        const updatedManager = res.map((item) => ({
          id: item?.id,
          name: item?.name,
        }));
        setManager(updatedManager);
      } else {
        setManager([]);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };
  useEffect(() => {
    getAllEmployee();
    getAllManagers();
  }, []);
  const handleFormSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    if (mode == "Add") {
      try {
        const projectData = {
          about: data?.about,
          name: data?.name,
          deadline_date: data?.deadline_date,
          start_date: data?.start_date,
          status: data?.status,
          created_by: {
            name: authSelector?.user?.name,
            id: authSelector?.user?.id,
          },
          manager: managers?.find((item) => item.id === data.manager),
          employe: employees?.filter((item) =>
            data?.employe?.includes(item.id)
          ),
          task: [],
        };

        const res = await createProject(projectData,authSelector?.access_token);
        console.log("User created successfully:", res);
        if (res?.id) {
          onClose();
          fetchProjects();
        }
      } catch (error) {
        console.error("Error creating user:", error.message); // Handle error (e.g., show an error message)
      }
    } else if (mode == "Edit") {
      try {
        const projectData = {
          ...data,
          // created_by: {
          //   name: authSelector?.user?.name,
          //   id: authSelector?.user?.id,
          // },
          manager: managers?.find((item) => item.id === data.manager),
          employe: employees?.filter((item) =>
            data?.employe?.includes(item.id)
          ),
        };

        const res = await updateProject(projectId, projectData,authSelector?.access_token);
        console.log("User created successfully:", res);
        if (res?.id) {
          onClose();
          fetchProjects();
        }
      } catch (error) {
        console.error("Error creating user:", error.message); // Handle error (e.g., show an error message)
      }
    }
  };

  const onClose = () => {
    reset();
    setOpen(false);
  };
  const projectData = async () => {
    try {
      const res = await getOneProject(projectId,authSelector?.access_token);
      console.log("User created successfully:", res);

      console.log("in this-----------------");
      setValue("name", res?.name);
      setValue("about", res?.about);
      setValue("status", res?.status);
      setValue("start_date", moment(res?.start_date).format("YYYY-MM-DD"));
      setValue(
        "deadline_date",
        moment(res?.deadline_date).format("YYYY-MM-DD")
      );
      setValue("manager", res?.manager?.id);
      setValue(
        "employe",
        res?.employe?.map((item) => item?.id)
      );
    } catch (error) {
      console.error("Error creating user:", error.message); // Handle error (e.g., show an error message)
    }
  };
  useEffect(() => {
    if (projectId > 0) {
      projectData();
    }
  }, [projectId]);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle> {mode === "Add" ? "Add Project" : "Edit Project"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
       
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Name"
                {...register("name")}
                name="name"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="About"
                name="about"
                multiline
                rows={4}
                {...register("about")}
                error={!!errors.about}
                helperText={errors.about ? errors.about.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="status"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.role}>
                    <InputLabel>Status</InputLabel>
                    <Select {...field} label="Status">
                      {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.status && (
                      <p className="error-msg">{errors.status.message}</p>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                {...register("start_date")}
                value={getValues("start_date")}
                error={!!errors.start_date}
                helperText={errors.start_date ? errors.start_date.message : ""}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                {...register("deadline_date")}
                value={getValues("deadline_date")}
                error={!!errors.deadline_date}
                helperText={
                  errors.deadline_date ? errors.deadline_date.message : ""
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* Assign Manager */}
            <Grid item xs={12} sm={12}>
              <Controller
                name="manager"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.manager}>
                    <InputLabel>Assign Manager</InputLabel>
                    <Select {...field} label="Assign Manager">
                      {managers.map((manager) => (
                        <MenuItem key={manager.id} value={manager.id}>
                          {manager.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.manager && (
                      <p className="error-msg">{errors.manager.message}</p>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Assign Employee (Multi-Select) */}
            <Grid item xs={12} sm={12}>
              <Controller
                name="employe"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.employe}>
                    <InputLabel>Assign Employee</InputLabel>
                    <Select
                      {...field}
                      multiple
                      input={<OutlinedInput label="Assign Employee" />}
                      renderValue={(selected) =>
                        selected
                          .map(
                            (id) => employees.find((emp) => emp.id === id)?.name
                          )
                          .join(", ")
                      }
                    >
                      {employees.map((employee) => (
                        <MenuItem key={employee.id} value={employee.id}>
                          <Checkbox
                            checked={field.value.indexOf(employee.id) > -1}
                          />
                          <ListItemText primary={employee.name} />
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.employe && (
                      <p className="error-msg">{errors.employe.message}</p>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6}>
               <Controller
                name="projectType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.role}>
                    <InputLabel>Project Type</InputLabel>
                    <Select {...field} label="Project Type">
                      {projectTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.projectType && <p className='error-msg'>{errors.projectType.message}</p>}
                  </FormControl>
                )}
              />
            </Grid> */}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleFormSubmit)}
        >
           {mode === "Add" ? "Add Project" : "Edit Project"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectForm;
