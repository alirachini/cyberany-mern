import React from 'react';
import * as RiIcons from 'react-icons/ri';
import {
    FaBars,
    FaPhone,
    FaTh, FaUserAlt,FaBuffer,FaLinux
  
  } from "react-icons/fa"
  import {
    AiFillCheckSquare
  
  } from "react-icons/ai"

export const DashboardData = [
  {
    path:'/login/dashboard/view',
    title:'Blogs',
    icon:<FaTh/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />
  },
  {
    path:'/login/dashboard/comments',
    title:'Comments',
    icon:<FaUserAlt/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

  },
  {
    path:'/login/dashboard/contact',
    title:'Contact',
    icon:<FaPhone/>
  },
  {
    path:'/login/dashboard/about',
    title:'About',
    icon:<AiFillCheckSquare/>
  },
  {
    path:'/login/cat',
    title:'Categories',
    icon:<FaBuffer/>,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,


  }]