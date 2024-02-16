//require db and any models
const {
  db,
  Account,
  Class,
  Announcement,
  Module,
  Assignment,
  Student,
} = require("./");

//require and data files to use in seeding

const seed = async () => {
  try {
    console.log(`Seeding started...`);
    await db.sync({ force: true });

    //Classes
    const class1 = await Class.create({
      name: "Class 1",
      subject: "Basics I",
    });
    const class2 = await Class.create({
      name: "Class 2",
      subject: "Basics II",
    });

    //Data
    const getPeoples = require("./peoples");

    // Accounts
    const admin = await Account.create({
      fName: "Sarah",
      lName: "Admin",
      userName: "admin",
      password: "password",
      email: "sarahAdmin@email.com",
      isAdmin: true,
      count: 1,
      picture:
        "https://gist.github.com/sllozier/60ba86e5e2eaa1816d19b2b74e9df67c/raw/2f651ce4ee4e82ac830461948a73e544d4c11041/sarahAvatar.png",
    });

    const users = [
      {
        fName: "Emilia",
        lName: "User",
        userName: "user",
        password: "password",
        email: "emiliaUser@email.com",
        picture:
          "https://raw.githubusercontent.com/gist/sllozier/60ba86e5e2eaa1816d19b2b74e9df67c/raw/2f651ce4ee4e82ac830461948a73e544d4c11041/ELL-avatar.svg",
      },

      {
        fName: "Victoria",
        lName: "User",
        userName: "user2",
        password: "password",
        email: "victoriaUser@email.com",
        picture:
          "https://raw.githubusercontent.com/gist/sllozier/60ba86e5e2eaa1816d19b2b74e9df67c/raw/2f651ce4ee4e82ac830461948a73e544d4c11041/VFL-avatar.svg",
      },

      {
        fName: "Lillian",
        lName: "User",
        userName: "user3",
        password: "password",
        email: "lillianUser@email.com",
        picture:
          "https://raw.githubusercontent.com/gist/sllozier/60ba86e5e2eaa1816d19b2b74e9df67c/raw/2f651ce4ee4e82ac830461948a73e544d4c11041/LML-avatar.svg",
      },

      {
        fName: "Leo",
        lName: "User",
        userName: "user4",
        password: "password",
        email: "leoUser@email.com",
        picture:
          "https://raw.githubusercontent.com/gist/sllozier/60ba86e5e2eaa1816d19b2b74e9df67c/raw/2f651ce4ee4e82ac830461948a73e544d4c11041/LPL-avatar.svg",
      },

      {
        fName: "Robert",
        lName: "User",
        userName: "user5",
        password: "password",
        email: "robertUser@email.com",
        picture:
          "https://raw.githubusercontent.com/gist/sllozier/60ba86e5e2eaa1816d19b2b74e9df67c/raw/2f651ce4ee4e82ac830461948a73e544d4c11041/RGL-avatar.svg",
      },

      {
        fName: "Nolan",
        lName: "User",
        userName: "user6",
        password: "password",
        email: "nolanUser@email.com",
      },

      {
        fName: "Evan",
        lName: "User",
        userName: "user7",
        password: "password",
        email: "evanUser@email.com",
      },

      {
        fName: "Liam",
        lName: "User",
        userName: "user8",
        password: "password",
        email: "liamUser@email.com",
      },

      {
        fName: "Emily",
        lName: "User",
        userName: "user9",
        password: "password",
        email: "emilyUser@email.com",
      },
    ];
    const userAccounts = await Promise.all(
      users.map((user) => Account.create(user))
    );
    const accountData = await getPeoples();
    const accounts = await Promise.all(
      accountData.map((account) => Account.create(account))
    );

    //Announcements
    const announcement1 = await Announcement.create({
      text: "Check out the extra practice!",
      classId: class1.id,
    });

    const announcement2 = await Announcement.create({
      text: "Make sure to watch until the end of each video!",
      classId: class2.id,
    });

    //Modules
    const module1 = await Module.create({
      name: "Getting Started",
      classId: class1.id,
    });

    const module2 = await Module.create({
      name: "Getting Started",
      classId: class2.id,
    });

    const module3 = await Module.create({
      name: "System Setup",
      classId: class1.id,
    });

    //Assignments
    const assignment1Markdown = `
   
![view-img](https://cupcakeipsum.com/images/pink_muffin.png)

### Welcome

Jujubes I love topping donut biscuit apple pie bonbon soufflé. Pastry sesame snaps apple pie gingerbread topping lollipop sugar plum. Chocolate cake dragée oat cake soufflé carrot cake sesame snaps cake I love topping. Caramels jelly pastry caramels I love jelly. Marzipan caramels pastry gummies bear claw macaroon bear claw cheesecake. Macaroon topping pudding I love caramels oat cake sweet muffin. Macaroon gummi bears bear claw jelly-o halvah oat cake I love topping. Chocolate bar chupa chups I love I love dragée dessert chocolate bar I love. I love biscuit candy cheesecake candy jelly-o macaroon. Bear claw icing tiramisu oat cake biscuit. Gingerbread lollipop dragée powder candy canes caramels. Tart marshmallow I love toffee gingerbread I love icing sweet macaroon. Pudding pastry liquorice sweet jelly cheesecake oat cake. Carrot cake I love I love cake tiramisu oat cake.

**I love jelly beans tootsie roll lemon drops marshmallow shortbread I love.**
- I love pudding I love lollipop lollipop marshmallow. Dragée jelly fruitcake fruitcake halvah lemon drops bonbon sugar plum. 
- Cupcake sweet chocolate bar dragée caramels sugar plum jelly-o topping macaroon. 
- Pudding candy canes liquorice pudding topping fruitcake I love pastry. 
- Candy sesame snaps candy powder powder cookie I love candy cookie. Croissant I love cake ice cream chocolate cake ice cream sweet I love I love. Cake dessert I love bonbon sesame snaps. 
- I love oat cake brownie cupcake oat cake marzipan. 

**Cheesecake shortbread toffee sugar plum dragée donut powder.**

1. Danish soufflé topping chocolate tootsie roll jujubes apple pie chocolate bar I love. 
2. Tart pudding carrot cake halvah sweet roll marzipan cupcake.
3. Bonbon candy canes liquorice chupa chups biscuit cake sweet cake jelly beans.
    `;
    const assignment1 = await Assignment.create({
      title: "Introduction",
      description:
        "In this section, you will learn about our overall objectives for the course.",
      text: assignment1Markdown,
      moduleId: module1.id,
    });
    const assignment2Markdown = `
    ### Computer Basics

    I love bonbon gingerbread candy liquorice I love lollipop. Chupa chups ice cream lemon drops donut I love cupcake chupa chups croissant. Sesame snaps brownie candy macaroon jujubes marshmallow candy canes cake. 
    
    Click to watch:
    
    [![Watch the video](http://i3.ytimg.com/vi/O-rM34RBhWw/hqdefault.jpg)](https://youtu.be/O-rM34RBhWw)
    
    
    Dragée gingerbread jelly beans I love wafer halvah. Carrot cake lemon drops marzipan croissant tart cheesecake I love gummi bears tootsie roll. Tart dragée danish I love sweet roll pastry marshmallow candy canes. Chupa chups marshmallow jelly oat cake pudding chocolate. Jelly-o caramels donut sweet roll toffee jujubes bear claw I love I love.
    
    Click for codepen:
    
    [![code-pen](https://gist.github.com/sllozier/e161dd9e93e25c9d2d8b6529f1970ccd/raw/a4f8c764c30f0f092cbd79bf4a294e0fef954e44/obj-codepen2.png)](https://codepen.io/FullstackAcademy/pen/yEVryM)
    
    Caramels brownie muffin I love oat cake. Fruitcake apple pie pudding toffee dragée marzipan dessert pie. Carrot cake jelly beans jelly-o I love cotton candy caramels. Tiramisu muffin I love tart marshmallow cotton candy sugar plum muffin wafer. Pastry cake icing jujubes wafer. Lemon drops I love tootsie roll bear claw jelly beans shortbread bear claw cake. Sesame snaps cotton candy biscuit halvah lollipop ice cream. I love bear claw jelly beans cotton candy topping. Chocolate cake I love cake dessert chocolate cotton candy danish donut. Jelly-o topping dragée gummies tootsie roll carrot cake ice cream jelly-o dessert.
    
    **Croissant candy cheesecake I love biscuit cookie halvah danish muffin.**
    
    1. Brownie jelly marshmallow gummies ice cream I love pie. 
    2. Wafer I love croissant cake gummies liquorice muffin biscuit icing. Jelly-o tootsie roll sweet marshmallow candy wafer. 
    3. Candy canes chupa chups marshmallow I love cake marzipan. Soufflé I love jujubes chocolate cake apple pie gummi bears jujubes. 
    4. Macaroon cookie chupa chups wafer dragée toffee cookie.
    
    Fruitcake dragée danish biscuit sweet carrot cake toffee. Icing wafer chocolate bar donut cheesecake halvah sesame snaps. Brownie gummi bears chocolate cake I love wafer cake cake. Brownie I love gummies soufflé wafer marshmallow gummies. Marzipan jelly beans lemon drops tootsie roll cotton candy tiramisu cheesecake soufflé sweet roll. Cookie I love muffin I love jelly dragée toffee marzipan. Pie soufflé I love lollipop tart chocolate cake dragée jujubes sesame snaps.
    
    [![next-btn](https://img.shields.io/static/v1?label=&message=Next%20Page&color=E34F26&logo=accenture&logoColor=FFFFFF)](https://codepen.io/FullstackAcademy/pen/yEVryM)
    `;

    const assignment2 = await Assignment.create({
      title: "Getting Started",
      description: "In this section, you will learn some computer basics.",
      text: assignment2Markdown,
      moduleId: module1.id,
    });
    // const classData = await Promise.all(
    //   classes.map((class) => Class.create(class))
    // );

    // ACCOUNTS EXAMPLE
    // const accountData = await getPeoples();
    // const accounts = await Promise.all(
    //   accountData.map((account) => Account.create(account))
    // );

    console.log(
      `Seeding successful!`
      // "Account Special methods :",
      // Object.keys(Account.prototype),
      // "Class Special methods :",
      // Object.keys(Class.prototype),
      // "Student Special methods :",
      // Object.keys(Student.prototype)
    );
  } catch (error) {
    console.log(`Seeding Problem! Error in seed Function: ${error}`);
  }
};
const runSeed = async () => {
  console.log(`Start seeding...`);
  try {
    await seed();
  } catch (error) {
    console.error("RUN SEED ERROR", error);
    process.exitCode = 1;
  } finally {
    console.log(`closing db connection`);
    await db.close();
    console.log(`db connection closed`);
  }
};

if (module === require.main) {
  runSeed();
}

module.exports = seed;
