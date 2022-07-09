# Calendar History

This is a Calendar History solution to identify performance in dates of a calendar.

<img src="https://github.com/luizfelipelopes/Calendar-History-React-JS-Next-JS-/blob/main/public/images/print-history-calendar.PNG" alt="MarineGEO circle logo" />

Check the application in: [Here](https://stackblitz.com/edit/nextjs-buq9ee)

# Stacks/Libraries
* Next JS
* React JS
* Typescript
* @natscale/react-calendar [Link Repository](https://github.com/natscale/react-calendar)

# How it Works

In the component CalendarHistory you should insert 3 params:
* datesGood: contains  the dates that are classificated like 'Good';
* datesRegular: contain the dates that are classificated like 'Regular';
* datesBad: contain the dates that are classificated like 'Bad';

```JS
    <CalendarHistory
        datesGood={datesGood}
        datesRegular={datesRegular}
        datesBad={datesBad}
      />
```

