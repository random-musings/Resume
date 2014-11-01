
//global function to appendContent
function appendContent(parentElt, htmlContent, cssClasses)
{
	var newDiv = document.createElement("div");
	for(var cssClass in cssClasses)
	{	
		if(cssClass && cssClasses[cssClass])
		{
			newDiv.classList.add(cssClasses[cssClass]);
		}
	}
	newDiv.innerHTML = htmlContent;
	$(parentElt).append(newDiv);
}


// ************
// BIO
// ************
var bio =
{
	"name" : "Mya Musings",
	"role" : "front-end ninja",
	"contacts" : { "mobile":"555 123 4567",
								"email" :"test@test.com",
								"github":"random-musings",
								"location" :"Winnipeg Canada",
								"B" : -97.1374937,
								"k" : 49.8997541,		
								"mapInfo" : "Current&nbsp;residence",
								"parentElt": "#contact",
								"cssClasses" : []
								},
	"picture" : "http://scr-inc.com/images/world.png",
	"pictureElt": "#biopic",
	"pictureCssClasses" :[],
	"welcomeMessage" : "craft something fantastical today",
	"skills" : {
						"languages":["ASP","C/C++","C++ cli","C#","CSS","DOS","HTML","Java","Javascript","RAZR","SQL","T-SQL","VB SCRIPT","WBDK","XAML","XML"],
						"frameworks":["ASP.NET","ATL","BootStrap","COM","Jquery","MVC","Three.js","WebGl"],
						"databases":["Maria DB","Access","Mysql","Oracle","SqlServer"],
						"parentElt": "#skills-space",
						"cssClasses" : ["content-div-left","orange-gradient"]
					},
	"parentElt" : "#header",
	"cssClasses" : []
};

bio.inName = function()
{
	var name = this.name;
	var spaceIndex = name.indexOf(" ");
	var intName = name.toUpperCase()[0]+ name.substr(1,spaceIndex).toLowerCase()+ name.substr(spaceIndex+1,name.length).toUpperCase();
	return intName;
};

//displays the contact information
bio.generateContactsHtml = function()
{
	var contactHtml = HTMLcontactStart;

	contactHtml += HTMLcontactGeneric
						.replace(CONTACTSTR,"mobile")
						.replace(DATASTR,this.contacts.mobile);
	contactHtml += HTMLcontactGeneric
						.replace(CONTACTSTR,"email")
						.replace(DATASTR,this.contacts.email);
	contactHtml += HTMLcontactGeneric
						.replace(CONTACTSTR,"github")
						.replace(DATASTR,this.contacts.github);
	contactHtml += HTMLcontactGeneric
						.replace(CONTACTSTR,"location")
						.replace(DATASTR,this.contacts.location);
	contactHtml += HTMLcontactEnd;
	return contactHtml;
};

// ****************
// Skills
// ****************
bio.generateSkillsHtml = function()
{
	var skillsHtml  ="";
	if(this.skills)
	{
		skillsHtml = HTMLskillsStart;
		skillsHtml += HTMLskillsLang;
		for(var langSkill in this.skills.languages)
		{
			if( langSkill && this.skills.languages[langSkill])
				skillsHtml += HTMLskills.replace(DATASTR,this.skills.languages[langSkill]);
		}

		skillsHtml += HTMLskillsFrame;
		for(var frameSkill in this.skills.frameworks)
		{
			if( frameSkill && this.skills.languages[frameSkill])
				skillsHtml += HTMLskills.replace(DATASTR,this.skills.frameworks[frameSkill]);
		}

		skillsHtml += HTMLskillsDB;
		for(var dbSkill in this.skills.databases)
		{
			if( dbSkill && this.skills.languages[dbSkill])
				skillsHtml += HTMLskills.replace(DATASTR,this.skills.databases[dbSkill]);
		}
	}
	skillsHtml += HTMLsectionEnd;
	return skillsHtml;
};

bio.generateBioHeaderHtml = function()
{
	var bioHtml = "";
	bioHtml += HTMLheaderName.replace(DATASTR,this.inName());
	bioHtml += HTMLheaderRole.replace(DATASTR,this.role);
	bioHtml += HTMLWelcomeMsg.replace(DATASTR,this.welcomeMessage);
	return bioHtml;
};

bio.generateBioPicHtml = function()
{
	return HTMLbioPic.replace(DATASTR,this.picture);
};

bio.display = function()
{
	appendContent(this.pictureElt,this.generateBioPicHtml(),this.pictureCssClasses);
	appendContent(this.parentElt,this.generateBioHeaderHtml(),this.cssClasses);
	appendContent(this.contacts.parentElt,this.generateContactsHtml(),this.contacts.cssClasses);
	appendContent(this.skills.parentElt,this.generateSkillsHtml(),this.skills.cssClasses);
};

// ************
// WORK
// ************
var work={
	"jobs":[
			{ 	
			"title" : "architect",
			"employer" : "sicu",
			"location" : "Selkirk, Manitoba",
			"B" : -96.8754295,
			"k" : 50.1435276,
			"mapInfo" : "SICU work experience 2010 - present",
			"dates" : "2010 - present",
			"years" : "4",
			"description": "design and implement the software in which we build everything on top of",
			"responsibilities":[ "design project documents",
								"train new programmers",
								"develop software services"
								],
			"tools" : ["C#","C++","JS","HTML/CSS","ASP MVC"]
			},
			{"title" : "programmer",
			"employer" : "scr-inc",
			"years" : 8,
			"location" : "Winnipeg, Manitoba",
			"B" : -97.33,
			"k" : 48.222,
			"mapInfo" : "SCR-INC work 1999 - present",
			"dates" : "1999 - present",
			"description": "implement web based solutions for various clients",
			"responsibilities":[ "draft project contracts",
								"develop solutions",
								"gather specifications from client"
								],
			"tools" : ["C#","C++","JS","HTML/CSS","ASP MVC"]
			}],
	"parentElt":"#work-space",
	"cssClasses":["content-div-right","red-gradient"]
};


work.generateHtml = function()
{
	var workHtml = "";
	if(this.jobs && this.jobs.length>0)
	{
		workHtml += HTMLworkStart;
		for(var job in this.jobs)
		{
			if(job && this.jobs[job])
			{
				var myjob =  this.jobs[job];
				workHtml += HTMLworkEmployer.replace(DATASTR,myjob.employer);
				workHtml += HTMLworkTitle.replace(DATASTR,myjob.title);
				workHtml += HTMLworkDates.replace(DATASTR,myjob.dates);
				workHtml += HTMLworkLocation.replace(DATASTR,myjob.location);
				workHtml += HTMLworkDescription.replace(DATASTR,myjob.description);
				workHtml += HTMLworkResponsibilities.replace(DATASTR,myjob.responsibilities.join(HTMLworkResponsibilityJoin));
				workHtml += HTMLworkResponsibilityEnd;
			}
		}
	}
	workHtml += HTMLsectionEnd;
	return workHtml;
};

//display the work function
work.display = function()
{
	appendContent(this.parentElt,this.generateHtml(),this.cssClasses);
};


// ******************
//  EDUCATION
// ******************
var education={
	"schools":[
		{
			"name" : "U of Manitoba ",
			"location" : "Winnipeg",
			"B" : -97.1374937,
			"k" : 49.8997541,			
			"mapInfo" : "University&nbsp;of&nbsp;Manitoba",
			"degree":"Bachelor of Science",
			"majors" : ["math","computer science"],
			"classes" : ["Linear Algebra","Discrete Mathematics","Advanced Calculus","Number Theory","Data Structures & Algorithms","C/C++","Operating Systems Design","Compilers","Object Oriented Design","Database Design","User Interface design","Computational Algorithms"],
			"url" : "umanitoba.ca",
			"dates":"2010"
		},
		{
			"name" : "Athabasca",
			"location" : "Edmonton",
			"B" : -113.49,
			"k" : 53.54,
			"mapInfo" : "Athabasca University - gaming courses",
			"degree" : "Computer Science",
			"majors" : ["computer science"],
			"classes" : ["COMP360 C/C++","COMP392 Computer Graphics 3D","COMP486 Mobile Game Development","COMP444 Embedded Robotic programming"],
			"url" : "athabascau.ca",
			"dates" : "2014"
		}
	],
	"onlineCourses":[
		{
				"title":"HTML5 Game Development",
				"school" : "Udacity",
				"url" : "https://www.udacity.com/course/cs255",
				"dates attended" : "2013"
			},
			{
				"title":"Mobile Web Development",
				"school" : "Udacity",
				"url" : "https://www.udacity.com/course/cs256",
				"dates attended" : "2014"
			},
			
			{
				"title":"Interactive 3D Graphics",
				"school" : "Udacity",
				"url" : "https://www.udacity.com/course/cs291",
				"dates attended" : "2014"
			},
				{
				"title":"Intro to HTML and CSS",
				"school" : "Udacity",
				"classes" : ["","","Javascript Basics"],
				"url" : "https://www.udacity.com/course/ud304",
				"dates attended" : "2014"
			},
			{
				"title":"Javascript Basics",
				"school" : "Udacity",
				"url" : "https://www.udacity.com/course/ud804",
				"dates attended" : "2014"
			}
	],
	"parentElt":"#education-space",
	"cssClasses":["content-div-left","blue-gradient"]
};

education.generateHtml = function()
{
	var educationHtml = "";
	educationHtml += HTMLschoolStart;
	for(var school in this.schools)
	{
		if(school && this.schools[school])
		{
			var myschool = this.schools[school];
			educationHtml += HTMLschoolName.replace(DATASTR,myschool.name);
			educationHtml += HTMLschoolDates.replace(DATASTR,myschool.dates);
			educationHtml += HTMLschoolDegree.replace(DATASTR,myschool.degree);
			educationHtml += HTMLschoolLocation.replace(DATASTR,myschool.location);
			educationHtml += HTMLschoolMajor.replace(DATASTR,myschool.majors.join(", "));
			educationHtml += HTMLschoolClasses;
			educationHtml += myschool.classes.join(", ");
			educationHtml += HTMLschoolEnd;
		}
	}
	educationHtml += HTMLonlineClasses;
	for(var onlineCourse in this.onlineCourses)
	{
		if(onlineCourse && this.onlineCourses[onlineCourse])
		{		
			var mycourse =  this.onlineCourses[onlineCourse];
			educationHtml += HTMLonlineTitle.replace(DATASTR,mycourse.title)
																			.replace(HREFSTR,mycourse.url);
			educationHtml += HTMLonlineSchool.replace(DATASTR,mycourse.school);
			educationHtml += HTMLonlineDates.replace(DATASTR,mycourse["dates attended"]);
			educationHtml += HTMLonlineURL.replace(DATASTR,mycourse.url).replace(HREFSTR,mycourse.url);
			educationHtml += HTMLschoolEnd;	
		}
	}
	educationHtml += HTMLschoolEnd;
	educationHtml += HTMLsectionEnd;
	return educationHtml;
};

education.display = function()
{
	appendContent(this.parentElt,this.generateHtml(),this.cssClasses);
};

// ******************
//  PROJECTS
// ******************
var projects={
	projects:[
		{
		"title":"the big score",
		"dates": "2014",
		"description":"a flash game that lets players earn money by cracking a safe.",
		"images":["images/bigscore_store_sm.png","images/bigscore_bank_sm.png"],
		"link":"http://www.scr-inc.com/flash/flash.htm"
		},
		{
			"title":"muai thai workout",
			"dates":"2014",
			"description":"A customizable kickboxing/maui thai workout. "+
							"Boxing/kicking combinations are spoken every 2-4 seconds"+
							"the percentage of kicks/punches per workout are customizable",
			"images":["images/boxing_sm.png"],
			"link":"http://www.scr-inc.com/boxing/boxing.html"
		},
		{
		"title":"spinner",
		"dates": "2014",
		"description":"Developed in J2ME, Players bounce a ball of pegs for points.",
		"images":[],
		"link":""
		}
	],
	"parentElt":"#projects-space",
	"cssClasses":["content-div-right","green-gradient"]
};

projects.generateHtml = function()
{
	var projectsHtml="";
	projectsHtml += HTMLprojectStart;
	for(var proj in this.projects)
	{
		if(proj && this.projects[proj])
		{
			var myproject = this.projects[proj];
			projectsHtml += HTMLprojectTitle.replace(HREFSTR,myproject.link)
																			.replace(DATASTR,myproject.title);
			projectsHtml += HTMLprojectDates.replace(DATASTR,myproject.dates);
			projectsHtml += HTMLprojectDescription.replace(DATASTR,myproject.description);
			for(var image in myproject.images)
			{
				if(image && myproject.images[image])
					projectsHtml +=" "+ HTMLprojectImage.replace(DATASTR,myproject.images[image]);
			}
			projectsHtml += HTMLprojectEnd;
		}
	}	
	projectsHtml += HTMLsectionEnd;
	return projectsHtml;
};

projects.display = function()
{
	appendContent(this.parentElt,this.generateHtml(),this.cssClasses);
};

bio.display();
work.display();
projects.display();
education.display();

$(document).click(function(event)
{
	var evt = event?event:window.event;
	logClicks(evt.pageX,evt.pageY);
});
