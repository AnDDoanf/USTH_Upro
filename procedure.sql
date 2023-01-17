DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ptp`(IN `code` VARCHAR(20))
SELECT * FROM task
RIGHT JOIN sprint
ON task.sprint_code = sprint.sprint_code
RIGHT JOIN project
ON sprint.project_code = project.project_code
WHERE project.project_code = code$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pu`(IN `code` VARCHAR(20))
SELECT * FROM project 
RIGHT JOIN project_member 
ON project_member.project_code = project.project_code
RIGHT JOIN user
ON project_member.user_code = user.user_code
WHERE user.user_code = code$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `up`(IN `code` VARCHAR(20))
SELECT user.user_name, project_member.project_code FROM user
RIGHT JOIN project_member 
ON user.user_code = project_member.user_code
WHERE project_member.project_code = code$$
DELIMITER ;
