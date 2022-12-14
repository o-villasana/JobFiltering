console.log("hello world");

var dmin_yoe = 0;
var dmax_yoe = 9;
var min_yoe = 0;
var max_yoe = 9;
var reg_ex = new RegExp(`([${min_yoe}-${max_yoe}])+.*-?(${max_yoe})?\\+?\\s(years?).*(experience)?.*`);
var reg_ex_yoe = new RegExp(`(years?).*(experience)?.*`);

// Functions to update the regular expression if user modifies values
function updateMinRegEx() {
    console.log("min val changed");
    min_yoe = document.getElementById("quantity-min").value;
    if(!min_yoe) {
        min_yoe = dmin_yoe;
    }
    reg_ex = new RegExp(`([${min_yoe}-${max_yoe}])+.*-?(${max_yoe})?\\+?\\s(years?).*(experience).*`);
    console.log(reg_ex);
    onUrlChange();
}

function updateMaxRegEx() {
    console.log("max val changed");
    max_yoe = document.getElementById("quantity-max").value;
    if(!max_yoe) {
        max_yoe = dmax_yoe;
    }
    reg_ex = new RegExp(`([${min_yoe}-${max_yoe}])+.*-?(${max_yoe})?\\+?\\s(years?).*(experience).*`);
    console.log(reg_ex);
    onUrlChange();
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
    var filters = document.getElementsByClassName('grid grid--no-gutters');
    var min_yoe = document.createElement('div');
    min_yoe.innerHTML = '<label for="quantity-min" style="padding: 4px 4px; border: 1px solid rgba(255, 255, 255, 1); border-radius: 10px; display: inline-block; width: 75px; text-align: center; font-weight: 600; color: #ffffff;">Min YoE:</label><input type="number" id="quantity-min" name="quantity-min" min="0" max="9" placeholder="0" style="display: inline-block; width: 75px;"><p style="padding: 4px 6px; display: inline-block"></p>';
    filters[0].appendChild(min_yoe);

    var max_yoe = document.createElement('div');
    max_yoe.innerHTML = '<label for="quantity-max" style="padding: 4px 4px; border: 1px solid rgba(255, 255, 255, 1); border-radius: 10px; display: inline-block; width: 75px; text-align: center; font-weight: 600; color: #ffffff;">Max YoE:</label><input type="number" id="quantity-max" name="quantity-max" min="0" max="10" placeholder="10+" style="display: inline-block; width: 75px;">';
    filters[0].appendChild(max_yoe); //, filters[0].children[5]);

    document.getElementById("quantity-min").addEventListener('change', updateMinRegEx);
    document.getElementById("quantity-max").addEventListener('change', updateMaxRegEx);
}

// Function to compare regex to job description
function regex(desc){
    var res = reg_ex.test(desc);
    console.log(reg_ex);
    console.log(res);

    if(res == false) {
        if(reg_ex_yoe.test(desc) == false)
        {
            document.getElementById('warning-banner').innerHTML = '<div class="w3-panel w3-yellow" style="background-color: #e2e14c"><h3 style="color: #000000"> Warning!</h3><p style="color: #000000"> No years of experience qualification found in description!</p></div>';
        } else {
            document.getElementById('warning-banner').innerHTML = '<div class="w3-panel w3-yellow" style="background-color: #ffa500"><h3 style="color: #000000"> Warning!</h3><p style="color: #000000"> Years of experience does not match!</p></div>';
            //alert('This job does not match Years of Experience')
        }
    }
    else {
        document.getElementById('warning-banner').innerHTML = '<div class="w3-panel w3-green" style="background-color: #0ab86b"><h3 style="color: #000000"> Success!</h3><p style="color: #000000"> Years of experience match!</p></div>';
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




// BELOW FUNCTIONS DONT DO ANYTHING CURRENTLY :(
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

