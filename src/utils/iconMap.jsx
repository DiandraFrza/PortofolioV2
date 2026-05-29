/** @format */

import { SiHtml5, SiCss3, SiJavascript, SiPhp, SiNodedotjs, SiReact, SiVuedotjs, SiLaravel, SiCodeigniter, SiGit, SiGithub, SiVercel, SiFigma, SiCanva, SiLaragon, SiXampp, SiGamemaker, SiTypescript, SiPython, SiMysql, SiPostgresql, SiMongodb, SiFirebase, SiSupabase, SiDocker, SiKubernetes, SiAngular, SiNextdotjs, SiNuxtdotjs, SiSvelte, SiRedis, SiGraphql, SiTailwindcss, SiBootstrap, SiWebpack, SiVite, SiNpm, SiYarn, SiJest, SiPostman, SiLinux, SiSlack, SiNotion, SiTrello, SiAsana, SiJira } from "react-icons/si";

import { FiDatabase, FiShare2, FiFileText, FiCode, FiGitBranch, FiGitCommit, FiGitPullRequest, FiServer, FiCpu, FiPackage, FiSettings, FiTool, FiZap, FiBook, FiCamera, FiVideo, FiMusic, FiMap, FiBell, FiMail, FiMessageSquare, FiPhone, FiNavigation, FiSearch, FiLock, FiUnlock, FiKey, FiStar, FiHeart, FiThumbsUp } from "react-icons/fi";

// Icon mapping object - stores all available icons
export const iconMap = {
  // Simple Icons (SI)
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiPhp,
  SiNodedotjs,
  SiReact,
  SiVuedotjs,
  SiLaravel,
  SiCodeigniter,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
  SiCanva,
  SiLaragon,
  SiXampp,
  SiGamemaker,
  SiTypescript,
  SiPython,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiSupabase,
  SiDocker,
  SiKubernetes,
  SiAngular,
  SiNextdotjs,
  SiNuxtdotjs,
  SiSvelte,
  SiRedis,
  SiGraphql,
  SiTailwindcss,
  SiBootstrap,
  SiWebpack,
  SiVite,
  SiNpm,
  SiYarn,
  SiJest,
  SiPostman,
  SiLinux,
  SiSlack,
  SiNotion,
  SiTrello,
  SiAsana,
  SiJira,

  // Feather Icons (FI)
  FiDatabase,
  FiShare2,
  FiFileText,
  FiCode,
  FiGitBranch,
  FiGitCommit,
  FiGitPullRequest,
  FiServer,
  FiCpu,
  FiPackage,
  FiSettings,
  FiTool,
  FiZap,
  FiBook,
  FiCamera,
  FiVideo,
  FiMusic,
  FiMap,
  FiBell,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiNavigation,
  FiSearch,
  FiLock,
  FiUnlock,
  FiKey,
  FiStar,
  FiHeart,
  FiThumbsUp,
};

// Get list of available icon names
export const getAvailableIcons = () => Object.keys(iconMap);

// Get icon component by name
export const getIconComponent = (iconName, size = 18) => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) {
    return <FiCode size={size} />;
  }
  return <IconComponent size={size} />;
};

// Get all SI icons
export const getSiIcons = () => {
  return Object.keys(iconMap).filter((key) => key.startsWith("Si"));
};

// Get all FI icons
export const getFiIcons = () => {
  return Object.keys(iconMap).filter((key) => key.startsWith("Fi"));
};
