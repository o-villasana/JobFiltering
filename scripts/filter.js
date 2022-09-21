console.log("hello world");

// Add YOE filter option
function addFilter(){
    //Get filter buttons
    var filters = document.getElementsByClassName('search-reusables__filter-list');
    console.log(filters)

    var experience_filter = filters[0].children[3];

    experience_filter.innerHTML = experience_filter.innerHTML.replace('Experience Level', 'Years of Experience')

    console.log(experience_filter)
    #TODO
}

// Compare regex to job desc
function regexValidate(desc){

    return false;
}

function filterJobs(){

    // Get Job list
    var jobs_list = document.getElementsByClassName("scaffold-layout__list-container")[0];

    var jobs_to_delete = [];

    // For each job, compare to regex
    for (let i = 0; i < jobs_list.childElementCount; i++){
        var job_num = jobs_list.children[i].getAttribute("data-occludable-job-id");
        if (!regexValidate(job_num)) {
            jobs_to_delete.push(job_num)
        }
    }

    for (let i = 0; i < jobs_to_delete.length; i++)
    {
        var id = '[data-occludable-job-id="' + jobs_to_delete[i] + '"]';
        var element = document.querySelector(id);
        element.parentNode.removeChild(element);
    }


}

