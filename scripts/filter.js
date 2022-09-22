console.log("hello world");

var min_yoe = 0;
var max_yoe = 9;
var reg_ex = new RegExp(`([${min_yoe}-${max_yoe}])+.*-?(${max_yoe})?\\+?\\s(years?).*(experience).*`);

// Function to update the regular expression if user modifies values
function updateRegEx() {

}
// Add banner that will display match or not
function addBanner() {
    var job_desc = document.getElementsByClassName("jobs-unified-top-card t-14");
    var job_header = job_desc[0];
    var newElement = document.createElement('div');
    newElement.innerHTML = '<p id = "warning-banner"></p>';
    job_header.appendChild(newElement);
}

// Add YOE filter option
function addFilter() {
    //Get filter buttons
    var filters = document.getElementsByClassName('search-reusables__filter-list');
    console.log(filters);

    var experience_filter = filters[0].children[3];

    var yoe_filter = experience_filter.cloneNode(true);

    //yoe_filter.innerText = yoe_filter.innerText.replace('Experience Level', 'Years of Experience');

    console.log(experience_filter);

    experience_filter.parentNode.insertBefore(yoe_filter, filters[0].children[4]);
}

// Function to compare regex to job description
function regex(desc){
    var res = reg_ex.test(desc);
    console.log(reg_ex);
    console.log(res);

    if(res == false) {
        document.getElementById('warning-banner').innerHTML = '<div class="w3-panel w3-yellow" style="background-color: #e2e14c"><h3 style="color: #000000"> Warning!</h3><p style="color: #000000"> Years of Experience may not match!</p></div>';
        //alert('This job does not match Years of Experience')
    }
    else {
        document.getElementById('warning-banner').innerHTML = '<div class="w3-panel w3-green" style="background-color: #0ab86b"><h3 style="color: #000000"> Success!</h3><p style="color: #000000"> Years of Experience match!</p></div>';
    }
}

// Runs on url changes
function onUrlChange() {
  var jobs_desc = document.getElementById("job-details").innerText;
  regex(jobs_desc);
}


window.onload = function() {
    addBanner();
    addFilter();
};


let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, {subtree: true, childList: true});


 

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

