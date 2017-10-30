/*
Navicat MySQL Data Transfer

Source Server         : student
Source Server Version : 50522
Source Host           : localhost:3306
Source Database       : kaoshi

Target Server Type    : MYSQL
Target Server Version : 50522
File Encoding         : 65001

Date: 2017-10-30 16:17:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_album
-- ----------------------------
DROP TABLE IF EXISTS `sys_album`;
CREATE TABLE `sys_album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_by` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `del_flag` bit(1) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `update_by` int(11) NOT NULL,
  `update_date` datetime NOT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `md5` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `origin_path` varchar(255) DEFAULT NULL,
  `size` bigint(20) DEFAULT NULL,
  `thumb_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_album
-- ----------------------------

-- ----------------------------
-- Table structure for sys_attach
-- ----------------------------
DROP TABLE IF EXISTS `sys_attach`;
CREATE TABLE `sys_attach` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_by` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `del_flag` bit(1) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `update_by` int(11) NOT NULL,
  `update_date` datetime NOT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `md5` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `size` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_attach
-- ----------------------------

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_by` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `del_flag` bit(1) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `update_by` int(11) NOT NULL,
  `update_date` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
INSERT INTO `sys_dict` VALUES ('1', '1', '2017-02-03 11:13:29', '\0', null, '1', '2017-02-03 11:13:29', '无', '类型11', '99', 'type1', '0');
INSERT INTO `sys_dict` VALUES ('2', '1', '2017-10-23 10:50:20', '\0', null, '1', '2017-10-23 10:50:20', 'fdf', 'fdf', '12', 'type02', '11');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_by` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `del_flag` bit(1) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `update_by` int(11) NOT NULL,
  `update_date` datetime NOT NULL,
  `href` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL,
  `permission` int(11) DEFAULT NULL,
  `symbol` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('1', '1', '2017-01-27 20:05:46', '\0', null, '1', '2017-01-27 20:05:56', null, 'sys', '基础模块', '0', ',0,', '99', null, '1', '');
INSERT INTO `sys_menu` VALUES ('2', '1', '2017-01-27 20:05:46', '\0', null, '1', '2017-01-27 20:05:56', null, null, '菜单管理', '1', ',0,1,', '99', null, '1', '');
INSERT INTO `sys_menu` VALUES ('3', '1', '2017-01-27 20:05:46', '\0', null, '1', '2017-01-29 22:19:04', 'menu/index', '', '菜单管理', '2', ',0,1,3,', '99', '', '15', 'sys:menu');
INSERT INTO `sys_menu` VALUES ('4', '1', '2017-01-27 20:05:46', '\0', null, '1', '2017-01-27 20:05:56', null, null, '角色管理', '1', ',0,1,', '99', null, '1', '');
INSERT INTO `sys_menu` VALUES ('5', '1', '2017-01-27 20:05:46', '\0', null, '1', '2017-02-04 09:44:18', 'role/index', '', '角色管理', '4', ',0,1,5,', '99', '', '15', 'sys:role');
INSERT INTO `sys_menu` VALUES ('6', '1', '2017-01-27 20:05:46', '\0', null, '1', '2017-01-27 20:05:56', null, null, '用户管理', '1', ',0,1,', '99', null, '1', '');
INSERT INTO `sys_menu` VALUES ('7', '1', '2017-01-27 20:05:46', '\0', null, '1', '2017-02-04 09:44:38', 'user/index', '', '系统用户', '6', ',0,1,7,', '99', '', '15', 'sys:user');
INSERT INTO `sys_menu` VALUES ('8', '1', '2017-01-27 20:05:46', '\0', null, '1', '2017-01-27 20:05:56', null, null, '数据字典', '1', ',0,1,', '99', null, '1', '');
INSERT INTO `sys_menu` VALUES ('9', '1', '2017-01-27 20:05:46', '\0', null, '1', '2017-02-04 09:44:44', 'dict/index', 'mainframe', '字典管理', '8', ',0,1,9,', '99', 'mainframe', '15', 'sys:dict');
INSERT INTO `sys_menu` VALUES ('10', '1', '2017-09-27 09:05:05', '', '', '1', '2017-09-27 11:03:02', '', 'sys', '成绩管理', '0', ',10,', '99', 'mainFrame', '3', '1');
INSERT INTO `sys_menu` VALUES ('11', '1', '2017-09-27 10:45:45', '', '', '1', '2017-09-27 11:02:59', 'chengji/index', '', '查看错题本', '10', ',10,11,', '12', 'mainFrame', '15', '12');
INSERT INTO `sys_menu` VALUES ('12', '1', '2017-09-27 11:04:28', '', '', '1', '2017-09-27 23:52:22', '', 'sys', '题目管理', '0', ',12,', '99', 'mainFrame', '15', '11');
INSERT INTO `sys_menu` VALUES ('13', '1', '2017-09-27 11:06:30', '', '', '1', '2017-09-27 23:52:18', 'questions/SingleQuestions', '', '单选题', '12', '12,13,', '12', 'mainFrame', '15', '13');
INSERT INTO `sys_menu` VALUES ('14', '1', '2017-09-29 11:45:50', '\0', '', '1', '2017-09-29 11:45:50', '', 'sys', '考试模块', '0', '14,', '99', 'mainFrame', '15', '');
INSERT INTO `sys_menu` VALUES ('15', '1', '2017-09-30 11:23:10', '\0', '', '1', '2017-10-01 11:46:41', '', '', '考试管理', '14', '14,15,', '99', 'mainFrame', '15', '');
INSERT INTO `sys_menu` VALUES ('16', '1', '2017-10-01 11:46:17', '\0', '', '1', '2017-10-24 12:14:50', 'zhuti/index', '', '主题管理', '15', '14,15,16,', '99', '_parent', '15', '');
INSERT INTO `sys_menu` VALUES ('17', '1', '2017-10-23 16:25:24', '\0', '', '1', '2017-10-23 16:25:24', 'title/index', '', '题目管理', '15', '14,15,17,', '99', 'mainFrame', '15', '');
INSERT INTO `sys_menu` VALUES ('18', '1', '2017-10-25 09:45:48', '\0', '用于考试成绩管理', '1', '2017-10-25 09:45:48', '', '', '成绩管理', '14', '14,18,', '99', 'mainFrame', '15', '');
INSERT INTO `sys_menu` VALUES ('19', '1', '2017-10-25 09:48:09', '\0', '', '1', '2017-10-25 09:48:09', 'score/index', '', '成绩管理', '18', '14,18,19,', '99', 'mai', '15', '');
INSERT INTO `sys_menu` VALUES ('20', '1', '2017-10-25 11:15:33', '\0', '专门管理错题', '1', '2017-10-25 11:15:33', '', '', '错题本管理', '14', '14,20,', '99', 'mainFrame', '15', '');
INSERT INTO `sys_menu` VALUES ('21', '1', '2017-10-25 11:20:05', '\0', '', '1', '2017-10-25 14:21:10', 'mistaken/index', '', '错题本', '20', '14,20,21,', '99', 'mainFrame', '15', '');

-- ----------------------------
-- Table structure for sys_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_by` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `del_flag` bit(1) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `update_by` int(11) NOT NULL,
  `update_date` datetime NOT NULL,
  `permission` int(11) DEFAULT NULL,
  `menu_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdh0pa1l2c4t5xnewwsev2yyx2` (`menu_id`),
  KEY `FKk9ru2110pc5m5ja96jh0dth0j` (`role_id`),
  CONSTRAINT `FKdh0pa1l2c4t5xnewwsev2yyx2` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu` (`id`),
  CONSTRAINT `FKk9ru2110pc5m5ja96jh0dth0j` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_permission
-- ----------------------------
INSERT INTO `sys_permission` VALUES ('1', '1', '2017-09-27 09:16:19', '\0', null, '1', '2017-09-27 09:16:19', '0', '1', '2');
INSERT INTO `sys_permission` VALUES ('2', '1', '2017-09-27 09:16:19', '\0', null, '1', '2017-09-27 09:16:19', '0', '2', '2');
INSERT INTO `sys_permission` VALUES ('3', '1', '2017-09-27 09:16:19', '\0', null, '1', '2017-09-27 09:16:19', '15', '3', '2');
INSERT INTO `sys_permission` VALUES ('4', '1', '2017-09-27 09:16:19', '\0', null, '1', '2017-09-27 09:16:19', '0', '4', '2');
INSERT INTO `sys_permission` VALUES ('5', '1', '2017-09-27 09:16:19', '\0', null, '1', '2017-09-27 09:16:19', '0', '5', '2');
INSERT INTO `sys_permission` VALUES ('6', '1', '2017-09-27 09:16:19', '\0', null, '1', '2017-09-27 09:16:19', '0', '6', '2');
INSERT INTO `sys_permission` VALUES ('7', '1', '2017-09-27 09:16:19', '\0', null, '1', '2017-09-27 09:16:19', '0', '7', '2');
INSERT INTO `sys_permission` VALUES ('8', '1', '2017-09-27 09:16:19', '\0', null, '1', '2017-09-27 09:16:19', '0', '8', '2');
INSERT INTO `sys_permission` VALUES ('9', '1', '2017-09-27 09:16:19', '\0', null, '1', '2017-09-27 09:16:19', '0', '9', '2');
INSERT INTO `sys_permission` VALUES ('10', '1', '2017-09-27 09:16:19', '\0', null, '1', '2017-09-27 09:16:19', '0', '10', '2');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_by` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `del_flag` bit(1) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `update_by` int(11) NOT NULL,
  `update_date` datetime NOT NULL,
  `ename` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `usable` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('1', '1', '2017-01-27 20:06:58', '\0', null, '1', '2017-01-27 20:07:06', 'ADMINISTRATOR', '超级管理员', '');
INSERT INTO `sys_role` VALUES ('2', '1', '2017-09-27 09:16:19', '', '', '1', '2017-09-27 09:39:15', 'usr', '用户', '');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_by` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `del_flag` bit(1) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `update_by` int(11) NOT NULL,
  `update_date` datetime NOT NULL,
  `avatar` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `login_date` datetime DEFAULT NULL,
  `login_flag` bit(1) DEFAULT NULL,
  `login_ip` varchar(255) DEFAULT NULL,
  `login_name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', '1', '2017-01-27 20:08:25', '\0', null, '1', '2017-01-27 20:08:31', null, 'test@sharemarking.com', '2017-01-27 20:08:56', null, null, 'admin', '15217345102', 'admin', '21232f297a57a5a743894a0e4a801fc3');

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  KEY `FKhh52n8vd4ny9ff4x9fb8v65qx` (`role_id`),
  KEY `FKb40xxfch70f5qnyfw8yme1n1s` (`user_id`),
  CONSTRAINT `FKb40xxfch70f5qnyfw8yme1n1s` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`),
  CONSTRAINT `FKhh52n8vd4ny9ff4x9fb8v65qx` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('1', '1');

-- ----------------------------
-- Table structure for tbl_mistaken
-- ----------------------------
DROP TABLE IF EXISTS `tbl_mistaken`;
CREATE TABLE `tbl_mistaken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `Theme` int(11) NOT NULL,
  `real_as` varchar(10) CHARACTER SET utf8mb4 NOT NULL COMMENT '用户答案',
  `title` int(11) NOT NULL,
  `create_by` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `del_flag` bit(1) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `update_by` int(11) NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `User_id` (`user`),
  KEY `Theme_id` (`Theme`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_mistaken
-- ----------------------------
INSERT INTO `tbl_mistaken` VALUES ('1', '2', '3', 'A', '5', '1', '2017-10-25 14:58:31', '\0', null, '1', '2017-10-24 14:58:36');

-- ----------------------------
-- Table structure for tbl_score
-- ----------------------------
DROP TABLE IF EXISTS `tbl_score`;
CREATE TABLE `tbl_score` (
  `id` int(11) NOT NULL,
  `score` int(20) NOT NULL,
  `create_by` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `del_flag` bit(1) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `update_by` int(11) NOT NULL,
  `update_date` datetime NOT NULL,
  `theme` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `theme_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_score
-- ----------------------------
INSERT INTO `tbl_score` VALUES ('1', '20', '1', '2017-10-12 09:58:07', '\0', null, '1', '2017-10-11 09:58:26', '2', '2', null, null);

-- ----------------------------
-- Table structure for tbl_theme
-- ----------------------------
DROP TABLE IF EXISTS `tbl_theme`;
CREATE TABLE `tbl_theme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_by` varchar(20) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `del_flag` bit(1) DEFAULT NULL,
  `remarks` varchar(50) DEFAULT NULL,
  `update_by` int(11) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `Theme_name` varchar(50) DEFAULT NULL,
  `creat_me` varchar(255) DEFAULT NULL,
  `create_user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_theme
-- ----------------------------
INSERT INTO `tbl_theme` VALUES ('1', null, '2017-10-21 15:17:42', '\0', null, null, null, '历史', null, null);
INSERT INTO `tbl_theme` VALUES ('2', '1', '2017-10-23 10:52:59', '\0', null, '1', '2017-10-23 10:52:59', '英语', null, null);
INSERT INTO `tbl_theme` VALUES ('3', '1', '2017-10-23 16:02:19', '\0', null, '1', '2017-10-23 16:02:19', '生物', null, null);
INSERT INTO `tbl_theme` VALUES ('4', '1', '2017-10-23 17:47:12', '\0', null, '1', '2017-10-23 17:47:12', '化学', null, null);

-- ----------------------------
-- Table structure for tbl_title
-- ----------------------------
DROP TABLE IF EXISTS `tbl_title`;
CREATE TABLE `tbl_title` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_by` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `del_flag` bit(1) NOT NULL,
  `remarks` varchar(225) DEFAULT NULL,
  `update_by` int(11) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `title_name` varchar(100) DEFAULT NULL,
  `Theme` int(11) DEFAULT NULL,
  `type` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `title_as_1` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `title_as_2` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `title_as_3` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `title_as_4` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `title_as_5` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_romanian_ci NOT NULL,
  `title_as_6` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `Title_real_as` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_title
-- ----------------------------
INSERT INTO `tbl_title` VALUES ('2', '1', '2017-10-24 09:51:37', '', null, '1', '2017-10-25 23:41:58', '测试答案', null, null, '', '', '', '', '', '', null);
INSERT INTO `tbl_title` VALUES ('3', '1', '2017-10-24 10:23:58', '\0', null, '1', '2017-10-24 10:23:58', '方法', null, null, '', '', '', '', '', '', null);
INSERT INTO `tbl_title` VALUES ('4', '1', '2017-10-24 10:35:18', '\0', null, '1', '2017-10-24 10:35:18', '测试021', null, null, '的方法是否', '反对法d\'f', '的方法对付', '反对法', '反对法', '幅度', null);
INSERT INTO `tbl_title` VALUES ('5', '1', '2017-10-24 10:42:19', '\0', null, '1', '2017-10-24 10:42:19', '苟富贵', null, null, '', '', '', '', '', '', null);
INSERT INTO `tbl_title` VALUES ('6', '1', '2017-10-24 10:44:31', '', null, '1', '2017-10-25 15:21:56', '111hhh', null, null, '', '', '', '', '', '', null);
INSERT INTO `tbl_title` VALUES ('7', '1', '2017-10-24 11:15:38', '', null, '1', '2017-10-25 15:21:51', '嘀咕嘀咕', '1', '单选', '', '', '', '', '', '', null);
INSERT INTO `tbl_title` VALUES ('14', '1', '2017-10-25 09:35:20', '', null, '1', '2017-10-25 23:42:05', 'fdf', '2', '判断', '', '', '', '', '', '', 'A');
INSERT INTO `tbl_title` VALUES ('15', '1', '2017-10-25 09:35:37', '\0', null, '1', '2017-10-25 09:35:37', 'ggggg', '1', '判断', '', '', '', '', '', '', 'C');
