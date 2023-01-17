-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3307
-- Thời gian đã tạo: Th1 17, 2023 lúc 03:45 PM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `final_project`
--

DELIMITER $$
--
-- Thủ tục
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
-- Cấu trúc bảng cho bảng `attached_file`
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
-- Cấu trúc bảng cho bảng `comment`
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
-- Cấu trúc bảng cho bảng `enviroment`
--

CREATE TABLE `enviroment` (
  `enviroment_type` varchar(20) NOT NULL,
  `user_code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `history`
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
-- Cấu trúc bảng cho bảng `label`
--

CREATE TABLE `label` (
  `label_value` varchar(20) NOT NULL,
  `task_code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notification`
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
-- Cấu trúc bảng cho bảng `project`
--

CREATE TABLE `project` (
  `project_code` varchar(20) NOT NULL,
  `project_name` varchar(20) NOT NULL,
  `project_type` varchar(20) NOT NULL,
  `project_description` varchar(100) NOT NULL,
  `project_created_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `project`
--

INSERT INTO `project` (`project_code`, `project_name`, `project_type`, `project_description`, `project_created_date`) VALUES
('p1', 'test1', 'ICT', 'Lovely1', '2022-11-11'),
('p2', 'test2', 'ICT', 'lovely one', '2022-12-12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `project_member`
--

CREATE TABLE `project_member` (
  `user_code` varchar(20) NOT NULL,
  `project_code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `project_member`
--

INSERT INTO `project_member` (`user_code`, `project_code`) VALUES
('2', 'p2'),
('3', 'p1'),
('4', 'p1'),
('1', 'p1'),
('1', 'p2'),
('6', 'p1'),
('6', 'p1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sprint`
--

CREATE TABLE `sprint` (
  `project_code` varchar(20) NOT NULL,
  `sprint_code` varchar(20) NOT NULL,
  `sprint_start_date` date NOT NULL,
  `sprint_due_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `sprint`
--

INSERT INTO `sprint` (`project_code`, `sprint_code`, `sprint_start_date`, `sprint_due_date`) VALUES
('p1', 's1', '2022-12-11', '2022-12-25'),
('p1', 's2', '2022-12-25', '2022-12-31'),
('p2', 's3', '2022-12-14', '2022-12-21');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `task`
--

CREATE TABLE `task` (
  `task_code` varchar(20) NOT NULL,
  `task_name` varchar(200) NOT NULL,
  `task_start_date` date NOT NULL,
  `task_due_date` date NOT NULL,
  `task_description` varchar(200) NOT NULL,
  `task_priority` varchar(20) NOT NULL,
  `user_code` varchar(20) NOT NULL,
  `sprint_code` varchar(20) NOT NULL,
  `state` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `task`
--

INSERT INTO `task` (`task_code`, `task_name`, `task_start_date`, `task_due_date`, `task_description`, `task_priority`, `user_code`, `sprint_code`, `state`) VALUES
('t1', 'tasktest1', '2022-12-13', '2022-12-14', 'lovely one', 'high', '1', 's1', 'in progress'),
('t2', 'tasktest2', '2022-11-10', '2022-11-14', 'lovely one', 'low', '3', 's1', 'in progress'),
('t3', 'tasktest3', '2022-12-14', '2022-12-15', 'lovely one', 'high', '1', 's3', 'in progress'),
('t4', 'tasktest4', '2022-12-24', '2022-12-28', 'lovely one', 'low', '1', 's2', 'in progress');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `user_code` varchar(20) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_mail` varchar(40) NOT NULL,
  `user_dob` date NOT NULL,
  `user_password` varchar(20) NOT NULL,
  `user_description` varchar(100) NOT NULL,
  `user_avatar` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`user_code`, `user_name`, `user_mail`, `user_dob`, `user_password`, `user_description`, `user_avatar`) VALUES
('1', 'AnDoan', 'andt.bi11-002@st.usth.edu.vn', '2002-01-24', '123321', 'Vietnamien', 'NA'),
('2', 'CuongDinh', 'cuongdt.ba10-007@st.usth.edu.vn', '2001-01-01', '123321', 'NA', 'NA'),
('3', 'ThangNguyen', 'thangnt.ba10-057@st.usth.edu.vn', '2001-02-03', '123333', 'NA', 'NA'),
('4', 'SonDinh', 'sondq.ba10-050@st.usth.edu.vn', '2001-02-02', '123123', 'NA', 'NA'),
('5', 'PhuongNguyen', 'phuongnh.ba10-046@st.usth.edu.vn', '2001-10-10', '123111', 'NA', 'NA'),
('6', 'ChiDo', 'chidh.bi11-043@st.usth.edu.vn', '2002-05-06', '111222', 'NA', 'NA'),
('a', '[value-2]', '[value-3]', '0000-00-00', '[value-5]', '[value-6]', '[value-7]');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `attached_file`
--
ALTER TABLE `attached_file`
  ADD PRIMARY KEY (`file_code`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_code`),
  ADD KEY `fk_user1` (`user_code`),
  ADD KEY `fk_task1` (`task_code`);

--
-- Chỉ mục cho bảng `enviroment`
--
ALTER TABLE `enviroment`
  ADD PRIMARY KEY (`enviroment_type`);

--
-- Chỉ mục cho bảng `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_code`);

--
-- Chỉ mục cho bảng `label`
--
ALTER TABLE `label`
  ADD KEY `task_code` (`task_code`);

--
-- Chỉ mục cho bảng `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_code`);

--
-- Chỉ mục cho bảng `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_code`);

--
-- Chỉ mục cho bảng `sprint`
--
ALTER TABLE `sprint`
  ADD PRIMARY KEY (`sprint_code`);

--
-- Chỉ mục cho bảng `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_code`),
  ADD KEY `fk_sprint` (`sprint_code`),
  ADD KEY `fk_user7` (`user_code`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_code`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `attached_file`
--
ALTER TABLE `attached_file`
  ADD CONSTRAINT `fk_task` FOREIGN KEY (`task_code`) REFERENCES `task` (`task_code`),
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_code`) REFERENCES `user` (`user_code`);

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_task1` FOREIGN KEY (`task_code`) REFERENCES `task` (`task_code`),
  ADD CONSTRAINT `fk_user1` FOREIGN KEY (`user_code`) REFERENCES `user` (`user_code`);

--
-- Các ràng buộc cho bảng `enviroment`
--
ALTER TABLE `enviroment`
  ADD CONSTRAINT `fk_user2` FOREIGN KEY (`user_code`) REFERENCES `user` (`user_code`);

--
-- Các ràng buộc cho bảng `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `fk_task2` FOREIGN KEY (`task_code`) REFERENCES `task` (`task_code`),
  ADD CONSTRAINT `fk_user3` FOREIGN KEY (`user_code`) REFERENCES `user` (`user_code`);

--
-- Các ràng buộc cho bảng `label`
--
ALTER TABLE `label`
  ADD CONSTRAINT `fk_task3` FOREIGN KEY (`task_code`) REFERENCES `task` (`task_code`);

--
-- Các ràng buộc cho bảng `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `fk_his` FOREIGN KEY (`history_code`) REFERENCES `history` (`history_code`),
  ADD CONSTRAINT `fk_user4` FOREIGN KEY (`user_code`) REFERENCES `user` (`user_code`);

--
-- Các ràng buộc cho bảng `project_member`
--
ALTER TABLE `project_member`
  ADD CONSTRAINT `fk_project` FOREIGN KEY (`project_code`) REFERENCES `project` (`project_code`),
  ADD CONSTRAINT `fk_user5` FOREIGN KEY (`user_code`) REFERENCES `user` (`user_code`);

--
-- Các ràng buộc cho bảng `sprint`
--
ALTER TABLE `sprint`
  ADD CONSTRAINT `fk_project1` FOREIGN KEY (`project_code`) REFERENCES `project` (`project_code`);

--
-- Các ràng buộc cho bảng `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `fk_sprint` FOREIGN KEY (`sprint_code`) REFERENCES `sprint` (`sprint_code`),
  ADD CONSTRAINT `fk_user7` FOREIGN KEY (`user_code`) REFERENCES `user` (`user_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
