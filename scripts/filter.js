console.log("hello world");

function regex(desc){
    const reg_ex = /([0-3]){1}.*-?(3)?\+?\s(years?).*(experience).*/;
    var res = reg_ex.test(desc);

    console.log(res);

    if(res == false){
        alert('This Job does not match Years of Experience')
    }
}


let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, {subtree: true, childList: true});
 
function onUrlChange() {
  var jobs_desc = document.getElementById("job-details").innerText;
  regex(jobs_desc);
}


// Add YOE filter option
function addFilter(){
    //Get filter buttons
    var filters = document.getElementsByClassName('search-reusables__filter-list');
    console.log(filters)

    var experience_filter = filters[0].children[3];

    experience_filter.innerHTML = experience_filter.innerHTML.replace('Experience Level', 'Years of Experience')

    console.log(experience_filter)
    
    //TODO
}

// Compare regex to job desc
function validateJobDesc(num, i){
    
    var url = 'https://www.linkedin.com/jobs/view/' + num;
    
    let new_window;
    new_window = window.open(url, '_blank', 'width=400,height=400 top=200,left=600');

    var jobs_desc = new_window.document.getElementById("job-details");
    console.log(jobs_desc.innerText)
    new_window.close();
    return true;
}

function filterJobs(){

    // Get Job list
    var jobs_list = document.getElementsByClassName("scaffold-layout__list-container")[0];

    var jobs_to_delete = [];

    // For each job, compare to regex
    for (let i = 0; i < jobs_list.childElementCount; i++){
        var job_num = jobs_list.children[i].getAttribute("data-occludable-job-id");
        if (!regexValidate(job_num, i)) {
            jobs_to_delete.push(job_num)
        }
    }

    // Delete jobs the user did not qualify for
    for (let i = 0; i < jobs_to_delete.length; i++)
    {
        var id = '[data-occludable-job-id="' + jobs_to_delete[i] + '"]';
        var element = document.querySelector(id);
        element.parentNode.removeChild(element);
    }


}

