const path = require("path");
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasksFile = path.join(__dirname, "tasks.txt");

if (!fs.existsSync(tasksFile)) {
  fs.writeFileSync(tasksFile, "[]");
}

const getAllTasks = () => {
  const tasks = fs.readFileSync(tasksFile);
  const tasksArray = JSON.parse(tasks);
  return tasksArray;
};

const saveAllTasks = (tasksArray) => {
  fs.writeFileSync(tasksFile, JSON.stringify(tasksArray));
};

const addNewTask = (task) => {
  const tasksArray = getAllTasks();
  tasksArray.push(task);
  saveAllTasks(tasksArray);
};

const showAllTasks = () => {
  const tasksArray = getAllTasks();
  for (let i = 0; i < tasksArray.length; i++) {
    console.log(`${i + 1}. ${tasksArray[i]}`);
  }
};

const markAsCompleted = (sno) => {
  const idx = parseInt(sno) - 1;
  const tasksArray = getAllTasks();
  if (idx < 0 || idx >= tasksArray.length) {
    console.log("----Invalid input!-----");
    return;
  }

  let task = tasksArray[idx];
  let markedTask = "[" + task + "]" + " ✅";

  tasksArray[idx] = markedTask;
  saveAllTasks(tasksArray);
};

const deleteTask = (sno) => {
  const idx = parseInt(sno) - 1;
  const tasksArray = getAllTasks();
  if (idx < 0 || idx >= tasksArray.length) {
    console.log("----Invalid input!-----");
    return;
  }
  tasksArray.splice(idx, 1);
  saveAllTasks(tasksArray);
};

const main = () => {
  console.log("\n ----------Menu---------- ");
  console.log("1. Add a new task");
  console.log("2. Show All Tasks");
  console.log("3. Mark a task as complete");
  console.log("4. Delete a task");
  console.log("5. Exit");

  rl.question("\nEnter an option: ", (input) => {
    switch (input) {
      case "1":
        rl.question("Enter your task: ", (task) => {
          addNewTask(task);
          console.log("\n-----task added successfully-----");
          main();
        });
        break;

      case "2":
        console.log("\nYour Tasks---> ");
        showAllTasks();
        main();
        break;

      case "3":
        showAllTasks();
        rl.question(
          "Enter the sno. of the task you want to mark as completed:",
          (sno) => {
            markAsCompleted(sno);
            console.log("\n-----Task marked successfully!-----");
            main();
          }
        );
        break;

      case "4":
        showAllTasks();
        rl.question(
          "Enter the sno. of the task that you want to delete:",
          (sno) => {
            deleteTask(sno);
            console.log("\n-----Task deleted successfully!-----");
            main();
          }
        );
        break;

      case "5":
        rl.close();
        return;

      default:
        console.log("-----please enter a valid option-----");
        main();
        break;
    }
  });
};

main();
