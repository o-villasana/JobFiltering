# Job Filter[in]g
Did you know that LinkedIn Job searches return up to 1,000 results? But what good is that if a user had to go through each one to find which roles they actually are qualified for? That would take up so much time and mental effort. However, if users had the option to filter for roles based on years of experience, they could easily focus their energy only on roles they have the necessary years of experience for. We are creating a browser extension to filter those results for you. 


## How to add this extension to your browser
1. From your prefered browser, click on Extensions icon then click on **`manage extensions`**:
    ![manage extensions](./images/manage_ext.png)
2. Make sure developer mode is enabled and click on **`Load unpacked`**:
    ![load extensions](./images/load_ext.png)
3. Navigate to the cloned JobFiltering repo and click **`Select Folder`**. You should be able to see the extensions added under **From other sources**:
    ![extensions](./images/added_ext.png)

## Using the extension

 After installing the extension, navigate to linkedin job search and you should see new filter options added (refresh if filters are not displayed):

![linkedin](./images/inuse_ext.png)

A banner will appear above the job description to alert the user if the job description matches their years of experience input in the new filters:

A green notification indicates that the job description falls within the years of experience specified by the user:
    ![linkedin](./images/green_ext.png)

A yellow notification indicates that the job description did not have any years of experience requirements: 
    ![linkedin](./images/yellow_ext.png)

A orange notification indicates that user specified years of experience does not qualify for the jobs years of experience requirement:
    ![linkedin](./images/orange_ext.png)


