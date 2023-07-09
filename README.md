
<p align='center'>
    <h1><strong>🚀EKIPA🚀</strong></h1>
</p>

Ekipa is a comprehensive team management and task allocation platform designed to streamline collaboration and enhance productivity within teams. With Ekipa, you can efficiently create and manage teams, assign tasks, and track their progress, all in one centralized platform.

## 🎯 Purpose

The purpose of the "Ekipa" web app is to optimize task assignment and improve the efficiency of software development teams. The app aims to streamline the process of allocating tasks to team members based on their skills, availability, and workload. 

## 👥 Audience

The audience for the "Ekipa" web app are software development teams and project managers who are responsible for task allocation and team coordination.

</br>
<hr/>

## 💻 Installation and Usage

- Clone the repository :\
    `git clone [https://github.com/suryan-s/Ekipa](https://github.com/suryan-s/Ekipa)`

- Create a virtual environment:\
    `python -m venv venv`

- Install packages from requirements.txt :\
    `pip install -r requirements.txt`

- Build the static files for the frontend:
    `cd frontend`
    `npm install`
    `npm run build`
    `cd ..`

- Run the application by :\
    `python main.py`
</br>

<hr/>

## 📋 Requirements

- Python 3.8 or higher
- Libraries used:
  - fastapi, uvicorn, aiosqlite
</br>

<hr/>

## ✨ Features

Ekipa offers the following features:

- 🔒User Authorization with JWT authentication: Allow users to create accounts, log in, and manage their roles (e.g., team lead, manager) within the application.

- 📝Task Management: Provide a user-friendly interface for creating, updating, and managing tasks. Users should be able to assign tasks to themselves or other team members, set deadlines, add descriptions, and track task progress.

- ⚙️Task Assignment Algorithm: Implement the dynamic work allocation algorithm that takes into account skills, availability, and workload to assign tasks to the most suitable team members. The algorithm should ensure fair distribution and minimize bottlenecks.

- 🎯Skill Matching: Enable users to specify the required skills for each task, and allow the algorithm to match tasks with team members who possess the relevant skills and expertise.

- ⚖️Load Balancing: Provide a visual representation or dashboard that displays the workload distribution among team members. Users should be able to view and adjust task assignments to balance the workload effectively.

- 🚦Task Prioritization: Allow users to assign priority levels or categories to tasks, enabling the algorithm to consider task urgency and impact when making assignment decisions.

</br>

<hr/>


## 🤝 Contribution and Guidelines

To start contributing to the project, clone the repository into your local system subdirectory using the below git code:

```
https://github.com/suryan-s/Ekipa
```

Before cloning the repository, make sure to navigate to the working subdirectory of your command line interface and ensure that no folder with the same name exists. Other ways to clone the repository include using a password-protected SSH key, or by using [Git CLI](https://cli.github.com/). The changes may additionally be performed by opening this repo using [GitHub Desktop](https://desktop.github.com/)

## ✉️ Submitting a Pull Request

Before opening a Pull Request, it is recommended to have a look at the full contributing page to make sure your code complies with all the pull request guidelines.

Navigate to this subdirectory, & check the status of all files that were altered (red) by running the below code in Git Bash:

```
  git status
```

Stage all your files that are to be pushed into your pull request. This can be done in two ways - stage all or some files:

```
  git add .            // adds every single file that shows up red when running the git status
```

```
  git add <filename>   // type in the particular file that you would like to add to the PR
```

Commit all the changes that you've made and describe in brief the changes that you have made using this command:

```
  git commit -m "<commit_message>"
```

Push all of your updated work into this GitHub repo in the form of a Pull Request by running the following command:

```
  git push origin main
```

</br>

<hr/>
