import React, {useState} from "react"

import {Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import {signin, signup} from '../../actions/auth'
import useStyles from "./styles"
import Input from "./Input"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"


const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

function Auth() {
    const classes = useStyles()
    const [isSignup, setIsSignup] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const history = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
        if(isSignup){
            dispatch(signup(formData, history))
        }else {
            dispatch(signin(formData, history))
        }
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    function handleShowPassword() {
        setShowPassword(prevShowPassword => !prevShowPassword)
    }

    function switchMode() {
        setIsSignup(prevIsSignup => !prevIsSignup)
        setShowPassword(false)
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elecation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus
                                           half/>
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                                </>
                            )}
                        <Input name='email' label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name='password' label="Password" handleChange={handleChange}
                               type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                        {isSignup &&
                        <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange}
                               type="password"/>}
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color='primary' className={classes.submit}>
                        {isSignup ? 'Sign up' : 'Sign In'}
                    </Button>

                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode} variant='contained'>
                                {isSignup ? 'Already have an account?' : `Sign up here!`}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth