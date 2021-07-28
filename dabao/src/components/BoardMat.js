import React, { useState, useEffect, useContext }  from 'react';
import { withStyles, createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import Nav from "./Nav";
import { Link } from "react-router-dom";
import axios from "axios"
import { LoggedContext } from "../App.js";
import moment from "moment"
import debounce from 'lodash.debounce';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(4n+1)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const theme = createTheme({
  palette: {
    warning: {
      main: '#f3e19a',
    },
    // secondary: {
    //   main: '#f44336',
    // },
  },
});

const StyledDropDownRow = withStyles((theme) => ({
  root: {
      // backgroundColor: theme.palette.info.light,
      backgroundColor: theme.palette.warning.main,
    },

}))(TableRow);



// const useRowStyles = makeStyles({
//   root: {
//     '& > *': {
//       borderBottom: 'unset',
//     },
//   },
// });

function Row(props) {
  const { match, matchProps } = props;
  const [open, setOpen] = React.useState(false);
  // const classes = useRowStyles();
  // className={classes.root}
  return (
    // <React.Fragment>
    <ThemeProvider theme={theme}>
      <StyledTableRow >
        <TableCell  component="th" scope="row">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          {match?.DBER?.username}
        </TableCell>
        <TableCell align="center">{match?.dishOrdered?.itemName}</TableCell>
        <TableCell align="center">${match?.dishOrdered?.itemPrice}</TableCell>
        <TableCell align="center">{match?.pickupLocation?.street}</TableCell>
        <TableCell align="center">{match?.pickupLocation?.postCode}</TableCell>
        <TableCell align="center">{match?.orderLocation?.street}</TableCell>
        <TableCell align="center">{moment(match.timeAtPickUp).format("lll")}</TableCell>
        <TableCell align="center">{matchProps.slotsAvail}</TableCell>
        <TableCell align="center">{!matchProps.isConfirmedOrder && <button onClick={()=>matchProps.debouncedSavePlus(match)}>+</button>}
                                  {matchProps.isConfirmedOrder && <button onClick={()=>matchProps.debouncedSaveMinus(match)}>-</button>}
        </TableCell>
        <TableCell align="center">{matchProps.isConfirmedOrder? "CONFIRMED":matchProps.slotsAvail > 0 ? "AVAIL":"CLOSED"}</TableCell>
      </StyledTableRow>
      <StyledDropDownRow>
        <TableCell  style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={5}>
              <Typography variant="h5" gutterBottom component="div">
                Contacts
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Handphone</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Address</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell align="left">{match.DBER.contact.hp}</TableCell>
                      <TableCell align="left">{match.DBER.contact.email}</TableCell>
                      <TableCell align="left">{match.DBER.address.street}</TableCell>
                    </TableRow>
                
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </StyledDropDownRow>
      </ThemeProvider>
    // </React.Fragment>
  
  );
}

const CollapsibleTable =() => {
  const loggedContext = useContext(LoggedContext);
  const [matches, setMatches] = useState(["loading"])
  const [toggleUpdate, settoggleUpdate] = useState(false)

  // console.log("logcontext",loggedContext) 
  const postcode = loggedContext?.logState?.address.postCode
   useEffect(() => {
    axios
      .get(`/match/postcode/${postcode}`)
      .then(function (response) {
        // handle success
        // console.log(response.data);
        setMatches(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [postcode,toggleUpdate]);

  const debouncedSavePlus = debounce(nextValue => handleAdd(nextValue), 500)
  const handleAdd = (match) => {
    axios
    .put(`/match/insert/${match._id}`,{
      DBEE: loggedContext.logState._id,
      isCompleted: false,
      remarks: "MORE RICE",
      dishOrdered: { itemName: "Duck Rice", itemPrice: 3.00 },
    })
    .then(function (response) {
      // handle success
      console.log("Update Insert",response.data);
      settoggleUpdate(prev=>!prev)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const debouncedSaveMinus = debounce(nextValue => handleMinus(nextValue), 500)
  const handleMinus = (match) => {
    console.log("minus")
    axios
    .put(`/match/remove/${match._id}/${loggedContext.logState._id}`)
    .then(function (response) {
      // handle success
      console.log("Update Remove",response.data);
      settoggleUpdate(prev=>!prev)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  if(matches[0] === "loading")
    return (<h1>Loading ..... </h1>)
  
    if(matches?.length === 0) {
      return (
        <Nav>
        <div className="box">
          {<h1>NO Dabao-Er AVAILABLE AT YOUR CURRENT LOCATION</h1>}
        </div>
        </Nav>
      )
    } else {  
  return (
    <Nav>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell >Dabao-Er</StyledTableCell>
            <StyledTableCell align="center">Dish</StyledTableCell>
            <StyledTableCell align="center">Price($)</StyledTableCell>
            <StyledTableCell align="center">Pickup-Location</StyledTableCell>
            <StyledTableCell align="center">Poctcode</StyledTableCell>
            <StyledTableCell align="center">Order-Location</StyledTableCell>
            <StyledTableCell align="center">Pickup-Time</StyledTableCell>
            <StyledTableCell align="center">Avail-Slots</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))} */}
          {matches.map((match,index) => {
              const slotsAvail = match.maxOrders - match.Orders.length;
            
              let isConfirmedOrder = false;
              if(match.Orders.length > 0) {
                match.Orders.forEach(order => {
                  if(order.DBEE === loggedContext.logState._id)
                    isConfirmedOrder = true;
                })
              }
              if((slotsAvail === 0 && !isConfirmedOrder) || 
                (loggedContext?.logState?._id === match.DBER._id))
                  return (<></>);

              const matchProps = {slotsAvail,isConfirmedOrder,debouncedSavePlus,debouncedSaveMinus}

            return <Row key={index} match={match} matchProps={matchProps} />
          })}
          {/*  */}
        </TableBody>
      </Table>
    </TableContainer>
    <div><br/><br/>
        <Link to="/dashboard"><button>To Dashboard</button></Link>
      </div>
    </Nav>
  );
          }
}

export default CollapsibleTable;
