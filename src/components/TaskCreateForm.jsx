import React, { useEffect, useState } from 'react';
import { Controller,useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import {  getOneTask, createTaskInProject,updateTaskInProject, getOneProject } from '../api/Project';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
// import { DatePicker } from '@mui/x-date-pickers';

const TaskCreateForm = ({ open, mode, setOpen, taskId, setTaskId, fetchTasks }) => {
  console.log("🚀 ~ TaskForm ~ mode:", mode);
const {id} = useParams()
  // Task validation schema
  const [taskEmployee,setTaskEmployee] = useState([])
  // Function to handle opening the modal for adding an projects
  const projectData = async () => {
    try {
      const res = await getOneProject(id,authSelector?.access_token);
      setTaskEmployee(res?.employe)
    } catch (error) {
      console.error("Error creating user:", error.message); // Handle error (e.g., show an error message)
    }
  };
  useEffect(() => {
    if (id  > 0) {
      projectData();
    }
  }, [id]);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Task title is required').min(2, 'Task title must be at least 2 characters'),
    description: Yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
    assigned_to: Yup.string().required('Assign to is required'),
    status: Yup.string().required('Status is required'),
    deadline: Yup.date().required('Deadline date is required').nullable(),
  });

  const authSelector = useSelector(
    (state) => state.projectpulse.authUserReducer
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      description: '',
      assigned_to: '',
      status: '',
      deadline: null,
    },
  });

  const watching = watch();
  console.log("🚀 ~ TaskForm ~ watching:", watching);

  const handleFormSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);

    if (mode === 'Add') {
      try {
        const taskData = {
            title: data.title,
            description: data.description,
            assigned_to: taskEmployee.find((item)=>item?.id == data.assigned_to),
            status: data.status,
            deadline_date: data.deadline_date,
          };
        const res = await createTaskInProject(id,taskData, authSelector?.access_token);
        if(res){

            onClose();
            fetchTasks();
        }
      
        
      } catch (error) {
        console.error('Error creating task:', error.message);
      }
    } else if (mode === 'Edit') {
      try {
        const taskData = {
            ...data,
          title: data.title,
          description: data.description,
          assigned_to: taskEmployee.find((item)=>item?.id == data.assigned_to),
          status: data.status,
          deadline_date: data.deadline_date,
        };

        const res = await updateTaskInProject(id,taskId, taskData, authSelector?.access_token);
        console.log('Task updated successfully:', res);
        if (res?.id) {
          onClose();
          fetchTasks();
        }
      } catch (error) {
        console.error('Error updating task:', error.message);
      }
    }
    onClose()
   setTimeout(() => {
    fetchTasks();
   }, 400);
  };

  const onClose = () => {
    reset();
    setOpen(false);
    setTaskId(null);
  };

  const taskData = async () => {
    try {
      const res = await getOneTask(id,taskId, authSelector?.access_token);
      console.log('Task fetched successfully:', res);
      setValue('title', res?.title);
      setValue('description', res?.description);
      setValue('assigned_to', res?.assigned_to?.id);
      setValue('status', res?.status);
      setValue("deadline_date", moment(res?.deadline_date).format("YYYY-MM-DD"));
    } catch (error) {
      console.error('Error fetching task:', error.message);
    }
  };

  useEffect(() => {
    if (taskId) {
      taskData();
    }
  }, [taskId]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{mode} Task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Title"
                {...register('title')}
                value={getValues('title')}
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                {...register('description')}
                value={getValues('description')}
                error={!!errors.description}
                helperText={errors.description ? errors.description.message : ''}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="assigned_to"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.assigned_to}>
                    <InputLabel>Assign To</InputLabel>
                    <Select {...field} label="Assign To">
                      {taskEmployee?.map((manager) => (
                        <MenuItem key={manager.id} value={manager.id}>
                          {manager.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.assigned_to && (
                      <p className="error-msg">{errors.assigned_to.message}</p>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.status}>
                    <InputLabel>Status</InputLabel>
                    <Select {...field} label="Status">
                    <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                    {errors.status && (
                      <p className="error-msg">{errors.status.message}</p>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
          
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="Status"
                select
                {...register('status')}
                error={!!errors.status}
                helperText={errors.status ? errors.status.message : ''}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
            </Grid> */}
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Deadline Date"
                type="date"
                {...register("deadline_date")}
                value={getValues("deadline_date")}
                error={!!errors.start_date}
                helperText={errors.deadline_date ? errors.deadline_date.message : ""}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(handleFormSubmit)} variant="contained" color="primary">
          {mode === 'Add' ? 'Add Task' : 'Update Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskCreateForm;
