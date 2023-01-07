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

export const SidebarData = [
  {
    path:'/',
    title:'Home',
    icon:<FaTh/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />
  },
  {
    path:'/about',
    title:'About',
    icon:<FaUserAlt/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

  },
  {
    path:'/contact',
    title:'Contact',
    icon:<FaPhone/>
  },
  {
    path:'/terms',
    title:'Terms & Conditions',
    icon:<AiFillCheckSquare/>
  },
  {
    path:'/',
    title:'Categories',
    icon:<FaBuffer/>,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        path:'/categories/Android',
        title:'Android',
        icon:<FaLinux/>
      },
      {
        path:'/categories/IOS',
        title:'IOS',
        icon:<FaLinux/>
      },
      {
        path:'/categories/Windows',
        title:'Windows',
        icon:<FaLinux/>
      },
      {
        path:'/categories/Linux',
        title:'Linux',
        icon:<FaLinux/>
      }
    
   
    ]
  }]
