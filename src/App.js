import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import arrow from './arrow.svg';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      onPageList: [],
      a: true,
      b: true,
      c: true,
      d: true,
      e: true,
      page: 0,
      rowsPerPage: 25,
      amountOfData: 'low',
      value: 0,
      idArrow: false,
      firstNameArrow: false,
      lastNameArrow: false,
      emailArrow: false,
      phoneArrow: false,
      load: true,
      filter: '',
      info: false,
      description: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      url: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    }
  }


  componentWillMount = () => {
    this.getData('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
  }

  renderItem = (item, index) => {
    return (
      <TableRow key={index} style={{ cursor: 'pointer' }} onClick={this.showInfo.bind(this, item)}>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.firstName}</TableCell>
        <TableCell>{item.lastName}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>{item.phone}</TableCell>
      </TableRow>
    )
  }


  getData = (url) => {
    axios(
      {
        url: url
      }
    ).then(response => {
      console.log(response);
      this.setState({ list: response.data });
      this.setState({ onPageList: response.data.slice(0, this.state.rowsPerPage) });
      this.setState({ load: false })

    })
  }


  getPageList = (page, newList) => {
    this.setState({ onPageList: this.state.list.slice(page * this.state.rowsPerPage, page * this.state.rowsPerPage + this.state.rowsPerPage) });
    this.setState({ page });
  }

  sortById = () => {
    this.setState({ idArrow: true, firstNameArrow: false, lastNameArrow: false, emailArrow: false, phoneArrow: false })
    if (this.state.a) {
      this.state.list.sort(function (obj1, obj2) {
        return obj1.id - obj2.id;
      });
      this.setState({ a: false })
    } else {
      this.state.list.sort(function (obj1, obj2) {
        return obj2.id - obj1.id;
      });
      this.setState({ a: true });
    }
    this.getPageList(0);
  };

  sortByFirstName = () => {
    this.setState({ idArrow: false, firstNameArrow: true, lastNameArrow: false, emailArrow: false, phoneArrow: false })
    if (this.state.b) {
      this.state.list.sort(function (obj1, obj2) {
        if (obj1.firstName.toUpperCase() < obj2.firstName.toUpperCase()) return -1;
        if (obj1.firstName.toUpperCase() > obj2.firstName.toUpperCase()) return 1;
      });
      this.setState({ b: false })
    } else {
      this.state.list.sort(function (obj1, obj2) {
        if (obj1.firstName.toUpperCase() < obj2.firstName.toUpperCase()) return 1;
        if (obj1.firstName.toUpperCase() > obj2.firstName.toUpperCase()) return -1;
      });
      this.setState({ b: true });
    }
    this.getPageList(0);
  };

  sortByLastName = () => {
    this.setState({ idArrow: false, firstNameArrow: false, lastNameArrow: true, emailArrow: false, phoneArrow: false })
    if (this.state.c) {
      this.state.list.sort(function (obj1, obj2) {
        if (obj1.lastName.toUpperCase() < obj2.lastName.toUpperCase()) return -1;
        if (obj1.lastName.toUpperCase() > obj2.lastName.toUpperCase()) return 1;
      });
      this.setState({ c: false })
    } else {
      this.state.list.sort(function (obj1, obj2) {
        if (obj1.lastName.toUpperCase() < obj2.lastName.toUpperCase()) return 1;
        if (obj1.lastName.toUpperCase() > obj2.lastName.toUpperCase()) return -1;
      });
      this.setState({ c: true });
    }
    this.getPageList(0);
  };

  sortByEmail = () => {
    this.setState({ idArrow: false, firstNameArrow: false, lastNameArrow: false, emailArrow: true, phoneArrow: false })
    if (this.state.d) {
      this.state.list.sort(function (obj1, obj2) {
        if (obj1.email.toUpperCase() < obj2.email.toUpperCase()) return -1;
        if (obj1.email.toUpperCase() > obj2.email.toUpperCase()) return 1;
      });
      this.setState({ d: false })
    } else {
      this.state.list.sort(function (obj1, obj2) {
        if (obj1.email.toUpperCase() < obj2.email.toUpperCase()) return 1;
        if (obj1.email.toUpperCase() > obj2.email.toUpperCase()) return -1;
      });
      this.setState({ d: true });
    }
    this.getPageList(0);
  };

  sortByPhone = () => {
    this.setState({ idArrow: false, firstNameArrow: false, lastNameArrow: false, emailArrow: false, phoneArrow: true })
    if (this.state.e) {
      this.state.list.sort(function (obj1, obj2) {
        if (obj1.phone < obj2.phone) return -1;
        if (obj1.phone > obj2.phone) return 1;
      });
      this.setState({ e: false })
    } else {
      this.state.list.sort(function (obj1, obj2) {
        if (obj1.phone < obj2.phone) return 1;
        if (obj1.phone > obj2.phone) return -1;
      });
      this.setState({ e: true });
    }
    this.getPageList(0);
  };


  handleChangePage = (event, page) => {
    this.setState({ page });
    this.getPageList(page);
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    this.getPageList(0);
    this.getData(this.state.url);
  };

  handleChangeTab = (event, value) => {
    this.setState({ idArrow: false, firstNameArrow: false, lastNameArrow: false, emailArrow: false, phoneArrow: false })
    this.setState({ load: true }, () => {
      this.setState({ value });
      if (value) {
        this.setState({ url: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=0&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}' })
        this.getData('http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=0&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
      } else {
        this.setState({ url: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}' })
        this.getData('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
      }
    });
    ;

  };

  findStr = (value) => {
    let findList = [];
    if (value) {
      this.state.list.map((item) => {
        if (String(item.id).indexOf(value) + 1 || item.firstName.indexOf(value) + 1 || item.lastName.indexOf(value) + 1 || item.email.indexOf(value) + 1 || String(item.phone).indexOf(value) + 1)
          findList.push(item)
      })
      this.setState({ list: findList }, () => {
        this.getPageList(0)
      });
    } else {
      this.setState({ load: true })
      this.setState({ load: true })
      this.getData(this.state.url);
    }
  }

  backspaceInput = (e) => {
    if (e.keyCode == 8 || e.keyCode == 46) {
      this.setState({ load: true })
      this.setState({ filter: '' });
      this.getData(this.state.url);

    }
  }

  handleFilterInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
    console.log(value);
    this.findStr(value);
  }

  showInfo = (item) => {
    this.setState({ description: item.description, address: item.address.streetAddress, city: item.address.city, state: item.address.state, zip: item.address.zip, id: item.id, info: true }, () => {
      window.scrollTo(0, 2000)
    });

  }

  hideInfo = (e) => {
    this.setState({ info: false })
  }


  render() {
    const { classes } = this.props;
    let { list, page, rowsPerPage, value, idArrow, firstNameArrow, lastNameArrow, emailArrow, phoneArrow, a, b, c, d, e, load, info, description, address, city, state, zip, id } = this.state;

    return (

      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChangeTab}>
            <Tab label="Маленький объем данных" />
            <Tab label="Большой объем данных" />
          </Tabs>
        </AppBar>
        {load && <CircularProgress className={classes.progress} />}
        <Input
          className={classes.input}
          placeholder="Filter"
          name="filter"
          value={this.state.filter}
          onChange={this.handleFilterInput}
          onKeyDown={this.backspaceInput}
        />
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell> <Button className={classes.button} onClick={this.sortById}>{idArrow && <img src={arrow} style={a ? arrowStyles.up : arrowStyles.down} />} id</Button></TableCell>
                <TableCell> <Button className={classes.button} onClick={this.sortByFirstName}>{firstNameArrow && <img src={arrow} style={b ? arrowStyles.up : arrowStyles.down} />}first Name</Button></TableCell>
                <TableCell><Button className={classes.button} onClick={this.sortByLastName}>{lastNameArrow && <img src={arrow} style={c ? arrowStyles.up : arrowStyles.down} />}last Name</Button></TableCell>
                <TableCell><Button className={classes.button} onClick={this.sortByEmail}>{emailArrow && <img src={arrow} style={d ? arrowStyles.up : arrowStyles.down} />}email</Button></TableCell>
                <TableCell><Button className={classes.button} onClick={this.sortByPhone}>{phoneArrow && <img src={arrow} style={e ? arrowStyles.up : arrowStyles.down} />}phone</Button></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.onPageList.map(this.renderItem)}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={5}
                  count={list.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>

        {info && <Paper className={classes.info}>
          <Typography style={listItemStyles}>
            id: {id}
          </Typography>
          <Typography style={listItemStyles}>
            Описание: {description}
          </Typography>
          <Typography style={listItemStyles}>
            Адрес проживания: {address}
          </Typography>
          <Typography style={listItemStyles}>
            Город: {city}
          </Typography>
          <Typography style={listItemStyles}>
            Провинция/штат: {state}
          </Typography>
          <Typography style={listItemStyles}>
            Индекс: {zip}
          </Typography>
          <Button className={classes.button} onClick={this.hideInfo}> Скрыть информацию </Button>
        </Paper>}
      </div>
    );
  }
}

const arrowStyles = {
  up: {
    position: 'relative',
    height: '25px'
  },
  down: {
    position: 'relative',
    height: '25px',
    transform: 'rotate(180deg)'
  }
}
const listItemStyles = {
  marginBottom: '10px'
}

const styles = theme => ({
  root: {
    width: '84%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflowX: 'auto',
  },
  info: {
    width: '30%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '8%',
    marginBottom: '20px',
    padding: '10px'
  },
  table: {
    minWidth: 800,
  },
  input: {
    margin: theme.spacing.unit,
    marginLeft: '20%'
  },
  button: {
    margin: theme.spacing.unit,
  },
  progress: {
    margin: theme.spacing.unit * 2,
    position: 'absolute'
  },
});

export default withStyles(styles)(App);
