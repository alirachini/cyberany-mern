//CRUD for About Us page
const express = require("express");
const router = express.Router();
const AboutUs = require("../Modules/AboutUs")
const Admin = require("../Modules/Admin")
const Blogs = require("../Modules/Blogs")
const Categories = require("../Modules/Categories")
const Comment = require("../Modules/Comment")
const ContactUs = require("../Modules/ContactUs")
const jwt = require("jsonwebtoken")


//Read    

router.get("/dashboard/aboutus/read", (req, res) => {
    AboutUs.find((err, data) => {
        if (!err) res.send({ status: 200, message: data });
        else res.send(err.message);
    });
});

//Read  



// //create ( usage just one time)
// router.post("/dash/aboutus", async(req,res)=>{
//     aboutusadded = new AboutUs({
//         body:"alirachini"
//       });
//       await aboutusadded.save();
//     AboutUs.find((err, data) => {
//       res.send(data);
//     });
// })

//update
router.patch("/dashboard/aboutus/update", (req, res) => {
    let id = '62b6e37ce4708962268ee17d';
    let aboutusinput = req.body.aboutinput;
    if (id != undefined) {
        AboutUs.findOneAndUpdate(
            { _id: id },
            { $set: { body: aboutusinput } },
            { new: true },
            (err, data) => {
                if (data !== null) {
                    AboutUs.find((err, data) => {
                        res.send(data);
                    });
                } else {
                    res.send({
                        Status: "404",
                        error: "true"
                    });
                }
            }
        );
    }
})




//CRUD for Contact Us page

//Read
router.get("/dashboard/contactus/read", (req, res) => {
    ContactUs.find((err, data) => {
        if (!err) res.send({ status: 200, message: data });
        else res.send(err.message);
    });
});



//create ( usage just one time)
// router.post("/dash/contactus", async(req,res)=>{
//     contactusadded = new ContactUs({
//         body:"alirachini"
//       });
//       await contactusadded.save();
//     ContactUs.find((err, data) => {
//       res.send(data);
//     });
// })

//update
router.patch("/dashboard/contactus/update", (req, res) => {
    let id = '62b6eb76dea62c5df975d9c3';
    let contactusinput = req.body.contactinput;
    if (id != undefined) {
        ContactUs.findOneAndUpdate(
            { _id: id },
            { $set: { body: contactusinput } },
            { new: true },
            (err, data) => {
                if (data !== null) {
                    ContactUs.find((err, data) => {
                        res.send(data);
                    });
                } else {
                    res.send({
                        Status: "404",
                        error: "true"
                    });
                }
            }
        );
    }
})

//Admin 
//Read
router.get("/dashboard/admin/read", (req, res) => {
    Admin.find((err, data) => {
        if (!err) res.send({ status: 200, message: data });
        else res.send(err.message);
    });
});

//create admin
// router.post("/dash/admin", async(req,res)=>{
//       adminnew = new Admin({
//           username:"anas",
//           password:"anas123"
//         });
//         await adminnew.save();
//       Admin.find((err, data) => {
//         res.send(data);
//       });
//   })

//Delete
// router.delete("/dash/admin/delete" ,(rq,res)=>{
//   let id = '62b73cc889f113438122c96a'
//   if (id !== undefined) {
//     Admin.findOneAndDelete({ _id: id }, (err, data) => {
//       if (data !== null) {
//         Admin.find((err, data) => {
//           res.send(data);
//         });
//       } else {
//         res.send({
//           Status: "404",
//           error: "true",
//           message: "the movie " + id + " not found",
//         });
//       }
//     });
//   }
// })

//Crud for categories
//Read
router.get("/dashboard/categories/read", (req, res) => {
    Categories.find((err, data) => {
        if (!err) res.send({ status: 200, message: data });
        else res.send(err.message);
    });
});

router.get("/dashboard/categories/Android", async (req, res) => {
    const match = {}
    if (req.query.categories) {
        match.categories = req.query.categories === '62bd3cb5bf6fa05e659ac1f4'

    }
    try {
        await req.user.populate({
            path: 'Android',
            match
        }).execPopulate();
        res.status(200).send(req.user.tasks)
    } catch (e) {
        res.status(400).send(e.message);

    }
});








//Add a category
router.post("/dashboard/categories/add", async (req, res) => {
    let categoryname = req.body.catname
    categoriesnew = new Categories({
        name: categoryname
    });
    await categoriesnew.save();
    Categories.find((err, data) => {
        res.send(data);
    });
})

//update the category name
router.patch("/dashboard/categories/update/:id", (req, res) => {
    let id = req.params.id;
    let newcategoryname = req.body.newcatname;
    
        Categories.findOneAndUpdate(
            { _id: id },
            { $set: { name: newcategoryname } },
            { new: true },
            (err, data) => {
                if (data !== null) {
                    Categories.find((err, data) => {
                        res.send(data);
                    });
                } else {
                    res.send({
                        Status: "404",
                        error: "true"
                    });
                }
            }
        );
    
})

//Delete a cetegory
router.delete("/dashboard/categories/delete/:id", (req, res) => {
    let id = req.params.id;
    Categories.findOneAndDelete({ _id: id }, (err, data) => {
        if (data !== null) {
            Categories.find((err, data) => {
                res.send(data);
            });
        } else {
            res.send({
                Status: "404",
                error: "true",
            });
        }
    })
})


// for Comment

//Read from admin
router.get("/dashboard/comment/read", (req, res) => {
    Comment.find({ read: false }, (err, data) => {
      if (!err) res.send({ status: 200, message: data });
      else res.send(err.message);
    });
  });

  router.get("/dashboard/comment/read/:id", (req, res) => {
    const id = req.params.id;
    Comment.find({ Blog:id, read:false}, (err, data) => {
      if (!err) res.send({ status: 200, message: data });
      else res.send(err.message);
    });
  });

  
  //Read comment for users
  router.get("/comments/:id", (req, res) => {
    const blogid = req.params.id;
    Comment.find({Blog:blogid,read: true }, (err, data) => {
      if (!err) res.send({ status: 200, message: data });
      else res.send(err.message);
    });
  });
  
  //create a comment from user
  router.post("/createcomment", async (req, res) => {
    let text = req.body.text; //names should be the same in body
    let blog = req.body.blog;
    commentNew = new Comment({
      text: text,
      time: Date.now(),
      Blog: blog,
      read: false,
    });
    await commentNew.save();
    Comment.find((err, data) => {
      res.send(data);
    });
  });
  
  //Reject from admin
  router.delete("/dashboard/comment/reject/:id", (req, res) => {
    let id = req.params.id;
    Comment.findOneAndDelete({ _id: id }, (err, data) => {
      if (data !== null) {
        Comment.find((err, data) => {
          res.send(data);
        });
      } else {
        res.send({
          Status: "404",
          error: "true",
        });
      }
    });
  });
  
  //accept from admin
  router.patch("/dashboard/comment/approve/:id", (req, res) => {
    let id = req.params.id;
    Comment.findOneAndUpdate(
      { _id: id },
      { $set: { read:true} },
      { new: true },
      (err, data) => {
          if(!err)
          res.send(data)
          else
          res.send({status:404, message: "not found"})
      }
    );
  });

  router.patch("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let token = jwt.sign({ username: username }, "secret", { expiresIn: "240h" });
    Admin.findOneAndUpdate({ username: username, password: password },{token:token},(err, data) => {
        if (data !== null) {
            res.send({
                status: 200,
                message: "login successful",
                token: token
            });
        } else {
            res.send({
                status: 404,
                error: "true",
                message: "login failed",
            });
        }
    });
})

function authenticateToken(tokenf, username) {
    let token = "";
    Admin.find({username:username },(err,data)=>{
        token = data[0].token
        if (tokenf == token) 
        return true;
    else
        return flase
    })
    };


    router.post("/test",authenticateToken, (req, res) => {
        res.send("hello")
    })

//read
router.get("/login/dashboard/blog/read", (req, res) => {
    Blogs.find((err, data) => {
        if (!err) res.send({ status: 200, message: data });
        else res.send(err.message);
    });
});

//add
router.post("/dashboard/blog/add" , async (req, res) => {
    let title = req.body.blogtitle
    let image = req.body.imageurl
    let content = req.body.blogcontent
    let like = req.body.bloglike
    let dislike = req.body.blogdislike
    let category = req.body.bcategory
    let time = Date.now()


    blogNew = new Blogs({
        title: title,
        image: image,
        content: content,
        like: like,
        dislike: dislike,
        time: time,
        categories: category
    })
    await blogNew.save();
    Blogs.find((err, data) => {
        res.send(data);
    });
})


//update from the admin
router.patch("/dashboard/blog/update/:id", (req, res) => {
    let ID = req.body.id;
    let newtitle = req.body.newblogtitle;
    let newimage = req.body.newimageurl;
    let newcontent = req.body.newblogcontent;
    let newcategory = req.body.newcategory;
    let newtime = Date.now();
    if (newcategory !== undefined) {
        Blogs.findOneAndUpdate(
            { _id: ID },
            {
                $set: {
                    title: newtitle,
                    image: newimage,
                    content: newcontent,
                    time: newtime,
                    categories: newcategory
                },
            },
            { new: true },
            (err, data) => {
                if (data !== null) {
                    Blogs.find((err, data) => {
                        res.send(data);
                    });
                } else {
                    res.send({
                        Status: "404",
                        error: "true",
                    });
                }
            }
        );
    }
});






router.get("/blogs/:id", (req, res) => {
    var id = req.params.id;

    if (id) {
        Blogs.find(({ _id: id }), function (err, val) {
            if (val !== null) {
                res.send({
                    status: 200,
                    message: val
                })
            } else {
                res.status(404).send({
                    status: 404,
                    error: true,
                    message: `the Blog ${id} does not exists`,
                });
            }
        })
    }
})



//update from the user

//delte from admin
router.delete("/dashboard/blog/delete/:id", (req, res) => {
    let ID = req.params.id;
    Blogs.findOneAndDelete({ _id: ID }, (err, data) => {
        if (data !== null) {
            Blogs.find((err, data) => {
                res.send(data);
            });
        } else {
            res.send({
                Status: "404",
                error: "true",
            });
        }
    });
});

router.patch("/dislike/:id", (req, res) => {
    let id = req.params.id
    Blogs.findByIdAndUpdate({ _id: id }, { $inc: { 'dislike': 1 } }, { new: true }, (err, data) => {
        if (!err) {
            res.send(data)
        }
        else {
            res.send({ status: 404, message: "not found" })
        }
    })
})

router.patch("/like/:id", (req, res) => {
    let id = req.params.id;
    Blogs.findByIdAndUpdate({ _id: id }, { $inc: { 'like': 1 } }, { new: true }, (err, data) => {
        if (!err) {
            res.send(data)
        }
        else {
            res.send({ status: 404, message: "not found" })
        }
    })
})

//authentication of the token from the admin


module.exports = router