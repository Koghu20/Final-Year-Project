import { db } from "../../firebase";

import { collection, query, where, onSnapshot } from "firebase/firestore";

// const q = query(collection(db, "cities"), where("state", "==", "CA"));

const mock = {
  bc: {
    Selangor: 0,
    Perak: 0,
    Melaka: 0,
    "Negeri Sembilan": 0,
    "Kuala Lumpur": 0,
    Pahang: 0,
    Terrenganu: 0,
  },

  tasks: [
    {
      id: 0,
      type: "Meeting",
      title: "Meeting with Andrew Piker",
      time: "9:00",
    },
    {
      id: 1,
      type: "Call",
      title: "Call with HT Company",
      time: "12:00",
    },
    {
      id: 2,
      type: "Meeting",
      title: "Meeting with Zoe Alison",
      time: "14:00",
    },
    {
      id: 3,
      type: "Interview",
      title: "Interview with HR",
      time: "15:00",
    },
  ],
  bigStat: [
    {
      product: "Light Blue",
      total: {
        monthly: 4232,
        weekly: 1465,
        daily: 199,
        percent: { value: 3.7, profit: false },
      },
      color: "primary",
      registrations: {
        monthly: { value: 830, profit: false },
        weekly: { value: 215, profit: true },
        daily: { value: 33, profit: true },
      },
      bounce: {
        monthly: { value: 4.5, profit: false },
        weekly: { value: 3, profit: true },
        daily: { value: 3.25, profit: true },
      },
    },
    {
      product: "Sing App",
      total: {
        monthly: 754,
        weekly: 180,
        daily: 27,
        percent: { value: 2.5, profit: true },
      },
      color: "warning",
      registrations: {
        monthly: { value: 32, profit: true },
        weekly: { value: 8, profit: true },
        daily: { value: 2, profit: false },
      },
      bounce: {
        monthly: { value: 2.5, profit: true },
        weekly: { value: 4, profit: false },
        daily: { value: 4.5, profit: false },
      },
    },
    {
      product: "RNS",
      total: {
        monthly: 1025,
        weekly: 301,
        daily: 44,
        percent: { value: 3.1, profit: true },
      },
      color: "secondary",
      registrations: {
        monthly: { value: 230, profit: true },
        weekly: { value: 58, profit: false },
        daily: { value: 15, profit: false },
      },
      bounce: {
        monthly: { value: 21.5, profit: false },
        weekly: { value: 19.35, profit: false },
        daily: { value: 10.1, profit: true },
      },
    },
  ],
  notifications: [
    {
      id: 0,
      icon: "thumbs-up",
      color: "primary",
      content:
        'Ken <span className="fw-semi-bold">accepts</span> your invitation',
    },
    {
      id: 1,
      icon: "file",
      color: "success",
      content: "Report from LT Company",
    },
    {
      id: 2,
      icon: "envelope",
      color: "danger",
      content: '4 <span className="fw-semi-bold">Private</span> Mails',
    },
    {
      id: 3,
      icon: "comment",
      color: "success",
      content: '3 <span className="fw-semi-bold">Comments</span> to your Post',
    },
    {
      id: 4,
      icon: "cog",
      color: "light",
      content: 'New <span className="fw-semi-bold">Version</span> of RNS app',
    },
    {
      id: 5,
      icon: "bell",
      color: "info",
      content:
        '15 <span className="fw-semi-bold">Notifications</span> from Social Apps',
    },
  ],
  table: [
    {
      id: 0,
      name: "Mark Otto",
      email: "ottoto@wxample.com",
      breakdown: "No cooling",
      date: "11 May 2017",
      city: "Selangor",
      status: "Sent",
    },
    {
      id: 1,
      name: "Jacob Thornton",
      email: "thornton@wxample.com",
      breakdown: "Unknown Breakdown",
      date: "4 Jun 2017",
      city: "Pahang",
      status: "Sent",
    },
    {
      id: 2,
      name: "Larry the Bird",
      email: "bird@wxample.com",
      breakdown: "Dispencing problem",
      date: "27 Aug 2017",
      city: "Perak",
      status: "Pending",
    },
    {
      id: 3,
      name: "Joseph May",
      email: "josephmay@wxample.com",
      breakdown: "Not turning on",
      date: "19 Feb 2018",
      city: "Johor",
      status: "Declined",
    },
    {
      id: 4,
      name: "Peter Horadnia",
      email: "horadnia@wxample.com",
      breakdown: "Dispencing Error",
      date: "1 Mar 2018",
      city: "KL",
      status: "Sent",
    },
  ].map((item) => {
    item.openStatus = false;
    return item;
  }),
};

export default mock;
