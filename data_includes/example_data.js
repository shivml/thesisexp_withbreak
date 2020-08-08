PennController.ResetPrefix(null);
PennController.DebugOff()
PennController.Sequence("Welcome", "ParticipantInfo", "Instructions", randomize("Examples"), "beforeTrials",randomize("trials1"), "attentionCheck",randomize("trials2"),"send" ,"final")

//screen 1
PennController("Welcome",
newHtml("consent", "screen1.html")
    .print()
,
newButton("Weiter", "Weiter")
    .print()
    .wait(
        getHtml("consent").test.complete()
            .failure( getHtml("consent").warn() )
    )
    )
//welcome screen
PennController("ParticipantInfo",
    newText("firstinfo", "Um an unserem Experiment teilnehmen zu k&ouml;nnen, ben&ouml;tigen wir Angaben zu Ihrer Person. Diese werden anonym ausgewertet, genauere Informationen entnehmen Sie bitte dem Probanden Informationsblatt.<p>")    
        .settings.css("font-size", "20px")
        .settings.italic()
    ,
    newCanvas("infocanvas", 1000, 80)
        .settings.add(0, 0, getText("firstinfo") )
        .print()  
    ,
    newDropDown("age", "")
        .settings.add( "unter 18", "18" , "19" , "20", "21" , "22" , "23", "24" , "25" , "26", "27" , "28" , "29", "30" , "31" , "&uuml;ber 31")
        .settings.log()    
               ,
    newText("agetext", "Alter:")
          .settings.css("font-size", "20px")
          .settings.bold()
          
    
    ,
    newCanvas("agecanvas", 1000, 45)
        .settings.add(0, 10, getText("agetext") )
        .settings.add(100, 8, getDropDown("age") )
        .settings.log()
        .print()    
    ,
    newText("Muttersprache", "Ist Deutsch Ihre Muttersprache?")
         .settings.css("font-size", "20px")
         .settings.bold()
    ,
    newDropDown("NativeLang", "" )
        .settings.add( "Ja", "Nein")
        .settings.log()
    ,
    newCanvas("Langcanvas", 1000, 45)
        .settings.add(0, 0, getText("Muttersprache") )
        .settings.add(300, 3, getDropDown("NativeLang") )
        .print()
    ,
    newText("Geschlecht", "Geschlecht:")
       .settings.css("font-size", "20px")
       .settings.bold()
    ,
    newDropDown("sex", "" )
         .settings.add( "&nbsp;weiblich&nbsp;", "&nbsp;m&auml;nnlich&nbsp;", "&nbsp;divers&nbsp;")
         .settings.log()
    ,
    newCanvas("sexcanvas", 1000, 45)
        .settings.add(0, 0, getText("Geschlecht") )
        .settings.add(120, 3, getDropDown("sex") )
        .print()
    ,
    newText("SpracheTest", "Haben Sie bis zum 6 Lebensjahr au&szlig;er Deutsch eine weitere Sprache gelernt?")
         .settings.css("font-size", "20px")
         .settings.bold()
    ,
    newTextInput("und zwar", "")
         .settings.log()
         .settings.hidden()
    ,
    newText("label input", "")
        .settings.after( getTextInput("und zwar") )
    ,
    newDropDown("language", "")
        .settings.add("nein", "ja")
        .settings.log()
                 
   ,
    newCanvas("languagecanvas", 1000, 30)
        .settings.add(0, 0, getText("SpracheTest") )
        .settings.add(690, 2, getDropDown("language") )
        .print()
    ,
        newButton("okay", "Weiter")
        .print()
        .wait()
      
    ,
     
     getDropDown("age")
    .test.selected()
    .success()
    .failure(
        newText("Bitte geben Sie ihr Alter an.")
        .settings.color("red")
        .print())   
    ,
    getDropDown("NativeLang")
    .test.selected()
    .success()
    .failure(
        newText("Bitte geben Sie ihr Muttersprache an.")
        .settings.color("red")
        .print())
    ,
    getDropDown("sex")
    .test.selected()
    .success()
    .failure(
        newText("Bitte geben Sie ihr Geschlecht an.")
        .settings.color("red")
        .print())
    ,
    getDropDown("language")
    .test.selected()
    .success()
    .failure(
        newText("Bitte beantworten Sie die Frage zum fr&uuml;hen Spracherwerb.")
        .settings.color("red")
        .print())      
    ,
    getDropDown("age").wait("first")
    ,
    getDropDown("NativeLang") .wait ("first")
    ,
    getDropDown("sex").wait("first")
    ,
    getDropDown("language").wait("first")
    ,
        getButton("okay")
        .print()
        .wait()

)      
//end of welcome screen
    
//Examples Screen
   
PennController("Instructions",
newHtml("consent", "instructions.html")
    .print()
,
newButton("Weiter", "Weiter")
    .print()
    .wait()
            )
//Examples Screen
    PennController.Template(
    PennController.GetTable("examples.csv"),  // load your csv
    variable => PennController("Examples",
                               defaultText
                               .settings.css("font-size", "30")
                               ,
                              newTimer(500)
                               .start()
                               .wait()
                                ,
                              newText("wait", "Bitte dr&uuml;cken Sie die Leertaste um fortzufahren")
                               .settings.css("font-size","20")//press spacebar to continue trial
                               .print()
                                ,
                              newKey("start"," ")
                               .settings.log() // Key press and logged start of experiment
                               .wait()
                                ,
                              getText("wait")
                               .remove()
                               ,
                               newText("context", variable.context)  // context sentence
                               .settings.italic()
                               .print()
                               ,
                              
                                newText("blank", "<br>")
                               .print()
                                ,
                               newButton("context_button", "Weiter")
                               .settings.center()
                               .settings.log()
                               .print()
                               .wait()
                                
                               ,
                                getText("context")
                               .remove()
                               ,
                               getButton("context_button")
                               .remove()
                               ,
                               newText("word1", variable.word1)  // first word- article
                               .settings.italic()
                               .print()
                               ,
                               newKey("word1_key", " ")
                               .settings.log()
                               .wait()
                               ,
                                getText("word1")
                               .remove()
                               ,
                               
                               newText("word2", variable.word2)  // second word- noun
                               .settings.italic()
                               .print()
                               ,
                               newKey("word2_key", " ")
                               .settings.log()
                               .wait()
     ,
                                getText("word2")
                               .remove()
                                                           
                               ,
                               newText("word3", variable.word3)  // third word- Critical word
                               .settings.italic()
                               .print()
                                ,
                               newKey("word3_key", " ")
                               
                               .wait()
                               ,
                                getText("word3")
                               .remove()
                               
                               ,
                               newText("word4",variable.word4)  // fourth word- article SPILLOVER
                               .settings.italic()
                               .print()
                               ,
                               newKey("word4_key", " ")
                              .wait()
                               ,
                                getText("word4")
                               .remove()
                               ,
                               
                               newText("word5", variable.word5)  // fifth word- noun 2 SPILLOVER
                               .settings.italic() 
                               .print()
                               ,
                               newKey("word5_key", " ")
                               .wait()
                               ,
                               getText("word5")
                               .remove()
                                , 
                               
                              newText("question", "Wie akzeptabel ist das Urteil angesichts des Kontextes?")
                                .settings.css("font-size","25")
                                .settings.center()
                               .print()
                               ,
                               newCanvas("empty canvas", 1, 40)
                               .print()
                               ,
                               newScale("scale","0","1","2","3","4","5","6","7","8","9", "10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49", "50")
                               .settings.center()
                               .settings.before( newText("notacceptable", "inakzeptabel")
                                                .settings.css("font-size","12"))
                               .settings.after( newText("acceptable", "sehr akzeptabel")
                                                .settings.css("font-size","12"))
                               .settings.labelsPosition("bottom")
                               .settings.size (1300)
                               .print()
                               .settings.log()
                               .wait()   
                                ,
                                
                                newText("blank", "<br>")
                               .print()
                                ,
                               newButton("continue", "Weiter")
                               .print()
                               .settings.center()
                               .wait()
                               ,
                               getText("question")
                               .remove()
                               ,
                               getScale("scale")
                               .remove()
                              ,
                                getKey("context_key").settings.log(),
                                getKey("word1_key").settings.log(),
                                getKey("word2_key").settings.log(),
                                getKey("word3_key").settings.log(),
                                getKey("word4_key").settings.log(),
                                getKey("word5_key").settings.log(),
    
                               
                               )
    );
    
        
             

    //end of TRIAL RUN
   PennController( "beforeTrials" ,
    newText("<p>Das waren die Beispiele.<p>")
       .settings.css("font-size", "20px")
       .print()
    ,
    newText("explanation", "Jetzt beginnen wir das Experiment. Viel Spa&szlig;!<p>")
       .settings.css("font-size", "20px")
    ,
    newCanvas("explanationcanvas",1000, 120)
        .settings.add(0, 0, getText("explanation") )
        .print()    
    ,
    newButton("Experiment beginnen")
        .print()
        .wait()
         );
   
    //EXPERIMENT
    
    
PennController.Template(
    PennController.GetTable("list1_1.csv"),  // load your csv
    variable => PennController("trials1",
                                defaultText
                               .settings.css("font-size", "30")
                               ,
                              newTimer(500)
                               .start()
                               .wait()
                                ,
                              newText("wait", "Bitte dr&uuml;cken Sie die Leertaste um fortzufahren")
                               .settings.css("font-size","20")//press spacebar to continue trial
                               .print()
                                ,
                              newKey("start"," ")
                               .settings.log() // Key press and logged start of experiment
                               .wait()
                                ,
                              getText("wait")
                               .remove()
                               ,
                               newText("context", variable.context)  // context sentence
                               .settings.italic()
                               .print()
                               ,
                              
                                newText("blank", "<br>")
                               .print()
                                ,
                               newButton("context_button", "Weiter")
                               .settings.center()
                               .settings.log()
                               .print()
                               .wait()
                                
                               ,
                                getText("context")
                               .remove()
                               ,
                               getButton("context_button")
                               .remove()
                               ,
                               newText("word1", variable.word1)  // first word- article
                               .settings.italic()
                               .print()
                               ,
                               newKey("word1_key", " ")
                               .settings.log()
                               .wait()
                               ,
                                getText("word1")
                               .remove()
                               ,
                               
                               newText("word2", variable.word2)  // second word- noun
                               .settings.italic()
                               .print()
                               ,
                               newKey("word2_key", " ")
                               .settings.log()
                               .wait()
     ,
                                getText("word2")
                               .remove()
                                                           
                               ,
                               newText("word3", variable.word3)  // third word- Critical word
                               .settings.italic()
                               .print()
                                ,
                               newKey("word3_key", " ")
                               
                               .wait()
                               ,
                                getText("word3")
                               .remove()
                               
                               ,
                               newText("word4",variable.word4)  // fourth word- article SPILLOVER
                               .settings.italic()
                               .print()
                               ,
                               newKey("word4_key", " ")
                              .wait()
                               ,
                                getText("word4")
                               .remove()
                               ,
                               
                               newText("word5", variable.word5)  // fifth word- noun 2 SPILLOVER
                               .settings.italic() 
                               .print()
                               ,
                               newKey("word5_key", " ")
                               .wait()
                               ,
                               getText("word5")
                               .remove()
                                , 
                               
                              newText("question", "Wie akzeptabel ist das Urteil angesichts des Kontextes?")
                               .settings.center()
                               .settings.css("font-size","25")
                               .print()
                               ,
                               newCanvas("empty canvas", 1, 40)
                               .print()
                               ,
                               newScale("scale","0", "1","2","3","4","5","6","7","8","9", "10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49", "50")
                               .settings.center()
                               .settings.before( newText("notacceptable", "inakzeptabel") 
                                                .settings.css("font-size","15"))
                               .settings.after( newText("acceptable", "sehr akzeptabel") 
                                                .settings.css("font-size","15"))
                               .settings.labelsPosition("bottom")
                               .settings.size (1200)
                               .print()
                               .settings.log()
                               .wait()   
                                ,
                                newText("blank", "<br>")
                               .print()
                                ,
                               newButton("continue", "Weiter")
                               .print()
                               .settings.center()
                               .wait()
                               ,
                               getText("question")
                               .remove()
                               ,
                               getScale("scale")
                               .remove()
                              ,
                                getKey("context_key").settings.log(),
                                getKey("word1_key").settings.log(),
                                getKey("word2_key").settings.log(),
                                getKey("word3_key").settings.log(),
                                getKey("word4_key").settings.log(),
                                getKey("word5_key").settings.log()
                               
                               )
    
    .log("Item",variable.item)
    .log("Soc_stat", variable.socStat)
    .log( "condition" , variable.condition)
    .log ("stimuli", variable.stimuli)
);
//////ATTENTIONCHECK
PennController("attentionCheck",
    newText("attentionCheck", "Bitte w&auml;hlen Sie auf der untenstehenden Skala f&uuml;nfunddrei&szlig;ig aus!")
    .settings.center()
    .settings.bold()
    .settings.css("font-size", "30px")
    .print()
   
     ,
     
     newScale("slider","0", "1","2","3","4","5","6","7","8","9", "10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49", "50")
.settings.center()
.settings.size (1200)
.settings.labelsPosition("bottom")
.print()
.settings.log()
.wait()
               ,                          
     newButton("okay", "weiter")
        .settings.center()
        .print()
        .wait()
        .remove()
    ,
   
    getText("attentionCheck")
        .remove()
    ,   
    getScale("slider")
        .remove()
    
    );


PennController.Template(
    PennController.GetTable("list1_2.csv"),  // load your csv
    variable => PennController("trials2",
                                defaultText
                               .settings.css("font-size", "30")
                               ,
                              newTimer(500)
                               .start()
                               .wait()
                                ,
                              newText("wait", "Bitte dr&uuml;cken Sie die Leertaste um fortzufahren")
                               .settings.css("font-size","20")//press spacebar to continue trial
                               .print()
                                ,
                              newKey("start"," ")
                               .settings.log() // Key press and logged start of experiment
                               .wait()
                                ,
                              getText("wait")
                               .remove()
                               ,
                               newText("context", variable.context)  // context sentence
                               .settings.italic()
                               .print()
                               ,
                              
                                newText("blank", "<br>")
                               .print()
                                ,
                               newButton("context_button", "Weiter")
                               .settings.center()
                               .settings.log()
                               .print()
                               .wait()
                                
                               ,
                                getText("context")
                               .remove()
                               ,
                               getButton("context_button")
                               .remove()
                               ,
                               newText("word1", variable.word1)  // first word- article
                               .settings.italic()
                               .print()
                               ,
                               newKey("word1_key", " ")
                               .settings.log()
                               .wait()
                               ,
                                getText("word1")
                               .remove()
                               ,
                               
                               newText("word2", variable.word2)  // second word- noun
                               .settings.italic()
                               .print()
                               ,
                               newKey("word2_key", " ")
                               .settings.log()
                               .wait()
     ,
                                getText("word2")
                               .remove()
                                                           
                               ,
                               newText("word3", variable.word3)  // third word- Critical word
                               .settings.italic()
                               .print()
                                ,
                               newKey("word3_key", " ")
                               
                               .wait()
                               ,
                                getText("word3")
                               .remove()
                               
                               ,
                               newText("word4",variable.word4)  // fourth word- article SPILLOVER
                               .settings.italic()
                               .print()
                               ,
                               newKey("word4_key", " ")
                              .wait()
                               ,
                                getText("word4")
                               .remove()
                               ,
                               
                               newText("word5", variable.word5)  // fifth word- noun 2 SPILLOVER
                               .settings.italic()
                               .print()
                               ,
                               newKey("word5_key", " ")
                               .wait()
                               ,
                               getText("word5")
                               .remove()
                                ,
                               
                              newText("question", "Wie akzeptabel ist das Urteil angesichts des Kontextes?")
                               .settings.center()
                               .settings.css("font-size","25")
                               .print()
                               ,
                               newCanvas("empty canvas", 1, 40)
                               .print()
                               ,
                               newScale("scale","0", "1","2","3","4","5","6","7","8","9", "10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49", "50")
                               .settings.center()
                               .settings.before( newText("notacceptable", "inakzeptabel")
                                                .settings.css("font-size","15"))
                               .settings.after( newText("acceptable", "sehr akzeptabel")
                                                .settings.css("font-size","15"))
                               .settings.labelsPosition("bottom")
                               .settings.size (1200)
                               .print()
                               .settings.log()
                               .wait()   
                                , 
                                
                                newText("blank", "<br>")
                               .print()
                                ,
                               newButton("continue", "Weiter")
                               .print()
                               .settings.center()
                               .wait()
                               ,
                               getText("question")
                               .remove()
                               ,
                               getScale("scale")
                               .remove()
                              ,
                                getKey("context_key").settings.log(),
                                getKey("word1_key").settings.log(),
                                getKey("word2_key").settings.log(),
                                getKey("word3_key").settings.log(),
                                getKey("word4_key").settings.log(),
                                getKey("word5_key").settings.log()
                               
                               )
    
    .log("Item",variable.item)
    .log("Soc_stat", variable.socStat)
    .log( "condition" , variable.condition)
    .log ("stimuli", variable.stimuli)
);


//send results                              
                                           
PennController.SendResults( "send" );  

//Final Page

PennController( "final" ,
    newText("<p>Vielen Dank f&uuml;r Ihre Teilnahme!</p>")
        .settings.css("font-size", "25px")
        .print()
     
     ,
     newButton("void")
        .wait()
)
