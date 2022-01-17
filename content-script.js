(function (){

    var person = {
        company: "",
        title: "",
        name: "",
        location: "",
        url: ""
    };

    person.name = document.querySelector(".text-heading-xlarge").textContent;

    var blocks = document.getElementsByClassName("artdeco-card break-words");
    for (var i = 1; i < blocks.length; i++) {
        var heading = blocks[i].querySelector("h2 > span").textContent
        if (heading == "Experience") {
            var blockExperience = blocks[i];
            break;
        }
    }

    try {
        // Promoted in current company
        person.title = blockExperience.querySelector(".pvs-entity:first-child").querySelector("ul").querySelector(".t-bold > span").textContent;
        person.company = blockExperience.querySelector(".pvs-entity:first-child").querySelector(".t-bold > span").textContent.trim();
    }
    catch (TypeError) {
        // Not promoted in current company
        person.title = blockExperience.querySelector(".pvs-entity:first-child").querySelector(".t-bold > span").textContent;
        var company = blockExperience.querySelector(".pvs-entity:first-child").querySelector(".t-normal > span").textContent;
        person.company = company.split("·")[0].trim();
    }

    person.url = document.querySelector(".pb2 > .pv-text-details__separator > a").href.replace("overlay/contact-info/", "");

    var loc = document.querySelector(".pb2 > span").textContent
    person.location = loc.replace("\n", "").trim();

    return person;

})();