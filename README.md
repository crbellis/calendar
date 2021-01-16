# Calendar App

## Description
A minimalistic calendar app, using React.js, Electron, Python, and the Google Calendars API.

## Setup
To use the app, simply clone this git repo

```Shell
git clone https://github.com/crbellis/calendar.git
```

Next, install all project dependencies by running 
```Shell
npm install
```

To authenticate with Google Calendars credentials are needed. More information on how to create Google API credentials can be found 
  <a href="https://developers.google.com/calendar/auth">here</a>.

Once credentials have been created, you will need to place the json file in ```./Backend```.

To set up the API, there are a few dependencies that need to be installed. To install, activate your Python venv and run

```Shell
pip3 install -r ./Backend/requirements.txt
```

Next, you will need to start the backend and frontend. To do so, run the following commands:
 

```Shell
npm run start-api
npm run start-app
```

After the applicaiton is running, a new window will pop up asking to authenticate with Google Calendar.
<br><br>
Congrats🎉! Now your Calendar app should be up and running and update with your Google Calendar.

<hr>

## Example
Uses system preferences to display light or darkmode version.

<h3>Lightmode</h3>
<img src="https://github.com/crbellis/calendar/blob/master/example/Lightmode.png" alt="darkmode-png" width="800"/>

<h3>Darkmode</h3>
<img src="https://github.com/crbellis/calendar/blob/master/example/Darkmode.png" alt="darkmode-png" width="800"/>
