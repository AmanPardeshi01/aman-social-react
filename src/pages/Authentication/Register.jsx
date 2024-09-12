import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, TextField } from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../Redux/Auth/auth.action';

const initialValues = { firstName: "", lastName: "", email: "", password: "", gender: "" };

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  gender: Yup.string().oneOf(["male", "female"], "Gender is required").required("Gender is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values /*, { resetForm }*/) => {
    console.log("Handle Submit", values);
    dispatch(registerUserAction({ data: values }))
    // resetForm(); // Reset the form after successful submission
    // navigate("/welcome"); // Navigate to a different page
  };
  

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className='space-y-5'>
            <div className='space-y-5'>
              <div>
                <Field
                  as={TextField}
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="firstName" component={"div"} className='text-red-500' />
              </div>
              <div>
                <Field
                  as={TextField}
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="lastName" component={"div"} className='text-red-500' />
              </div>

              <div>
                <Field
                  as={TextField}
                  name="email"
                  placeholder="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="email" component={"div"} className='text-red-500' />
              </div>

              <div>
                <Field
                  as={TextField}
                  name="password"
                  placeholder="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="password" component={"div"} className='text-red-500' />
              </div>

              <FormControl component="fieldset" error={Boolean(errors.gender && touched.gender)}>
                <RadioGroup
                  aria-labelledby="gender-radio-group"
                  name="gender"
                  onChange={(e) => setFieldValue("gender", e.target.value)}
                  value={values.gender}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
                <FormHelperText>{errors.gender && touched.gender ? errors.gender : ""}</FormHelperText>
              </FormControl>
            </div>
            <Button sx={{ padding: ".8rem 0rem" }} fullWidth type='submit' variant='contained' color='primary'>
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <div className='flex gap-2 items-center justify-center pt-5'>
        <p>If you have already account</p>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </div>
  );
};

export default Register;
