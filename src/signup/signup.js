import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './styles';
import {Link} from 'react-router-dom';

const firebase = require("firebase");

class SignupComponent extends Component {

    constructor(){
        super();
        this.state = {
            email: null,
            password: null,
            passwordConfirmation: null,
            signupError : null
        }
    }
  
   

    userTyping = (type,e) => {
       switch(type) {
           case 'email':
               this.setState({'email': e.target.value});
               break;

           case 'password':
                this.setState({'password': e.target.value});
                break;
        
           case 'passwordConfirmation':
                    this.setState({'passwordConfirmation': e.target.value});
                    break;
           default:
                break;
       }
    }


    submitSignup = (e) => {
        e.preventDefault();
        if(!this.formIsValid()){
            this.setState({signupError: 'Passwords do not match'});
            return;
        }

        // to firebase ( Authincate User & add data to firebase database )
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(authRes => {
            const userObj = {
                email: authRes.user.email,
                password: this.state.password
            };
            firebase
            .firestore().
            collection('users')
            .doc(this.state.email)
            .set(userObj)
            .then(() => {
                this.props.history.push('/dashboard')
            },dbError => {
                console.log(dbError);
                this.setState({signupError: 'Failed to add user'});

            })
        },authError => {
            console.log(authError);
            this.setState({signupError: 'Failed to add user'});
        })
        
       
        
    }

    formIsValid = () => {
       return( this.state.password === this.state.passwordConfirmation);
    }

    render() {
        const { classes } = this.props;
        return (
           <main className={classes.main}>
               <CssBaseLine></CssBaseLine>
               <Paper className={classes.paper}>
                    <Typography component='h1' variant='h5'>Sign Up!</Typography>
                <form className={classes.form} onSubmit={(e) => this.submitSignup(e)}>
                    <FormControl required fullWidth margin='normal'>
                        <InputLabel htmlFor='signup-email-input'>Enter Your Email</InputLabel>
                        <Input  autoComplete='email' autoFocus id='signup-email-input' onChange={(e) => this.userTyping('email',e)}></Input>
                    </FormControl>
                    <FormControl required fullWidth margin='normal'>
                        <InputLabel htmlFor='signup-password-input'>Create A Password</InputLabel>
                        <Input type='password'   id='signup-password-input' onChange={(e) => this.userTyping('password',e)}></Input>
                    </FormControl>
                    <FormControl required fullWidth margin='normal'>
                        <InputLabel htmlFor='signup-password-confirmation-input'>Confirm Password</InputLabel>
                        <Input type='password' id='signup-password-confirmation-input' onChange={(e) => this.userTyping('passwordConfirmation',e)}></Input>
                    </FormControl>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Submit</Button>
                </form>
                {
                    this.state.signupError ? 
                    <Typography className={classes.errorText}>
                        {this.state.signupError}
                    </Typography>
                    :
                    null
                }
                
                <Typography style={{'margin-top': '10px'}} className={classes.hasAccountHeader}>Already Have An Account ?</Typography>
                <Link className={classes.logInLink} to='/login'>Log In!</Link>
               </Paper>
           </main>
        )
    }
}

export default withStyles(styles)(SignupComponent);
