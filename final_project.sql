-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Feb 13, 2023 at 05:09 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final_project`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `ptp` (IN `code` VARCHAR(20))   SELECT * FROM task
RIGHT JOIN sprint
ON task.sprint_code = sprint.sprint_code
RIGHT JOIN project
ON sprint.project_code = project.project_code
WHERE project.project_code = code$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pu` (IN `code` VARCHAR(20))   SELECT * FROM project 
RIGHT JOIN project_member 
ON project_member.project_code = project.project_code
RIGHT JOIN user
ON project_member.user_code = user.user_code
WHERE user.user_code = code$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `up` (IN `code` VARCHAR(20))   SELECT user.user_name, project_member.project_code FROM user
RIGHT JOIN project_member 
ON user.user_code = project_member.user_code
WHERE project_member.project_code = code$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `attached_file`
--

CREATE TABLE `attached_file` (
  `file_code` varchar(20) NOT NULL,
  `file_type` varchar(20) NOT NULL,
  `file_submit_type` varchar(20) NOT NULL,
  `file_description` varchar(200) NOT NULL,
  `task_code` varchar(20) NOT NULL,
  `user_code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_value` varchar(20) NOT NULL,
  `comment_code` varchar(20) NOT NULL,
  `comment_date` date NOT NULL,
  `user_code` varchar(20) NOT NULL,
  `task_code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `enviroment`
--

CREATE TABLE `enviroment` (
  `enviroment_type` varchar(20) NOT NULL,
  `user_code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_value` varchar(200) NOT NULL,
  `history_code` varchar(20) NOT NULL,
  `history_date` date NOT NULL,
  `task_code` varchar(20) NOT NULL,
  `user_code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `label`
--

CREATE TABLE `label` (
  `label_value` varchar(20) NOT NULL,
  `task_code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_value` varchar(200) NOT NULL,
  `notification_code` varchar(20) NOT NULL,
  `notification_date` date NOT NULL,
  `history_code` varchar(20) NOT NULL,
  `user_code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `project_code` int(20) NOT NULL,
  `project_name` varchar(20) NOT NULL,
  `project_type` varchar(20) NOT NULL,
  `project_description` varchar(100) NOT NULL,
  `project_created_date` date NOT NULL,
  `project_leader` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_code`, `project_name`, `project_type`, `project_description`, `project_created_date`, `project_leader`) VALUES
(1, 'test1', 'ICT', 'Lovely1', '2022-11-11', 5),
(2, 'test2', 'ICT', 'lovely one', '2022-12-12', 4),
(10, 'task3 ', 'CS', 'task3', '2023-01-11', 1),
(11, 'task4', 'CS', 'hihihi', '2023-01-11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `project_member`
--

CREATE TABLE `project_member` (
  `user_code` int(20) NOT NULL,
  `project_code` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_member`
--

INSERT INTO `project_member` (`user_code`, `project_code`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `sprint`
--

CREATE TABLE `sprint` (
  `project_code` varchar(20) NOT NULL,
  `sprint_code` int(20) NOT NULL,
  `sprint_start_date` date NOT NULL,
  `sprint_due_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sprint`
--

INSERT INTO `sprint` (`project_code`, `sprint_code`, `sprint_start_date`, `sprint_due_date`) VALUES
('1', 1, '2022-12-11', '2022-12-25'),
('1', 2, '2022-12-25', '2022-12-31'),
('2', 3, '2022-12-14', '2022-12-21'),
('1', 5, '2023-03-20', '2023-03-27');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_code` int(20) NOT NULL,
  `task_name` varchar(200) NOT NULL,
  `task_start_date` date NOT NULL,
  `task_due_date` date NOT NULL,
  `task_description` varchar(200) NOT NULL,
  `task_priority` varchar(20) NOT NULL,
  `user_code` varchar(20) NOT NULL,
  `sprint_code` int(20) NOT NULL,
  `state` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_code`, `task_name`, `task_start_date`, `task_due_date`, `task_description`, `task_priority`, `user_code`, `sprint_code`, `state`) VALUES
(2, 'tasktest4', '2022-11-10', '2022-11-14', 'lovely lovely', 'low', '3', 1, 'in progress'),
(3, 'tasktest1', '2022-12-14', '2022-12-15', 'lovely one', 'high', '2', 3, 'in progress'),
(4, 'tasktest5', '2022-12-24', '2022-12-28', 'lovely one', 'low', '1', 2, 'in progress'),
(7, 'tasktest3', '2023-02-10', '2023-02-19', 'lovely one', '', '1', 1, 'to do'),
(10, 'tasktest8', '2023-02-10', '2023-02-09', 'lovely one', 'medium', '1', 5, 'to do'),
(13, 'tasktest9', '2023-02-10', '2023-02-20', 'lovely one', 'high', '1', 5, 'to do'),
(16, 'tasktest6', '2023-02-10', '2023-02-17', 'lovely one', 'high', '1', 2, 'to do'),
(17, 'tasktest10', '2023-02-10', '2023-02-11', 'lovely one', 'high', '1', 5, 'to do'),
(20, 'tasktest7', '2023-02-10', '2023-02-11', 'lovely one', 'high', '1', 2, 'to do'),
(21, 'tasktest1', '2023-02-10', '2023-03-10', 'hello', 'high', '1', 1, 'to do');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_code` int(20) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_mail` varchar(40) NOT NULL,
  `user_dob` date NOT NULL,
  `user_password` varchar(20) NOT NULL,
  `user_description` varchar(100) NOT NULL,
  `user_avatar` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_code`, `user_name`, `user_mail`, `user_dob`, `user_password`, `user_description`, `user_avatar`) VALUES
(1, 'AnDoan', 'andt.bi11-002@st.usth.edu.vn', '2002-01-24', '123321', 'Vietnamien', 'NA'),
(2, 'CuongDinh', 'cuongdt.ba10-007@st.usth.edu.vn', '2001-01-01', '123321', 'NA', 'NA'),
(3, 'ThangNguyen', 'thangnt.ba10-057@st.usth.edu.vn', '2001-02-03', '123333', 'NA', 'NA'),
(4, 'SonDinh', 'sondq.ba10-050@st.usth.edu.vn', '2001-02-02', '123123', 'NA', 'NA'),
(5, 'PhuongNguyen', 'phuongnh.ba10-046@st.usth.edu.vn', '2001-10-10', '123111', 'NA', 'NA'),
(6, 'ChiDo', 'chidh.bi11-043@st.usth.edu.vn', '2002-05-06', '111222', 'NA', 'NA');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attached_file`
--
ALTER TABLE `attached_file`
  ADD PRIMARY KEY (`file_code`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_code`);

--
-- Indexes for table `enviroment`
--
ALTER TABLE `enviroment`
  ADD PRIMARY KEY (`enviroment_type`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_code`);

--
-- Indexes for table `label`
--
ALTER TABLE `label`
  ADD KEY `task_code` (`task_code`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_code`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_code`);

--
-- Indexes for table `sprint`
--
ALTER TABLE `sprint`
  ADD PRIMARY KEY (`sprint_code`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_code`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `project_code` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `sprint`
--
ALTER TABLE `sprint`
  MODIFY `sprint_code` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_code` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_code` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
