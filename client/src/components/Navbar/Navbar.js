import React, {useEffect, useState} from "react"
import {AppBar, Avatar, Button, Toolbar, Typography} from "@material-ui/core"
import {Link, useLocation, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import decode from 'jwt-decode'

import useStyles from './styles'
import memories from '../../images/memories.png'

function Navbar() {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useNavigate()
    const location = useLocation()

    function logout() {
        dispatch({type: 'LOGOUT'})

        history('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user ? user.token : user

        if(token){
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2"
                            align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name}
                                src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar