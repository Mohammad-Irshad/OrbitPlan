import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";

import { Pie, Bar } from "react-chartjs-2";

// Import Chart.js modules
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Ticks,
} from "chart.js";
import { getAllOwners } from "../app/features/userSlice";

// Register required components with Chart.js
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const Reports = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const { allTeams } = useSelector((state) => state.teams);
  const { allOwners } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const totalTasks = tasks.length;
  const totalCompletedTasks = tasks.reduce(
    (acc, curr) => (curr.status === "Completed" ? acc + 1 : acc),
    0
  );
  const totalDaysOfWorkPending = tasks.reduce(
    (acc, curr) =>
      curr.status != "Completed" ? acc + curr.timeToComplete : acc,
    0
  );

  const teamsForLabel = allTeams.map((team) => team.name);
  const taskClosedByTeams = allTeams.map((team) =>
    tasks.reduce(
      (acc, curr) =>
        curr.status === "Completed" && curr.team._id === team._id
          ? acc + 1
          : acc,
      0
    )
  );

  const ownersForLabel = allOwners.map((own) => own.name);
  const taskClosedByOwner = allOwners.map((own) =>
    tasks.reduce(
      (acc, curr) =>
        curr.status === "Completed" &&
        curr.owners.some((ownId) => ownId._id === own._id)
          ? acc + 1
          : acc,
      0
    )
  );

  const data = {
    labels: ["Pending", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [totalTasks, totalCompletedTasks],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position of legend: 'top', 'left', 'right', 'bottom'
      },
      title: {
        display: true,
        text: "Tasks Completion Status",
      },
    },
  };

  const pieDataForPendingDays = {
    labels: ["Pending Days"],
    datasets: [
      {
        label: "Days",
        data: [totalDaysOfWorkPending],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptionsForPendingDays = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position of legend: 'top', 'left', 'right', 'bottom'
      },
      title: {
        display: true,
        text: "Total Days of Pending Work",
      },
    },
  };

  const barDataForTasksCloseByTeam = {
    labels: teamsForLabel,
    datasets: [
      {
        label: "Teams",
        data: taskClosedByTeams,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptionsForTasksCloseByTeam = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Tasks Closed By Teams",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const barDataForPendingDays = {
    labels: ["Task Day's"],
    datasets: [
      {
        label: "Days",
        data: [totalDaysOfWorkPending],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptionsForPendingDays = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Days of Work Pending",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const barDataForTasksClosedByOwners = {
    labels: ownersForLabel,
    datasets: [
      {
        label: "Owners",
        data: taskClosedByOwner,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptionsForTasksClosedByOwners = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Tasks Closed By Owners",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  useEffect(() => {
    dispatch(getAllOwners());
  }, []);

  return (
    <>
      <Header heading={"OrbitPlan - Reports"} />
      <main className="container">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 mt-5 border-success">
            <div className="row">
              <div className="col-md-6 mb-3">
                <Bar
                  data={barDataForTasksCloseByTeam}
                  options={barOptionsForTasksCloseByTeam}
                />
              </div>
              <div className="col-md-6 mb-3">
                <Bar
                  data={barDataForTasksClosedByOwners}
                  options={barOptionsForTasksClosedByOwners}
                />
              </div>
              <div className="col-md-6 mb-3">
                <Pie data={data} options={options} />
              </div>
              <div className="col-md-6 mb-3">
                {/* <Bar
                  data={barDataForPendingDays}
                  options={barOptionsForPendingDays}
                /> */}
                <Pie
                  data={pieDataForPendingDays}
                  options={pieOptionsForPendingDays}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Reports;
