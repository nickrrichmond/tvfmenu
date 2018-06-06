    $(function() {

        function errorCheck() {
            var userInput = $("#searchBox").val().toLowerCase()
            // fruit loops fix
            .replace("fruit loops","fruit_loops").replace("fruit loop","fruit_loops")
            // jolly rancher fix
            .replace("jolly ranchers","jolly_rancher").replace("jolly rancher","jolly_rancher")
            // ice cream fix
            .replace("ice cream","ice_cream")
            // mixed drinks fix
            .replace("mixed drinks","mixed_drinks").replace("mixed drink","mixed_drinks")
            .replace("mix drinks","mixed_drinks").replace("mix drink","mixed_drinks")
            .replace(","," ").replace(" , "," ").replace(/  +/g," ").split(" ");
            var whoopsCheck = ["crap","craps","shit","shits","poop","poops","poo","poos","ass","asses","butt","butts","fart","farts","piss","pisses","pis","pee","pees","urine","fece","feces","shitter","toilet","shitters","toilets","bathroom","bathrooms","dick","dicks","schlong","schlongs","penis","penises","dirt"]
            for (w = 0; w < whoopsCheck.length; w++) {
                var whoopsTest = $.inArray(whoopsCheck[w],userInput);
                if (whoopsTest > -1) {
                    var whoopsFlag = true;
                }
            }
            if ( !$("#juiceList > ul > li:visible").length ) {
                if (whoopsFlag) {
                    $("#searchError").text("Do you honestly want to vape a flavor like that?");
                } else {
                    $("#searchError").text("Sorry no resuslts found.");
                }
            } else if ( $('#juiceList > ul > li:visible').length ) {
                $("#searchError").text("");
            }
        };

        function runEffect(x) {
            var options = {};
            $(x).addClass("runEffectHidden").hide("drop", options, 1000);
            setTimeout(errorCheck,700);
        };

        function callback(x) {
            $(x).removeClass("runEffectHidden").removeAttr("style").hide().fadeIn();
        };

        $("#flavor").on("selectmenuchange", function() {
            callback(".hideMe");
            $("#juiceList > ul > li").removeClass("hideMe");
            $("#searchBox").val("");
            var choice = $("#flavor").val();
            var flavClass = ("#juiceList > ul > li.").concat(choice).concat(":hidden");
            var flavNotClass = ("#juiceList > ul > li:not(.").concat(choice).concat(")");
            if (choice === "all") {
                callback("#juiceList > ul > li:hidden");
            } else {
                callback(flavClass);
                runEffect(flavNotClass);
            }
            errorCheck();
        });

        var typingTimer;
        var doneTypingInterval = 1000;  //time in ms, 5 second for example

        $('#searchBox').on('keyup', function () {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(search, doneTypingInterval);
        });

        $('#searchBox').on('keydown', function () {
            clearTimeout(typingTimer);
        });

        function search() {
            callback(".hideMe");
            $("#juiceList > ul > li").removeClass("hideMe");
            var flavSelect = $("#flavor").val();
            var userInput = $("#searchBox").val().toLowerCase()
            // fruit loops fix
            .replace("fruit loops","fruit_loops").replace("fruit loop","fruit_loops")
            // jolly rancher fix
            .replace("jolly ranchers","jolly_rancher").replace("jolly rancher","jolly_rancher")
            .replace(","," ").replace(" , "," ").replace(/  +/g," ").split(" ");
            if (userInput == "") {
                $("#juiceList > ul > li").removeClass("hideMe");
            } else {
                var hideList = [];
                var andTest = $.inArray("and",userInput);
                var ampTest = $.inArray("&",userInput);
                for (i = 0; i < userInput.length; i++) {
                    if (userInput[i]=="and") {
                        userInput.splice(i,1);
                        i--;
                    }
                }
                for (i = 0; i < userInput.length; i++) {
                    if (userInput[i]=="&") {
                        userInput.splice(i,1);
                        i--;
                    }
                }
                if (ampTest >= 0) {
                    var andTest = -1;
                }
                if (andTest >= 0) {
                // searchAnd
                    for (a = 0 ;a < $("#juiceList > ul > li").length; a++) {
                        var curFlavor = $("#juiceList > ul > li").eq(a);
                        var curFlavorKey = curFlavor.data("keywords").split(" ");
                        var check = 1;
                        for (b = 0 ;b < userInput.length; b++) {
                            var keyWord = userInput[b];
                            var found = $.inArray(keyWord,curFlavorKey);
                            if (found == -1) {
                                var check = -1;
                            }
                        }
                        if (check == -1) {
                            hideList[a] = a;
                        } else{
                            hideList[a] = "pass";
                        }
                        var curFlavorKey = [];
                    }
                } else {
                // searchOr
                    for (a = 0 ;a < $("#juiceList > ul > li").length; a++) {
                        var curFlavor = $("#juiceList > ul > li").eq(a);
                        var curFlavorKey = curFlavor.data("keywords").split(" ");
                        var check = -1;
                        for (b = 0 ;b < userInput.length; b++) {
                            var keyWord = userInput[b];
                            var found = $.inArray(keyWord,curFlavorKey);
                            if (found >= 0) {
                                var check = 1;
                            }
                        }
                        if (check == -1) {
                            hideList[a] = a;
                        } else{
                            hideList[a] = "pass";
                        }
                        var curFlavorKey = [];
                    }
                }
                // Hide failed matches
                for (i = 0; i < hideList.length; i++) {
                    if (hideList[i]=="pass") {
                        hideList.splice(i,1);
                        i--;
                    }
                }
                for (q = 0; q < hideList.length; q++) {
                    if (flavSelect == "all") {
                        $("#juiceList > ul > li").eq(hideList[q]).addClass("hideMe");
                    } else if ($("#juiceList > ul > li").eq(hideList[q]).hasClass(flavSelect)) {
                        $("#juiceList > ul > li").eq(hideList[q]).addClass("hideMe");
                    }
                }
                runEffect(".hideMe");
            }
            errorCheck();
        };

        $("#juiceList ul li span").click(function(e) {
            $("#juiceList > ul > li").removeClass("juiceSelected");
            $(this).parent().addClass("juiceSelected");
            var maker = $(this).parent().data("maker").concat("/");
            var jLine = $(this).parent().data("juiceLine").concat("/");
            var flavName = $(this).text().toLowerCase().replace(/ /g,"_").concat(".htm");
            var flav = ("juice/").concat(maker).concat(jLine).concat(flavName);
            $("#main").load(flav);
        });
    });