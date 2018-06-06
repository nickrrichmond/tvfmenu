$(function() {
    $("#juiceList ul li span").click(function(e) {
        if ($("#main").css("z-index") == 100 ) {
            $("#main").addClass("slideover");
        }
    });
});

function mobileClose(){
    $("#main").removeClass("slideover");
    $("#juiceList ul li").removeClass("juiceSelected");
}

$(document).ready(function () {
    if ($("#main").css("z-index") == 100 ) {
        $("#juiceList ul li").removeClass("juiceSelected");
    }
}); 