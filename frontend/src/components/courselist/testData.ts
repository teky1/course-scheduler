import { Course } from "../../types/api";

export let testCourses: Course[] = [
  {
    "_id": "JOEL200",
    "name": "Joel Studies",
    "reqs": {
      "Prerequisite": "Minimum grade of C- in JOEL101 and JOEL100",
      "Restriction": "Must be a Joel Studies major to register",
    },
    "desc_notes": "",
    "desc": "A very important class that is all about the study of Joel. We will go very much in depth into many things that involve him and things like that because this is a real class that is super interesting and good.",
    "gen_eds": "DSSP, DVUP",
    "min_credits": 3,
    "max_credits": 5,
    "sections": [
      {
        "section_id": "0101",
        "total_seats": 99,
        "open_seats": 4,
        "waitlist": 23,
        "holdfile": 10,
        "instructors": [
          "Lauren Rabe"
        ],
        "footnote_marked": true,
        "meetings": [
          {
            "time": "MW 9:00am - 9:50am",
            "location": "PFR 1111",
            "type": "",
            "message": ""
          }
        ],
        "non_standard_dates": ""
      },
      {
        "section_id": "0102",
        "total_seats": 99,
        "open_seats": 4,
        "waitlist": 23,
        "holdfile": 10,
        "instructors": [
          "Joel Chemmanur",
          "Michel Cukier"
        ],
        "footnote_marked": true,
        "meetings": [
          {
            "time": "MW 9:00am - 9:50am",
            "location": "PFR 1111",
            "type": "",
            "message": ""
          }
        ],
        "non_standard_dates": ""
      }
    ]
  },
  {
    "_id": "ARAV376",
    "name": "Aarav Studies",
    "reqs": {
      "Prerequisite": "Mininum of C- in JOEL200 and AMAN201",
      "Restriction": "Must be chill",
    },
    "desc_notes": "",
    "desc": "Study of the coolest guy on campus",
    "gen_eds": "DVCC, DVUP, FSAW, FSPW, SCIS",
    "min_credits": 8,
    "max_credits": 18,
    "sections": [
      {
        "section_id": "0101",
        "total_seats": 99,
        "open_seats": 1,
        "waitlist": 87364,
        "holdfile": 10234,
        "instructors": [
          "Raunak Banerjee"
        ],
        "footnote_marked": true,
        "meetings": [
          {
            "time":"MWF 10:00am - 5:50pm",
            "location": "IRB 0324",
            "type": "",
            "message": ""
          }
        ],
        "non_standard_dates": ""
      }
    ]
  }
  ,
  {
    "_id": "AMAN201",
    "name": "Aman Etudes",
    "reqs": {
      "Prerequisite": "Minimum grade of C- in Les passions des Amons",
      "Restriction": "Must be a Aman Studies major to register",
    },
    "desc_notes": "",
    "desc": "C'est une cours tres interessant et vous allez apprendre beaucoup avec une fountaine de passion. Ad astra per aspera, a bientot!",
    "gen_eds": "DVCC",
    "min_credits": 3,
    "max_credits": 5,
    "sections": [
      {
        "section_id": "0101",
        "total_seats": 99,
        "open_seats": 4,
        "waitlist": 23,
        "holdfile": 10,
        "instructors": [
          "Sela Alonso"
        ],
        "footnote_marked": true,
        "meetings": [
          {
            "time":"TuTh 9:00am - 9:50am",
            "location": "CSI 2001",
            "type": "",
            "message": ""
          }
        ],
        "non_standard_dates": ""
      }
    ]
  }
  ,
    {
        "_id": "HACS101",
        "name": "Applied Cybersecurity Foundations",
        "reqs": {
          "Prerequisite": "Minimum grade of C- in HACS100.",
          "Restriction": "Must be a second-semester student in the ACES (Advanced Cybersecurity Experience for Students) Living-Learning Program."
        },
        "desc_notes": "",
        "desc": "Prepares students for team research that will be conducted in HACS 200. Students gain an understanding across the breadth of cybersecurity including system monitoring, networking basics and penetration testing. An applied approach to statistics is also included to prepare students to assess the data collected for their research projects. The course is conducted with a hands-on approach applying virtual environments to practice the concepts learned in the technical lectures each week. ",
        "gen_eds": "",
        "min_credits": 2,
        "max_credits": null,
        "sections": [
            {
              "section_id": "0101",
              "total_seats": 35,
              "open_seats": 1,
              "waitlist": 0,
              "holdfile": 0,
              "instructors": [
                "Michel Cukier"
              ],
              "footnote_marked": false,
              "meetings": [
                {
                  "time": "MW 9:00am - 9:50am",
                  "location": "PF 1111",
                  "type": "",
                  "message": ""
                }
              ],
              "non_standard_dates": ""
            },
            {
              "section_id": "0201",
              "total_seats": 35,
              "open_seats": 3,
              "waitlist": 0,
              "holdfile": 0,
              "instructors": [
                "Michel Cukier"
              ],
              "footnote_marked": false,
              "meetings": [
                {
                  "time": "MW 10:00am - 10:50am",
                  "location": "PFR 1111",
                  "type": "",
                  "message": ""
                }
              ],
              "non_standard_dates": ""
            }
          ]
    },
    {
      "_id": "CMSC216",
      "name": "Introduction to Computer Systems",
      "reqs": {
        "Prerequisite": "Minimum grade of C- in CMSC132; and minimum grade of C- in MATH141.",
        "Restriction": "Must be in a major within the CMNS-Computer Science department; or must be in Engineering Computer program; or must be in the Computer Science Minor program; and Permission of CMSC - Computer Science department."
      },
      "desc_notes": "",
      "desc": "Introduction to the interaction between user programs and the operating system/hardware. Major topics include C programming, introductory systems programming, and assembly language. Other concepts covered include UNIX, machine data representation, thread management, optimization, and virtual memory. Programming is done in the Linux Environment. ",
      "gen_eds": "",
      "min_credits": 4,
      "max_credits": null,
      "sections": [
        {
          "section_id": "0101",
          "total_seats": 23,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Christopher Kauffman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 9:30am - 10:45am",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 9:00am - 9:50am",
              "location": "CSI 1122",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0102",
          "total_seats": 23,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Christopher Kauffman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 9:30am - 10:45am",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 10:00am - 10:50am",
              "location": "CSI 1122",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0103",
          "total_seats": 23,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Christopher Kauffman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 9:30am - 10:45am",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 10:00am - 10:50am",
              "location": "CSI 2107",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0104",
          "total_seats": 30,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Christopher Kauffman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 9:30am - 10:45am",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 11:00am - 11:50am",
              "location": "CSI 2120",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0105",
          "total_seats": 30,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Christopher Kauffman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 9:30am - 10:45am",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 2:00pm - 2:50pm",
              "location": "CSI 3118",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0107",
          "total_seats": 30,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Christopher Kauffman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 9:30am - 10:45am",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 3:00pm - 3:50pm",
              "location": "CSI 3120",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0108",
          "total_seats": 30,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Christopher Kauffman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 9:30am - 10:45am",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 4:00pm - 4:50pm",
              "location": "CSI 3120",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0202",
          "total_seats": 30,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Christopher Kauffman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 11:00am - 12:15pm",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 9:00am - 9:50am",
              "location": "CSI 3120",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0203",
          "total_seats": 30,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Christopher Kauffman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 11:00am - 12:15pm",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 9:00am - 9:50am",
              "location": "CSI 3118",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0204",
          "total_seats": 30,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Christopher Kauffman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 11:00am - 12:15pm",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 10:00am - 10:50am",
              "location": "CSI 3118",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0205",
          "total_seats": 30,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Christopher Kauffman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 11:00am - 12:15pm",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 10:00am - 10:50am",
              "location": "CSI 3120",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0206",
          "total_seats": 30,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Christopher Kauffman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 11:00am - 12:15pm",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 11:00am - 11:50am",
              "location": "CSI 3120",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0207",
          "total_seats": 30,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Christopher Kauffman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 11:00am - 12:15pm",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 12:00pm - 12:50pm",
              "location": "CSI 2120",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0301",
          "total_seats": 30,
          "open_seats": 4,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Larry Herman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 12:30pm - 1:45pm",
              "location": "CSI 1115",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 9:00am - 9:50am",
              "location": "IRB 1207",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0302",
          "total_seats": 30,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Larry Herman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 12:30pm - 1:45pm",
              "location": "CSI 1115",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 10:00am - 10:50am",
              "location": "IRB 1207",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0303",
          "total_seats": 30,
          "open_seats": 1,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Larry Herman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 12:30pm - 1:45pm",
              "location": "CSI 1115",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 11:00am - 11:50am",
              "location": "IRB 1207",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0304",
          "total_seats": 30,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Larry Herman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 12:30pm - 1:45pm",
              "location": "CSI 1115",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 11:00am - 11:50am",
              "location": "IRB 2107",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0401",
          "total_seats": 30,
          "open_seats": 3,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Larry Herman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 2:00pm - 3:15pm",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 9:00am - 9:50am",
              "location": "IRB 2107",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0403",
          "total_seats": 30,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Larry Herman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 2:00pm - 3:15pm",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 10:00am - 10:50am",
              "location": "IRB 2107",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0404",
          "total_seats": 30,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Larry Herman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 2:00pm - 3:15pm",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 11:00am - 11:50am",
              "location": "IRB 2207",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0405",
          "total_seats": 29,
          "open_seats": 0,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Larry Herman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 2:00pm - 3:15pm",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 12:00pm - 12:50pm",
              "location": "IRB 2107",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        },
        {
          "section_id": "0406",
          "total_seats": 30,
          "open_seats": 10,
          "waitlist": 0,
          "holdfile": 0,
          "instructors": [
            "Larry Herman"
          ],
          "footnote_marked": false,
          "meetings": [
            {
              "time": "TuTh 2:00pm - 3:15pm",
              "location": "IRB 0324",
              "type": "",
              "message": ""
            },
            {
              "time": "MW 1:00pm - 1:50pm",
              "location": "IRB 2207",
              "type": "Discussion",
              "message": ""
            }
          ],
          "non_standard_dates": ""
        }
      ]
    },
    {
        "_id": "CMSC351",
        "name": "Algorithms",
        "reqs": {
          "Prerequisite": "Minimum grade of C- in CMSC250 and CMSC216.",
          "Restriction": "Must be in a major within the CMNS-Computer Science department; or must be in Engineering Computer program; or must be in the Computer Science Minor program; and Permission from the CMSC - Computer Science department."
        },
        "desc_notes": "",
        "desc": "A systematic study of the complexity of some elementary algorithms related to sorting, graphs and trees, and combinatorics. Algorithms are analyzed using mathematical techniques to solve recurrences and summations. ",
        "gen_eds": "",
        "min_credits": 3,
        "max_credits": null,
        "sections": [
            {
              "section_id": "0101",
              "total_seats": 250,
              "open_seats": 0,
              "waitlist": 0,
              "holdfile": 0,
              "instructors": [
                "Justin Wyss-Gallifent"
              ],
              "footnote_marked": false,
              "meetings": [
                {
                  "time": "MWF 8:00am - 8:50am",
                  "location": "IRB 0324",
                  "type": "",
                  "message": ""
                }
              ],
              "non_standard_dates": ""
            },
            {
              "section_id": "0201",
              "total_seats": 250,
              "open_seats": 0,
              "waitlist": 0,
              "holdfile": 0,
              "instructors": [
                "Ting Jiang"
              ],
              "footnote_marked": false,
              "meetings": [
                {
                  "time": "MWF 9:00am - 9:50am",
                  "location": "IRB 0324",
                  "type": "",
                  "message": ""
                }
              ],
              "non_standard_dates": ""
            },
            {
              "section_id": "0301",
              "total_seats": 250,
              "open_seats": 0,
              "waitlist": 0,
              "holdfile": 0,
              "instructors": [
                "Ting Jiang"
              ],
              "footnote_marked": false,
              "meetings": [
                {
                  "time": "MWF 2:00pm - 2:50pm",
                  "location": "IRB 0324",
                  "type": "",
                  "message": ""
                }
              ],
              "non_standard_dates": ""
            },
            {
              "section_id": "0501",
              "total_seats": 150,
              "open_seats": 17,
              "waitlist": 0,
              "holdfile": 0,
              "instructors": [
                "Clyde Kruskal"
              ],
              "footnote_marked": false,
              "meetings": [
                {
                  "time": "MWF 10:00am - 10:50am",
                  "location": "ESJ 2208",
                  "type": "",
                  "message": ""
                }
              ],
              "non_standard_dates": ""
            }
          ]
    }
  ];

