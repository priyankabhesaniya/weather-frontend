import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    TextField,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Grid,
    Box,
    Typography
} from '@mui/material';
import { createUser } from '../api/Signup';
import { Link, useNavigate } from 'react-router-dom';

// Yup validation schema
const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
   
});

const Signup = () => {
    const navigate = useNavigate()
    // React Hook Form setup
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    // Function to handle form submission
    const onSubmit = async (data) => {
        console.log("🚀 ~ onSubmit ~ data:", data)
       
        try {
            // Call createUser with the form data
            const userData = {
                name: data.name,
                email: data.email,
                password: data.password,
                // role: data.role,
            };

            const response = await createUser(userData);
            navigate('/login')
            console.log('User created successfully:', response); // Handle successful response (e.g., show a success message)
        } catch (error) {
            console.error('Error creating user:', error.message); // Handle error (e.g., show an error message)
        }
    };


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh" // Takes full screen height
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '600px' }}>
            <Typography variant="h6" style={{ flexGrow: 0.1,marginBottom:10 }}>
          <div className="fancy-text">
           Weather App
          </div>
        </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {/* Name Field */}
                    <Grid item xs={12}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name ? errors.name.message : ''}
                                />
                            )}
                        />
                    </Grid>

                    {/* Email Field */}
                    <Grid item xs={12}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email.message : ''}
                                />
                            )}
                        />
                    </Grid>

                    {/* Password Field */}
                    <Grid item xs={12}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    error={!!errors.password}
                                    helperText={errors.password ? errors.password.message : ''}
                                />
                            )}
                        />
                    </Grid>


                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                           Sign Up
                        </Button>
                    </Grid>
                    <p>Already have account? <Link to="signup">Login here</Link></p>
                </Grid>
            </form>
        </Box>
    );
};

export default Signup;
