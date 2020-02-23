//In search, we will search by tags along with all the other searches
import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import {Formik,Form} from 'formik';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
function Forum() {
	const [array,setArray] = React.useState([]);

	const handleSearch = (type) =>{
 		switch(type){
 			case 'searchTopic': console.log("topic");setArray(['Post 1 ','Post 2',' Post 3']);break;	//setArray will fetch from backend
 			case 'searchSubject': console.log("Subject");break;
 			case 'searchQuestion': console.log("Question");break;
 			default: break;
 		}
	}
	return (
		<React.Fragment>
			<div align="center">
				<Box style={{width:"50vw",border:"2px solid lightgrey",padding:20}}>
					<Typography variant="h4"> Search Question </Typography>
					<Divider/>
					<br/>
					<TextField 
						fullWidth 
						name="searchTopic" 
						label="Search Topic" 
						placeholder="Enter Topic name" 
						variant="filled"
						InputProps={{
				          endAdornment: (
				            <InputAdornment position="end">
				              <IconButton onClick={()=>handleSearch('searchTopic')}>
				                <SearchIcon/>
				                </IconButton>
				            </InputAdornment>
				          ),
				        }}
					/><br/><br/>
					<TextField 
						fullWidth 
						name="searchSubject" 
						label="Search Subject" 
						placeholder="Enter Subject name" 
						variant="filled"
						InputProps={{
				          endAdornment: (
				            <InputAdornment position="end">
				              <IconButton onClick={()=>handleSearch('searchSubject')}>
				                <SearchIcon/>
				                </IconButton>
				            </InputAdornment>
				          ),
				        }}
					/><br/><br/>
					<TextField 
						fullWidth 
						name="searchQuestion" 
						label="Search Question" 
						placeholder="Search by Question" 
						variant="filled" 
						helperText="Enter Keywords"
						InputProps={{
				          endAdornment: (
				            <InputAdornment position="end">
				              <IconButton onClick={()=>handleSearch('searchQuestion')}>
				                <SearchIcon/>
				                </IconButton>
				            </InputAdornment>
				          ),
				        }}
					/> <br/>
				</Box>
			<br/><Divider/><br/>
			<div style={{marginLeft:'10vw'}}>
				<List>
				{array.map((value,key)=>(
						<div key={key}>
						<NavLink style={{textDecoration: 'none',color: 'black',fontFamily: 'Roboto',}} to="">
			              <ListItem key={key}>
			                <ListItemText> {value} </ListItemText>
			              </ListItem>
			              <Divider/>
			            </NavLink>
	              	</div>
					))
				}
				</List>
			</div>
			</div>
			<div align="center">
				<Box style={{width:"50vw",border:"2px solid lightgrey",padding:20}}>
					<Typography variant="h4"> Create Question </Typography>
					<Divider/>
					<br/>
					<Formik
                		initialValues={{ question: '', topic: '' ,subject: '',tags:[],text: ''}}
                		onSubmit={(values, { setSubmitting }) => {
		                  setTimeout(() => {
		                    setSubmitting(false);
		                  }, 1000);
		                  console.log(values)
		                  try {
		                    $.post('http://localhost:5000/forum', {
		                      question: values.question,
		                      topic: values.topic,
		                      subject: values.subject,
		                      tags: values.tags,
		                    })
		                      .done() //Add code here
		                      .fail(e => console.log(e));
		                  } catch (e) {
		                    console.log(e);
		                  }
		                }}
		              >
		              {({
		                  isSubmitting,
		                  handleChange,
		                  handleBlur,
		                  setFieldValue,
		                  values
		                }) => (
					<div align="center" style={{padding: 20}}>
						<Form>
						<TextField name="question" variant="filled" label="Question Title" fullWidth onBlur={handleBlur} onChange={handleChange}/><br/><br/>
						<TextField helperText="Press Enter after each tag" name="text" value={values.text} variant="filled" onChange={handleChange} label="Question Tags" fullWidth onBlur={handleBlur} 
						onKeyPress={(event) => {
				            if (event.key === 'Enter'){
				            	event.preventDefault();
				                setFieldValue('tags',[...values.tags,values.text]);
				                setFieldValue('text','');
				            }
          				}}/><br/>
          				{values.tags.map((item,index)=>(
		    				<React.Fragment key={index}>
				    				<Chip 
				    					key={index}
				    					label={item}
				    					color="primary"
				    					style={{marginRight:10}}
				    					onDelete={()=>{setFieldValue('tags',values.tags.filter(tag => tag!==item))}}
				    				/>
			    			</React.Fragment>
	    				)
		    		)}
          				<br/><br/>
						<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField name="topic" fullWidth variant="filled" label="Topic" onBlur={handleBlur} onChange={handleChange}/>
						</Grid>
						<Grid item xs={6}>
							<TextField name="subject" fullWidth variant="filled" label="Subject" onBlur={handleBlur} onChange={handleChange}/>
						</Grid>
						</Grid><br/>
						<Button type="submit" disabled={isSubmitting} variant="contained" color="primary"> Create Post </Button>
						</Form>
					</div> )}
              </Formik>
				</Box>
			</div>

		</React.Fragment>
	);
};

export default Forum;