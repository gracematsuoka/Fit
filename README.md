<h1 align="center">
  <br>
  <img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/fit-logo-circle.png?raw=true" alt="Fit" width="150">
  <br>
  Fit
  <br>
</h1>

<h4 align="center">
	An AI-powered personal stylist.
</h4>

<p align="center">
  <a href="#-about-the-project">About</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-additions">Additions</a>
</p>

<h1 align="center">
	<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/fit-homepage.png?raw=true" alt="Fit homepage">
    </h1>


## 💡 About the Project

Fit is a web application that integrates AI to curate personalized outfits for users based on their inputted information. Each outfit considers the weather, formality level, specific occasions, as well as the user's age, gender, and general style. Of course, not every user knows what their style is. Consequently, upon creating an account, each user can take a simple questionnaire to be accurately matched with their specific aesthetic. 
<br>
<br>
The web application is designed with a user-friendly UI and seamless user interaction. Each outfit is personalized from a dataset of over 300 outfit items, allowing users to have a diverse choice of fashion inspiration. 

### Built With

[![My Skills](https://skillicons.dev/icons?i=js,html,css,nodejs,expressjs,mongo, googlecloud,figma)](https://skillicons.dev)

* Javascript
* HTML
* CSS
* Node.js
* Express.js
* MongoDB
* Google Cloud
* Figma

## 🔑 Key Features

* <h4>User Authentication 👩‍💻</h4>
<p>
Users have the choice of creating an account through Google or by manually entering an email and password. 
</p>
<details>
<summary style="font-size: 15px">Click to view screenshots</summary>
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/createaccount.png?raw=true">
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/login.png?raw=true">
</details>

* <h4>Form Input 📋</h4>
<p>
Once a user creates an account, they're redirected to a quick questionnaire about their basic information such as their birthday, gender, and location to get better insight into how to style them. This information is stored in the User database model. All questions must be answered before proceeding (handles errors).
</p>
<details>
<summary style="font-size: 15px">Click to view screenshots</summary>
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/form.png?raw=true">
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/errorquiz.png?raw=true">
</details>

* <h4>Precise Algorithmic Results 📌</h4>
<p>
To find a user's style/aesthetic, a simple seven-question "quiz" is given. Each question asks the user to pick an image out of the various options. Each photo the user picks has an associated number of points attached to it from 0-5 for each of the 16 aesthetics. For instance, choosing a black cat as a pet would add five points to "goth" and zero points to "athletic." 
</p>
<details>
<summary style="font-size: 15px">Click to view screenshots</summary>
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/quiz1.png?raw=true">
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/quiz2.png?raw=true">
<br>
<p>
The algorithm is thoroughly designed to provide users with accurate results of their aesthetic(s). The final result, either one or two aesthetics, is shown to the user with a brief description of how it relates to their clothing choices. 
</p>
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/result1.png?raw=true">
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/results2.png?raw=true">
</details>

* <h4>Seamless API & Backend Connection ⚙️</h4>
<p>
The user's input to the questionnaire gets sent to the backend to be used for the "closet."
</p>
<details>
<summary style="font-size: 15px">Click to view screenshots</summary>
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/closet-temp.png?raw=true">
<br>
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/casual-school.png?raw=true">
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/school1.png?raw=true">
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/school2.png?raw=true">
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/school3.png?raw=true">
<p style="font-size: 15px">* Users can scroll through three different outfit ideas or generate new ones by clicking on the ✨ icon.</p>
</details>

* <h4>Modern and Clean UI  🎨</h4>
<p>
The web application was designed using Figma and presents a modern and clean interface with a user-friendly UI. 
</p>
<details>
<summary style="font-size: 15px">Click to view screenshots</summary>
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/closet-outfit.png?raw=true">
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/closet-aesthetic.png?raw=true">
<img src="https://github.com/matsuokagl/Fit/blob/main/src/assets/brand/screenshots/logout.png?raw=true">
</div>
<p style="font-size: 15px">* A user is automatically logged in for up to seven days until they have to reauthenticate but of course, there's always a choice to log out</p>
</details>

## 🔓 Usage

## 💻 Additions 

This web application is an ongoing project with additional features and improvements to be implemented! 

<h4>Improvements/Advanced Features</h4>

- **Advanced weather support:** Because the free tier of OpenWeather is used, only US-based cities are supported and only the current weather (not upcoming) can be seen. Advancing to a higher tier would allow for greater user support
	- Additionally, integrating AI to give outfit/styling advice based on the upcoming weather such as "bring an umbrella" if it will rain or "wear sunscreen" if the UV is high
- **Greater outfit variations:** This application uses GPT-4o mini for cost efficiency but one limitation is that the model can only accurately read through a database with a couple hundred entries or less, thus limiting the application’s ability to provide a vast selection of outfit ideas. Changing to a more advanced model would expand the application's styling accuracy
- **Mobile app version:** Give accessibility on mobile devices
- **User Flexibility:** Allow users to take more charge of their account by adding more information about their outfit preferences (such as color, types of clothes, etc.), allowing outfits to be saved, and editing profile information






