import React, {useState} from "react";
import ListWrapper from "../../components/ListWrapper/ListWrapper";
import useStyles from "./CompletedTasksStyles";
import {DateType} from "@date-io/type";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const CompletedTasks: React.FC = () => {
  const classes = useStyles();

    const [selectedDateFrom, setSelectedDateFrom] = useState<DateType | null>(
        new Date('2021-01-01')
    );
    const [selectedDateTo, setSelectedDateTo] = useState<DateType | null>(
        new Date('2021-10-31')
    );

    const handleDateFromChange = (date: DateType | null) => {
        setSelectedDateFrom(date);
    };
    const handleDateToChange = (date: DateType | null) => {
        setSelectedDateTo(date);
    };

  return (
    <div className={classes.AppContainer}>
      <h1>Completed Tasks</h1>
      <div className={classes.AppList}>
          <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="date-picker-inline3"
                  value={selectedDateFrom}
                  onChange={handleDateFromChange}
                  KeyboardButtonProps={{
                      "aria-label": "change date",
                  }}
                  style={{width: 180, marginBottom: "20px", marginRight: "20px"}}
                  disableToolbar
              />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="date-picker-inline4"
                  value={selectedDateTo}
                  onChange={handleDateToChange}
                  KeyboardButtonProps={{
                      "aria-label": "change date",
                  }}
                  style={{width: 180, marginBottom: "20px"}}
                  disableToolbar
              />
          </MuiPickersUtilsProvider>
          </div>
          <div className={classes.AppTaskCreator} />
          <ListWrapper isListDone selectedDateFrom={selectedDateFrom} selectedDateTo={selectedDateTo}/>
      </div>
    </div>
  );
};

export default CompletedTasks;
