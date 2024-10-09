import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
} from '@mui/material';
import { createEmployee, getOneEmployee, updateEmployee } from '../api/Employe';
import { useSelector } from 'react-redux';
const EmployeeForm = ({ open,mode,setOpen ,employeeId,setEmployeeId,fetchEmployee}) => {
    console.log("🚀 ~ EmployeeForm ~ mode:", mode)
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Employee name is required').min(2, 'Employee name must be at least 2 characters'),
        email: Yup.string().required('Email is required').email('Email is invalid'),
        phoneNumber: Yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
        address: Yup.string().required('Address is required').min(10, 'Address must be at least 10 characters'),
        password: Yup.string().required('Password is required')
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
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        projects:[]
    },
  });
const watching = watch()
  console.log("🚀 ~ EmployeeForm ~ watching:", watching)


  const handleFormSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
   if(mode == 'Add'){

     try {
         const userData = {
             email: data.email,
             name:data.name,
             password: data.password,
             phone:data.phoneNumber,
             address:data?.address,
             role:'Employee',
             projects:[]
         };
 
         const res = await createEmployee(userData,authSelector?.access_token);
         console.log('User created successfully:', res); 
         if(res?.id){
             onClose()
             fetchEmployee()
         }
     
     } catch (error) {
         console.error('Error creating user:', error.message); // Handle error (e.g., show an error message)
     }
   }
   else if(mode == "Edit"){

    try {
      const userData = {
          email: data.email,
          name:data.name,
          password: data.password,
          phone:data.phoneNumber,
          address:data?.address,
          // role:'Employee',
      };

      const res = await updateEmployee(employeeId,userData,authSelector?.access_token);
      console.log('User created successfully:', res); 
      if(res?.id){
          onClose()
          fetchEmployee()
      }
  
  } catch (error) {
      console.error('Error creating user:', error.message); // Handle error (e.g., show an error message)
  }
   }
};
  const onClose = ()=>{
    reset();
    setOpen(false)
    setEmployeeId(null)
  }
const employeeData = async()=>{
    try {
        const res = await getOneEmployee(employeeId,authSelector?.access_token);
        console.log('User created successfully:', res);
       
            console.log('in this-----------------');
           setValue('name',res?.name)
           setValue('email',res?.email)
           setValue('phoneNumber',res?.phone)
           setValue('address',res?.address)
           setValue('password',res?.password)
        
    } catch (error) {
        console.error('Error creating user:', error.message); // Handle error (e.g., show an error message)
    }
}
 useEffect(() => {
    if(employeeId > 0){
        employeeData()
    }

 }, [employeeId]);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{mode} Employee</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Employee Name"
                {...register('name')}
                value={getValues('name')}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register('email')}
                value={getValues('email')}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                {...register('phoneNumber')}
                value={getValues('phoneNumber')}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={3}
                {...register('address')}
                value={getValues('address')}
                error={!!errors.address}
                helperText={errors.address ? errors.address.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register('password')}
                value={getValues('password')}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
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
          Add Employee
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeForm;
